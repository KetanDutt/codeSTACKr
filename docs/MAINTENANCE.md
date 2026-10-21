# Maintenance

No CI is allowed (`CONTRIBUTING.md`). All updates are **manual or local-script-assisted**.

## Requirements

- Node 18+ (for `fetch` global)
- `npm install` inside repo root

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run validate` | HEAD-check every `https://` link in `README.md` + `docs/*` (timeout 8s, 2 retries). Exits non-zero on 404/5xx. |
| `npm run lint` | `prettier --check` + `markdownlint` (if installed) |
| `npm run format` | `prettier --write` |
| `npm run update:readme` | Fetch latest YouTube + blog RSS, patch `README.md` sections for manual review |
| `npm run update:youtube` | Only YouTube section |
| `npm run update:blog` | Only blog section |

All scripts log to stdout and **never push** — you review diff then `git commit`.

## Updating Latest Videos

1. Set channel (default `UC…` already in `scripts/update-readme.js`) or pass `--channel=ID`.
2. Run:
   ```bash
   npm run update:youtube
   # or
   node scripts/update-readme.js --only=youtube --limit=5
   ```
3. Script parses `https://www.youtube.com/feeds/videos.xml?channel_id=...` and rewrites:
   ```md
   ### 📺 Latest YouTube Videos
   - [Title](https://www.youtube.com/watch?v=...)
   ...
   ```
   No markers are used — the whole list is replaced between the heading and the next `---`.

4. Verify links resolve, then commit.

### Environment alternatives

- `YOUTUBE_API_KEY` — if set, `scripts/update-readme.js` prefers YouTube Data API v3 for quota-checked fetching.
- Offline: script keeps existing list and warns; you paste titles by hand.

## Updating Blog Posts

Same flow with dev.to RSS (`https://dev.to/feed/codeSTACKr`):

```bash
npm run update:blog
# or
node scripts/update-readme.js --only=blog --limit=5
```

## Updating GitHub Activity

This repo no longer pulls `START_SECTION:activity` via bot. To update:

- Open https://github.com/codeSTACKr?tab=overview — copy meaningful activity
- Paste into `<details><summary>Recent GitHub Activity</summary>` block
- Keep ≤5 items, link to real PRs/releases

## Link hygiene

```bash
npm run validate
# Sample output:
# ✓ https://codestackr.com — 200 (412ms)
# ✗ https://example.com/broken — 404 (fix in README.md:42)
```

If an external CDN is down (`shields.io`, `cdn.jsdelivr.net`, `github-readme-stats.vercel.app`), re-run — script retries and distinguishes `timeout` vs `404` so you don't churn the README on transient outages.

## Manual checklist (before any PR)

- [ ] All `https://` links work (`npm run validate`)
- [ ] Light/dark SVGs still toggle (preview in both GitHub themes)
- [ ] Alt text present on new images/icons
- [ ] No `.github/workflows` was added
- [ ] Screenshot attached if layout changed

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `fetch failed: ETIMEDOUT` | Retry; transient CDN blip |
| YouTube RSS 403 | GitHub rate-limited feed proxy; set `YOUTUBE_API_KEY` or paste manually |
| Dev.to feed empty | Check feed URL; author may have changed handle |
| Stats card blank | `github-readme-stats.vercel.app` intermittent; add `?cache_seconds=1800` already in URL |
