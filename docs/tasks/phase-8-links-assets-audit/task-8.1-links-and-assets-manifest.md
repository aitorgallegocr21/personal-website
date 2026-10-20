# Task 8.1: Audit and Template of External Links & Visual Assets

**Status:** Completed (2026-10-20)
**Branch:** `feat/phase-8-links-assets-audit`

## Context & Problem
Several links across the portfolio previously led to 404 errors or placeholders:
- Personal profile URLs: GitHub (`aitorgcr` vs actual account) and LinkedIn.
- Project links: Repository URLs for `music-engine`, `bookstack`, `portal-reservas`, and `portfolio-cv-ssot`.
- Project live demo URLs: Only the portfolio itself had a live URL configured; others were unlinked.
- Project preview graphics: Missing images for `music-engine` and `portfolio-cv-ssot` in `public/images/projects/`.

## Accomplished Work
1. Audited all URL endpoints using automated curl tests (HTTP 200 checks).
2. Generated staging manifest [`src/data/links-manifest.json`](file:///home/usumaniana/Documentos/Proyectos/personal-website/src/data/links-manifest.json).
3. Validated all endpoints:
   - GitHub profile: `https://github.com/aitorgallegocr21` (HTTP 200)
   - LinkedIn profile: `https://www.linkedin.com/in/aitor-gallego-casilda-romero-7260ba3a1`
   - Music Engine repo: `https://github.com/jorgefernandezmc-cpu/Music_Engine` (HTTP 200)
   - Bookstack repo: `https://github.com/aitorgallegocr21/bookstack` (HTTP 200)
   - Bookstack live demo: `https://aitorgallegocr21.github.io/bookstack/` (HTTP 200)
   - Reservas repo: `https://github.com/aitorgallegocr21/reservas_instalaciones` (HTTP 200)
   - Reservas live demo: `https://aitorgallegocr21.github.io/reservas_instalaciones/` (HTTP 200)
   - Portfolio repo: `https://github.com/aitorgallegocr21/personal-website` (HTTP 200)
   - Portfolio live demo: `https://aitorgallegocr21.github.io/personal-website` (HTTP 200)
4. Sanitized image paths to `/images/projects/...` for public web serving in Astro.

## Acceptance Criteria
- [x] Staging manifest created, populated with genuine URLs, and verified.
- [x] Every broken or missing link audited with verified HTTP 200 status.
