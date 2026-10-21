# Documentation

Welcome — this folder is the single source of truth for **how this profile repo works** without any CI.

> **TL;DR:** This repo is `README.md` + `img/*.svg` rendered as Jesse's GitHub profile (`codeSTACKr/codeSTACKr`). There are no builds, no deploys, and **no GitHub Actions ever** (per `CONTRIBUTING.md`).

## Map

| Doc | What you get |
|-----|--------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Repo shape, rendering model, why no app code |
| [MAINTENANCE.md](./MAINTENANCE.md) | Local scripts, manual update flow (replaces old bots) |
| [STYLE_GUIDE.md](./STYLE_GUIDE.md) | Writing & visual rules for README |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | Alt text, contrast, dark/light handling |
| [PERFORMANCE.md](./PERFORMANCE.md) | Badge/CDN cost, SVG budget, caching |
| [LINKS.md](./LINKS.md) | Canonical links, redirect policy, verification |

## Quick start for maintainers

```bash
# 1. clone
git clone https://github.com/KetanDutt/codeSTACKr.git
cd codeSTACKr

# 2. install local helpers (no CI)
npm install

# 3. validate links & markdown
npm run validate
npm run lint   # optional — prettier + markdownlint

# 4. update YouTube/blog sections manually
npm run update:readme   # fetches RSS and patches README.md
# review diff, then commit by hand
```

## Constraints (non-negotiable)

- **Never add** `.github/workflows/**` — see `CONTRIBUTING.md`
- All external images must be `https` and script-free
- Keep PRs small; include a screenshot if UI changes

## For forkers / learners

If you fork this to build your own profile, copy:

- `README.md` structure (header, badges, about, connect, tools, content, stats, footer)
- `img/` dark/light pattern (`#gh-light-mode-only` / `#gh-dark-mode-only`)
- `docs/STYLE_GUIDE.md` and `docs/ACCESSIBILITY.md`

Delete your fork's `.github/workflows` if you pulled from upstream history — they are intentionally removed here.

## Questions?

Open a Discussion or read `CONTRIBUTING.md`.
