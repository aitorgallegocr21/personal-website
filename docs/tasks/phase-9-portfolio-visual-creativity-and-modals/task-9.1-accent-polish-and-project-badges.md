# Task 9.1: Interactive Accent Polish & Project Badges Restructure

**Status:** Planned
**Branch:** `docs/phase-9-portfolio-visual-creativity-and-modals`

## Context & Problem
1. **Underutilized Accent Palettes:** While dynamic accent tokens exist in CSS (`--color-accent`, `--color-accent-subtle`, `--color-accent-border`), they are mostly used on text and small badges. Interactive elements like project cards, action buttons, and technology chips lack impactful, creative feedback (such as glowing borders, spotlight hover shadows, or subtle gradient transitions similar to the interactive 3D portrait).
2. **Badge Collision:** On `ProjectsGrid.astro`, the badge `"⚡ Proyecto actual"` currently has absolute positioning (`top-2 right-2`) which collides with the technology pill (`Astro`) rendered on top-right of the card header.

## Requirements
1. **Resolve Badge Overlap:**
   - Redesign the "Proyecto actual" indicator:
     - Place it directly within the title flow as an animated status pill, or as an integrated banner at the top edge of the card.
     - Ensure zero overlapping with technology tags or card titles across all screen sizes.
2. **Elevate Visual Creativity with Accent Tokens:**
   - **Project Cards:** Introduce a subtle accent gradient border on hover (`border-[var(--color-accent)]/50`), accompanied by soft ambient glow (`shadow-[0_0_25px_var(--color-accent-subtle)]`).
   - **Action Buttons & Links:** Add smooth border illumination and scale/translate micro-interactions on hover (`hover:border-[var(--color-accent)]`).
   - **Tech Badges:** Enhance hover feedback on skill chips with dynamic border illumination.
3. **Consistency & Accessibility:**
   - Maintain dark/light mode balance without overwhelming contrast.
   - Strictly consume CSS variables (`--color-accent`, `--color-accent-contrast`, etc.); never hardcode fixed colors.

## Acceptance Criteria
- [ ] No overlapping between project status badges and tech tags.
- [ ] Project cards, action links, and hoverable elements exhibit smooth, creative accent illumination.
- [ ] Fully responsive on mobile, tablet, and desktop.
