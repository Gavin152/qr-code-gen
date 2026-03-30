# Architecture

**Analysis Date:** 2026-03-30

## Pattern Overview

**Overall:** Single-file monolithic application with inline embedded styling and JavaScript

**Key Characteristics:**
- Single HTML file containing markup, CSS, and JavaScript
- No build process or module bundling
- Direct CDN dependency for QR code generation library
- Immediate execution on page load
- Synchronous, event-driven interaction model

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Location: `index.html` (lines 8-230 CSS, lines 232-336 HTML)
- Contains: HTML markup, CSS styling, DOM elements
- Depends on: qr-code-styling library, browser DOM API
- Used by: JavaScript event handlers

**Business Logic Layer:**
- Purpose: Generate QR code data, manage application state, coordinate updates
- Location: `index.html` (lines 338-456 JavaScript)
- Contains: QRCodeStyling instance, state management, data generation
- Depends on: qr-code-styling library, presentation layer elements
- Used by: Event handlers, download mechanism

**External Library:**
- Purpose: Render styled QR codes to canvas/SVG
- Location: CDN-hosted `qr-code-styling` v1.6.0-rc.1
- Implements: QR code generation with styling options

## Data Flow

**Initialization:**

1. HTML document loads
2. qr-code-styling library loaded from CDN
3. QRCodeStyling instance created with default configuration (lines 342-353)
4. QR code canvas appended to DOM (line 355)

**User Interaction to QR Code Update:**

1. User changes input (URL, WiFi credentials, styling options)
2. Event listener triggers `update()` function (lines 368-384)
3. `getData()` retrieves current tab data (lines 357-366)
4. `qrCode.update()` merges new settings with existing configuration
5. qr-code-styling renders updated QR code to canvas
6. DOM reflects changes immediately

**Download Flow:**

1. User selects format (PNG or SVG)
2. User clicks download button
3. `downloadQR()` calls `qrCode.download()` with selected format
4. Browser triggers file download

**State Management:**
- Global variables: `logoDataUrl` (base64 image), `activeTab` (current mode), `downloadFormat` (output format)
- No external state manager; all state held in global scope
- Updates cascaded through `update()` function calls

## Key Abstractions

**Tab System:**
- Purpose: Switch between URL and WiFi QR code modes
- Examples: `index.html` lines 34-61 (CSS), lines 237-268 (HTML), lines 387-396 (JavaScript)
- Pattern: Toggle CSS classes on button click; update activeTab variable; render appropriate panel

**Styling Configuration:**
- Purpose: Manage QR code appearance (dots, corners, colors)
- Examples: `index.html` lines 270-323 (HTML form), lines 368-384 (configuration in update())
- Pattern: Form inputs bound to qrCode configuration object

**Logo Upload:**
- Purpose: Overlay image in QR code center
- Examples: `index.html` lines 311-323 (HTML), lines 409-435 (JavaScript)
- Pattern: FileReader API converts file to base64; stored in logoDataUrl; passed to qrCode.update()

**Download Format Toggle:**
- Purpose: Allow PNG or SVG export
- Examples: `index.html` lines 331-335 (HTML), lines 437-443 (JavaScript)
- Pattern: Toggle active class on format buttons; store selection in downloadFormat variable

## Entry Points

**Page Load:**
- Location: `index.html` head element (line 7)
- Triggers: Browser loads document
- Responsibilities: Load external library, define styles, initialize JavaScript on DOMContentLoaded (implicit)

**Initial Script Block:**
- Location: `index.html` lines 338-456
- Triggers: Parser reaches script tag during document load
- Responsibilities: Create QRCodeStyling instance, append to DOM, register event listeners

## Error Handling

**Strategy:** Minimal error handling; assumes successful CDN load and valid user input

**Patterns:**
- No explicit error handling for CDN load failures
- Fallback values used when inputs are empty (e.g., "https://example.com" for URL)
- No validation of WiFi password format or SSID content
- File upload assumes FileReader API availability (modern browsers only)

## Cross-Cutting Concerns

**Logging:** None; no logging framework used

**Validation:**
- URL input accepts any string, defaults to example URL if empty
- WiFi SSID accepts any string
- WiFi password accepts any string
- Security field limited to predefined options (WPA, WEP, None)
- Logo upload limited to image/* MIME types via accept attribute

**Authentication:** Not applicable; purely client-side application

---

*Architecture analysis: 2026-03-30*
