# Task 12.2: Dual-Mode Multi-Column Grid Architecture (Web & Print Parity)

**Status:** Ready to Implement  
**Phase:** 12  
**Components:** `src/pages/cv.astro`, `src/styles/global.css`

## Context & Diagnostic
In `src/pages/cv.astro`, the grid was declared as:
```html
<div class="cv-editorial-grid grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
  <div class="md:col-span-7 space-y-3.5 print:space-y-2.5">
  ...
  <div class="md:col-span-5 space-y-3.5 print:space-y-2.5">
```
- Print page width for A4 with margins (210mm - 20mm = 190mm) corresponds to ~718px in CSS pixels at standard 96 DPI.
- Tailwind's `md:` breakpoint applies only to `@media (min-width: 768px)`.
- When the browser or PDF generator enters print mode, 718px is below 768px, so `md:grid-cols-12`, `md:col-span-7`, and `md:col-span-5` are ignored by the CSS parser.
- As a consequence, the print view degrades into `grid-cols-1` (single stacked column), completely breaking WYSIWYG parity with the on-screen presentation and doubling page height.

## Specification & Architectural Plan
1. **Explicit Print Multi-Column Classes:**
   Update the container and column wrappers in `src/pages/cv.astro`:
   ```html
   <div class="cv-editorial-grid grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 print:gap-4 items-start">
     <!-- Left Column (7 cols): Tech Exp, Projects, Complementary Exp -->
     <div class="md:col-span-7 print:col-span-7 space-y-3.5 print:space-y-2.5">
       ...
     </div>

     <!-- Right Column (5 cols): Skills, Education, Certificates, Competencies -->
     <div class="md:col-span-5 print:col-span-5 space-y-3.5 print:space-y-2.5">
       ...
     </div>
   </div>
   ```

2. **A4 Sheet Simulation on Desktop:**
   Ensure on screen (inside the fixed `w-[210mm]` container) the grid always maintains its 2-column structure even if container queries or browser zoom changes.

3. **Checklist:**
   - [ ] Add `print:grid-cols-12` and `print:gap-4` to `.cv-editorial-grid`.
   - [ ] Add `print:col-span-7` to the left column.
   - [ ] Add `print:col-span-5` to the right column.
   - [ ] Ensure `print:space-y-2.5` or `print:space-y-2` gives adequate vertical rhythm.
