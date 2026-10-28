# Task 16.4: A4 Print Calibration, Multi-Palette Build & Verification

**Status:** Pending  
**Objective:** Calibrate the final CV layout for exact 1-page A4 print compliance across all 6 color palettes, recompile static PDFs via headless Chromium, and verify zero regressions.

---

## 1. Print Engine Verification

1. **Height & Margin Checks:**
   - Verify `@page { size: A4; margin: 10mm 12mm; }`.
   - Ensure the new `CVPersonalProfile.astro` height matches or slightly undercuts the available vertical budget so that `@media print` does not trigger an accidental page 2.
2. **Headless Multi-Palette Recompilation:**
   - Run `npm run build` to trigger `scripts/generate-pdf.mjs`.
   - Compile:
     - `cv-aitor-gallego-emerald.pdf`
     - `cv-aitor-gallego-slate.pdf`
     - `cv-aitor-gallego-sky.pdf`
     - `cv-aitor-gallego-violet.pdf`
     - `cv-aitor-gallego-rose.pdf`
     - `cv-aitor-gallego-monochrome.pdf`
     - `cv-aitor-gallego.pdf` (canonical alias)
3. **Automated & Manual Inspection:**
   - Verify page counts of generated PDFs via `pdfinfo` or `pdftoppm` to confirm strictly 1 page each.

---

## 2. Documentation & Git Commit
- [ ] Mark tasks completed in `docs/tasks/phase-16-cv-personal-profile-and-structure/`.
- [ ] Update `docs/TASKS.md`.
- [ ] Synchronize `README.md` and `README.es.md`.
- [ ] Propose conventional git commit.
