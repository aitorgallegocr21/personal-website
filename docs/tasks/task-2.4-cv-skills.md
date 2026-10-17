# Task 2.4: Create CV Skills Component (CVSkills.astro)

## Objective
Build `src/components/cv/CVSkills.astro` to present technical skills grouped into compact, highly readable categories.

## Context & Design System
- **Location:** `src/components/cv/CVSkills.astro`
- **Data Source:** `cvData.skills` from `@data/cv-data`.
- **Target Scale:** Minimalist, dense layout suitable for print.

## Detailed Requirements
1. **Category Layout:**
   - Grid or definition list layout (`Backend`, `Frontend`, `Databases`, `Systems`).
   - Category title: `text-xs font-semibold uppercase tracking-wider text-zinc-900`.
2. **Skill Rendering:**
   - Comma-separated list or subtle inline badges (`text-[11px] text-zinc-700 font-sans`).
3. **Space Budget:**
   - Keep total height under 25mm to avoid pushing content onto page 2.

## Acceptance Criteria
- [ ] Renders all skill groups from `cvData.skills`.
- [ ] Responsive/fluid within A4 constraints.
- [ ] Zero TypeScript errors.
