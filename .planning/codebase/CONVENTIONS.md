# CONVENTIONS

Code style, naming patterns, and conventions used in this codebase.

---

## Language & File Organization

- **Single HTML file** — All markup, styles, and JavaScript live in `index.html`. No separate `.css` or `.js` files.
- **Vanilla JavaScript** — No framework, no TypeScript. Plain ES6+ browser JS in an inline `<script>` block.
- **CSS** — Inline `<style>` block in `<head>`. No preprocessor, no CSS variables (uses literal hex values).

---

## Naming Conventions

### JavaScript
- **Variables** — camelCase: `logoDataUrl`, `activeTab`, `downloadFormat`, `logoSize`
- **Functions** — camelCase, verb-prefixed: `getData()`, `update()`, `clearLogo()`, `setFormat()`, `downloadQR()`
- **DOM element IDs** — kebab-case: `qr-canvas`, `url-input`, `wifi-ssid`, `wifi-password`, `logo-input`, `logo-name`, `logo-clear`, `logo-size`, `logo-size-field`, `fg-color`, `bg-color`, `fg-hex`, `bg-hex`, `fmt-png`, `fmt-svg`

### CSS Classes
- kebab-case throughout: `.app`, `.tabs`, `.tab`, `.panel`, `.field`, `.section-title`, `.row`, `.color-field`, `.color-hex`, `.logo-row`, `.logo-btn`, `.logo-clear`, `.logo-name`, `.preview`, `.download-row`, `.fmt-btn`, `.download-btn`
- State classes are single-word: `.active`

---

## Code Patterns

### Global State
Two module-level mutable variables manage shared state:
```js
let logoDataUrl = null;   // base64 data URL of uploaded logo, or null
let activeTab = 'url';    // current tab: 'url' | 'wifi'
```

### Central Update Function
All QR re-renders go through a single `update()` function in `index.html:368`. Every input event calls `update()` directly — no intermediate state management.

### Event Listener Pattern
Inline `onclick` attributes are used for buttons (e.g., `onclick="clearLogo()"`, `onclick="setFormat('png')"`). Programmatic `addEventListener` is used for inputs and the logo file input.

### DOM Access Pattern
Direct `document.getElementById()` calls throughout — no caching, no abstraction layer:
```js
document.getElementById('url-input').value.trim()
document.getElementById('logo-size-field').style.display = 'none'
```

### Data Construction
WiFi QR data is built via string template in `getData()` (`index.html:357`):
```js
`WIFI:T:${security};S:${ssid};P:${password};;`
```
No encoding or escaping is applied to the values.

---

## CSS Conventions

- **Reset** — Universal box-sizing reset + zero margin/padding: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- **Typography** — `system-ui, -apple-system, sans-serif` system font stack
- **Color palette** — Monochromatic: `#111`, `#222`, `#444`, `#555`, `#666`, `#888`, `#999`, `#aaa`, `#ddd`, `#e0e0e0`, `#f5f5f5`, `#fff`
- **Transitions** — Subtle: `0.15s` on `color`, `border-color`, `background`
- **Border radius** — Consistent `6px` on inputs/selects, `8px` on buttons and QR canvas
- **Labels** — Uppercase, letter-spaced, small font (`0.82rem`, `text-transform: uppercase`, `letter-spacing: 0.04em`)
- **Spacing** — `1rem` base unit, `1.5rem` for section gaps, `2rem` for large gaps

---

## Error Handling

- **None** — No try/catch, no error states, no user-facing error messages.
- Empty URL silently falls back to `'https://example.com'` (see `getData()`, `index.html:359`).
- Logo FileReader errors are unhandled.
- QRCodeStyling library errors are unhandled.

---

## Comments

- Sparse — HTML has section comments (`<!-- Tabs -->`, `<!-- URL Panel -->`, etc.) to delineate markup regions.
- No JS comments in the script block.
