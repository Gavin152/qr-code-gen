# QR Code Generator

## What This Is

A free, open-source QR code generator that runs entirely in the browser. Users can generate styled QR codes for URLs and WiFi credentials, customize appearance, add a logo, and download as PNG or SVG. No server, no signup, no tracking.

## Core Value

Generate and download a styled QR code in under 30 seconds, with zero friction.

## Requirements

### Validated

- ✓ URL QR code generation — existing
- ✓ WiFi QR code generation — existing
- ✓ Dot shape and corner shape customization — existing
- ✓ Foreground/background color pickers — existing
- ✓ Logo upload and size control — existing
- ✓ PNG and SVG download — existing

### Active

- [ ] Codebase split into HTML/CSS/JS files (structure, styles, logic separated)
- [ ] QR settings persisted to localStorage (colors, dot style, corner style, logo size, active tab)
- [ ] Polished minimal visual design with dark/light mode (system-aware + manual toggle)
- [ ] Ko-fi + GitHub integrated sidebar (collapses to footer on mobile)
- [ ] Unit tests for logic functions (getData, format switching, localStorage save/load)
- [ ] E2E tests for key user flows (Playwright)

### Out of Scope

- Saving the QR image itself to localStorage — too much storage, settings are sufficient
- User accounts / cloud sync — no server, keeping it static
- Backend / server-side rendering — static site only
- Mobile app — web only

## Context

Brownfield project. The entire app currently lives in `index.html` as a single file with inline styles and scripts. The `qr-code-styling` library (v1.6.0-rc.1) is loaded from unpkg CDN. No build tooling, no package manager, no tests.

Hosting destination is undecided — likely GitHub Pages, Netlify, or Vercel. The split into separate files and test setup should be hosting-agnostic (static files only).

## Constraints

- **Tech stack**: Vanilla JS only — no framework. The app is intentionally simple and dependency-light.
- **Hosting**: Static files only — no server, no build step required to run (though a dev server for local testing is fine)
- **Dependencies**: CDN-loaded libraries preferred over bundled — keep it simple to deploy

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Split HTML/CSS/JS as separate files | Separation of concerns, easier to test and maintain | — Pending |
| localStorage for settings persistence | No server needed, simple, survives page refresh | — Pending |
| System-aware dark/light theme + toggle | Respects user preference, manual override available | — Pending |
| Sidebar collapses to footer on mobile | Sidebar works on desktop, doesn't clutter mobile | — Pending |
| Playwright for E2E + unit tests for logic | DOM-heavy app benefits from real browser testing; pure logic deserves fast unit tests | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-30 after initialization*
