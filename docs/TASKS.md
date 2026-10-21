# Tasks Backlog & Roadmap

> **Agent Protocol:** This document is the high-level phase registry and active sprint index. For task-level implementation details, inspect the active phase file in `docs/tasks/`.
>
> **Execution Loop:** Implement micro-task -> Verify (`npm run build`) -> Update specs -> Commit semantically.

---

## Active Phase
- [ ] **[Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](tasks/phase-13-multi-palette-pdf-build-and-editorial-cv/index.md)** — *Active Sprint* (Deterministic headless A4 PDF precompilation across all 6 palettes, dual-action print bar with layout warning modal, rectangular portrait badge, CONTACTO section header, tennis coaching experience activation, font synchronization and strict 1-page A4 verification).

---

## Completed Phases (Archive & Changelog)
- [x] **[Phase 12: CV Visual Symmetry, 2-Column Balance & Strict A4 WYSIWYG Print Engine](tasks/phase-12-cv-visual-symmetry-and-print-wysiwyg/index.md)** — *Completed 2026-10-20* (Equilibrio visual de doble columna en pantalla eliminando el espacio vacío inferior izquierdo, habilitación de retícula de dos columnas en `@media print` para evitar el colapso a 1 sola columna, contención estricta de altura A4 para prevenir la 2ª página desbordada y paridad 100% WYSIWYG entre web e impresión).
- [x] **[Phase 11: Portfolio Filter Fixes, CV Editorial Density & A4 Print Engine Calibration](tasks/phase-11-filters-and-cv-a4-calibration/index.md)** — *Completed 2026-10-20* (Filtros interactivos de certificaciones con color de acento, rediseño minimalista del botón web en CV, bio y descripciones adaptadas para máxima legibilidad, semántica de proyectos `Web ↗`, calibración de impresión A4 limpia en 1 sola página y preservación de aspect ratio A4 en móvil).
- [x] **[Phase 10: Printable CV Creative Editorial Redesign & Content Refactoring](tasks/phase-10-cv-editorial-and-content-redesign/index.md)** — *Completed 2026-10-20* (Creative non-conventional A4 layout, 2-column editorial grid, prominent web portfolio badge, projects promotion with clickable repos, non-tech experience line, driver's license/English technical competencies, and strict 1-page A4 print verification).
- [x] **[Phase 9: Portfolio Visual Creativity, Modal Document Engine & UI Polish](tasks/phase-9-portfolio-visual-creativity-and-modals/index.md)** — *Completed 2026-10-20* (Accent glow micro-interactions, badge collision fix, multi-document credential viewer engine, and structured footer redesign).
- [x] **[Phase 8: Project Links, Assets & External Identity Audit](tasks/phase-8-links-assets-audit/index.md)** — *Completed 2026-10-20* (Audit and correct personal profile handles, GitHub repos, live demos, and project preview media).
- [x] **[Phase 7: Interactive Modal Fixes & Navigation Polish](tasks/phase-7-modal-and-navigation-fixes/index.md)** — *Completed 2026-10-19* (Fix persistent dialog overlay, restore close/escape controls, prevent broken fallback downloads, and verify CV navigation links).
- [x] **[Phase 6: Printable CV Redesign & PDF Engine V2](tasks/phase-6-cv-redesign/index.md)** — *Completed 2026-10-19* (Editorial A4 redesign, avatar container, clean semantic handles, and interactive print palette switcher).
- [x] **[Phase 5: Visual Identity, Theming & Interactive Portfolio](tasks/phase-5-visual-theming-portfolio/index.md)** — *Completed 2026-10-19* (Dynamic color palettes with daily rotation, dark/light mode, interactive 3D portrait, project previews, contact section, and in-page certificate viewer).
- [x] **[Phase 4: Automation & Deployment](tasks/phase-4-ci-deployment/index.md)** — *Completed 2026-10-18* (Strict type checking, CI verification, and GitHub Pages automated deployment pipeline).
- [x] **[Phase 3: Interactive Web Portfolio (/)](tasks/phase-3-portfolio-web/index.md)** — *Completed 2026-10-18* (BaseLayout, Hero, ProjectsGrid Bento, Timeline, Certifications viewer, 0 KB client JS overhead).
- [x] **[Phase 2: Print Engine & CV View (/cv)](tasks/phase-2-cv-print-view/index.md)** — *Completed 2026-10-17* (A4 PrintLayout, CVHeader, CVExperience, CVSkills, CVEducation, CVCertificates, CVPrintBar, strict 1-page fit).
- [x] **[Phase 1: Data Architecture & Base Types](tasks/phase-1-data-architecture/index.md)** — *Completed 2026-10-17* (Strict schema, master dossier, SSOT cv-data, env phone injection, anti-scraping).
- [x] **[Phase 0: Project Setup & Tooling](tasks/phase-0-tooling-and-english-docs/index.md)** — *Completed 2026-10-17* (Astro + Tailwind v4 + TS strict, aliases, print styles, English docs).