# Task 3.2: Create Hero Section Component (Hero.astro)

## Objective
Create `src/components/portfolio/Hero.astro` featuring candidate introduction, availability badge, full biographical narrative, and contact action buttons.

## Context & Design System
- **Location:** `src/components/portfolio/Hero.astro`
- **Data Source:** `cvData.personal` and `cvData.about` from `@data/cv-data`.
- **Patterns:** Availability pulsing indicator and "Copy Email" interaction from `docs/DESIGN_SYSTEM.md`.

## Detailed Requirements
1. **Status Badge:**
   - Pulsing green indicator (`Disponible para proyectos & prácticas` / `Available for work`).
2. **Typography Hierarchy:**
   - Name: `text-4xl sm:text-5xl font-extrabold tracking-tight text-white`.
   - Title: `text-xl font-medium text-zinc-300 mt-2`.
   - Biography: `cvData.about.fullBio` in `text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl`.
3. **Action Triggers:**
   - "Copy Email" button with instant feedback (`Copiado!`).
   - Link to printable CV (`/cv`) with primary accent styling.
   - Social links to GitHub and LinkedIn.

## Acceptance Criteria
- [ ] Uses only SSOT data.
- [ ] Includes working copy-to-clipboard functionality with zero third-party dependencies.
