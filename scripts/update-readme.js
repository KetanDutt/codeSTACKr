#!/usr/bin/env node
/**
 * update-readme.js — Local manual updater (NO CI)
 * Fetches YouTube RSS + dev.to RSS and patches README.md
 *
 * Usage:
 *   node scripts/update-readme.js                 # both sections
 *   node scripts/update-readme.js --only=youtube --limit=5
 *   node scripts/update-readme.js --only=blog    --limit=5 --dry-run
 *   YOUTUBE_API_KEY=xxx node scripts/update-readme.js  # prefers API if set
 *
 * This script never pushes; you review diff then commit.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const README_PATH = path.join(ROOT, "README.md");

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1] || "all";
const limitArg = args.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 5;
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");

const YOUTUBE_CHANNEL_ID = "UCDCHcqyeQgJ-jVSd6VJkbCw";
const YOUTUBE_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const BLOG_RSS = "https://dev.to/feed/codestackr";

function log(...a) {
  if (verbose) console.log(...a);
}

// Very small XML helpers — avoid extra deps
function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
function parseYouTubeRSS(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((m) => m[1]);
  return entries.slice(0, LIMIT).map((entry) => {
    const title = decodeEntities(extractTag(entry, "title").replace(/<!\[CDATA\[|\]\]>/g, ""));
    let link = "";
    const linkMatch = entry.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"[^>]*>/i) ||
                      entry.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"[^>]*>/i) ||
                      entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
    if (entry.match(/href="([^"]+)"/)) {
      // prefer full watch URL
      const href = entry.match(/<link[^>]*href="([^"]+)"[^>]*>/i)?.[1] || "";
      if (href.includes("youtube.com/watch")) link = href;
      else if (href.includes("youtu.be")) link = href;
    }
    // fallback via videoId
    if (!link || !link.includes("youtube.com")) {
      const vid = extractTag(entry, "yt:videoId") || extractTag(entry, "yt:videoId");
      if (vid) link = `https://www.youtube.com/watch?v=${vid}`;
    }
    return { title: title || "Untitled", link };
  }).filter((v) => v.link);
}

function parseBlogRSS(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => m[1]);
  return items.slice(0, LIMIT).map((item) => {
    const title = decodeEntities(extractTag(item, "title").replace(/<!\[CDATA\[|\]\]>/g, ""));
    const link = extractTag(item, "link").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    return { title: title || "Untitled", link };
  }).filter((v) => v.link);
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "codestackr-profile-updater/1.0" } });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${res.statusText}`);
  return await res.text();
}

async function fetchYouTubeAPI(limit) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&order=date&maxResults=${limit}&type=video`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);
    const data = await res.json();
    return data.items.map((it) => ({
      title: it.snippet.title,
      link: `https://www.youtube.com/watch?v=${it.id.videoId}`,
    }));
  } catch (e) {
    console.warn(`YouTube API fallback failed: ${e.message} — trying RSS`);
    return null;
  }
}

function patchSection(content, heading, items, moreLink) {
  // Find heading like "### 📺 Latest YouTube Videos" then replace list until next "---" or "### "
  const headingEsc = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${headingEsc}\\s*\\n)([\\s\\S]*?)(\\n---\\n|\\n### |\\n<details>|\\n\\n\\[)`, "i");
  const list = items.map((it) => `- [${it.title}](${it.link})`).join("\n");
  const more = moreLink ? `\n\n➡️ [more ${moreLink.label}...](${moreLink.url})` : "";
  const replacement = `$1${list}${more}\n$3`;
  if (!re.test(content)) {
    console.warn(`⚠️  Heading not found: "${heading}" — skipping patch (edit manually)`);
    return content;
  }
  return content.replace(re, replacement);
}

async function main() {
  if (!fs.existsSync(README_PATH)) {
    console.error("README.md not found at", README_PATH);
    process.exit(1);
  }
  let readme = fs.readFileSync(README_PATH, "utf8");
  const original = readme;

  if (only === "all" || only === "youtube") {
    console.log(`📺 Fetching YouTube (limit ${LIMIT})...`);
    let videos = null;
    // Prefer API if key provided
    if (process.env.YOUTUBE_API_KEY) {
      videos = await fetchYouTubeAPI(LIMIT);
    }
    if (!videos) {
      try {
        const xml = await fetchText(YOUTUBE_RSS);
        videos = parseYouTubeRSS(xml);
        log("YouTube RSS parsed:", videos);
      } catch (e) {
        console.warn(`⚠️  YouTube RSS failed: ${e.message} — keeping existing list`);
        videos = null;
      }
    }
    if (videos && videos.length) {
      readme = patchSection(readme, "### 📺 Latest YouTube Videos", videos, {
        label: "videos",
        url: "https://www.youtube.com/@codeSTACKr",
      });
      console.log(`✓ Patched ${videos.length} YouTube entries`);
    } else if (videos !== null) {
      console.warn("⚠️  No YouTube entries fetched — skipping");
    }
  }

  if (only === "all" || only === "blog") {
    console.log(`📝 Fetching Blog (limit ${LIMIT})...`);
    try {
      const xml = await fetchText(BLOG_RSS);
      const posts = parseBlogRSS(xml);
      log("Blog RSS parsed:", posts);
      if (posts.length) {
        readme = patchSection(readme, "### 📕 Latest Blog Posts", posts, {
          label: "blog posts",
          url: "https://codestackr.com",
        });
        console.log(`✓ Patched ${posts.length} blog entries`);
      }
    } catch (e) {
      console.warn(`⚠️  Blog RSS failed: ${e.message} — keeping existing list`);
    }
  }

  // Update "Last updated" footer if present, else inject before final link refs
  const today = new Date().toISOString().slice(0, 10);
  if (readme.includes("Last updated:")) {
    readme = readme.replace(/Last updated:\s*\d{4}-\d{2}-\d{2}/, `Last updated: ${today}`);
  } else if (readme !== original) {
    // Insert tiny footer before link refs at bottom
    readme = readme.replace(/\n\[website\]:/, `\n\n> Last updated: ${today} — profile README · [docs](./docs/README.md)\n\n[website]:`);
  }

  if (readme === original) {
    console.log("No changes needed — README is up to date (or fetch failed and kept current content).");
    return;
  }

  if (dryRun) {
    console.log("\n— DRY RUN diff preview —\n");
    // Simple line diff hint
    const origLines = original.split("\n");
    const newLines = readme.split("\n");
    for (let i = 0; i < Math.max(origLines.length, newLines.length); i++) {
      if (origLines[i] !== newLines[i]) {
        console.log(`- ${origLines[i] ?? ""}`);
        console.log(`+ ${newLines[i] ?? ""}`);
        if (i > 20) { console.log("... (truncated)"); break; }
      }
    }
    console.log("\n(dry-run — no file written)");
  } else {
    fs.writeFileSync(README_PATH, readme, "utf8");
    console.log(`\n✓ Wrote ${README_PATH}`);
    console.log("Next: git diff, verify links, then git commit");
  }
}

main().catch((e) => {
  console.error("✗ update failed:", e);
  process.exit(1);
});
