# External Integrations

**Analysis Date:** 2026-03-30

## APIs & External Services

**QR Code Generation:**
- qr-code-styling library v1.6.0-rc.1
  - SDK/Client: CDN-loaded JavaScript library
  - Source: `https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js`
  - Usage: Generates styled QR codes with customizable dots, corners, and colors
  - No authentication required

## Data Storage

**Databases:**
- Not used - application is fully client-side

**File Storage:**
- Local filesystem only
  - User can upload image files for logo overlay via file input (`#logo-input` in `index.html`)
  - Files read using FileReader API and converted to data URLs
  - No server-side storage
  - Files remain in browser memory only

**Caching:**
- None - application loads qr-code-styling from CDN on every page load
- Browsers will cache the CDN-loaded library based on cache headers

## Authentication & Identity

**Auth Provider:**
- Not used - application has no authentication

**Access Control:**
- Not used - all features available to all users

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Console logging only via standard `console` methods if implemented
- No external logging service

**Analytics:**
- Not detected

## CI/CD & Deployment

**Hosting:**
- Static file hosting required
- Can be deployed to any static file server or CDN:
  - GitHub Pages
  - Vercel
  - Netlify
  - AWS S3 + CloudFront
  - Any web server serving HTML files

**CI Pipeline:**
- Not used - no build step required
- Manual deployment only (copy `index.html` and `README.md` to hosting)

## Environment Configuration

**Required env vars:**
- None - application requires no environment variables

**Secrets location:**
- Not applicable - no secrets used

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Browser APIs Used

**File Operations:**
- FileReader API - Reading uploaded image files for logo overlay
- Canvas/SVG APIs - Rendering QR codes

**Data Exchange:**
- HTML5 download mechanism - Using `download` attribute and blob URLs

**Storage:**
- localStorage - Not currently used but available for future enhancements

## Content Security Considerations

**Cross-Origin:**
- qr-code-styling library loaded from unpkg CDN
- Image overlay supports `crossOrigin: 'anonymous'` for CORS handling (set in `index.html` line 351)

**No Server Communication:**
- Application does not make any HTTP requests
- Except for loading the qr-code-styling library from CDN at page load

---

*Integration audit: 2026-03-30*
