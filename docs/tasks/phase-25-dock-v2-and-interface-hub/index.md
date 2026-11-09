# Phase 25: Dock Metamorphosis V2, Unified Interface Hub & Mobile Bottom Dock

**Status:** In Progress  
**Branch:** `feat/phase-25-dock-v2-and-interface-hub`  
**Core Mission:** Restructure the desktop and mobile navigation dock to accommodate expanding portfolio sections (including the upcoming GitHub Activity engine), introducing macOS-inspired icon + micro-label horizontal navigation, consolidating theme, color, skin, and dock controls into a unified 3-column Bento "Interface Hub", and expanding dock positioning to mobile/tablet devices with bottom docking, vertical touch drag snapping, and an upward-opening mobile menu drawer.

---

## 1. Architectural Motivation & User Requirements

1. **Horizontal Space Scalability (Icon + Micro-label):**
   - With the upcoming addition of the GitHub section, horizontal text links (`Proyectos`, `Trayectoria`, `Certificaciones`, `GitHub`, `Filosofía`, `Contacto`) consume excessive horizontal width, especially with surrounding brand cluster, CV button, and controls.
   - **Solution:** Adopt an application dock pattern (macOS/iOS style) in horizontal mode (Top/Bottom): a centered crisp section icon (`w-4 h-4`) with a compact micro-label underneath (`text-[10px]` uppercase or tabular text).
   - In vertical mode (Left/Right): Retain the ultra-slim icon-first rail (`~56px`) with directional floating glassmorphic tooltips.

2. **Consolidation into a Unified "Interface Hub" (Control de Interfaz General):**
   - Currently, the navigation island features three separate buttons on the action cluster: Palette Dropdown, Sun/Moon Mode Toggle, and Dock Position Trigger.
   - **Solution:** Unify all interface adjustments into a single high-ergonomics control button triggered by a `Sliders` icon with a dynamic accent indicator dot.
   - Clicking this trigger opens a unified **3-column Bento panel on desktop** (`min-w-[620px]`):
     - **Column 1: Mode & Appearance:** Segmented Light/Dark toggle + visual Skin selection (`bento-modern`).
     - **Column 2: Dynamic & Fixed Colors:** 7-Day Live Rotation hero toggle + 7 weekday accent swatches.
     - **Column 3: Dock Placement:** 4-quadrant visual selector (Top, Bottom, Left, Right) + Double-click reset button.
   - On mobile/small screens: Seamlessly transforms into a vertically stacked sheet with smooth scrolling.

3. **Responsive Viewport Bounds & Mobile Bottom Docking:**
   - **Tablet/Medium Screens (768px – 1023px):** Side docking (Left/Right) is disabled because it would obscure central portfolio content. Docking is constrained strictly to **Top and Bottom**.
   - **Mobile Devices (< 768px):** The dock can now be positioned at **Top** or **Bottom**.
   - **Upward-Opening Mobile Drawer (Bottom-Up):** When docked at the bottom on mobile, tapping the hamburger button triggers the drawer to open **upwards** (`bottom-[calc(100%+0.5rem)]`) with smooth spring animation and notch/home indicator spacing (`env(safe-area-inset-bottom)`).
   - **Vertical Touch Drag Snapping:** In addition to the Interface Hub selector, mobile and tablet users can drag the dock vertically with magnetic snapping to top or bottom.

---

## 2. Task Breakdown

- [x] **[Task 25.1: Dock Link Layout with Icon + Micro-Labels](task-25.1-dock-link-layout-icon-microlabels.md)** — Implement vertical stacked icon + micro-label layout for horizontal docks (Top/Bottom), retain pure icon with tooltips for vertical docks, and recalibrate the fluid scroll-spy indicator to embrace the new cell geometry.
- [x] **[Task 25.2: Unified Interface Hub Popover](task-25.2-unified-interface-hub-popover.md)** — Unify Dark/Light mode, Color Palettes, Skins, and Dock Position into a single Sliders-triggered 3-column Bento popover on desktop and vertically stacked sheet on mobile.
- [x] **[Task 25.3: Mobile Bottom Dock & Tablet Bounds](task-25.3-mobile-bottom-dock-and-tablet-bounds.md)** — Implement tablet viewport constraints (top/bottom only), mobile bottom dock positioning, upward-opening drawer with backdrop blur, and vertical touch drag snapping.
- [ ] **[Task 25.4: Verification, Automated Testing & Documentation Sync](task-25.4-verification-tests-and-sync.md)** — Update Vitest unit tests for dock manager logic, automate Playwright E2E tests for mobile bottom drawer and interface hub, and update `docs/DESIGN_SYSTEM.md`, `README.md`, and `README.es.md`.

---

## 3. Acceptance & Quality Criteria

- Horizontal dock displays crisp icons with compact micro-labels underneath, fitting 6+ sections effortlessly without layout collisions.
- Vertical docks (Left/Right) remain ultra-compact (~56px) with directional floating tooltips.
- Fluid scroll-spy indicator accurately tracks and highlights the active item across both horizontal and vertical layouts.
- Unified Interface Hub provides clean, single-point access to Mode (Light/Dark), Colors (7 days + live rotation), and Dock Position in a 3-column Bento card.
- Tablets disable Left/Right docking options, allowing only Top and Bottom.
- Mobile devices support bottom docking with safe-area spacing and upward-opening drawer navigation.
- Touch drag enables vertical dock repositioning on mobile/tablet.
- Zero TypeScript errors (`npm run check`), 100% tests passing (`npm test`), and Prettier formatted.
