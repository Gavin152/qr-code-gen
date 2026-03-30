---
phase: 1
slug: codebase-split
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | manual browser check (no build tooling) |
| **Config file** | none |
| **Quick run command** | `open index.html` (visual spot-check) |
| **Full suite command** | Load `index.html` in browser, exercise all features |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Verify file exists and `index.html` links are correct with `grep`
- **After every plan wave:** Load `index.html` in browser and confirm no regressions
- **Before `/gsd:verify-work`:** Full manual feature checklist must pass
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | STRUCT-01 | file-check | `test -f styles.css` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | STRUCT-01 | file-check | `test -f app.js` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | STRUCT-02 | grep | `grep 'href="styles.css"' index.html` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | STRUCT-02 | grep | `grep 'src="app.js"' index.html` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- None — no test framework needed. Verification is file-existence checks and grep commands.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| URL QR generation renders correctly | STRUCT-01 | Visual output, no automated renderer | Load `index.html`, enter URL, verify QR appears |
| WiFi QR generation renders correctly | STRUCT-01 | Visual output | Switch to WiFi tab, fill fields, verify QR appears |
| Dot/corner customization applies | STRUCT-01 | Visual styling | Change dot style, verify QR updates |
| Color pickers change QR colors | STRUCT-01 | Visual | Change foreground color, verify QR updates |
| Logo upload and size control | STRUCT-01 | File API interaction | Upload image, adjust size slider, verify logo in QR |
| PNG download works | STRUCT-01 | File download | Click PNG download, verify file saved |
| SVG download works | STRUCT-01 | File download | Click SVG download, verify file saved |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
