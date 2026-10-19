# Tasks Backlog & Roadmap

> **Agent Protocol:** This document is the high-level phase registry and active sprint index. For task-level implementation details, inspect the active phase file in `docs/tasks/`.
>
> **Execution Loop:** Implement micro-task -> Verify (`npm run build`) -> Update specs -> Commit semantically.

---

## Active Phase
- [ ] **[Phase 7: Interactive Modal Fixes & Navigation Polish](tasks/phase-7-modal-and-navigation-fixes/index.md)** (Fix persistent dialog overlay, restore close/escape controls, prevent broken fallback downloads, and verify CV navigation links).

---

## Completed Phases (Archive & Changelog)
- [x] **[Phase 6: Printable CV Redesign & PDF Engine V2](tasks/phase-6-cv-redesign/index.md)** — *Completed 2026-10-19* (Editorial A4 redesign, avatar container, clean semantic handles, and interactive print palette switcher).
- [x] **[Phase 5: Visual Identity, Theming & Interactive Portfolio](tasks/phase-5-visual-theming-portfolio/index.md)** — *Completed 2026-10-19* (Dynamic color palettes with daily rotation, dark/light mode, interactive 3D portrait, project previews, contact section, and in-page certificate viewer).
- [x] **[Phase 4: Automation & Deployment](tasks/phase-4-ci-deployment/index.md)** — *Completed 2026-10-18* (Strict type checking, CI verification, and GitHub Pages automated deployment pipeline).
- [x] **[Phase 3: Interactive Web Portfolio (/)](tasks/phase-3-portfolio-web/index.md)** — *Completed 2026-10-18* (BaseLayout, Hero, ProjectsGrid Bento, Timeline, Certifications viewer, 0 KB client JS overhead).
- [x] **[Phase 2: Print Engine & CV View (/cv)](tasks/phase-2-cv-print-view/index.md)** — *Completed 2026-10-17* (A4 PrintLayout, CVHeader, CVExperience, CVSkills, CVEducation, CVCertificates, CVPrintBar, strict 1-page fit).
- [x] **[Phase 1: Data Architecture & Base Types](tasks/phase-1-data-architecture/index.md)** — *Completed 2026-10-17* (Strict schema, master dossier, SSOT cv-data, env phone injection, anti-scraping).
- [x] **[Phase 0: Project Setup & Tooling](tasks/phase-0-tooling-and-english-docs/index.md)** — *Completed 2026-10-17* (Astro + Tailwind v4 + TS strict, aliases, print styles, English docs).