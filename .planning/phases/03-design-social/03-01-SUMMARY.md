---
phase: 03-design-social
plan: 01
subsystem: ui
tags: [css-custom-properties, theming, dark-mode, localStorage, vanilla-js]

# Dependency graph
requires:
  - phase: 02-persistence
    provides: localStorage save/restore pattern (try/catch, single key per concern)
provides:
  - CSS custom property token system covering all colors in styles.css
  - prefers-color-scheme media query for automatic dark/light
  - html[data-theme] attribute overrides for manual control
  - Theme toggle button (☀/☾) positioned top-right of .app
  - localStorage persistence of theme preference under 'theme-preference' key
  - FOUC fix via inline <script> in <head> before stylesheet
affects: [03-02-design-social, 04-testing]

# Tech tracking
tech-stack:
  added: []
  patterns: [CSS custom properties on :root, data-theme attribute on <html>, FOUC fix inline script]

key-files:
  created: []
  modified: [styles.css, index.html, app.js]

key-decisions:
  - "Dark mode tokens are placeholder values (same as light) — 03-02 fills in intentional dark palette"
  - "Separate localStorage key 'theme-preference' from 'qr-settings' — keeps concerns isolated"
  - "FOUC fix is an inline <script> in <head> before <link> — runs synchronously before CSS is parsed"
  - "No data-theme attribute set when no saved preference — system preference governs via media query alone"

patterns-established:
  - "Theme token pattern: :root defines defaults, @media overrides for system, [data-theme] for manual"
  - "FOUC fix pattern: minimal inline script in <head> reads localStorage and sets attribute before stylesheet"

requirements-completed: [THEME-01, THEME-02, THEME-03, THEME-04]

# Metrics
duration: ~20min
completed: 2026-04-02
---

# Phase 3 Plan 01: Theme Infrastructure Summary

**CSS custom property token system, dark/light toggle with localStorage persistence, and FOUC fix**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-04-02
- **Tasks:** 4 (3 auto + 1 human-verify)
- **Files modified:** 3 (styles.css, index.html, app.js)

## Accomplishments

- All hard-coded color values in styles.css replaced with 9 CSS custom property tokens (`--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-accent`, `--color-accent-fg`, `--color-accent-hover`)
- Dark/light mode infrastructure in place: `@media (prefers-color-scheme: dark)` governs automatically, `html[data-theme]` attribute allows manual override
- Dark mode token values are placeholders (same as light) — 03-02 sets intentional dark palette
- Theme toggle button (☀/☾) added top-right of `.app`, wired to `toggleTheme()` in app.js
- Preference persisted to `localStorage` under `theme-preference` key (separate from `qr-settings`)
- FOUC fix: inline `<script>` in `<head>` before stylesheet applies saved `data-theme` before first paint
- Light mode appearance is visually identical to before

## Files Created/Modified

- `styles.css` — Added token definitions, dark/light override blocks, `.theme-toggle` styles; replaced all hard-coded colors with `var(--color-...)`
- `index.html` — Added FOUC-fix inline script before `<link>`, added toggle button as first child of `.app`
- `app.js` — Added `toggleTheme()` function, click listener, DOMContentLoaded icon init

## Decisions Made

- Dark mode tokens intentionally left as placeholders — visual dark palette is 03-02's job
- `theme-preference` key kept separate from `qr-settings` — each concern owns its own key
- FOUC fix is inline (not a separate file) — one less network request, simpler

## Next Phase Readiness

- 03-02 can implement the full visual redesign by changing token values only — no structural changes needed
- Dark mode will "just work" once 03-02 fills in real dark token values
- The `[data-theme]` toggle and persistence are already production-ready

---
*Phase: 03-design-social*
*Completed: 2026-04-02*
