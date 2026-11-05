# Task 24.4: Dock Ergonomics, Centered Palette Modal & Early Magnetic Drag

**Status:** Completed  
**Component Scope:** `src/lib/dock-manager.ts`, `src/lib/theme-manager.ts`, `src/components/portfolio/Navbar.astro`, `src/components/portfolio/ThemeToggle.astro`, `tests/unit/dock-manager.test.ts`, `tests/e2e/portfolio.spec.ts`

---

## 1. Objectives & User Feedback

1. **Strict Vertical Alignment in Vertical Docks (`left` & `right`):**
   - Eliminate all horizontal side-by-side clustering in vertical dock layouts.
   - Vertically stack the drag grip handle and brand logo pulsing dot at the top.
   - Vertically stack navigation links in the center.
   - Vertically stack the CV button, palette picker, theme toggle, and dock menu at the bottom in a single centered column (`flex-col items-center`).
2. **Centered Palette & Style Modal with Blurred Backdrop:**
   - Prevent the palette dropdown from overflowing off-screen to the left when docked vertically.
   - Render the palette & skin customization menu as a beautifully centered modal dialog in the viewport with a frosted backdrop (`backdrop-blur-sm bg-black/40`).
   - Support closing on backdrop click or Escape key.
3. **Immediate Magnetic Snapping & Early Drag Activation:**
   - Overhaul `detectSnapEdge` to calculate direction/quadrant from screen center immediately upon drag movement (`Math.hypot(dx, dy) >= 4`).
   - Activate the magnetic snap preview (`#dock-snap-preview`) immediately from near the center without requiring the user to drag all the way to screen edges.
   - Display real-time target dock dimensions and geometry with a smooth spring transition.
4. **Chromatic Differentiation for the CV Button:**
   - Decouple the CV button from the active theme accent color (`var(--color-accent)`) in vertical dock layouts to avoid visual collision with the fluid scroll-spy section indicator.
   - Apply a dedicated, high-contrast document tone (indigo/violet badge) with subtle glow and dedicated hover state.

---

## 2. Implementation Summary

1. **Single-Column Vertical Stacking:**
   - Updated `.brand-cluster` to stack the drag grip handle above the brand logo dot (`flex-col items-center gap-1.5`).
   - Updated `#theme-controls-container` and `.header-actions` to stack palette picker, sun/moon toggle, CV button, and dock menu in a single vertical column with no side-by-side pairing.
2. **Centered Palette Modal with Backdrop:**
   - Injected `#palette-backdrop` with `bg-black/40 backdrop-blur-sm` in `ThemeToggle.astro`.
   - Wired backdrop display and dismissal logic in `theme-manager.ts`.
   - Styled `#palette-dropdown` to fix centrally (`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`) with high elevation shadow when docked in `left`, `right`, or `bottom` modes.
3. **Early Magnetic Snapping:**
   - Refactored `detectSnapEdge` to compute normalized quadrant attraction vectors relative to screen center.
   - Triggered real-time snap preview (`#dock-snap-preview`) on the first 4px pointer movement.
4. **Chromatic CV Differentiation:**
   - Styled `.cv-btn` with a dedicated indigo document badge aesthetic (`#4f46e5` / `#818cf8` with subtle border and aura), eliminating chromatic conflict with active scroll-spy links.
5. **Verification:**
   - 86/86 Vitest unit tests passed.
   - 20/20 Playwright E2E tests passed, including new test for centered palette modal and backdrop dismissal.
   - Production build and multi-palette PDFs compiled cleanly.
