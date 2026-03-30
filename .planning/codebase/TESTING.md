# TESTING

Test infrastructure, coverage, and testing patterns.

---

## Current State

**No tests exist.** There is no test framework, no test files, no test scripts, and no CI configuration in this codebase.

- No `*.test.*` or `*.spec.*` files
- No `__tests__/` directory
- No `package.json` (no npm scripts, no test runner configured)
- No CI/CD configuration (no `.github/workflows/`, no `Makefile`)

---

## What Would Need Testing

Given the codebase structure (single `index.html` with inline JS), testing would require either:

1. **Browser-based E2E testing** (e.g., Playwright, Cypress) — most practical given the DOM-heavy logic
2. **Extracting logic to a module** and unit testing it (requires refactoring `getData()`, `update()` out of the inline script)

### Testable Units (if extracted)

| Function | What to Test |
|----------|-------------|
| `getData()` | Returns URL value when tab is `'url'`; returns correct WiFi string format; fallback to `https://example.com` on empty URL; special characters in SSID/password |
| `setFormat(fmt)` | Updates `downloadFormat`; toggles `.active` class on correct button |
| `clearLogo()` | Resets `logoDataUrl` to null; hides logo UI elements |
| WiFi string format | `WIFI:T:WPA;S:MyNet;P:pass;;` — correct delimiter escaping edge cases |

### E2E Scenarios

- User enters URL → QR canvas renders
- User switches to WiFi tab → QR updates to WiFi format
- User uploads logo → QR canvas shows embedded logo
- User removes logo → QR renders without logo
- User selects PNG/SVG format → download triggers with correct format
- Empty URL → QR shows fallback URL

---

## Recommended Setup (if adding tests)

**E2E (recommended for this architecture):**
- Playwright (`@playwright/test`) — best browser automation support
- Test file location: `tests/` directory
- Run against `index.html` served locally (e.g., `npx serve .`)

**Unit (requires refactor):**
- Vitest or Jest
- Extract JS logic from `<script>` block into `src/qr.js`
- Import and test pure functions

---

## Coverage Gaps

- No validation logic exists to test (inputs are passed through unvalidated)
- No error paths exist to test (no error handling is implemented)
- QR rendering correctness can only be tested visually or via pixel/DOM snapshot
