# Links

Canonical, verified links for this profile. Use these verbatim.

## Primary

| Label | URL | Notes |
|-------|-----|-------|
| Website | `https://codestackr.com` | Primary domain, HTTPS only |
| YouTube | `https://www.youtube.com/@codeSTACKr` | Canonical handle; `youtube.com/codeSTACKr` redirects but prefer `@` |
| YouTube (alt) | `https://www.youtube.com/c/codeSTACKr` | Legacy custom URL, keep as redirect |
| Course | `https://vscodehero.com` | Was `http://vsCodeHero.com` → now HTTPS, lowercase |
| Dev.to | `https://dev.to/codestackr` | Blog mirror |
| GitHub profile | `https://github.com/codeSTACKr` | |

## Social

| Platform | URL | Badge |
|----------|-----|-------|
| X (Twitter) | `https://x.com/codeSTACKr` | Shields follow uses `x` logo; intents URL is `https://x.com/intent/follow?screen_name=codeSTACKr` (old `twitter.com/intent/follow` still redirects) |
| LinkedIn | `https://linkedin.com/in/codeSTACKr` | |
| Instagram | `https://instagram.com/codeSTACKr` | |

## Playlists (Languages & Tools)

| Playlist | URL | ID |
|----------|-----|-----|
| Web Dev | `https://www.youtube.com/playlist?list=PLkwxH9e_vrAJ0WbEsFA9W3I1W-g_BTsbt` | `PLkwxH9e_vrAJ0WbEsFA9W3I1W-g_BTsbt` |
| JavaScript | `https://www.youtube.com/playlist?list=PLkwxH9e_vrALRJKu7wfXby3MKeflhTuB` | `PLkwxH9e_vrALRJKu7wfXby3MKeflhTu6B` (verify) |
| CSS | `https://www.youtube.com/playlist?list=PLkwxH9e_vrALSdvZuEh6gqQdmDoDIoqz4` | `PLkwxH9e_vrALSdvZuEh6gqQdmDoDIoqz4` |
| React | `https://www.youtube.com/playlist?list=PLkwxH9e_vrAK4TdffpxKY3QGyHCpxFcQ0` | `PLkwxH9e_vrAK4TdffpxKY3QGyHCpxFcQ0` |

> Verify playlist IDs before PR — YouTube sometimes rotates `PL…` IDs; use YouTube Studio → Playlists → Share URL.

## Badges & CDNs

| Provider | Base | Cache |
|----------|------|-------|
| Shields.io | `https://img.shields.io` | `?cacheSeconds=86400` optional |
| Devicons CDN | `https://cdn.jsdelivr.net/gh/devicons/devicon/icons` | immutable by path |
| Stats | `https://github-readme-stats.vercel.app/api` | `?cache_seconds=1800` |
| Avatars | `https://user-images.githubusercontent.com` | GitHub-hosted, long cache |

## Verification

```bash
npm run validate -- --only=external
# Checks HEAD for each https:// link; reports 2xx vs 4xx/5xx vs timeout
```

When a link 404s:

1. Search upstream site (e.g., YouTube handle vs `/c/` vs `/@`).
2. Update `README.md` **and** this file in same PR.
3. Add note to `CHANGELOG.md`.

## Redirect policy

- Always commit canonical HTTPS, no shorteners (`bit.ly` etc.)
- Keep legacy `twitter.com` intents as `x.com` with comment noting redirect (some older shields still expect `twitter.com` domain in badge URL — that's fine)
