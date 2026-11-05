# Task 24.2: Dockable Desktop Navbar & Layout Metamorphosis

**Status:** Pending  
**Component Scope:** `src/lib/dock-manager.ts`, `src/components/portfolio/Navbar.astro`, `src/styles/global.css`

---

## 1. Objectives

1. Develop `src/lib/dock-manager.ts` to manage the docking state and physical positioning of the navbar on large desktop viewports (`>= 1024px`).
2. Implement 4 magnetic docking positions:
   - **`top`** (default): Floating pill anchored at top center (`sticky top-4 left-1/2 -translate-x-1/2`).
   - **`bottom`**: macOS-style floating dock anchored at bottom center (`fixed bottom-4 left-1/2 -translate-x-1/2`).
   - **`left`**: Compact vertical dock anchored at left center (`fixed left-4 top-1/2 -translate-y-1/2`).
   - **`right`**: Compact vertical dock anchored at right center (`fixed right-4 top-1/2 -translate-y-1/2`).
3. Support a hybrid interaction model:
   - **Tactile Drag Handle:** An accessible grip element enabling mouse drag with snap zone detection near screen perimeters (`< 80px` from viewport edges).
   - **Quick Dock Popover:** A subtle dock settings button opening a floating radial/grid selector with direct buttons for Top, Bottom, Left, Right, and Reset.
   - **Double-click Reset:** Double-clicking the grip handle immediately restores the default Top position.
4. Layout metamorphosis between Horizontal and Vertical orientations:
   - **Horizontal:** Standard links with visible typography, action buttons, and palette/skin selectors.
   - **Vertical:** Slim ~56px pill with icon-only representation for section anchors, action triggers, and floating glassmorphic tooltips positioned to the inside of the screen (`right` of left dock, `left` of right dock).
5. State persistence & responsive isolation:
   - Persist dock mode in `localStorage` under key `portfolio-dock-position`.
   - Strictly guard execution: disable and destroy listeners when viewport `< 1024px`, seamlessly reverting to the standard mobile header.

---

## 2. Implementation Plan

1. **`src/lib/dock-manager.ts`:**
   - Define type `DockPosition = 'top' | 'bottom' | 'left' | 'right'`.
   - Setup drag event handlers (`pointerdown`, `pointermove`, `pointerup`) with edge threshold detection.
   - Implement snap preview visual cues (subtle boundary indicator when dragging near an edge).
   - Provide `setDockPosition(pos: DockPosition)` with class toggling on the navbar container.
2. **`Navbar.astro` modifications:**
   - Integrate drag grip handle with ARIA attributes and title.
   - Integrate quick-dock popover trigger and modal/popover dialog.
   - Add icon representations alongside existing text links, styled for vertical column flex.
   - Embed glassmorphic tooltips (`role="tooltip"`) visible when docked vertically.
3. **Verification:**
   - Test seamless transition between all 4 dock positions.
   - Test double-click reset to top.
   - Verify tooltips render correctly without clipping.
