# Phase 24: Desktop Dockable Navbar & Fluid Scroll-Spy Experience

**Status:** Completed  
**Branch:** `feat/phase-24-desktop-dockable-navbar-and-fluid-scrollspy`  
**Core Mission:** Elevate the desktop portfolio experience on large viewports (>= 1024px and wide 2K/4K screens) by introducing a hardware-accelerated, dockable navigation island that can be moved and magnetically snapped to any screen edge (Top, Bottom, Left, Right) with intelligent horizontal-to-vertical layout metamorphosis, paired with a continuous, fluid scroll-spy indicator that smoothly interpolates position, dimensions, and glow between sections in real time.

---

## 1. Context & Architectural Principles

1. **Large Viewport Ergonomics & Screen Real Estate:**
   - On wide desktop and 2K/4K displays, static horizontal top navigation leaves excessive horizontal lateral margins unutilized.
   - Enabling users to reposition the header allows tailoring their viewing ergonomics (e.g. vertical sidebar dock on the left or right, floating bottom dock macOS-style, or top pill).

2. **Mobile-First Inviolable Isolation:**
   - All dockable mechanics, drag handlers, snap zones, and vertical layout transformations are strictly scoped to desktop viewports (`@media (min-width: 1024px)`).
   - Mobile and compact tablet viewports (< 1024px) remain 100% untouched, preserving the dedicated responsive hamburger drawer and floating top pill without added bundle or execution overhead.

3. **Hybrid Interaction Model (Drag & Drop + Quick Dock Popover):**
   - **Tactile Drag & Magnetic Snap:** A discrete grip handle (or header drag) with magnetic edge attraction zones when dragging near screen boundaries.
   - **Quick Dock Menu:** An accessible dock controller popup providing 1-click docking to Top, Bottom, Left, or Right, plus double-click reset to Top.
   - **State Persistence:** User position choice saved in `localStorage` under `portfolio-dock-position`.

4. **Metamorphic Layout (Horizontal ↔ Vertical):**
   - **Horizontal (Top / Bottom):** Standard pill geometry with full text links, action icons, and centered floating alignment.
   - **Vertical (Left / Right):** Slim icon-first dock (~56px wide) centered vertically (`top-1/2 -translate-y-1/2`) featuring crisp section icons and instant glassmorphic tooltips on hover.

5. **Fluid Scroll-Spy & Interpolated 2D Indicator:**
   - Eliminates discrete, jerky section switching in favor of an organic sliding accent indicator that tracks exact real-time scroll progress between anchors (`#proyectos`, `#trayectoria`, `#certificaciones`, `#filosofia`, `#contacto`).
   - Cross-fades item text brightness and subtle ambient glow proportionally (e.g., 60% Projects / 40% Experience).
   - Adapts dimensions and axis dynamically: horizontal sliding on Top/Bottom docks, vertical sliding along the icon rail on Left/Right docks.
   - **Zero-Jank GPU Performance:** Section offsets are cached on mount and resize. Scroll tracking runs inside passive `requestAnimationFrame` using hardware-accelerated `transform: translate3d(...)` with zero DOM reflows or layout thrashing.

---

## 2. Task Breakdown

- [x] **[Task 24.1: Fluid Scroll-Spy & Interpolated Indicator Engine](task-24.1-fluid-scrollspy-continuous-indicator.md)** — Implement high-performance scroll observer, cached offset interpolation math, fluid sliding pill/underline, proportional text glow cross-fading, and 2D axis adaptation.
- [x] **[Task 24.2: Dockable Desktop Navbar & Layout Metamorphosis](task-24.2-dockable-desktop-navbar-metamorphosis.md)** — Implement drag-and-drop snap engine, quick-dock options popover, double-click reset, vertical icon-first dock with floating tooltips, and state persistence.
- [x] **[Task 24.3: Verification, E2E Testing & Documentation Sync](task-24.3-verification-e2e-testing-and-sync.md)** — Automate Playwright E2E tests for desktop docking, fluid scroll-spy tracking, verify zero mobile regressions, and update project documentation.
- [x] **[Task 24.4: Dock Ergonomics, Centered Palette Modal & Early Magnetic Drag](task-24.4-dock-ergonomics-palette-modal-and-magnetic-drag.md)** — Strict single-column vertical alignment, centered palette modal with backdrop blur, early magnetic quadrant snapping, and chromatic CV button contrast.
- [x] **[Task 24.5: Dock Vertical Alignment, Directional Popovers, Page Backdrop & Tooltip Unification](task-24.5-dock-vertical-popovers-and-page-backdrop.md)** — Strict single-column ThemeToggle alignment via global scoping, directional popover placement (Bottom/Left/Right/Top), page-level subtle backdrop blur keeping dock visible, selection close bug fix, and unified floating tooltips.
- [x] **[Task 24.6: Hero Origin Dock Indicator, Directional Popover Transitions & Colors Viewport Fit](task-24.6-hero-indicator-popover-transitions-and-colors-fit.md)** — Hero origin identifying style for 'Portfolio' in horizontal and Beacon orb pulse in vertical, GPU-accelerated directional spring transitions for popovers, and responsive fit without scrollbar for colors on desktop.
- [x] **[Task 24.7: Mobile Navigation Overlay Drawer, Backdrop Blur & Spring Transitions](task-24.7-mobile-overlay-drawer-and-backdrop.md)** — Overlay positioning (`position: absolute`) with zero layout shift on page content, dedicated `#mobile-nav-backdrop` with background blur and dimming, GPU-accelerated spring animations (180ms/120ms), and touch dismissal.

---

## 3. Acceptance & Verification Criteria

- Navbar effortlessly transitions between Top, Bottom, Left, and Right docking positions with smooth GPU transitions.
- Vertical docks (Left / Right) render as compact ~56px pills with intuitive icons, floating tooltips on hover, and centered vertical alignment.
- Double-clicking the drag handle or choosing "Reset to Top" restores the default top position immediately.
- Fluid scroll-spy indicator tracks continuous scroll progress between sections smoothly at 60/120 FPS without lag or CPU spikes.
- On viewports < 1024px, the mobile drawer and top navbar operate normally without any docking or drag interference.
- Unit and E2E Playwright test suites pass with 100% green status.
- `npm run verify` (`check`, `lint`, `format`, `test`, `build`) succeeds with 0 errors.
