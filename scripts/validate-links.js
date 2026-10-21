#!/usr/bin/env node
/**
 * validate-links.js
 * HEAD-check all https:// links in README.md + docs/*.md
 * Usage: npm run validate
 *        node scripts/validate-links.js --only=external --timeout=8000
 *
 * No CI required — run locally before PR.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const onlyExternal = args.includes("--only=external");
const timeoutArg = args.find((a) => a.startsWith("--timeout="));
const TIMEOUT = timeoutArg ? Number(timeoutArg.split("=")[1]) : 8000;

const MARKDOWN_FILES = ["README.md", ...globDocs()];
function globDocs() {
  const dir = path.join(ROOT, "docs");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => path.join("docs", f));
}

const linkRegex = /https:\/\/[^\s"'\)\]]+/g;
const imgAltRegex = /<img[^>]*>/g;
const altAttrRegex = /alt\s*=/i;

function stripCode(content) {
  // Remove fenced blocks ```...``` and inline `...` to avoid false positives
  return content.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

function extractLinks(file) {
  const rawContent = fs.readFileSync(path.join(ROOT, file), "utf8");
  const content = stripCode(rawContent);
  const raw = content.match(linkRegex) || [];
  const cleaned = raw.map((u) => u.replace(/[.,;)\]`]+$/, "")).filter((u) => u.startsWith("https://"));
  if (onlyExternal) {
    return cleaned.filter((u) => !u.includes("localhost") && !u.includes("127.0.0.1"));
  }
  return [...new Set(cleaned)];
}

function checkImgAlts(file) {
  const rawContent = fs.readFileSync(path.join(ROOT, file), "utf8");
  const content = stripCode(rawContent);
  const imgs = content.match(imgAltRegex) || [];
  const missing = imgs.filter((tag) => !altAttrRegex.test(tag));
  return { total: imgs.length, missing };
}

async function headCheck(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT);
  const started = Date.now();
  try {
    // Prefer HEAD, fallback to GET for servers that block HEAD (e.g., some CDNs)
    let res = await fetch(url, { method: "HEAD", signal: controller.signal, redirect: "follow" });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, { method: "GET", signal: controller.signal, redirect: "follow", headers: { Range: "bytes=0-0" } });
    }
    const ms = Date.now() - started;
    return { url, ok: res.ok, status: res.status, ms, redirected: res.redirected };
  } catch (e) {
    const ms = Date.now() - started;
    const reason = e.name === "AbortError" ? `timeout>${TIMEOUT}ms` : e.message;
    return { url, ok: false, status: 0, ms, error: reason };
  } finally {
    clearTimeout(t);
  }
}

function domainOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "unknown";
  }
}

async function main() {
  console.log(`🔍 validate-links — ${MARKDOWN_FILES.length} files, timeout ${TIMEOUT}ms\n`);

  // Accessibility pre-check
  let a11yIssues = 0;
  for (const f of MARKDOWN_FILES) {
    const { total, missing } = checkImgAlts(f);
    if (missing.length) {
      console.log(`⚠️  ${f}: ${missing.length}/${total} <img> missing alt=`);
      for (const m of missing.slice(0, 5)) console.log(`   - ${m.slice(0, 120)}`);
      a11yIssues += missing.length;
    }
  }
  if (a11yIssues === 0) console.log("✓ Accessibility: all <img> have alt=\n");
  else console.log("");

  const allLinks = [...new Set(MARKDOWN_FILES.flatMap(extractLinks))];
  if (allLinks.length === 0) {
    console.log("No https links found.");
    process.exit(0);
  }

  console.log(`Found ${allLinks.length} unique https links. Checking...\n`);

  const CONCURRENCY = 8;
  const results = [];
  for (let i = 0; i < allLinks.length; i += CONCURRENCY) {
    const batch = allLinks.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(headCheck));
    for (const r of batchResults) {
      const icon = r.ok ? "✓" : "✗";
      const detail = r.error ? `error: ${r.error}` : `${r.status}${r.redirected ? " (redirected)" : ""}`;
      console.log(`${icon} ${r.url} — ${detail} (${r.ms}ms)`);
      results.push(r);
    }
  }

  // Domain latency summary
  const byDomain = {};
  for (const r of results) {
    const d = domainOf(r.url);
    if (!byDomain[d]) byDomain[d] = [];
    byDomain[d].push(r.ms);
  }
  console.log("\n— Latency by domain (p50/p95) —");
  for (const [domain, times] of Object.entries(byDomain).sort()) {
    times.sort((a, b) => a - b);
    const p50 = times[Math.floor(times.length * 0.5)];
    const p95 = times[Math.floor(times.length * 0.95)] ?? times[times.length - 1];
    console.log(`  ${domain} — p50=${p50}ms p95=${p95}ms (${times.length} req)`);
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log(`\n✗ ${failed.length} links failed validation:`);
    for (const f of failed) console.log(`  - ${f.url} (${f.status || f.error})`);
    console.log("\nHint: re-run — transient CDN blips retry via fallback GET. Fix genuine 404s in README/docs.");
    process.exitCode = 1;
  } else {
    console.log(`\n✓ All ${results.length} links OK`);
  }

  if (a11yIssues) {
    console.log(`\n⚠️  ${a11yIssues} a11y warnings (missing alt) — non-blocking but please fix.`);
  }
}

main();
