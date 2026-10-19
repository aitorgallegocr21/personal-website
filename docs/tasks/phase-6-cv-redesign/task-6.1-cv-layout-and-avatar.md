# Task 6.1: Modern A4 Layout & Avatar Integration

## Objective
Redesign the core A4 CV architecture in `src/pages/cv.astro` and `src/components/cv/CVHeader.astro` to feature a sophisticated, modern editorial layout with a dedicated circular/rounded portrait avatar frame.

## Context & Artifacts
- **Files:** `src/pages/cv.astro`, `src/components/cv/CVHeader.astro`, `src/layouts/PrintLayout.astro`
- **Asset:** `public/images/avatar.webp`

## Detailed Requirements
1. **Avatar Integration:**
   - Dedicated, print-crisp avatar frame in the header (24-28mm diameter) with subtle border.
   - Clean alignment with candidate name, professional title, and status.
2. **Editorial Balance:**
   - Structured header grouping personal data, role title, and contact metadata without vertical sprawl.
   - Preserved `@page` margin `10mm 12mm`.

## Acceptance Criteria
- [x] Avatar container renders crisply on both screen and physical print/PDF.
- [x] Header height remains compact (under 38mm total).
