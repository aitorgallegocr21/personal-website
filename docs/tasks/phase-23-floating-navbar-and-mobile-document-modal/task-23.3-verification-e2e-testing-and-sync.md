# Task 23.3: Verification, E2E Mobile Testing & Sync

**Status:** Pending  
**Assignee:** Agent  
**Context:** Ensure the newly redesigned floating navbar, mobile navigation drawer, and responsive certificate modal operate flawlessly without regressions across unit tests, E2E suites, and multiple viewport resolutions.

---

## Technical Objectives

1. **Automated Playwright E2E Test Suite Expansion:**
   - Add dedicated test cases in `tests/e2e/portfolio.spec.ts` testing mobile viewport behavior (e.g. 375x667 or 390x844):
     - Mobile menu open/close toggle functionality.
     - Section anchor navigation via mobile drawer.
     - Certificate modal opening, tab switching, and action button visibility on mobile.
   - Ensure desktop tests remain green and uninterrupted.

2. **Code Quality & Build Verification:**
   - Execute `npm run check` (Astro & TypeScript check).
   - Execute `npm run lint` (ESLint flat config).
   - Execute `npm run format` (Prettier code styling).
   - Execute `npm run test` (Vitest unit tests).
   - Execute `npm run test:e2e` (Playwright E2E tests).
   - Execute `npm run build` (Static site compilation to `dist/`).

3. **Documentation & Roadmap Synchronization:**
   - Update `docs/TASKS.md` to reflect task and phase progress.
   - Update `docs/DESIGN_SYSTEM.md` if visual tokens or layout patterns are refined.
   - Update `README.md` and `README.es.md` to document the new floating header and mobile modal features.

---

## Verification Plan

1. All Playwright tests pass on both desktop and mobile emulation viewports.
2. Production build compiles cleanly with zero warnings or errors.
3. Git commit messages adhere to Conventional Commits specification.
