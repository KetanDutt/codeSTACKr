# Architecture

## Purpose

This repository is a **GitHub Profile README**: when a repo is named identically to its owner (`codeSTACKr/codeSTACKr`) and contains a `README.md` on the default branch, GitHub renders it atop the user's profile page. There is no application server, no API, no database.

```
KetanDutt/codeSTACKr (this fork)
  └─ README.md  ──► rendered as profile
     └─ img/*.svg ──► referenced via relative paths + dark/light fragments
```

Original upstream: `codeSTACKr/codeSTACKr` (Jesse Hall).

## Components

| Path | Role | Notes |
|------|------|-------|
| `README.md` | Profile content | Markdown + inline HTML for icons |
| `img/*.svg` | Social icons, Deno logo | Feather icons + custom Deno; pairs for light/dark mode |
| `.github/FUNDING.yml` | Sponsor button | `github: codeSTACKr` + custom URLs |
| `.github/ISSUE_TEMPLATE/*` | Health files | No workflows |
| `scripts/*` | Local helpers | Node.js, run manually |
| `docs/*` | Human docs | You are here |

## Rendering model

- **GitHub Flavored Markdown (GFM)** with limited HTML: `<details>`, `<img>`, `<a>`, inline styles not supported.
- **Dark/light image swap**: GitHub respects fragment suffixes:
  ```md
  ![light](img/globe-light.svg#gh-light-mode-only)
  ![dark](img/globe-dark.svg#gh-dark-mode-only)
  ```
  Internally we use badge-style links with SVG sources.
- **External badges**: `shields.io` generates SVG badges on the fly; `github-readme-stats.vercel.app` renders stats card.
- **No JS execution**: SVGs are treated as images — `<script>` never runs, but we still forbid it for hygiene.

## Data flow (manual)

Historically, GitHub Actions fetched YouTube RSS / dev.to RSS and patched `README.md` between markers like `<!-- YOUTUBE:START -->`. That is **intentionally removed** per `CONTRIBUTING.md`.

New flow:

```
YouTube RSS ─┐
dev.to RSS  ─┼─► scripts/update-readme.js (local) ──► patch README.md ──► git commit ──► push
GitHub API  ─┘
```

See `MAINTENANCE.md` for commands.

## Why no CI / no workflows

- Profile repos have **no build** — CI adds minutes, noise, and stale auto-commits.
- Checks are manual/local: `npm run validate` HEAD-checks external URLs with timeout/retry.
- Simplicity > automation for a README-only repo.

## Fork considerations

- This fork is `KetanDutt/codeSTACKr` (profile repo for that user). Git history is shallow (single merge commit) by Arena harness.
- Upstream history beyond `646e504` is not retained locally but is reachable via GitHub API.

## Future extensions (without CI)

- Add a `docs/` GitHub Pages site (manual `gh-pages` branch) to preview README styles.
- Add a local `pre-commit` hook (`husky` + `lint-staged`) to validate markdown before push.
