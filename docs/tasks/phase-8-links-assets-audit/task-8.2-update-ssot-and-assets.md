# Task 8.2: Update SSOT Data & Image Assets Integration

**Status:** Completed (2026-10-20)
**Branch:** `feat/phase-8-links-assets-audit`

## Context
Once the verified manifest was confirmed and tested, the data had to be merged directly into the Single Source of Truth (`src/data/cv-data.ts`) according to the schema defined in `src/types/resume.ts`.

## Accomplished Work
1. Updated `personal.github` to `https://github.com/aitorgallegocr21` and `personal.linkedin` to `https://www.linkedin.com/in/aitor-gallego-casilda-romero-7260ba3a1` in `src/data/cv-data.ts`.
2. Updated all project objects:
   - `music-engine`: Updated title to "Music Engine — The Autonomous Musical Conveyor Belt" and repo to `https://github.com/jorgefernandezmc-cpu/Music_Engine`.
   - `bookstack`: Updated title, repository `https://github.com/aitorgallegocr21/bookstack`, live URL `https://aitorgallegocr21.github.io/bookstack/`, and verified preview image `/images/projects/bookstack.png`.
   - `portal-reservas`: Updated title to "Sistema de Gestión y Reservas - Argamasilla de Alba", repository `https://github.com/aitorgallegocr21/reservas_instalaciones`, live URL `https://aitorgallegocr21.github.io/reservas_instalaciones/`, and verified preview image `/images/projects/reservas_instalaciones.png`.
   - `portfolio-cv-ssot`: Updated title to "Portfolio & Automated Resume (SSOT)", repository `https://github.com/aitorgallegocr21/personal-website`, and live URL `https://aitorgallegocr21.github.io/personal-website`.
3. Verified that all components (`ProjectsGrid.astro`, `Hero.astro`, `ContactSection.astro`, `Navbar.astro`, `Footer.astro`, `CVHeader.astro`, `CVProjects.astro`) correctly reflect the new SSOT values.
4. Validated with `npm run check` and `npm run build` (0 errors).

## Acceptance Criteria
- [x] `src/data/cv-data.ts` contains 100% genuine and verified URLs.
- [x] All referenced image files exist under `public/images/projects/`.
- [x] No hardcoded links in `.astro` components.
- [x] Full static build passes without warnings or errors.
