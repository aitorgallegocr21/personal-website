# Task 12.3: Print Engine Page Sizing & Anti-Overflow Constraint Fix

**Status:** Ready to Implement  
**Phase:** 12  
**Components:** `src/layouts/PrintLayout.astro`, `src/styles/global.css`

## Context & Diagnostic
In `src/layouts/PrintLayout.astro`:
```css
@page {
  size: A4 portrait;
  margin: 8mm 10mm;
}

@media print {
  html, body {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
  }
}
```
- When `@page` specifies `margin: 8mm 10mm`, the physical page dimensions are 210mm × 297mm, but the printable content box is `(210 - 20)mm × (297 - 16)mm = 190mm × 281mm`.
- Setting `height: 297mm !important` on `html, body` sets the body height to the full physical paper height (297mm) inside a printable box that only accommodates 281mm.
- This creates an inescapable 16mm overflow, forcing Chromium, Firefox, and Safari print engines to create a blank or fragmented Page 2.
- The orphaned text on page 2 in the user's PDF ("IDIOMAS & MOVILIDAD") resulted directly from this container overflow and single-column collapse.

## Specification & Architectural Plan
1. **Calibrate Print Heights in `PrintLayout.astro`:**
   In `@media print`:
   ```css
   @media print {
     html, body {
       width: 100% !important;
       height: auto !important;
       max-height: 100% !important;
       margin: 0 !important;
       padding: 0 !important;
       background: #ffffff !important;
       overflow: hidden !important;
       -webkit-print-color-adjust: exact;
       print-color-adjust: exact;
     }

     #cv-container {
       page-break-inside: avoid !important;
       break-inside: avoid !important;
     }
   }
   ```
2. **Page Box Margins:**
   - Keep `@page { size: A4 portrait; margin: 8mm 10mm; }` or test with `7mm 9mm` if slight breathing room is required.
   - Set `main` to `print:p-0 print:m-0 print:shadow-none print:w-full print:max-w-none`.

3. **Checklist:**
   - [ ] Replace `height: 297mm` with `height: auto` and `overflow: hidden` in `@media print`.
   - [ ] Apply `page-break-inside: avoid` / `break-inside: avoid` to the root CV container.
   - [ ] Verify zero extraneous page generation.
