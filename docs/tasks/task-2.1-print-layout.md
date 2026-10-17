# Task 2.1: Create Print Layout (PrintLayout.astro)

## Objective
Create `src/layouts/PrintLayout.astro` specialized for paper and PDF export with millimetric A4 sizing, white background, and print CSS rules.

## Context & Architecture
- **Location:** `src/layouts/PrintLayout.astro`
- **Target Format:** Standard ISO A4 (210mm x 297mm).
- **Styling:** Swiss minimalist design (pure white background, zinc typography, no dark mode styles).

## Detailed Requirements
1. **HTML Shell:**
   - Standard HTML5 structure with `<html lang="es">`.
   - Title: Dynamic or defaulting to `cvData.personal.name - Curriculum Vitae`.
2. **Page Styles:**
   ```css
   @page {
     size: A4 portrait;
     margin: 10mm 12mm;
   }
   ```
3. **Print-Color-Adjust:**
   - Ensure print color adjustment is set to `exact` to preserve background colors and badge borders.
4. **Layout Wrapper:**
   - Max width matching A4 printable boundaries (`max-w-[210mm] mx-auto p-0`).

## Acceptance Criteria
- [ ] Layout compiles without errors in `astro check`.
- [ ] Pure white canvas with high-contrast text (`text-zinc-900`).
