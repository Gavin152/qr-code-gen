# Phase 1: Codebase Split - Research

**Researched:** 2026-03-30
**Domain:** Static HTML/CSS/JS file extraction (no build tooling)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| STRUCT-01 | HTML, CSS, and JavaScript are split into separate files (`index.html`, `styles.css`, `app.js`) | Exact extraction boundaries identified from `index.html`; link patterns documented |
| STRUCT-02 | All existing functionality works identically after the split | Execution-order dependency (CDN script before inline JS) and global-scope reliance documented; no behavioral changes needed |
</phase_requirements>

---

## Summary

Phase 1 is a mechanical extraction task: lift the inline `<style>` block from `index.html` lines 8–230 into `styles.css`, lift the inline `<script>` block from lines 338–456 into `app.js`, then update `index.html` to link both files with a `<link>` and `<script src>` tag respectively.

The application has no build process, no module system, and no bundler. All JavaScript runs in global scope and relies on the DOM being present when the script executes. The existing script tag is placed immediately before `</body>`, which means the DOM is available at execution time. This same placement must be preserved in `app.js`'s `<script src>` tag — placing it in `<head>` without `defer` would break initialization because `document.getElementById('qr-canvas')` is called synchronously at the top of the script block.

The CDN dependency (`qr-code-styling`) is loaded via a `<script src>` in `<head>`. This must remain in `<head>` and must come before `app.js` is loaded, because the JS immediately calls `new QRCodeStyling(...)` on script parse. The ordering constraint is: CDN script in `<head>` → `app.js` script before `</body>`.

**Primary recommendation:** Extract verbatim — do not refactor, reorganize, or rename anything. Move bytes, update link tags, verify in browser. Done.

---

## Standard Stack

### Core

| File | Purpose | Notes |
|------|---------|-------|
| `index.html` | Markup only after split | Retains `<link>` to `styles.css` and `<script src>` to `app.js` |
| `styles.css` | All CSS extracted from inline `<style>` block | Lines 8–230 of current `index.html` (content only, no `<style>` wrapper tags) |
| `app.js` | All JS extracted from inline `<script>` block | Lines 339–456 of current `index.html` (content only, no `<script>` wrapper tags) |

No new libraries, frameworks, or package installs required. This phase adds zero external dependencies.

**Installation:** None required.

---

## Architecture Patterns

### Resulting File Layout

```
qr-code-gen/
├── index.html      # Markup + <link rel="stylesheet"> + <script src>
├── styles.css      # Extracted CSS (verbatim from inline <style> block)
└── app.js          # Extracted JS (verbatim from inline <script> block)
```

### Pattern: Verbatim Extraction

**What:** Copy the inner content of `<style>...</style>` to `styles.css` and the inner content of `<script>...</script>` to `app.js`. Do not alter any identifiers, class names, function names, or logic.

**When to use:** Always, for this phase. The only goal is structural separation — not cleanup, not refactoring.

**Before (`index.html` head):**
```html
<head>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <style>
    /* ... all CSS ... */
  </style>
</head>
```

**After (`index.html` head):**
```html
<head>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
```

**Before (`index.html` body end):**
```html
  <script>
    /* ... all JS ... */
  </script>
</body>
```

**After (`index.html` body end):**
```html
  <script src="app.js"></script>
</body>
```

### Script Load Order is a Hard Constraint

The CDN script (`qr-code-styling`) MUST load before `app.js`. The current `index.html` achieves this because the CDN `<script>` is in `<head>` (blocking) and the inline script runs later. After the split, the same ordering is preserved:

1. `<script src="https://unpkg.com/qr-code-styling...">` in `<head>` — loads and executes first (blocking)
2. `<script src="app.js">` before `</body>` — loads and executes second, after DOM is built

If `app.js` were mistakenly placed in `<head>` without `defer`, it would fail because:
- `document.getElementById('qr-canvas')` at line 355 would return `null` (DOM not yet built)
- `new QRCodeStyling(...)` may also fail if the CDN script hasn't executed yet

### Anti-Patterns to Avoid

- **Placing `app.js` in `<head>` without `defer`:** The script references DOM elements at parse time. It must execute after the DOM exists — keep it before `</body>`.
- **Adding `type="module"` to `app.js`:** Module scripts are deferred by default and scoped, but `app.js` relies on global scope. Inline `onclick` handlers in HTML call `clearLogo()`, `setFormat()`, and `downloadQR()` directly. If the script is a module, those functions would not be globally accessible and the buttons would silently fail.
- **Changing anything beyond extraction:** This phase has zero tolerance for behavioral change. Any identifier rename, code reorganization, or logic cleanup is out of scope and introduces regression risk.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File linking | Custom script loader or dynamic import | Standard `<link rel="stylesheet">` and `<script src>` HTML attributes | Browser handles this natively; no tooling needed |
| CSS extraction | Regex or sed commands | Manual cut-and-paste, verified by line numbers | The content is 222 lines, well-defined boundaries, no templating |
| Regression testing | Automated test harness (that's Phase 4) | Open `index.html` in a browser and manually exercise all features | Tests are out of scope for Phase 1; manual verification is the stated acceptance criterion |

**Key insight:** No tooling is warranted for this phase. The codebase has no build step before the split, and no build step is needed after. The browser is the runtime; link tags are the mechanism.

---

## Common Pitfalls

### Pitfall 1: Inline Event Handler Globals

**What goes wrong:** After splitting to `app.js`, functions called by inline `onclick` attributes in HTML (`clearLogo`, `setFormat`, `downloadQR`) are not accessible and buttons stop working.

**Why it happens:** Adding `type="module"` to the script tag or wrapping code in an IIFE/block scopes functions away from `window`.

**How to avoid:** Do not add `type="module"`. Do not wrap the extracted code in any scope boundary. The extracted `app.js` content must remain at the top level of a classic (non-module) script.

**Warning signs:** Clicking "remove" on logo, clicking PNG/SVG format buttons, or clicking Download produces no response.

**Affected HTML attributes (lines to verify):**
- `onclick="document.getElementById('logo-input').click()"` — line 314
- `onclick="clearLogo()"` — line 317
- `onclick="setFormat('png')"` — line 332
- `onclick="setFormat('svg')"` — line 333
- `onclick="downloadQR()"` — line 334

### Pitfall 2: Script Execution Before DOM

**What goes wrong:** Moving `<script src="app.js">` into `<head>` causes `qrCode.append(document.getElementById('qr-canvas'))` to receive `null` and throws a runtime error; QR preview never renders.

**Why it happens:** `<head>` scripts execute before `<body>` is parsed.

**How to avoid:** Keep `<script src="app.js">` immediately before `</body>`, exactly where the original inline script was.

**Warning signs:** Blank preview area on page load; browser console shows `Cannot read properties of null`.

### Pitfall 3: CDN Script Loads After app.js

**What goes wrong:** If `<script src="app.js">` is placed before the CDN script, `QRCodeStyling` is undefined when `app.js` executes; `new QRCodeStyling(...)` throws a ReferenceError.

**Why it happens:** Script tags execute in document order.

**How to avoid:** CDN `<script>` in `<head>` always comes first; `app.js` `<script>` before `</body>` always comes second. This is the natural order when following the existing structure.

**Warning signs:** Browser console: `ReferenceError: QRCodeStyling is not defined`.

### Pitfall 4: Leaving Wrapper Tags in Extracted Files

**What goes wrong:** Copying `<style>...</style>` including the tags into `styles.css`, or `<script>...</script>` including the tags into `app.js`, produces invalid files.

**Why it happens:** Mechanical copy-paste including the delimiters.

**How to avoid:** Extract only the inner content. `styles.css` should start with `*, *::before, *::after {`; `app.js` should start with `let logoDataUrl = null;`.

---

## Code Examples

### Exact Extraction Boundaries

**`styles.css` — extract this content verbatim from `index.html`:**
```
Line 9  (start): *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
Line 230 (end):   .download-btn:hover { background: #333; }
```
The `<style>` open tag is line 8; the `</style>` close tag is line 231. Do not include either tag.

**`app.js` — extract this content verbatim from `index.html`:**
```
Line 339 (start): let logoDataUrl = null;
Line 456 (end):   });
```
The `<script>` open tag is line 338; the `</script>` close tag is line 457. Do not include either tag.

### Final `index.html` head section

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code Generator</title>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
```

### Final `index.html` body closing

```html
  </div>

  <script src="app.js"></script>
</body>
</html>
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| Inline `<style>` | External `<link rel="stylesheet">` | Browser caches external files; standard practice |
| Inline `<script>` | External `<script src>` | Same execution semantics when placed before `</body>` |

**No deprecated patterns are being introduced.** `<script src>` before `</body>` remains a valid and common pattern for projects without a build step. `defer` is an alternative for `<head>` placement but is not needed here since the DOM is already present at `</body>`.

---

## Open Questions

1. **Relative vs. root-relative paths for `href` and `src`**
   - What we know: App is opened directly as a local file (`file://` protocol) with no web server
   - What's unclear: Whether the app will eventually be served from a sub-path (relevant for future hosting phase)
   - Recommendation: Use bare relative paths (`href="styles.css"`, `src="app.js"`) — they work for both `file://` and root-level HTTP serving. If sub-path hosting is needed, that can be addressed in a future phase.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 1 is a code-only extraction with no external tools, CLIs, services, or runtimes beyond a browser. The CDN dependency already exists in `index.html` and is not being added or changed.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — Phase 4 establishes the test framework |
| Config file | none — Phase 4 |
| Quick run command | Open `index.html` in browser; exercise all controls |
| Full suite command | Same — manual verification only for Phase 1 |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| STRUCT-01 | `styles.css` and `app.js` exist; `index.html` links them | manual | — | ❌ Phase 4 scope |
| STRUCT-02 | All features work after split (tabs, QR preview, color pickers, logo, download) | manual smoke | — | ❌ Phase 4 scope |

**Manual verification checklist for STRUCT-02:**
- [ ] Page loads without console errors
- [ ] QR code renders in preview on load
- [ ] URL tab generates a QR code reflecting the URL input
- [ ] WiFi tab generates a QR code (switch tab, fill SSID/password, observe update)
- [ ] Dot shape and corner shape selects update the QR render
- [ ] Foreground and background color pickers update the QR render
- [ ] Logo upload places an image in the QR center
- [ ] Logo size slider changes the logo size
- [ ] "remove" button clears the logo
- [ ] PNG format button is active by default; Download triggers a `.png` file save
- [ ] SVG format button activates; Download triggers a `.svg` file save

### Sampling Rate

- **Per task commit:** Open `index.html` in browser, verify QR renders and one download works
- **Per wave merge:** Full manual checklist above
- **Phase gate:** All checklist items pass before marking STRUCT-02 complete

### Wave 0 Gaps

None — no test files or framework config are needed for Phase 1. Manual browser verification is the defined acceptance criterion. Test infrastructure is Phase 4 scope.

---

## Sources

### Primary (HIGH confidence)

- Direct read of `index.html` — all extraction boundaries, line numbers, and global function names verified from source
- Direct read of `.planning/codebase/STRUCTURE.md` — file layout and section boundaries confirmed
- Direct read of `.planning/codebase/ARCHITECTURE.md` — execution model, dependency order, and global state usage confirmed
- MDN Web Docs (knowledge): `<link rel="stylesheet">`, `<script src>` placement before `</body>`, `type="module"` scoping behavior — well-established browser standards, no recency risk

### Secondary (MEDIUM confidence)

- None required — the task is fully specified by direct source inspection

### Tertiary (LOW confidence)

- None

---

## Metadata

**Confidence breakdown:**
- Extraction boundaries: HIGH — verified by reading `index.html` directly with line numbers
- Script load order requirement: HIGH — fundamental browser behavior, verifiable from source structure
- Global scope / onclick dependency: HIGH — verified by reading inline `onclick` attributes in `index.html` lines 314–334
- Manual verification checklist: HIGH — derived directly from documented features in STRUCTURE.md and ARCHITECTURE.md

**Research date:** 2026-03-30
**Valid until:** N/A — this research describes a specific file's exact contents; it does not expire
