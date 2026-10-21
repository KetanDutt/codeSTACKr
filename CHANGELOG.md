# Changelog

All notable changes to this project are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- `docs/` — architecture, maintenance, style guide, accessibility, performance, links reference
- Local update scripts `scripts/update-readme.js` and validation `scripts/validate-links.js` (no CI)
- GitHub community health: `SECURITY.md`, `CODE_OF_CONDUCT.md`, issue templates, PR template
- Repository hygiene: `.editorconfig`, `.gitattributes`, populated `.gitignore`
- Dark/light SVG a11y: `role="img"`, `aria-label`, titles (see `docs/ACCESSIBILITY.md`)

### Changed
- Polished `README.md`: refreshed badges, fixed stale links, updated goals to 2026, improved connect/tools layout, added featured projects, added footer with last-updated timestamp
- Optimized `img/*.svg` — stripped redundant attributes, preserved Feather icon style
- Cleaned `LICENSE` formatting and `.github/FUNDING.yml` placeholders

### Removed
- Automated `<!-- YOUTUBE:START -->` / `<!-- BLOG-POST-LIST:START -->` markers that required CI bots — now manual edits (see `docs/MAINTENANCE.md`)

### Fixed
- `http://vsCodeHero.com` → `https://vscodehero.com`
- `twitter.com` intents → `x.com` where appropriate, kept shields follow badge but documented deprecation risk
- `2025 Goals` → `2026 Goals`
- Duplicate alt text `"website"` on connect icons → descriptive labels
- Relative link fragments for dark/light SVGs documented and validated

## [1.0.0] — 2026-10-21

- Initial public profile README (port from `codeSTACKr/codeSTACKr`)
- Removed GitHub Actions workflows; documented permanent no-CI policy in `CONTRIBUTING.md`
