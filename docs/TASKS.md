# Tasks Backlog - Portfolio & SSOT CV

> **Agent Directive:** This document serves as the top-level summary checklist and JIT context index for autonomous agents. For full technical specifications, acceptance criteria, and edge cases, refer to the corresponding task spec file in `docs/tasks/`.
>
> **Execution Rule:** Take exactly one micro-task per cycle. Implement -> Verify (`npm run build`) -> Check off `[x]` -> Commit semantically.

---

## Phase 0: Project Setup & Tooling
- [x] Initialize Astro repository with Tailwind CSS and strict TypeScript.
- [x] Configure agent operating guidelines in [`AGENTS.md`](../AGENTS.md).
- [x] Configure TypeScript path aliases (`@/*`, `@components/*`, `@layouts/*`, `@data/*`, `@types/*`, `@styles/*`).
- [x] Configure environment variable typings in [`src/env.d.ts`](../src/env.d.ts).
- [x] Set up base project directory tree (`components/cv`, `components/portfolio`, `components/ui`, `layouts`).
- [x] Configure A4 print rules and exact color reproduction in [`src/styles/global.css`](../src/styles/global.css).
- [x] Translate agent system documentation (`AGENTS.md`, `TASKS.md`, `DESIGN_SYSTEM.md`) to English.

## Phase 1: Data Architecture & Base Types
- [x] [1.1 Validate strict type schema](tasks/task-1.1-validate-type-schema.md) in `src/types/resume.ts`.
- [ ] [1.2 Consolidate comprehensive dossier](tasks/task-1.2-consolidate-dossier.md) in `docs/DOSSIER_PROFESIONAL.md`.
- [ ] [1.3 Populate and export cv-data.ts](tasks/task-1.3-populate-cv-data.md) without TypeScript errors.
- [ ] [1.4 Configure PUBLIC_PHONE injection & sanitize cv-data.ts](tasks/task-1.4-env-phone-injection.md) via `import.meta.env`.
- [ ] [1.5 Implement anti-scraping technique](tasks/task-1.5-anti-scraping-phone.md) for phone numbers in web views.

## Phase 2: Print Engine & CV View (/cv)
- [ ] [2.1 Create print layout](tasks/task-2.1-print-layout.md) in `src/layouts/PrintLayout.astro`.
- [ ] [2.2 Create CV Header component](tasks/task-2.2-cv-header.md) in `src/components/cv/CVHeader.astro`.
- [ ] [2.3 Create CV Experience component](tasks/task-2.3-cv-experience.md) with `break-inside-avoid`.
- [ ] [2.4 Create CV Skills component](tasks/task-2.4-cv-skills.md) with compact categories.
- [ ] [2.5 Create CV Certificates component](tasks/task-2.5-cv-certificates.md) for verified training.
- [ ] [2.6 Assemble CV page & verify 1 A4 page fit](tasks/task-2.6-cv-page-assembly.md) in `src/pages/cv.astro`.
- [ ] [2.7 Add floating utility toolbar with print trigger](tasks/task-2.7-cv-print-toolbar.md) with `print:hidden`.

## Phase 3: Interactive Web Portfolio (/)
- [ ] [3.1 Create root layout BaseLayout.astro](tasks/task-3.1-base-layout.md) (meta tags, OG, SEO, fonts).
- [ ] [3.2 Create Hero.astro component](tasks/task-3.2-hero-section.md) with bio and action triggers.
- [ ] [3.3 Create ProjectsGrid.astro section](tasks/task-3.3-projects-grid.md) with Bento cards and tags.
- [ ] [3.4 Create Career & Education Timeline](tasks/task-3.4-career-timeline.md) covering full path.
- [ ] [3.5 Create Certifications Viewer](tasks/task-3.5-certifications-viewer.md) by category.

## Phase 4: Automation & Deployment
- [ ] [4.1 Configure strict type check script](tasks/task-4.1-typecheck-script.md) (`astro check`).
- [x] [4.2 Configure GitHub Actions CI workflow](tasks/task-4.2-ci-workflow.md) in `.github/workflows/ci.yml`.
- [ ] [4.3 Configure static deployment pipeline](tasks/task-4.3-static-deployment.md) for hosting.