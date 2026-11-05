# Task 23.2: Mobile-First Certificate Modal Redesign

**Status:** Completed  
**Assignee:** Agent  
**Context:** `CertificateModal.astro` and `src/lib/modal-manager.ts` previously displayed documents inside a desktop-centric dialog with rigid margins, wrapping header buttons on small screens, and lack of resilient PDF handling for mobile browsers.

---

## Technical Objectives

1. **Responsive Modal Container & Geometry:**
   - [x] Configured `<dialog>` with `p-0 sm:p-6 md:p-8`, eliminating outer margin waste on mobile screens.
   - [x] Sized modal container with `h-[100dvh] sm:h-[90vh] sm:max-h-[920px] w-full max-w-none sm:max-w-5xl rounded-none sm:rounded-2xl border-0 sm:border` for native app-like fullscreen viewing on mobile devices.

2. **Mobile-Optimized Header & Actions:**
   - [x] Implemented a responsive 2-tier header on mobile and unified 1-row header on desktop (`sm:flex-row`).
   - [x] Provided a dedicated mobile close button (`min-h-[44px] min-w-[44px]` touch target) in the top title row and retained desktop close button (`#cert-modal-close`).
   - [x] Structured action buttons with `flex-1 sm:flex-initial` and compact adaptive labels (`Descargar` / `Descargar PDF`, `ZIP (count)`).

3. **Touch-Friendly Multi-Document Navigation:**
   - [x] Enhanced `#cert-modal-nav-container` with smooth horizontal touch-scrolling (`overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]`).
   - [x] Implemented tactile pill tabs (`doc-tab-btn`) with `min-h-[32px]`, dynamic accent styling (`var(--color-accent)`), and smooth auto-centering on selection.

4. **Mobile PDF Viewing Resilience & Fallback Engine:**
   - [x] Added mobile helper banner (`#cert-modal-mobile-banner`) visible on small viewports (`sm:hidden`).
   - [x] Provided direct "Ver PDF" native quick action (`#cert-modal-mobile-open`, `target="_blank"`) to bypass mobile Safari/Chrome inline iframe limitations.
   - [x] Synchronized active document URLs across iframe, download button, external button, and mobile banner.

---

## Verification Results

1. **E2E Playwright Suite:** Added `adapts certificate modal for mobile viewports with multi-document tabs and resilient PDF helpers` covering mobile viewport (375x667), tab switching, iframe src updates, touch targets >= 44px, and desktop banner hiding (16/16 passed).
2. **Quality Gate:** `npm run verify` passed with 0 errors across Astro checks, TypeScript types, ESLint, Prettier, Vitest unit tests (59/59), and static production build.
