# Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening

**Status:** In Progress  
**Branch:** `feat/phase-13-multi-palette-pdf-build-and-editorial-cv`  
**Core Mission:** Transition from browser-dependent print dialogs to a deterministic, 1-click multi-palette precompiled PDF download engine, while modernizing the CV layout (rectangular portrait badge, CONTACTO section header, tennis coaching experience, balanced vertical rhythm, and print modal warnings).

---

## 1. Context & Architectural Motivation

### A. The Browser Print Engine Variance Problem
When relying exclusively on `window.print()`, different browsers (Chrome, Brave, Firefox), operating systems (Linux, Windows, macOS), and hardware setups (1080p vs. 2K with 125%/150% DPI display scaling) render printed PDFs inconsistently:
1. **Unloaded Fonts:** `PrintLayout.astro` lacks Google Fonts (`Inter` and `JetBrains Mono`) declarations, forcing browsers without local installs to use fallback system fonts with divergent glyph widths and line heights.
2. **Dialog-level Overrides:** User dialog margins (Default vs None), headers/footers, and background graphics checkboxes alter layout dimensions beyond CSS `@page` control.
3. **Privacy Shields:** Browsers like Brave enforce fingerprinting mitigations that can affect canvas and font metric precision.

### B. The Deterministic Solution: Headless Multi-Palette Build Engine
To achieve 100% WYSIWYG fidelity across every device in the world, the static build pipeline must precompile deterministic A4 PDFs for all supported color palettes (`emerald`, `slate`, `sky`, `violet`, `rose`, `monochrome`) via headless Chromium under strict laboratory conditions (fixed viewport, 0 margins, loaded fonts, exact color profile). 

The web UI then provides:
- **Primary Action (1-Click Download):** Instantly downloads the precompiled `.pdf` corresponding to the currently selected palette.
- **Secondary Action (Print with Modal Guard):** Warns the user that browser print settings may skew layout and recommends downloading the precompiled PDF instead, while still allowing them to proceed to `window.print()` if desired.

### C. Editorial Identity & Content Harmony
- **Rectangular Portrait:** Replace circular avatar with a structured rectangular portrait badge (~28mm × 35mm, `rounded-xl`), creating a modern architectural presence.
- **Header Structure:** Add a typographic `// CONTACTO` header above the contact info in the right column, incorporating a missing `Phone` icon for visual alignment.
- **Content Expansion:** Activate `clases-tenis` under complementary experience to highlight pedagogical initiative, soft skills, and client management.
- **Vertical Rhythm:** Calibrate spacing (`space-y-*`, paddings) to gracefully consume bottom whitespace without spilling onto a 2nd page.
- **Interests Exploration:** Model personal interests (competitive tennis & general literature/fiction) cleanly in SSOT and conditionally render only if zero overflow is strictly guaranteed.

---

## 2. Tasks Breakdown

- [x] **[13.1 Data Schema SSOT & Experience Refactoring](task-13.1-ssot-experience-and-interests.md)** — Activate `clases-tenis` (`featuredInCV: true`) with refined bullets, fix company/location whitespace concatenations, and model optional `interests` schema in `resume.ts`.
- [ ] **[13.2 Editorial Header & Contact Column Modernization](task-13.2-editorial-header-and-contact.md)** — Transform avatar into a rectangular portrait badge, integrate `// CONTACTO` uppercase header, add Phone icon to contact list, and tune `about.cvSummary`.
- [ ] **[13.3 Print Engine Hardening & Font Synchronization](task-13.3-print-engine-hardening-and-fonts.md)** — Import Google Fonts in `PrintLayout.astro`, lock `@page { margin: 0; }` with explicit mm containment, fix `localStorage` key to `portfolio-palette`, and eliminate FOUC.
- [ ] **[13.4 Dual-Action CV Print Bar & Layout Warning Modal](task-13.4-dual-action-bar-and-print-modal.md)** — Implement primary 1-click Download button tied to active palette, add secondary Print button, and create an accessible warning modal advising precompiled download.
- [ ] **[13.5 Multi-Palette Headless PDF Build Engine](task-13.5-multi-palette-pdf-build-engine.md)** — Create an automated build script (`scripts/generate-pdf.mjs`) to render and save deterministic A4 PDFs for all 6 palettes into `public/cv/` and `dist/cv/`, with CI integration.
- [ ] **[13.6 Vertical Rhythm Calibration & Strict A4 Verification](task-13.6-vertical-rhythm-and-a4-verification.md)** — Calibrate grid gap and vertical margins, verify 1-page A4 compliance across screen and print, test optional interests fit, and run full test suite (`npm run check && npm run build`).
