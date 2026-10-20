# Task 9.3: Footer Redesign & Visual Hierarchy Enhancement

**Status:** Planned
**Branch:** `docs/phase-9-portfolio-visual-creativity-and-modals`

## Context & Problem
The current footer (`src/components/portfolio/Footer.astro`) is minimalistic but lacks structural hierarchy. It stacks copyright and social icons with modest spacing and without taking advantage of the site's accent tokens, status indicators, or modern multi-column layout.

## Requirements
1. **Restructure Layout:**
   - Organize into a balanced 2-column or 3-column layout on medium/large screens:
     - **Left Column:** Identity brand, brief purpose statement, and dynamic availability indicator (e.g. green pulse dot "Disponible para retos de desarrollo").
     - **Center/Right Column:** Quick navigation links (Proyectos, Trayectoria, Certificaciones, CV A4).
     - **Social Column:** Reimagined social pill cards with subtle accent hover effects (GitHub, LinkedIn, Email).
2. **Dynamic Tokens & Polish:**
   - Incorporate subtle top border gradient using `--color-accent-border` or ambient glow.
   - Dynamic year and copyright statement.
3. **Responsive Balance:**
   - Stack gracefully on mobile screens with centered or cleanly aligned items and comfortable tap targets.

## Acceptance Criteria
- [ ] Visual hierarchy clearly distinguishes brand, navigation, and social contact.
- [ ] Mobile responsive without cramped elements.
- [ ] Consistent use of semantic tokens and dark/light mode balance.
