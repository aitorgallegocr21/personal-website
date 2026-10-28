# Task 16.8: Final A4 Calibration, Multi-Palette Build & Phase 16 Verification

**Status:** Pending  
**Objective:** Calibrate the final CV layout for exact 1-page A4 print compliance across all 6 color palettes, recompile static PDFs via headless Chromium, and verify zero regressions.

---

## 1. Automated Verification & Build
- Run `npm run check` to verify 0 errors / 0 warnings across all Astro and TypeScript files.
- Run `npm run build` to compile the static application and trigger `scripts/generate-pdf.mjs`.
- Verify using `pdfinfo` that all 6 palettes (`emerald`, `slate`, `sky`, `violet`, `rose`, `monochrome`, canonical) measure exactly 1 page each.

---

## 2. Documentation & Roadmap Finalization
- Mark tasks completed in `docs/tasks/phase-16-cv-personal-profile-and-structure/`.
- Update `docs/TASKS.md` moving Phase 16 into Completed Phases.
- Synchronize `README.md` and `README.es.md`.
