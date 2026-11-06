# Task 24.1: Fluid Scroll-Spy & Interpolated Indicator Engine

**Status:** Completed  
**Component Scope:** `src/lib/scroll-spy.ts`, `src/components/portfolio/Navbar.astro`, `tests/unit/scroll-spy.test.ts`

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

## 2. Implementation Summary

1. **`src/lib/scroll-spy.ts`:**
   - Implemented pure mathematical calculations: `calculateScrollProgress`, `interpolateGeometry`, `computeGlowIntensities`.
   - Built cached offsets observer: caches section tops and relative link bounding boxes (`measureLinkCoords`).
   - Integrated `ResizeObserver` on container and `document.fonts.ready` to ensure exact geometry recalculation without layout thrashing.
   - Passive RAF scroll render loop updating `--nav-glow` custom CSS properties, `data-active` attributes, and GPU-composited `translate3d` indicator styles.
   - Provided clean lifecycle management with `refresh()` and `destroy()`.
2. **`Navbar.astro` integration:**
   - Added `#navbar-fluid-indicator` element with subtle accent background, rounded geometry, and illuminated bottom bar.
   - Styled `.nav-link .nav-link-text` using modern `color-mix` and dynamic `text-shadow` proportional to `--nav-glow`.
   - Wired `setupDesktopScrollSpy` on load, on `astro:after-swap`, and gated strictly to desktop viewports (`window.matchMedia('(min-width: 768px)')`).
3. **Unit & E2E Verification:**
   - Added 15 comprehensive unit tests in `tests/unit/scroll-spy.test.ts` covering boundary conditions, hero fade zones, bottom-of-page clamping, 2D geometry interpolation, and proportional glow distribution.
   - Verified 100% green status across all 74 unit tests and 16 Playwright E2E tests.
   - Verified Astro build and typecheck with 0 errors.
