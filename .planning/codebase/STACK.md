# Technology Stack

**Analysis Date:** 2026-03-30

## Languages

**Primary:**
- HTML5 - Markup and application structure
- JavaScript (ES2015+) - Application logic, interactivity, and QR code generation

**CSS:**
- CSS3 - Styling and responsive design

## Runtime

**Environment:**
- Browser-based (no server runtime)
- Supported browsers: Modern browsers with HTML5, CSS3, and ES2015 support

**Deployment:**
- Static file serving only
- No build step required
- No package manager or dependencies to install

## Frameworks & Libraries

**Core:**
- qr-code-styling v1.6.0-rc.1 - QR code generation and styling
  - Source: CDN (unpkg)
  - URL: `https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js`

## Key Dependencies

**Critical:**
- qr-code-styling v1.6.0-rc.1 - Only external dependency
  - Handles QR code generation with canvas/SVG rendering
  - Supports styling customization (dots, corners, colors)
  - Enables image overlay functionality
  - Provides download capabilities for PNG and SVG formats

## Configuration

**Environment:**
- No environment variables required
- No configuration files needed
- Fully self-contained in `index.html`

**Build:**
- No build step required
- No build configuration files present
- Open `index.html` directly in browser

## Platform Requirements

**Development:**
- Any modern web browser
- No development server required
- Can be edited in any text editor
- No build tools or Node.js required

**Production:**
- Static web server capable of serving HTML
- HTTPS recommended for production use
- No server-side processing required
- CDN access for qr-code-styling library (unpkg)

## How the App Works

**Architecture:**
- Single HTML file (`index.html`) containing all HTML, CSS, and JavaScript
- Loads qr-code-styling library from CDN on page load
- Client-side only - all processing happens in the browser
- No network communication except for loading the external library

**QR Code Generation:**
- Uses qr-code-styling library instantiated with `new QRCodeStyling()`
- Renders to canvas element by default
- Can export to PNG or SVG format
- Error correction level set to 'H' (high)

---

*Stack analysis: 2026-03-30*
