# Task 25.2: Unified Interface Hub Popover

**Status:** Completed  
**Branch:** `feat/phase-25-dock-v2-and-interface-hub`  
**Goal:** Consolidate the scattered navigation controls (Theme Toggle, Color Palettes/Skins, and Dock Position) into a single, cohesive "Interface Hub" (Control de Interfaz General) triggered by a `Sliders` icon button with a dynamic accent dot, rendering a 3-column Bento popover on desktop and a vertically stacked sheet on mobile.

---

## 1. Context & Motivation

Presently, the action bar on the right of `Navbar.astro` features:

1. CV PDF link.
2. `<ThemeToggle />` containing:
   - Palette & Skin picker trigger (`Palette` icon).
   - Light/Dark mode toggle trigger (`Sun`/`Moon` icon).
3. Quick Dock trigger (`SlidersHorizontal` icon).

Having multiple separate popovers and icons creates visual clutter and fragments user customization. By uniting them into one **Interface Hub**:

- The action cluster is simplified to: `[CV PDF]`, `[Interface Hub (Sliders)]`, and `[Mobile Menu Hamburger]`.
- All customization options (Appearance, Accent Palette, and Layout/Docking) are accessible from one unified command center.
- The desktop view displays a rich **3-column Bento card** (`min-w-[620px]`), offering a holistic overview without nested menus.
- Mobile devices render a clean, vertically stacked modal sheet with 44px touch targets.

---

## 2. Technical Implementation Spec

1. **Trigger Component (`src/components/portfolio/Navbar.astro` or unified `InterfaceHub.astro`):**
   - Single button: `id="palette-menu-btn"`.
   - Icon: `Sliders` (Lucide) `w-4 h-4`.
   - Indicator: Pulsing/glowing dot in the top-right corner reflecting `var(--color-accent)`.
   - Accessible attributes: `aria-expanded="false"`, `aria-haspopup="dialog"`, `aria-label="Ajustes de interfaz y apariencia"`.
   - Dedicated glassmorphic floating tooltip: "Ajustes de Interfaz".

2. **Panel Structure (3-Column Bento on Desktop >= 768px):**
   - Container: `id="palette-dropdown"`.
   - Desktop layout (`>= 768px`): `grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-4 p-3.5 md:p-4 md:w-[680px] lg:w-[720px] rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl`.
   - Directional positioning: Smart placement relative to dock position (below in Top dock, above in Bottom dock, to the right in Left dock, to the left in Right dock).
   - **Column 1: Modo & Aspecto (Appearance & Mode):**
     - Section title: `// MODO & APARIENCIA`.
     - Segmented toggle for Light (`☀️ Claro`) vs Dark (`🌙 Oscuro`).
     - Skin selector (`bento-modern`, with extensible badges).
   - **Column 2: Paleta Cromática (Colors & Rotation):**
     - Section title: `// ACENTO CROMÁTICO`.
     - "Rotación Viva 7 Días" hero toggle card with live pulsating dot and today's day indicator.
     - 7 weekday swatches list/grid (`Amber`, `Emerald`, `Teal`, `Sky`, `Slate`, `Violet`, `Rose`) with active checkmarks.
   - **Column 3: Disposición del Dock (Dock Placement):**
     - Section title: `// POSICIÓN DEL DOCK`.
     - 4-quadrant visual placement selector:
       - Top (`Arriba`)
       - Bottom (`Abajo`)
       - Left (`Izquierda`) — _conditionally hidden or disabled on screens < 1024px_
       - Right (`Derecha`) — _conditionally hidden or disabled on screens < 1024px_
     - Quick "Restaurar Arriba" button.

3. **Mobile & Narrow Viewport Layout (< 768px):**
   - Renders as a full-width or high-density vertical sheet (1 column, 3 rows) avoiding multi-column distortion on 640px-767px tablets:
     - `grid grid-cols-1 gap-3.5 max-h-[80dvh] overflow-y-auto p-3.5 rounded-3xl`.
     - Clear section dividers and minimum 44px touch targets.
     - Document scroll lock (`overflow: hidden` on `html` and `body`) while popover is active.

4. **Client-Side Binding (`src/lib/theme-manager.ts` & `src/lib/dock-manager.ts`):**
   - Unify event listeners so opening the Interface Hub manages backdrop blur, outside click dismissal, Escape key handling, and seamless updates to `localStorage`.

---

## 3. Verification Checklist

- [x] Single `Sliders` button replaces separate palette, sun/moon, and dock position buttons.
- [x] Desktop popover renders a balanced 3-column Bento grid with Mode, Colors, and Dock controls.
- [x] Mobile view renders a comfortable vertically stacked sheet with safe scrolling.
- [x] Switching mode (Light/Dark), palette (Live or fixed), skin, or dock position updates the UI instantly without FOUC.
- [x] Backdrop blur overlay activates smoothly and dismisses on outside tap or Escape key.
- [x] TypeScript check and Vitest test suites pass with 0 errors.
