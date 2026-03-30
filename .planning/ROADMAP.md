# Milestone 1: v1 — Polished, Tested, Shareable

**Project:** QR Code Generator
**Defined:** 2026-03-30
**Granularity:** Coarse
**Coverage:** 21/21 v1 requirements mapped

---

## Phases

- [x] **Phase 1: Codebase Split** - Extract HTML/CSS/JS into separate files; all existing functionality preserved (completed 2026-03-30)
- [ ] **Phase 2: Persistence** - Save and restore QR settings across page loads via localStorage
- [ ] **Phase 3: Design & Social** - Polished minimal redesign, dark/light theme, Ko-fi + GitHub sidebar
- [ ] **Phase 4: Testing** - Unit tests for logic functions and Playwright E2E tests for key user flows

---

## Phase Details

### Phase 1: Codebase Split

**Goal:** The monolithic `index.html` is refactored into separate HTML, CSS, and JS files with no change in behavior.

**Delivers:**
- `index.html`, `styles.css`, and `app.js` exist as separate files
- All existing features work identically: URL QR generation, WiFi QR generation, dot/corner customization, color pickers, logo upload and size control, PNG and SVG download
- No regressions — manually verifiable by loading the refactored app in a browser

**Requirements:** STRUCT-01, STRUCT-02

**Canonical refs:**
- `.planning/codebase/STRUCTURE.md` — current file layout and section boundaries
- `.planning/codebase/ARCHITECTURE.md` — layer descriptions and function locations
- `index.html` — source of truth for all markup, styles, and logic to extract

**Plans:** 1/1 plans complete

Plans:
- [x] 01-01-PLAN.md — Extract CSS and JS into separate files; update index.html to link both

**UI hint**: yes

---

### Phase 2: Persistence

**Goal:** Users never lose their QR settings between page reloads — everything is saved automatically and restored on return.

**Delivers:**
- QR colors, dot style, corner style, and active tab are saved to localStorage as the user changes them
- Logo size setting is saved to localStorage
- On page load, all saved settings are restored and the QR code reflects them immediately
- The active tab (URL or WiFi) is restored correctly, so the user lands where they left off

**Requirements:** PERS-01, PERS-02, PERS-03, PERS-04

**Canonical refs:**
- `.planning/codebase/ARCHITECTURE.md` — state management globals (`logoDataUrl`, `activeTab`, `downloadFormat`) and the `update()` flow
- `.planning/codebase/STRUCTURE.md` — function locations (`getData`, `update`, tab switching, logo size listener)
- `app.js` (after Phase 1) — where localStorage read/write hooks attach

**Plans:** 1 plan

Plans:
- [ ] 02-01-PLAN.md — Implement localStorage save on change and restore on DOMContentLoaded

---

### Phase 3: Design & Social

**Goal:** The app looks intentional and polished, adapts to the user's system theme with a manual override, and exposes Ko-fi and GitHub links without cluttering the main interface.

**Delivers:**
- App respects `prefers-color-scheme`; dark and light modes are fully styled with no unstyled elements
- A theme toggle button lets users override the system preference; the choice persists across sessions
- The visual design uses refined typography, spacing, and component styling — no default browser-form aesthetic
- Ko-fi and GitHub links are always visible: in a sidebar on desktop (≥768px), collapsed to a footer bar on mobile (<768px)

**Requirements:** THEME-01, THEME-02, THEME-03, THEME-04, DESIGN-01, DESIGN-02, SOCIAL-01, SOCIAL-02, SOCIAL-03, SOCIAL-04

**Canonical refs:**
- `.planning/codebase/STRUCTURE.md` — CSS section layout inside `styles.css` (after Phase 1)
- `.planning/codebase/CONCERNS.md` — technical debt on global state and hard-coded DOM selectors to avoid worsening
- `styles.css` (after Phase 1) — file to extend with theme variables, dark/light rules, and sidebar/footer layout

**Plans:**
1. Implement CSS custom properties for theme tokens; add `prefers-color-scheme` media query and manual toggle with localStorage persistence
2. Redesign layout and component styling; add Ko-fi + GitHub sidebar (desktop) / footer (mobile)

**UI hint**: yes

---

### Phase 4: Testing

**Goal:** Core logic and critical user flows are covered by automated tests so regressions are caught before they ship.

**Delivers:**
- Unit tests pass for `getData()` in both URL and WiFi modes
- Unit tests pass for localStorage save and restore behavior
- Unit tests pass for format switching between PNG and SVG
- Playwright E2E tests verify: URL QR generation end-to-end, WiFi QR generation end-to-end, settings persisting after page reload, PNG download trigger, SVG download trigger

**Requirements:** TEST-01, TEST-02, TEST-03, TEST-04, TEST-05, TEST-06, TEST-07

**Canonical refs:**
- `.planning/codebase/ARCHITECTURE.md` — `getData()`, `update()`, `downloadQR()` function descriptions and line references
- `.planning/codebase/CONCERNS.md` — known edge cases (empty URL fallback, WiFi special chars, corrupt logo) to target with tests
- `.planning/PROJECT.md` — constraints: vanilla JS only, no framework, static files; test tooling must not require a build step to run the app itself
- `app.js` (after Phase 1) — logic file under test

**Plans:**
1. Configure a test runner (e.g., Vitest or native Node test runner) and write unit tests for `getData()`, localStorage helpers, and format switching
2. Configure Playwright and write E2E tests for URL flow, WiFi flow, persistence, and download triggers

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Codebase Split | 1/1 | Complete   | 2026-03-30 |
| 2. Persistence | 0/1 | Not started | - |
| 3. Design & Social | 0/2 | Not started | - |
| 4. Testing | 0/2 | Not started | - |

---

## Backlog (v2)

These items are out of scope for Milestone 1. Revisit after v1 ships.

### Hosting & Distribution

- **HOST-01** — Deploy to a stable public URL (GitHub Pages, Netlify, or Vercel)
- **HOST-02** — Configure a custom domain if desired

### Enhancements

- **ENH-01** — Additional QR content types: vCard, email, SMS, geo
- **ENH-02** — QR history — list of recently generated codes with their settings
- **ENH-03** — Share button — copy a URL that encodes current settings as query params

### Deferred Technical Concerns (from CONCERNS.md)

- Input debouncing (150-300ms) to reduce unnecessary QR redraws on keystrokes
- Subresource Integrity (SRI) hash on the `qr-code-styling` CDN script tag
- WiFi SSID/password special-character escaping (`;`, `:`, `"`, `\`)
- Logo file size validation and image resizing before base64 embedding
- Accessibility audit (ARIA, keyboard navigation)

---

*Roadmap defined: 2026-03-30*
*Last updated: 2026-03-30 after Phase 2 planning*
