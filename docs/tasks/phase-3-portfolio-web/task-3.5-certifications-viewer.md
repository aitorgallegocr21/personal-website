# Task 3.5: Create Interactive Certifications Viewer

## Objective
Build `src/components/portfolio/Certifications.astro` providing a categorised viewer of technical certifications and awards.

## Context & SSOT
- **Location:** `src/components/portfolio/Certifications.astro`
- **Data Source:** `cvData.certificates` from `@data/cv-data`.
- **Categories:** Backend, Frontend, Databases, AI, Systems.

## Detailed Requirements
1. **Filter Tabs or Category Blocks:**
   - Visual segregation by category (`Java & Backend`, `Frontend`, `Bases de Datos`, `Inteligencia Artificial`).
2. **Certificate Cards:**
   - Title, Issuer, hours, date.
   - List of technical competencies verified.
3. **Performance:**
   - Lightweight CSS-based filtering or clean semantic grid. 0 unnecessary client JS bundle weight.

## Acceptance Criteria
- [ ] Renders all verified certificates with issuer badges.
- [ ] Passes `npm run build` with 0 warnings.
