# Task 5.3: Interactive Profile Portrait (Hero)

## Objective
Design and implement a high-end interactive profile portrait card inside `Hero.astro` featuring subtle mouse-tracking 3D tilt, dynamic accent glowing borders, and an integrated status badge displaying dynamic age and career availability.

## Context & Artifacts
- **Files:** `src/components/portfolio/Hero.astro`, `src/components/portfolio/ProfilePortrait.astro` (or integrated within Hero)
- **Asset:** `public/images/avatar.webp` (fallback to avatar placeholder SVG if not yet uploaded)

## Detailed Requirements
1. **Interactive Portrait Frame:**
   - Smooth 3D tilt micro-interaction on desktop hover (`perspective`, `rotateX`, `rotateY`) with zero heavy external libraries.
   - Dynamic accent glow responding to the currently selected color theme.
   - Clean, rounded modern aspect ratio fitting seamlessly alongside the bio and action buttons.
2. **Integrated Status Badge:**
   - Display dynamic age (e.g., *"19 años · DAM Student & Junior Developer"*).
   - Pulsing emerald/accent dot indicating availability for technical roles or internships.

## Acceptance Criteria
- [x] Portrait renders cleanly on both mobile and desktop with zero overflow.
- [x] Micro-interaction runs at 60 FPS and disables gracefully on reduced-motion devices.
- [x] Fallback placeholder renders if user image is not yet provided.
