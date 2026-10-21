# Performance

This repo has no runtime, but **perceived performance** matters: how fast the profile renders on GitHub.

## Budgets

| Asset | Budget | Current |
|-------|--------|---------|
| Top badges | ≤6 | 5 |
| External CDN icons | ≤15 | 13 |
| SVGs in `img/` | ≤10 files, each ≤3 KB (except Deno ≤4 KB) | 9× ~0.5 KB + Deno 1.9 KB |
| Stats card | 1 external image | 1 |
| Total README size | ≤30 KB raw | ~9 KB |

## CDN cost

Every `https://cdn.jsdelivr.net/...`, `https://img.shields.io/...`, `https://github-readme-stats.vercel.app/...` is a separate request via GitHub's Camo proxy.

- Camo caches aggressively but each unique URL still costs a lookup.
- Use stable versioned URLs where possible: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/...` vs raw latest (here we pin by path, which is cacheable).
- Avoid adding per-tech badges that each hit shields — prefer a single icon row.

## SVG tuning

- **No embedded raster**: SVGs are vectors, not base64 PNGs.
- **Strip unused attributes**: `class="feather ..."` removed (not needed for rendering).
- **Self-close empty tags**: `<circle .../>` not `<circle ...></circle>` — smaller and consistent.
- **Size**: Keep icons at `width="24" height="24"` or `width="26px"` consistently; GitHub scales but fixed sizes avoid reflow.
- **Deno**: custom path is intentionally large; we reduced rendered size to `26×26` via `width/height` attrs rather than editing the path.

## Badges

- Shields.io supports `?cacheSeconds=86400` — we rely on default (4h) for YouTube subs which updates infrequently.
- For `github-readme-stats`, URL already includes `cache_seconds=1800` implicitly via Vercel; if stats are blank, it's upstream — do not duplicate the image with different params as it doubles requests.

## Validation

`npm run validate` now measures `TTFB`-like latency via `HEAD` and reports p50/p95 per domain so you can spot slow CDNs:

```
domain:cdn.jsdelivr.net  p50=120ms p95=340ms  (13 requests)
domain:img.shields.io    p50=210ms p95=480ms  (5 requests)
# Action: consider reducing shields if p95 > 800ms
```

## Tips for forkers

- Prefer one row of ~10–12 tech icons over 20+.
- Use `<br clear="left"/>` after `align="left"` icon groups to prevent layout thrash.
- Avoid large GIFs (profile READMEs with >2 MB hero GIF get throttled by Camo).
