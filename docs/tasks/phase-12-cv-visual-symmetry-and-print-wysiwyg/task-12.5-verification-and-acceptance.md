# Task 12.5: Build, Headless PDF & Multi-Browser Print Verification

**Status:** Completed  
**Phase:** 12  
**Components:** CI/Build, Playwright / Headless Print Validation

## Context & Acceptance Criteria
The ultimate goal defined by the user is:
1. The CV on the web page (`/cv`) must look visually balanced in A4 format, properly utilizing the space without one column being substantially longer than the other.
2. When printed or downloaded to PDF via the browser's print dialog, it must look **identical** to the on-screen representation (2 columns, identical typography and badge placement) and fit strictly on **1 single page** with 0 page spillover.

## Verification Checklist
- [x] **Type & Syntax Check:** Run `npm run check` and verify 0 errors, 0 warnings.
- [x] **Production Build:** Run `npm run build` and ensure successful static compilation to `/dist`.
- [x] **On-screen Visual Audit:** In desktop browser, verify that Left Column (Tech Exp, Projects, Other Exp) and Right Column (Skills, Education, Certs, Languages/Mobility) end on virtually the same horizontal baseline (85.2% vs 89.9%).
- [x] **Print Emulation Check:** In browser DevTools ("Emulate CSS media type: print"), verify that the layout retains the 2-column grid and does NOT collapse to 1 column.
- [x] **Physical / PDF Print Export:** Trigger `window.print()` / "Guardar como PDF". Confirm:
  - Exact total page count: **1 of 1** (zero 2nd page).
  - Two columns preserved faithfully.
  - Colors and accents rendered via `print-color-adjust: exact`.
  - No broken text or orphan headings.
