# Task 14.3: Column Baseline Symmetry & Complementary Experience Condensation

**Parent Phase:** [Phase 14: Editorial Balance, Contact Architecture & Symmetrical Bottom Rhythm](index.md)  
**Status:** Planned  

---

## 1. Intent & Scope
Harmonize the bottom of both columns so they terminate at the exact same horizontal baseline, leaving a clean, balanced margin at the bottom of the A4 page without spillover or uneven emptiness.

---

## 2. Implementation Steps
1. In `src/data/cv-data.ts`:
   - Condense `clases-tenis` to 1 focused bullet highlighting technical planning, communication, and adaptability:
     ```ts
     bullets: [
       "Planificación técnica individualizada, comunicación asertiva y pedagogía adaptada a diferentes perfiles.",
     ],
     ```
   - Condense `hosteleria` to 1 focused bullet highlighting high-demand service and pressure management:
     ```ts
     bullets: [
       "Atención ágil en picos de alta demanda, trabajo en equipo bajo presión y resolución rápida de incidencias.",
     ],
     ```
2. Calibrate vertical rhythm in `src/pages/cv.astro`:
   - Adjust `space-y-*` or side column density so that the left column (terminating at *Hostelería Local*) aligns horizontally with the right column (terminating at *Idiomas & Movilidad*).
   - If needed for perfect baseline parity, activate `prompt-engineering-genai` under `certificates` or fine-tune card margins.
3. Verify with `npm run build`:
   - Confirm all 7 PDFs in `public/cv/` and `dist/cv/` compile cleanly in 1 single page with zero overflow.
   - Confirm symmetrical bottom margins.

---

## 3. Verification Criteria
- Left and right columns end at the same horizontal baseline.
- Exactly 1 single page A4 PDF generated across all palettes.
- `npm run check && npm run build` completes with 0 errors.
