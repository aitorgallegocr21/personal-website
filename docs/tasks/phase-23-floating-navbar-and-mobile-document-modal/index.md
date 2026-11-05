# Phase 23: Floating Navbar & Mobile Document Modal Experience

**Status:** In Progress (2026-11-05)  
**Branch:** `feat/phase-23-floating-navbar-and-mobile-document-modal`  
**Core Mission:** Redesign the primary website navigation into a modern floating glassmorphic pill header with mobile responsive drawer/menu, and transform the certificate and PDF document viewer into a mobile-first, touch-friendly interactive dialog with seamless multi-document navigation and compact download controls.

---

## 1. Context & Objectives

1. **Floating Pill Header & Modern Micro-Interactions:**
   - Transition from the full-width glued top header to an elevated, floating island layout with top offset (`sticky top-3 sm:top-4`) and smooth rounded geometry (`rounded-2xl sm:rounded-full`).
   - Preserve and refine the translucent backdrop blur (`backdrop-blur-md`) with subtle border styling and soft ambient elevation shadows.
   - Modernize navigation links and action buttons with creative hover micro-interactions, active glow accents, and pill-style highlights.
   - Implement a dedicated mobile navigation system (accessible hamburger trigger + smooth dropdown/drawer sheet) providing 100% section reachability on phones (`#proyectos`, `#trayectoria`, `#certificaciones`, `#filosofia`, `#contacto`, plus CV PDF and theme switcher).

2. **Mobile-First Certificate & PDF Modal Overhaul:**
   - Redesign `CertificateModal.astro` and `modal-manager.ts` to solve mobile PDF rendering limitations (Safari/Android iframe clipping) and crowded top bars.
   - Maximize mobile viewport usage with responsive sheet geometry (full-bleed/clean margins on mobile, centered floating dialog on desktop).
   - Re-architect modal action buttons into a clean, responsive layout with compact adaptive labels (e.g. icon-first or responsive badge for single/batch ZIP downloads).
   - Optimize multi-document selection tabs with horizontal touch scrolling, active state indicators, and document index counters.
   - Provide an intuitive mobile fallback preview banner with direct one-tap options: "Open in new tab" and "Download PDF".

3. **Scope Clarification:**
   - Future CV Mobile Refactor: Major mobile layout changes for the printable CV route (`/cv`) remain intentionally deferred to a subsequent dedicated phase per project direction.

---

## 2. Task Breakdown

- [ ] **[Task 23.1: Floating Navbar & Responsive Navigation](task-23.1-floating-navbar-and-responsive-navigation.md)** — Implement floating island geometry, modern link aesthetics, mobile hamburger toggle, and responsive drawer navigation.
- [ ] **[Task 23.2: Mobile-First Certificate Modal Redesign](task-23.2-mobile-first-certificate-modal-redesign.md)** — Overhaul certificate viewer modal geometry, compact mobile actions, touch-friendly multi-document tabs, and resilient mobile PDF handling.
- [ ] **[Task 23.3: Verification, E2E Mobile Testing & Sync](task-23.3-verification-e2e-testing-and-sync.md)** — Automate Playwright E2E tests for mobile navbar interactions and modal preview, verify zero regressions, and update project documentation.

---

## 3. Acceptance & Verification Criteria

- Navbar floats cleanly with top breathing space, rounded borders, and responsive max-width on both desktop and mobile viewports.
- Mobile devices (< 768px) render a dedicated hamburger menu that expands smoothly, allows navigation to all portfolio sections, and automatically closes upon selection or backdrop tap.
- Certificate modal adapts gracefully to mobile screens without horizontal button overflow or title clipping.
- Multi-document certificates allow seamless finger-scrolling between module tabs on mobile devices.
- Single PDF download, batch ZIP export, and external view buttons remain fully functional and visually balanced across all viewports.
- All Playwright E2E tests pass, including new mobile viewport test cases.
- `npm run check`, `npm run lint`, and `npm run build` succeed with 0 errors and 0 warnings.
