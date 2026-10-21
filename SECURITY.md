# Security Policy

## Supported Versions

This is a GitHub profile README repository (static Markdown + SVGs). There is no runtime, no server, and no dependencies to patch. The only "supported" version is the `master` branch.

| Scope         | Supported |
| ------------- | --------- |
| `master`      | ✅        |
| Other branches| ❌        |

## Reporting a Vulnerability

Even though this repo has no application code, we take supply-chain and content integrity seriously:

- **Do not** open a public issue for sensitive reports (e.g., compromised external image/badge URL acting as XSS vector).
- Email **ketan6196@gmail.com** with:
  - Description and impact
  - Steps to reproduce / proof of concept
  - Suggested fix (if any)

You can expect an acknowledgment within **72 hours** and a fix or mitigation plan within **7 days** for valid reports.

## What to Report

- Malicious link or badge that could phish visitors
- SVG that contains unexpected `<script>` or external resource
- CDN dependency that has been hijacked (`cdn.jsdelivr.net`, `shields.io`, `github-readme-stats.vercel.app`)
- Any other content that could harm viewers

## What Not to Report

- Typos, broken tutorial links → open a regular Bug Report issue
- GitHub's own rendering quirks (we cannot fix those)

## Hardening Notes for Contributors

- Keep SVGs **script-free**: no `<script>`, `onload=`, `href="javascript:"`, or `<foreignObject>` with HTML.
- Pin external badge URLs to `https` and prefer `shields.io` / official CDNs.
- Validate links locally: `npm run validate` (see `docs/MAINTENANCE.md`).
- No CI/workflows are allowed per `CONTRIBUTING.md` — all checks are manual/local.

Thank you for helping keep the profile safe.
