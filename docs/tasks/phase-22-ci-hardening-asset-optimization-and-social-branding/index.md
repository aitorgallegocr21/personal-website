# Phase 22: CI Hardening, Asset Optimization & Social Branding

**Status:** In Progress  
**Branch:** `feat/phase-22-ci-hardening-asset-optimization-and-social-branding`  
**Core Mission:** Enhance the project's non-visible infrastructure and media delivery pipeline by integrating Playwright E2E verification into GitHub Actions CI with robust system browser detection, providing a dedicated 1200x630 Open Graph social preview banner for social sharing, and migrating portfolio media to Astro's native asset optimization pipeline (`astro:assets`).

---

## 1. Context & Objectives

1. **Playwright CI Automation & Resilient Browser Discovery:**
   - Harden `playwright.config.ts` to automatically detect installed system Chrome binaries (e.g., `/usr/bin/google-chrome`, `/usr/bin/chromium`, `/usr/bin/chromium-browser`) matching the approach in `scripts/generate-pdf.mjs`, falling back to Playwright cache cleanly.
   - Add a dedicated End-to-End testing step in `.github/workflows/ci.yml` using `npx playwright install --with-deps chromium` so every Pull Request validates UI interactivity and strict A4 1-page PDF constraints.

2. **Dedicated Open Graph Social Preview Banner (1200x630 px):**
   - Replace the generic avatar fallback with a dedicated, high-impact social preview card (`public/images/og-image.png`).
   - Feature candidate name, title, key technologies, and portfolio branding designed specifically for optimal display on LinkedIn, Twitter/X, and messaging link previews.
   - Update `src/layouts/BaseLayout.astro` and verify Schema.org / Open Graph tag alignment.

3. **Astro Native Asset Pipeline Migration (`astro:assets`):**
   - Migrate key image rendering from standard `<img>` tags to Astro's built-in `<Image />` component.
   - Enable automatic generation of modern responsive formats (AVIF/WebP), prevent Cumulative Layout Shift (CLS) through intrinsic aspect-ratio reservation, and establish optimal loading priorities (`loading="eager"`, `fetchpriority="high"` for hero portrait).

---

## 2. Task Breakdown

- [ ] **[Task 22.1: Playwright CI Automation & Browser Detection](task-22.1-playwright-ci-and-browser-resolution.md)** — Configure resilient Chrome executable resolution in `playwright.config.ts` and integrate E2E testing into `.github/workflows/ci.yml`.
- [ ] **[Task 22.2: Dedicated Open Graph Social Image & Meta Ingestion](task-22.2-dedicated-social-og-image.md)** — Create a 1200x630 px branding card and update `BaseLayout.astro` social metadata.
- [ ] **[Task 22.3: Native Asset Pipeline Migration with `astro:assets`](task-22.3-astro-assets-pipeline-migration.md)** — Adopt Astro's `<Image />` component for hero portrait and project preview assets.

---

## 3. Acceptance & Verification Criteria

- Local and CI runs of `npm run test:e2e` pass with 0 failures across both portfolio interactivity and A4 print calibration specs.
- `.github/workflows/ci.yml` executes Playwright tests seamlessly in GitHub Actions runner.
- Open Graph debugger (or Twitter card preview) properly resolves `og:image` to the high-resolution 1200x630 asset with canonical URL.
- Hero and preview assets leverage `astro:assets` producing optimized WebP/AVIF output with explicit width/height dimensions.
- `npm run check`, `npm run lint`, `npm run format`, and `npm run build` pass with 0 errors and 0 warnings.
