# Task 24.1: Fluid Scroll-Spy & Interpolated Indicator Engine

**Status:** Pending  
**Component Scope:** `src/lib/scroll-spy.ts`, `src/components/portfolio/Navbar.astro`

---

## 1. Objectives

1. Develop a dedicated, zero-dependency client-side module `src/lib/scroll-spy.ts` that tracks real-time window scroll position relative to document section anchors.
2. Replace discrete threshold-based section switching with continuous mathematical interpolation:
   - Identify the current active section and the subsequent target section based on scroll offset.
   - Calculate a normalized progress coefficient `t ∈ [0, 1]` between sections.
   - Interpolate indicator position (`x` or `y`), dimension (`width` or `height`), active text brightness, and ambient glow.
3. Support seamless 2D axis adaptation:
   - **Horizontal axis:** Moves `translateX` and smoothly stretches `width` along the horizontal link list.
   - **Vertical axis:** Moves `translateY` and smoothly adjusts `height` along the vertical icon rail when docked left or right.
4. Guarantee 60/120 FPS performance:
   - Cache section offset `top` values and recompute only on `resize` or DOM mutations.
   - Execute indicator updates exclusively within `requestAnimationFrame` with passive scroll event listeners.
   - Leverage GPU compositing with `transform: translate3d(...)` and `opacity` to avoid DOM reflows.

---

## 2. Implementation Plan

1. **`src/lib/scroll-spy.ts`:**
   - Define type contracts: `ScrollSection`, `IndicatorBounds`, `ScrollSpyOptions`.
   - Implement `initFluidScrollSpy(container: HTMLElement, links: NodeListOf<HTMLAnchorElement>, indicator: HTMLElement)`.
   - Implement `cacheOffsets()`: read and store top coordinates of target section elements (`#proyectos`, `#trayectoria`, `#certificaciones`, `#filosofia`, `#contacto`).
   - Implement render loop via `requestAnimationFrame` calculating:
     ```ts
     const activeIndex = findCurrentSectionIndex(scrollY);
     const progress = computeProgress(scrollY, activeIndex);
     updateIndicatorPill(indicator, activeIndex, progress, isVertical);
     updateGlowStates(links, activeIndex, progress);
     ```
2. **`Navbar.astro` integration:**
   - Add a dedicated `<div id="navbar-fluid-indicator" class="pointer-events-none absolute ..."></div>` with accent background, rounded geometry, and subtle glow.
   - Provide visual styling for the sliding pill and cross-fading text opacity/glow.
3. **Verification:**
   - Verify smooth gliding across all section links during manual scrolling.
   - Verify zero frame drops or CPU usage spikes in browser performance profiler.
