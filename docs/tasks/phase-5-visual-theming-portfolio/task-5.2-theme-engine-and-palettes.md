# Task 5.2: Global Theming Engine & Dynamic Palettes

## Objective
Implement a high-performance theme engine supporting dark/light mode toggle and a multi-accent color palette switcher (Emerald, Sky, Violet, Rose, Amber) with daily rotation by default, persisted in `localStorage` with zero flicker.

## Context & Artifacts
- **Files:** `src/styles/global.css`, `src/components/portfolio/ThemeToggle.astro`, `src/layouts/BaseLayout.astro`
- **Transitions:** Pure CSS variables for `--color-primary`, `--color-primary-hover`, `--color-primary-glow` with smooth transitions.

## Detailed Requirements
1. **Accent Palette Definitions:**
   - Emerald (Default green tech)
   - Sky (Clean modern blue)
   - Violet (Elegant deep purple)
   - Rose (Modern coral/rose)
   - Amber (Warm energetic gold)
2. **Dynamic Day-of-the-Week Mode:**
   - If no explicit user override is stored in `localStorage`, set the initial palette dynamically based on `dayOfWeek % palettes.length`.
3. **Light/Dark Mode System:**
   - Accessible button with Sun/Moon icons in the Navbar.
   - Smooth background, text, and border transitions.
   - Persisted across navigation with inline head script preventing flash of unstyled content (FOUC).

## Acceptance Criteria
- [x] Theme switches instantly between Dark and Light mode.
- [x] Accent color palette updates all buttons, badges, and glows dynamically.
- [x] Daily rotation algorithm selects a fresh color automatically when no preference is saved.
- [x] Zero layout shift or flash on page reload.
