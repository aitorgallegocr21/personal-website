# Task 10.4: A4 Physical Print Verification & PDF Consistency Check

**Status:** Completed (2026-10-20)
**Branch:** `feat/phase-10-cv-editorial-and-content-redesign`

## Context & Requirements
A printable CV is useless if it exceeds 1 page and forces an accidental 2nd page with 2 orphan lines.

1. **A4 Geometry Rigor:**
   - Standard A4 is 297mm high. With `@page { margin: 10mm 12mm; }`, total available height is ~277mm.
   - Test printed output in headless Chrome / print preview.
   - Ensure `break-inside-avoid` prevents any weird pagination splits.
2. **Zero Orphan Lines:**
   - Verify that all content comfortably fits within the 1-page boundary without reducing font sizes below readable thresholds (`text-xs` / `text-[11px]` min).
3. **Build Check:**
   - Run `npm run check` and `npm run build` to verify 0 errors.

## Acceptance Criteria
- [x] Clean 1-page A4 print export verified (tested via headless Chrome PDF export with exact 1-page output and zero orphan content).
- [x] 0 errors in `npm run build` (0 errors, 0 warnings, 0 hints across 29 files).
