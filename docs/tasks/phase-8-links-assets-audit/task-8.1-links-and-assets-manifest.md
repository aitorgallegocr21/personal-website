# Task 8.1: Audit and Template of External Links & Visual Assets

**Status:** In Progress
**Branch:** `feat/phase-8-links-assets-audit`

## Context & Problem
Several links across the portfolio currently lead to 404 errors or placeholders:
- Personal profile URLs: GitHub (`aitorgcr` vs actual account) and LinkedIn.
- Project links: Repository URLs for `music-engine`, `bookstack`, `portal-reservas`, and `portfolio-cv-ssot`.
- Project live demo URLs: Only the portfolio itself has a live URL configured; others might be missing or need clarification.
- Project preview graphics: Missing images for `music-engine` and `portfolio-cv-ssot` in `public/images/projects/`.

## Requirements
1. Audit all link occurrences in `src/data/cv-data.ts`.
2. Generate an editable manifest file `src/data/links-manifest.json` (or review checklist) specifying:
   - Personal GitHub profile URL.
   - Personal LinkedIn profile URL.
   - For each project:
     - Title & ID
     - Repository URL (`repoUrl`)
     - Live demo URL (`liveUrl`, optional)
     - Screenshot/Preview image path (`image`, optional)
3. Allow the user to input the authentic URLs and provide the image assets.

## Acceptance Criteria
- Staging manifest created and presented to the user.
- Every broken or missing link identified with its current status.
