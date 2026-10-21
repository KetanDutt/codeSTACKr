# Accessibility

Profile READMEs are read by screen readers, keyboard users, and on GitHub Mobile. Follow these rules.

## Alt text

- Every `<img>` and `![alt](url)` must have meaningful alt:
  - Good: `alt="Visual Studio Code"`, `alt="Website"`, `alt="codeSTACKr's GitHub Stats"`
  - Bad: `alt="image"`, `alt="icon"`, `alt="website"` (lowercase/generic)
- Badge alt may be the badge label: `YouTube Channel Subscribers`

## SVGs

All `img/*.svg` now include:

```svg
<svg role="img" aria-label="YouTube" ...>
  <title>YouTube</title>
  ...
</svg>
```

- `role="img"` tells AT to treat as image, not group.
- `<title>` is fallback for SVG viewers.
- `aria-label` mirrors title for GFM contexts that propagate it.

Do not add `<script>`, event handlers, or `<foreignObject>` with HTML.

## Color & contrast

- **Badges**: use high-contrast palettes (`bg_color=09131B`, `title_color=ff652f`, etc.) already in stats card.
- **Icons**: Feather stroke icons use `black` on light and `white` on dark via paired assets + fragment. Do not use mid-grays that fail contrast in either theme.
- **Dark/light swap**: always provide both variants; GitHub respects `#gh-light-mode-only` / `#gh-dark-mode-only`. Missing one variant = invisible icon for half of viewers.

## Structure

- Use proper heading hierarchy — screen readers navigate by headings.
- Use `<details><summary>` for activity/stats so keyboard users can skip.
- Use real lists (`-`, `1.`) not manual dashes or emoji bullets.

## Links

- Link text must be descriptive: `[Cold Starts Kill AI Apps](https://…)` not `[here](https://…)`.
- Keep URLs `https` and fully qualified (no `youtube.com/codestackr` without `https://` — GitHub may not autolink consistently).
- Avoid link text that is only an emoji.

## Motion & media

- No autoplaying GIFs or videos in README. If you add a demo, use a static thumbnail link to YouTube.
- Emoji: max 1 per heading; avoid in link text.

## Testing

1. View README in both light/dark themes (GitHub profile → theme toggle).
2. Use browser's screen reader or axeDevTools to check alt coverage.
3. Validate with `npm run validate` — it checks for missing `alt=` on inline `<img>` tags.
