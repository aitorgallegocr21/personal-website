# Task 24.3: Verification, E2E Testing & Documentation Sync

**Status:** Pending  
**Component Scope:** `tests/e2e/portfolio.spec.ts`, `docs/DESIGN_SYSTEM.md`, `README.md`, `README.es.md`, `docs/TASKS.md`

---

## 1. Objectives

1. Automate end-to-end tests in Playwright verifying:
   - Dock positioning to Top, Bottom, Left, and Right via quick dock controls.
   - Layout metamorphosis: verification that vertical dock applies ~56px compact width and reveals icons.
   - Double-click handle reset restoring the default top position.
   - Persistence in `localStorage` across page reloads.
   - Fluid scroll-spy tracking: indicator position changes dynamically during programmatic scrolling.
   - Mobile isolation: verification that at mobile viewports (375px/390px), dockable controls and vertical transforms are completely suppressed.
2. Run full verification quality gate (`npm run verify` = `check`, `lint`, `format`, `test`, `build`).
3. Update project documentation:
   - `docs/DESIGN_SYSTEM.md`: Document docking tokens, transitions, vertical dock dimensions, and fluid indicator parameters.
   - `docs/TASKS.md`: Mark Phase 24 as active/completed in roadmap.
   - `README.md` and `README.es.md`: Add Desktop Dockable Navbar & Fluid Scroll-Spy to the feature matrix.

---

## 2. Implementation Plan

1. **E2E Playwright Tests (`tests/e2e/portfolio.spec.ts`):**
   - Test case: `supports desktop dock repositioning to left, right, bottom and reset to top`.
   - Test case: `interpolates fluid scroll-spy indicator during section scrolling`.
   - Test case: `preserves standard mobile top navbar and drawer on mobile viewports without docking overhead`.
2. **Deterministic Quality Gate:**
   - Run `npm run verify` and `npm run test:e2e`.
3. **Docs & Backlog Synchronization:**
   - Update `docs/DESIGN_SYSTEM.md`, `README.md`, `README.es.md`, and `docs/TASKS.md`.
