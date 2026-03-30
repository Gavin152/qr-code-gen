# STRUCTURE

Directory layout, key file locations, and naming conventions.

---

## Directory Layout

```
qr-code-gen/
├── index.html          # Entire application — markup, styles, and JS in one file
├── README.md           # Project documentation
└── .planning/          # GSD planning artifacts (not part of app)
    └── codebase/       # Codebase map documents
```

No `src/`, `dist/`, `public/`, `assets/`, `lib/`, or `components/` directories exist. The app is a self-contained single file.

---

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Entire application. Contains HTML structure (lines 1–337), CSS styles (lines 8–230), and JavaScript logic (lines 338–456). |
| `README.md` | Project description and usage notes. |

---

## Inside `index.html`

The file has three logical sections:

### Markup (lines 1–336)
- `<head>` — charset, viewport, title, CDN script tag for `qr-code-styling`, inline `<style>` block
- `<body>` — `.app` wrapper containing: `<h1>`, tab buttons, URL panel, WiFi panel, styling controls, QR preview `<div id="qr-canvas">`, download controls

### Styles (lines 8–230)
Inline `<style>` in `<head>`. Organized into sections separated by comments:
- Reset
- Body/layout
- Tabs
- Panels
- Form fields
- Styling section controls
- Color pickers
- Logo upload
- Preview
- Download row

### JavaScript (lines 338–456)
Inline `<script>` before `</body>`. Organized as:
- Global state declarations (`logoDataUrl`, `activeTab`)
- `QRCodeStyling` instance initialization
- `getData()` — reads form state, returns QR data string
- `update()` — reads all controls, calls `qrCode.update()`
- Tab switching event listeners
- Color input event listeners
- Logo upload event listeners
- `clearLogo()` function
- Logo size range listener
- `downloadFormat` variable + `setFormat()` function
- `downloadQR()` function
- Bulk input event listeners for URL and WiFi fields

---

## Naming Conventions

- **File names** — lowercase with hyphens: `index.html`, `README.md`
- **HTML element IDs** — kebab-case: `qr-canvas`, `url-input`, `wifi-ssid`, `wifi-password`, `wifi-security`, `logo-input`, `logo-name`, `logo-clear`, `logo-size`, `logo-size-field`, `fg-color`, `bg-color`, `fg-hex`, `bg-hex`, `fmt-png`, `fmt-svg`
- **CSS classes** — kebab-case: `.tab`, `.panel`, `.field`, `.fmt-btn`, `.download-btn`, etc.
- **JS functions** — camelCase verbs: `getData`, `update`, `clearLogo`, `setFormat`, `downloadQR`

---

## Where to Add New Code

| Task | Location |
|------|---------|
| New QR content type (e.g., vCard, email) | Add tab button + panel in HTML; add branch in `getData()` in `index.html:357` |
| New styling control | Add field in the Styling section of HTML; read value in `update()` in `index.html:368` |
| New download format | Add `fmt-btn` in download row; add case in `setFormat()` in `index.html:439` |
| Global state | Add `let` variable near `logoDataUrl`/`activeTab` at `index.html:339` |
| CSS for new elements | Add to the inline `<style>` block in `<head>`, following existing section structure |

---

## External Dependencies

Loaded via CDN only — no local `node_modules` or vendor directory:
- `qr-code-styling@1.6.0-rc.1` from `https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js`
