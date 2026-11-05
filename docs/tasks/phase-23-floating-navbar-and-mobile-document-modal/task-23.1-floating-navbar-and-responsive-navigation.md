# Task 23.1: Floating Navbar & Responsive Navigation

**Status:** Pending  
**Assignee:** Agent  
**Context:** The current header (`src/components/portfolio/Navbar.astro`) is fixed flat across the full screen width (`w-full border-b`) with no top margin, and hides all navigation links on mobile viewports without providing any alternative menu or drawer.

---

## Technical Objectives

1. **Floating Pill Layout Architecture:**
   - Wrap the navbar container in a floating island with top offset (`sticky top-3 sm:top-4 z-50 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl`).
   - Use rounded geometry (`rounded-2xl sm:rounded-full`), subtle borders (`border border-zinc-200/80 dark:border-zinc-800/80`), and backdrop glassmorphism (`bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md`).
   - Add ambient elevation shadow with dynamic accent aura on hover or scroll.

2. **Creative Nav Link & Button Styles:**
   - Redesign navigation links with pill hover backgrounds, smooth color transitions, active highlight dots or underline micro-indicators, and font adjustments.
   - Enhance the "CV PDF" action button with distinct accent styling, subtle scale feedback (`active:scale-95`), and cohesive visual integration with the theme toggle.
   - Keep theme & palette picker popup anchored properly within the floating container without viewport clipping on small screens.

3. **Responsive Mobile Navigation Menu:**
   - Add an accessible mobile menu toggle button (hamburger icon transforming to close icon or animated state) visible only on small screens (`md:hidden`).
   - Create an expandable mobile menu container that cleanly animates below the pill header.
   - Include all navigation anchors: `#proyectos`, `#trayectoria`, `#certificaciones`, `#filosofia`, `#contacto`, plus the CV PDF link.
   - Support click-to-close behavior on link selection, backdrop tap, and `Escape` key press.
   - Preserve zero client JS overhead principles where possible, using minimal vanilla JavaScript or semantic state handling.

---

## Verification Plan

1. Verify layout across breakpoints: 320px (iPhone SE), 390px (iPhone 12/13/14), 768px (iPad/tablet), and >1024px (desktop).
2. Confirm floating header maintains proper margins and z-index during full-page vertical scrolling.
3. Validate mobile menu open/close interaction, link clicking, and keyboard navigation.
4. Run `npm run check` and `npm run build` to confirm zero TypeScript or template compilation errors.
