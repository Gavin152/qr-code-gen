# Requirements: QR Code Generator

**Defined:** 2026-03-30
**Core Value:** Generate and download a styled QR code in under 30 seconds, with zero friction.

## v1 Requirements

### Codebase Structure

- [x] **STRUCT-01**: HTML, CSS, and JavaScript are split into separate files (`index.html`, `styles.css`, `app.js`)
- [x] **STRUCT-02**: All existing functionality works identically after the split

### Persistence

- [x] **PERS-01**: QR settings (colors, dot style, corner style, active tab) are saved to localStorage on change
- [x] **PERS-02**: Logo size setting is saved to localStorage
- [x] **PERS-03**: Settings are restored from localStorage on page load
- [x] **PERS-04**: Active tab (URL/WiFi) is restored from localStorage

### Theme

- [ ] **THEME-01**: App respects system dark/light preference via `prefers-color-scheme`
- [ ] **THEME-02**: User can manually toggle dark/light mode via a button
- [ ] **THEME-03**: Manual toggle preference is saved to localStorage
- [ ] **THEME-04**: Dark and light themes are fully styled (no unstyled elements in either mode)

### Visual Design

- [ ] **DESIGN-01**: Polished minimal aesthetic — refined typography, spacing, and component styling
- [ ] **DESIGN-02**: Design looks intentional and crafted, not like a default browser form

### Community Sidebar

- [ ] **SOCIAL-01**: Ko-fi donation badge is visible in the UI at all times
- [ ] **SOCIAL-02**: GitHub repository link is visible in the UI at all times
- [ ] **SOCIAL-03**: Sidebar is displayed on desktop (≥768px)
- [ ] **SOCIAL-04**: Sidebar collapses to a footer bar on mobile (<768px)

### Testing

- [ ] **TEST-01**: Unit tests cover `getData()` for URL and WiFi modes
- [ ] **TEST-02**: Unit tests cover localStorage save and restore
- [ ] **TEST-03**: Unit tests cover format switching (PNG/SVG)
- [ ] **TEST-04**: E2E tests (Playwright) verify URL QR generation end-to-end
- [ ] **TEST-05**: E2E tests verify WiFi QR generation end-to-end
- [ ] **TEST-06**: E2E tests verify settings persist after page reload
- [ ] **TEST-07**: E2E tests verify PNG and SVG download triggers

## v2 Requirements

### Hosting & Distribution

- **HOST-01**: App is deployed and publicly accessible via a stable URL
- **HOST-02**: Custom domain configured (if desired)

### Enhancements

- **ENH-01**: Additional QR content types (vCard, email, SMS, geo)
- **ENH-02**: QR history — list of recently generated codes with their settings
- **ENH-03**: Share button — copy a URL that encodes current settings as query params

## Out of Scope

| Feature | Reason |
|---------|--------|
| Save QR image to localStorage | Storage size — base64 images are large; settings are sufficient |
| User accounts / cloud sync | No server; keeping it fully static |
| Backend / server-side rendering | Static site only by design |
| Mobile app | Web-only; responsive web is sufficient |
| Analytics / tracking | Privacy-respecting OSS tool |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRUCT-01 | Phase 1 | Complete |
| STRUCT-02 | Phase 1 | Complete |
| PERS-01 | Phase 2 | Complete |
| PERS-02 | Phase 2 | Complete |
| PERS-03 | Phase 2 | Complete |
| PERS-04 | Phase 2 | Complete |
| THEME-01 | Phase 3 | Pending |
| THEME-02 | Phase 3 | Pending |
| THEME-03 | Phase 3 | Pending |
| THEME-04 | Phase 3 | Pending |
| DESIGN-01 | Phase 3 | Pending |
| DESIGN-02 | Phase 3 | Pending |
| SOCIAL-01 | Phase 3 | Pending |
| SOCIAL-02 | Phase 3 | Pending |
| SOCIAL-03 | Phase 3 | Pending |
| SOCIAL-04 | Phase 3 | Pending |
| TEST-01 | Phase 4 | Pending |
| TEST-02 | Phase 4 | Pending |
| TEST-03 | Phase 4 | Pending |
| TEST-04 | Phase 4 | Pending |
| TEST-05 | Phase 4 | Pending |
| TEST-06 | Phase 4 | Pending |
| TEST-07 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-30*
*Last updated: 2026-03-30 after initial definition*
