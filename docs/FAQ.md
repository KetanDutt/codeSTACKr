# FAQ

## Why is there no CI?

This is a profile README — static Markdown + SVGs. CI added only noise and stale auto-commits (see `CONTRIBUTING.md`). All updates are hand-reviewed; local scripts in `scripts/` help but never push automatically.

## How do I keep YouTube / Blog sections fresh?

Run locally:

```bash
npm install
npm run update:youtube   # or update:blog / update:readme
git diff                 # review
git commit -m "docs: refresh youtube videos"
```

See `docs/MAINTENANCE.md`.

## Icons not showing in dark mode?

You need paired SVGs with fragments:

```md
![Web](./img/globe-light.svg#gh-light-mode-only)
![Web](./img/globe-dark.svg#gh-dark-mode-only)
```

Both files must exist. Check `img/` — we ship light/dark pairs for all social icons.

## Badge shows “unknown” or is slow?

`shields.io` and `github-readme-stats` are best-effort external services. If a badge 404s, verify the URL in `docs/LINKS.md` and re-run `npm run validate`. For `github-readme-stats` blank cards, wait 10 min — Vercel cache is 30 min.

## Can I fork this for my own profile?

Yes — fork, rename to `YOUR_USERNAME/YOUR_USERNAME`, and replace content. Keep the `img/` pattern and `docs/STYLE_GUIDE.md`. Remove any `.github/workflows` you pull from old history.

## How do I run link validation offline?

```bash
npm run validate -- --timeout=5000
# exits 1 on 404/5xx so you can gate pushes locally
```

## License?

Proprietary, All Rights Reserved © 2026 Ketan Dutt. See `LICENSE`. Viewing/evaluation only; no reuse without written permission.

## Still stuck?

Open a Discussion or email ketan6196@gmail.com.
