# Phase 2: Persistence - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Save QR appearance settings (and a small set of content fields) to localStorage as the user changes them, and restore them fully on page load. Users never lose their setup between sessions.

</domain>

<decisions>
## Implementation Decisions

### What gets saved
- **D-01:** QR appearance settings saved on change: foreground color, background color, dot style, corner style, active tab (URL/WiFi), logo size — per PERS-01, PERS-02, PERS-04.
- **D-02:** Content fields: also save the URL input value and WiFi SSID + security type on change. Do NOT save the WiFi password — storing a password in localStorage is a security concern even for a client-only app.
- **D-03:** Logo image: save the base64 logo data alongside logo size. If the base64 string exceeds ~500KB, skip saving the image (save size only) and continue silently — no error shown to the user.
- **D-04:** Download format (PNG/SVG) is at Claude's discretion — not in requirements, but lightweight to save if the planner includes it.

### Restore behavior
- **D-05:** Restore all saved settings on `DOMContentLoaded`. The QR code must reflect restored settings immediately — trigger `update()` after applying saved values so the canvas reflects the restored state.
- **D-06:** Active tab restore must also toggle the correct panel visibility (same logic as the tab-click handler — switch `.active` classes on both `.tab` buttons and `.panel` divs).

### Error handling
- **D-07:** Claude's discretion — silent fallback if localStorage is unavailable (private browsing, quota exceeded). The app works normally; settings just aren't saved.

### Claude's Discretion
- localStorage key naming strategy (single JSON key vs per-setting keys)
- Download format persistence (lightweight, low-stakes)
- Silent error handling implementation detail

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### State management and update flow
- `.planning/codebase/ARCHITECTURE.md` — state management globals (`logoDataUrl`, `activeTab`, `downloadFormat`) and the `update()` data flow
- `.planning/codebase/STRUCTURE.md` — function locations (`getData`, `update`, tab switching, logo size listener) and where to hook new code

### Source file
- `app.js` — the file where all localStorage read/write hooks attach; contains all current event listeners and the `update()` function

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `update()` function (app.js:30) — called by every change event already; localStorage save can hook at the same callsite or inside `update()` itself
- Tab switching listener (app.js:49–58) — sets `activeTab` and calls `update()`; save hook fits here or in `update()`
- Logo upload handler (app.js:71–83) — sets `logoDataUrl`; save hook fits in `reader.onload` callback
- `clearLogo()` (app.js:85–92) — clears `logoDataUrl`; must also clear saved logo from localStorage

### Established Patterns
- All UI state flows through `update()` — reading DOM element values directly (no React/Vue state)
- Global variables: `logoDataUrl` (base64 string or null), `activeTab` (string), `downloadFormat` (string)
- Event listeners use `addEventListener('input', ...)` for text/range inputs and `addEventListener('change', ...)` for selects

### Integration Points
- Save: hook into existing event listeners (or at the top of `update()` for appearance settings)
- Restore: `DOMContentLoaded` event — set DOM element `.value` properties, set global variables, toggle tab/panel classes, then call `update()`
- Logo restore: set `logoDataUrl`, show `#logo-name` and `#logo-clear`, show `#logo-size-field`, then call `update()`

</code_context>

<specifics>
## Specific Ideas

- WiFi password is deliberately excluded from persistence — security concern even client-side
- Logo save has a 500KB size cap — exceed it, save size only, no error shown

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-persistence*
*Context gathered: 2026-03-30*
