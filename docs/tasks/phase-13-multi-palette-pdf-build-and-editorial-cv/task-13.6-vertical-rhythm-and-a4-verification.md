# Task 13.6: Vertical Rhythm Calibration & Strict A4 Verification

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** In Progress  

---

## 1. Intent & Scope
Calibrate the vertical rhythm, card gaps, and padding of `src/pages/cv.astro` and its child components to harmoniously integrate the new content (tennis coaching, rectangular portrait, `CONTACTO` header, and optional interests) within exactly 1 single A4 page without spillover or artificial compression.

---

## 2. Implementation Steps
1. **Vertical Rhythm Tuning:**
   - Calibrate `space-y-*` classes in the left column (Tech Experience, Projects, Complementary Experience) and right column (Skills, Education, Certificates, Competencies).
   - Ensure the left column ends within 1-2 mm of the right column baseline.
2. **Optional Interests Assessment:**
   - Render the compact `Intereses & Disciplina` block under `CVCompetencies.astro` (or a dedicated component `CVInterests.astro`).
   - If the rendered height exceeds the A4 boundary (triggering a 2nd page in Chromium headless), suppress or condense the block so 1 single page is strictly respected.
3. **Full Build & Typecheck Verification:**
   - Execute `npm run check` (0 errors, 0 warnings).
   - Execute `npm run build` (successful compilation and PDF generation).
   - Inspect output PDFs in headless browser to confirm 1 single page with 0 orphan pages.

---

## 3. Verification Criteria
- Exported PDF contains exactly 1 page.
- Both columns terminate symmetrically.
- `npm run check && npm run build` completes with 0 errors.
