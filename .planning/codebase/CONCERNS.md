# CONCERNS

Technical debt, known issues, security concerns, and fragile areas.

---

## Security

- **WiFi credentials in QR without sanitization** — SSID/password values are passed directly to QR generation with no escaping or validation. Special characters in SSID can break the meCard/WiFi URI format.
- **Unvalidated URL inputs** — URL field accepts any value including `javascript:` and `data:` URIs, which could embed malicious payloads in QR codes.
- **External CDN dependency without SRI** — `qrcode.js` loaded from CDN with no Subresource Integrity (SRI) hash. A compromised CDN could inject malicious code.
- **Logo file upload with no validation** — No file size limit, no MIME type enforcement. Large files or non-image files could cause silent failures or memory issues.

---

## Known Bugs / Edge Cases

- **Empty URL falls back silently** — When URL field is empty, the QR appears to generate successfully but encodes a fallback/example value. No visible error to user.
- **No error handling for corrupt logo files** — If a logo FileReader fails or produces invalid data, there is no error feedback — the QR simply renders without the logo.
- **WiFi SSID with special characters** — Characters like `;`, `:`, `"`, `\` can break the WiFi QR format string but are not escaped.

---

## Performance

- **No debouncing on input** — QR code regenerates synchronously on every keystroke. For complex inputs this causes unnecessary redraws. Consider 150-300ms debounce.
- **Logo images not resized before embedding** — Large images are embedded at full resolution as base64 data URLs, bloating memory and rendering cost.

---

## Technical Debt

- **All code in a single HTML file** (`index.html`) — Logic, styles, and markup are co-located with no separation of concerns. Difficult to test, extend, or maintain as complexity grows.
- **Global mutable state** — `logoDataUrl` and `activeTab` are module-level globals. No encapsulation; any function can mutate shared state unexpectedly.
- **Hard-coded DOM selectors throughout** — Functions reference element IDs and class names as strings scattered across the file. Renaming any element requires a grep-and-replace.
- **No build tooling or bundling** — No package manager, no bundler, no CI. Changes are manual and there is no automated quality gate.

---

## Fragile Areas

- **Single file architecture** — The entire application lives in `index.html`. Any future feature addition increases the cognitive load of the whole file.
- **QR library version unpinned** — CDN URL does not pin to a specific version, so library updates could silently change behavior.
- **Download filename is static** — Downloaded QR always named `qrcode.png`, regardless of content type (URL vs WiFi). Could confuse users managing multiple exports.

---

## Missing Infrastructure

- **No tests** — Zero test coverage. No framework configured.
- **No linting or formatting** — No ESLint, Prettier, or equivalent.
- **No error boundaries** — JavaScript errors in event handlers will silently fail with no user feedback.
- **No accessibility audit** — Tab inputs, buttons, and form fields have not been reviewed for ARIA or keyboard navigation compliance.
