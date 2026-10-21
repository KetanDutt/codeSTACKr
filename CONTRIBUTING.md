# Contributing

Thanks for your interest — this is a GitHub **profile README** repo. It ships no app, no build, and no deploy.

## 🚫 No CI / No GitHub Actions — ever

This is a **permanent policy**, not a TODO:

- **Do not** add `.github/workflows/*.yml` or `*.yaml`
- **Do not** add composite actions (`.github/actions/**`, `action.yml`)
- **Do not** add scheduled bots that auto-commit to the README
- **Do not** add third-party CI config: `.circleci/`, `.travis.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, `azure-pipelines.yml`, Buildkite, Drone, AppVeyor, etc.
- **Do not** add CI status badges or required checks to the README

Why: this repo is static Markdown + SVGs. Automation has historically caused noisy commits and wasted minutes. All checks are manual/local (see `docs/MAINTENANCE.md` and `scripts/`).

If you think CI is needed, **don't add it** — open an issue describing the problem. It will be solved with a documented manual or local workflow.

## How to contribute

1. **Fork** and create a feature branch: `git checkout -b feat/your-idea`
2. **Edit manually**:
   - Content: `README.md` (follow `docs/STYLE_GUIDE.md`)
   - Assets: `img/*.svg` (keep script-free, see `SECURITY.md`)
   - Docs: `docs/*.md`
   - Scripts (local-only): `scripts/*.js`
3. **Validate locally**:
   ```bash
   npm install
   npm run validate   # link & markdown checks (no network CI)
   npm run lint       # prettier/markdownlint if installed
   ```
4. **Commit with intent**: `feat: add featured projects section` / `fix: correct course link to https`
5. Open a **Pull Request** using the template — include a screenshot of the rendered README if UI changed.

## Content guidelines

- Keep tone on-brand: friendly, teacher-first, beginner-friendly.
- Prefer **https** everywhere; verify external URLs before PR.
- Keep SVGs **accessible**: `role="img"`, `<title>`, `aria-label` where needed. No inline JS.
- Keep badges limited and meaningful; avoid badge spam (see `docs/PERFORMANCE.md`).
- Update `CHANGELOG.md` under `[Unreleased]` for user-visible changes.

## What makes a good PR

- Small, focused diff with clear "why"
- No unrelated reformatting
- Links verified (no 404s)
- Screenshots for visual changes

## Local automation (allowed)

You **may** add or use local Node scripts in `scripts/` that run **on your machine** and commit results manually, e.g.:

- `scripts/update-readme.js` — fetch latest YouTube/blog entries and patch README
- `scripts/validate-links.js` — HEAD-check external URLs with timeout

These must **not** be wired to any GitHub Action.

## Code of Conduct

By participating you agree to the `CODE_OF_CONDUCT.md`.

Need help? Open a discussion or email **ketan6196@gmail.com**.
