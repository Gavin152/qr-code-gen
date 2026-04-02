---
phase: 03-design-social
plan: 02
subsystem: ui
tags: [css-custom-properties, dark-mode, two-column-layout, social-links, indigo-accent, sticky-preview]

# Dependency graph
requires:
  - phase: 03-01
    provides: CSS token system, dark/light toggle, FOUC fix
provides:
  - Real dark palette (zinc-based) replacing placeholder tokens
  - Indigo accent (#4f46e5 light / #818cf8 dark)
  - Two-column CSS grid layout at >=768px (form-col left, preview-col sticky right)
  - Ko-fi + GitHub social links as fixed sidebar (desktop) and fixed footer bar (mobile)
  - .app-header flex row wrapping h1 + theme toggle (no more absolute positioning)
  - Input focus ring: indigo border + color-mix shadow halo
affects: [04-testing]

# Tech tracking
tech-stack:
  added: []
  patterns: [CSS grid two-column, position:sticky preview, position:fixed social sidebar/footer, inline SVG icons]

key-files:
  created: []
  modified: [styles.css, index.html]

key-decisions:
  - "Social sidebar is position:fixed right edge, desktop only — no layout impact on main content"
  - "Social footer is position:fixed bottom, mobile only — body gets padding-bottom to avoid overlap"
  - "body gets padding-right on desktop to prevent content overlap with sidebar"
  - "preview-col uses position:sticky top:2rem so QR stays visible while scrolling form"
  - "theme-toggle moved into .app-header as flex item — position:relative removed from .app"
  - "No external fonts or icon libraries — inline SVGs for Ko-fi heart and GitHub mark"
  - "Dark accent is #818cf8 (Indigo 400) — lighter than light-mode accent for contrast on dark surfaces"

requirements-completed: [DESIGN-01, DESIGN-02, SOCIAL-01, SOCIAL-02, SOCIAL-03, SOCIAL-04]

# Metrics
duration: ~20min
completed: 2026-04-02
---

# Phase 3 Plan 02: Design Overhaul Summary

**Real dark palette, indigo accent, two-column desktop layout, Ko-fi + GitHub social links**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-04-02
- **Tasks:** 3 (2 auto + 1 human-verify)
- **Files modified:** 2 (styles.css, index.html)

## Accomplishments

- All four token blocks (`:root`, `@media prefers-color-scheme: dark`, `[data-theme="light"]`, `[data-theme="dark"]`) updated with intentional values — dark mode now uses zinc-900/800/700 surfaces, zinc-400/500 text, and lighter indigo accent (#818cf8) for proper contrast
- Indigo accent (#4f46e5) replaces the previous black accent throughout: active tabs, active format buttons, download button, focus rings
- Input focus ring upgraded to indigo border + `color-mix` shadow halo (3px, 15% opacity)
- `.app-header` flex row introduced — h1 and theme toggle sit side by side; `position: absolute` removed from `.theme-toggle` and `position: relative` removed from `.app`
- Two-column CSS grid layout at >=768px: `form-col` left, `preview-col` right with `position: sticky`; header spans full width via `grid-template-areas`
- `body` gains `padding-right: calc(56px + 1rem)` on desktop and `padding-bottom: 56px` on mobile to prevent social overlays from obscuring content
- Ko-fi and GitHub social links added as `<aside class="social-sidebar">` (fixed right edge, desktop only) and `<footer class="social-footer">` (fixed bottom bar with text labels, mobile only); inline SVGs, no external icon library
- All existing IDs (`theme-toggle`, `url-input`, `wifi-ssid`, `wifi-password`, `wifi-security`, `dot-style`, `corner-style`, `fg-color`, `bg-color`, `logo-input`, `logo-name`, `logo-clear`, `logo-size-field`, `logo-size-val`, `logo-size`, `qr-canvas`, `fmt-png`, `fmt-svg`), `onclick` attributes, and the FOUC-fix `<script>` in `<head>` preserved unchanged

## Files Modified

- `styles.css` — Updated all four token blocks; removed absolute toggle positioning; added `.app-header`, input focus ring, two-column grid, social sidebar, and social footer styles
- `index.html` — Wrapped h1 + toggle in `<header class="app-header">`; wrapped form controls in `<div class="form-col">`; wrapped preview + download in `<div class="preview-col">`; added `<aside class="social-sidebar">` before `.app` and `<footer class="social-footer">` after `.app`

## Decisions Made

- Social sidebar uses `position: fixed` rather than grid placement — keeps it out of the document flow entirely and works regardless of content height
- `color-mix(in srgb, ...)` for focus shadow — no extra custom property needed, native CSS
- Both sidebar and footer use `display: none` by default with media queries enabling them at their respective breakpoints — clean progressive enhancement

## Next Phase Readiness

- All UI infrastructure complete for 03-design-social phase
- App functionality is fully preserved — app.js untouched
- Ready for 04-testing

---
*Phase: 03-design-social*
*Completed: 2026-04-02*
