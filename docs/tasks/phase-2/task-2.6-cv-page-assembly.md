# Task 2.6: Assemble CV Page & A4 Fit Verification (/cv)

## Objective
Assemble `src/pages/cv.astro` utilizing `PrintLayout`, `CVHeader`, `CVExperience`, `CVSkills`, and `CVCertificates`, ensuring the entire document fits into exactly 1 A4 page with zero orphan overflow.

## Context & Constraints
- **Location:** `src/pages/cv.astro`
- **Goal:** Strict 1-page A4 document for print/PDF export.
- **Verification:** Test layout and spacing in browser print preview.

## Detailed Requirements
1. **Component Assembly:**
   - Wraps sections in `PrintLayout`.
   - Structural order: `CVHeader` -> `CVExperience` -> `CVSkills` -> `CVCertificates` & `CVEducation`.
2. **Spacing & Margin Budgeting:**
   - Use strict compact spacing: `gap-3`, `py-1`, `mb-2`.
   - Section headers: `text-xs font-bold tracking-wider uppercase border-b border-zinc-200 pb-0.5 mb-2`.
3. **Overflow Guard:**
   - Height budget must not exceed 277mm (297mm minus 20mm margins).

## Acceptance Criteria
- [ ] Route `/cv` renders without errors.
- [ ] Document fits inside 1 single page in Chrome/Firefox Print Preview (`Ctrl + P`).
- [ ] `npm run build` generates `/cv/index.html` cleanly.
