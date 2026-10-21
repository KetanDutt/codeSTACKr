# Style Guide

## Voice

- Friendly, teacher-first, inclusive. Short sentences. Emoji sparingly — section headers may have one (📺 📕 ⚡) but not every line.
- First-person is fine ("I'm a Husband, Father, Developer, and Teacher") — it's a profile.
- Avoid hype/clickbait in link titles; keep original video/post titles.

## Markdown rules

- Headings: `#` title once at top, then `##` for major sections, `###` for subsections. No skipping levels.
- Lists: `-` for unordered, `1.` for ordered. One space after marker.
- Links: prefer reference-style at bottom for repeated URLs. Always `https://`.
- Horizontal rules: `---` between major sections.
- HTML: minimal. Use `<details>` for collapsibles, `<img>` with `align="left"` for icon rows only (GFM limitation). No inline `style` attributes.

## Badges

- Keep ≤6 top badges. Use `for-the-badge` style consistently.
- Order: YouTube subs → Website → X follow → Marketplace → Course.
- Use official shield parameters: `logo=youtube&logoColor=red`, `logo=visualstudiocode`, etc.
- Do not stack >3 badge rows; it pushes content below fold.

## Icons & imagery

- **Social icons**: `img/{name}-{light|dark}.svg`, 24×24, Feather style, stroke 2px. Always pair with fragments:
  ```md
  [![Website](./img/globe-light.svg#gh-light-mode-only)](https://codestackr.com)
  [![Website](./img/globe-dark.svg#gh-dark-mode-only)](https://codestackr.com)
  ```
  Use descriptive alt: `Website`, `YouTube`, `X`, `LinkedIn`, etc. — not generic `website`.
- **Tech icons**: Use `cdn.jsdelivr.net/gh/devicons/devicon/...` with `width="26px"` and `padding-right:10px`. Keep each on one line with `align="left"`; terminate group with `<br clear="left"/>` (or two `<br />`).
- **Deno icon**: Custom `img/deno-light.svg` — keep 26×26 equivalent; do not inline huge path elsewhere.

## Sections — canonical order

1. Greeting + badges (`# Hi there...`)
2. About (`## I'm a Husband...`)
3. Connect (`### Connect with me:`)
4. Languages and Tools (`### Languages and Tools:`) — keep to ~12 items
5. Featured Projects (`### 🚀 Featured Projects`) — 3–5 highlighted repos with one-line descriptors
6. Latest YouTube (`### 📺 Latest YouTube Videos`) — 5 items + "more videos" link
7. Latest Blog (`### 📕 Latest Blog Posts`) — 5 items + "more posts" link
8. Activity & Stats (`<details>`) — collapsible to avoid clutter
9. Footer — last-updated hint + profile views badge (optional)

## Dates & goals

- Update year-bound items annually: `2026 Goals: ...`
- Prefer concrete goals: "Ship 12 videos + 1 open-source AI template" > "Ship more!!"

## Commit messages

- `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`
- Example: `fix: update course link to https and refresh 2026 goals`

## Pre-PR check

Run `npm run lint` (if configured) and visually preview README in both light and dark GitHub themes.
