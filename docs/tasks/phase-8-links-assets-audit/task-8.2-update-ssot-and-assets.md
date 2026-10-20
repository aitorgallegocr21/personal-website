# Task 8.2: Update SSOT Data & Image Assets Integration

**Status:** Pending
**Branch:** `feat/phase-8-links-assets-audit`

## Context
Once the verified manifest or user input is provided, the data must be merged directly into the Single Source of Truth (`src/data/cv-data.ts`) according to the schema defined in `src/types/resume.ts`.

## Requirements
1. Update `personal.github` and `personal.linkedin` in `src/data/cv-data.ts`.
2. Update all projects with their accurate `repoUrl`, `liveUrl`, and `image` paths.
3. If new project screenshots are provided, place them under `public/images/projects/` adhering to standard web formats (`.webp` or `.png`).
4. Ensure components (`ProjectsGrid.astro`, `Hero.astro`, `ContactSection.astro`, `Navbar.astro`, `Footer.astro`, `CVHeader.astro`, `CVProjects.astro`) render the updated data properly.

## Acceptance Criteria
- `src/data/cv-data.ts` contains 100% genuine and verified URLs.
- All referenced image files exist under `public/images/projects/`.
- No hardcoded links in `.astro` components.
