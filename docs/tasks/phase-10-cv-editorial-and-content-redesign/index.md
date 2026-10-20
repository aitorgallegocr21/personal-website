# Phase 10: Printable CV Creative Editorial Redesign & Content Refactoring

**Status:** In Progress (2026-10-20)
**Branch:** `feat/phase-10-cv-editorial-and-content-redesign`

## Objective
Refactor the printable A4 CV (`/cv`) into a bold, creative, and non-conventional editorial layout that grabs recruiter attention while remaining ATS-friendly and strictly compliant with the 1-page A4 print standard. Prioritize software projects with clickable repository links, streamline education (removing numeric GPA/grades in favor of high-standing badges), add driver's license/technical English competencies, include non-tech cross-functional work experience, and enhance link visibility (especially the interactive personal website).

---

## Tasks Breakdown
- [x] [10.1 Schema & SSOT Data Refactoring for CV Precision](task-10.1-ssot-cv-data-refactoring.md) — Refactor `src/data/cv-data.ts` and `src/types/resume.ts`: add driving license B and technical English competencies, sanitize academic GPA, adjust `featuredInCV` flags for projects and complementary non-tech experience.
- [x] [10.2 Editorial Layout & Creative Print Typography](task-10.2-creative-editorial-layout.md) — Redesign the A4 layout into a modern editorial split/grid structure: bold accent borders, distinctive headers, creative typography badges, and prominent "Web Personal" interactive badge.
- [ ] [10.3 Links, Projects & Non-Tech Work Section Polish](task-10.3-links-projects-and-complementary-experience.md) — Replace raw URLs with semantic anchor labels (`LinkedIn`, `Web Personal`, `Repositorio`), spotlight top GitHub projects with direct links, compress certifications to a compact chip grid, and introduce a concise "Otras Experiencias" section.
- [ ] [10.4 A4 Physical Print Verification & PDF Consistency Check](task-10.4-print-a4-verification.md) — Validate `@media print` with real PDF export tests across palettes to guarantee strict 1-page A4 containment without vertical overflow or orphan elements.
