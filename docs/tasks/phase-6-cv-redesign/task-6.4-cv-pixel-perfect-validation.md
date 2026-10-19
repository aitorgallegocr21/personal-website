# Task 6.4: Pixel-Perfect A4 Verification

## Objective
Perform strict mathematical layout verification to ensure the redesigned CV fits exactly into 1 single A4 page with zero vertical overflow, zero orphan text breaks, and flawless printing.

## Context & Artifacts
- **File:** `src/pages/cv.astro`
- **Standard:** Exactly 297mm height, 210mm width, with 10mm 12mm print margins.

## Detailed Requirements
1. **Vertical Budget Calculation:**
   - Content height + margins must not exceed 297mm under Chrome, Firefox, and Safari print engines.
2. **Page Break Guards:**
   - Ensure `break-inside-avoid` on every experience card, education block, and skill category.
3. **Automated Verification:**
   - Confirm `npm run build` succeeds with zero errors.

## Acceptance Criteria
- [x] Physical print preview (`Cmd+P` / `Ctrl+P`) renders on exactly 1 page.
- [x] No overflow into a second blank or truncated page.
