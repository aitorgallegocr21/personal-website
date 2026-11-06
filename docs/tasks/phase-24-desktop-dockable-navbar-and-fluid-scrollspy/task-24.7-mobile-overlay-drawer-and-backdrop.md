# Task 24.7: Mobile Navigation Overlay Drawer, Backdrop Blur & Spring Transitions

**Status:** Completed  
**Branch:** `feat/phase-24-desktop-dockable-navbar-and-fluid-scrollspy`  
**Scope:** Mobile navigation drawer (`< 768px`) in `src/components/portfolio/Navbar.astro` and end-to-end regression testing in `tests/e2e/portfolio.spec.ts`.

---

## 1. Intent & Problem Statement

Prior to this refinement, expanding `#mobile-nav-menu` rendered as a normal document flow child inside `<header id="site-header">`. Because `#site-header` is `sticky top-3`, opening the drawer increased the header container's height from 56px to ~320px, forcing `<main>` and the entire underlying page downward (vertical layout shift).

The user requested:

1. **Overlay Positioning (Zero Layout Shift):** Open the mobile menu as an absolute overlay floating directly underneath the header pill without displacing or shifting page content.
2. **Page Backdrop Dim & Blur:** Dim and blur the underlying page content (`backdrop-blur-sm bg-black/25 dark:bg-black/40`) when the drawer is open, while the header pill and overlay drawer remain crisp and fully interactive on top (`z-50`).
3. **Subtle & Resource-Friendly GPU Transitions:** Hardware-accelerated entry and exit animations using `transform` and `opacity` with cubic-bezier easing (180ms entry spring, 120ms exit).
4. **Resilient Dismissal Mechanics:** Smooth auto-closing on background tap, Escape key press, navigation link selection, and viewport resize.

---

## 2. Technical Implementation

### A. Non-Disruptive Floating Overlay (`position: absolute`)

In `src/components/portfolio/Navbar.astro`:

- Converted `#mobile-nav-menu` to an absolute overlay:
  ```html
  <div
    id="mobile-nav-menu"
    class="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 hidden space-y-1 rounded-2xl border border-zinc-200/80 bg-white/95 p-3 shadow-2xl shadow-zinc-950/15 backdrop-blur-xl md:hidden dark:border-zinc-800/80 dark:bg-zinc-950/95 dark:shadow-black/60"
    role="region"
    aria-label="Menú de navegación para dispositivos móviles"
  ></div>
  ```
- `#site-header` remains styled with a consistent `rounded-full` pill silhouette at all times, with zero vertical layout displacement on `<main>`.

### B. Dedicated Mobile Backdrop (`#mobile-nav-backdrop`)

- Programmatically mounted to `document.body` via `getOrCreateMobileBackdrop()` to eliminate stacking context traps from header ancestor styling:
  ```css
  :global(#mobile-nav-backdrop) {
    opacity: 0;
    transition: opacity 180ms ease;
  }
  :global(#mobile-nav-backdrop[data-state='open']) {
    opacity: 1;
  }
  :global(#mobile-nav-backdrop[data-state='closed']) {
    opacity: 0;
    transition: opacity 120ms ease;
  }
  ```
- Attached to `document.body` with `fixed inset-0 z-40 bg-black/25 dark:bg-black/40 backdrop-blur-sm`.
- Integrated instant dismiss tap listener bound to `closeMenu()`.

### C. Lightweight Spring Transitions (180ms / 120ms)

- **Entry Spring (180ms):**
  ```css
  @keyframes mobile-drawer-open {
    0% {
      opacity: 0;
      transform: translateY(-8px) scale(0.97);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  #mobile-nav-menu[data-state='open'] {
    animation: mobile-drawer-open 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  ```
- **Exit Collapse (120ms):**
  ```css
  @keyframes mobile-drawer-close {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
  }
  #mobile-nav-menu[data-state='closed'] {
    animation: mobile-drawer-close 120ms ease forwards;
  }
  ```
- Fully respects `prefers-reduced-motion: reduce` by disabling animations and transitions instantly.

---

## 3. Verification & Quality Gates

- **Unit Tests:** Vitest suite passed 87/87 tests cleanly across 10 test files.
- **E2E Playwright Tests:** 20/20 tests passed:
  - Asserted zero layout shift on `<main>` (tested before and after opening drawer with subpixel tolerance).
  - Asserted backdrop visibility and blur application (`#mobile-nav-backdrop`).
  - Asserted auto-closing on backdrop click, Escape key press, and navigation link clicks.
- **Astro & TypeScript Diagnostics:** `astro check` and `tsc --noEmit` reported 0 errors, 0 warnings, 0 hints.
- **Multi-Palette PDF Generation:** 8/8 PDFs compiled deterministically.
