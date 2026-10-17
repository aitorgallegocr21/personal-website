# Phase 2: Print Engine & CV View (/cv)

**Status:** Active (In Progress)

## Objective
Build a pixel-perfect, printable A4 CV view (`/cv`) strictly driven by `cvData`, fitting on exactly 1 A4 page with zero vertical overflow, clean typographic hierarchy, and print-ready utility controls.

## Tasks
- [ ] [2.1 Create print layout](task-2.1-print-layout.md) in `src/layouts/PrintLayout.astro`.
- [ ] [2.2 Create CV Header component](task-2.2-cv-header.md) in `src/components/cv/CVHeader.astro`.
- [ ] [2.3 Create CV Experience component](task-2.3-cv-experience.md) with `break-inside-avoid`.
- [ ] [2.4 Create CV Skills component](task-2.4-cv-skills.md) with compact categories.
- [ ] [2.5 Create CV Certificates component](task-2.5-cv-certificates.md) for verified training.
- [ ] [2.6 Assemble CV page & verify 1 A4 page fit](task-2.6-cv-page-assembly.md) in `src/pages/cv.astro`.
- [ ] [2.7 Add floating utility toolbar with print trigger](task-2.7-cv-print-toolbar.md) with `print:hidden`.
