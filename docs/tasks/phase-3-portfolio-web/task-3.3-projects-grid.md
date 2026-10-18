# Task 3.3: Create Projects Grid Component (ProjectsGrid.astro)

## Objective
Build `src/components/portfolio/ProjectsGrid.astro` displaying project showcase cards with Bento-grid layout, tech badges, and repository/demo links.

## Context & Design System
- **Location:** `src/components/portfolio/ProjectsGrid.astro`
- **Data Source:** `cvData.projects` from `@data/cv-data`.
- **Pattern:** Bento Grid Card pattern from `docs/DESIGN_SYSTEM.md`.

## Detailed Requirements
1. **Grid Layout:**
   - Responsive grid (`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6`).
2. **Card Content:**
   - Project title + summary.
   - Bullets highlighting architectural decisions and technical accomplishments.
   - Technology tags as monospace badges (`font-mono text-xs`).
   - Links to GitHub repo (`repoUrl`) and live demo (`liveUrl`) with micro-translation arrow animation on hover.
3. **Interactive Hover Effects:**
   - `hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl`.

## Acceptance Criteria
- [x] Renders all projects from `cvData.projects`.
- [x] Links open in new tabs with `rel="noopener noreferrer"`.
