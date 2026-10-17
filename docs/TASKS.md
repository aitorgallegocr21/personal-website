# Tasks Backlog - Portfolio & SSOT CV

> **Agent Directive:** Take exactly one micro-task per cycle. Once implemented and verified with `npm run build`, check the box `[x]`, update documentation if needed, and run the corresponding semantic git commit.

---

## Phase 0: Project Setup & Tooling
- [x] Initialize Astro repository with Tailwind CSS and strict TypeScript.
- [x] Configure agent operating guidelines in `AGENTS.md`.
- [x] Configure TypeScript path aliases (`@/*`, `@components/*`, `@layouts/*`, `@data/*`, `@types/*`, `@styles/*`).
- [x] Configure environment variable typings in `src/env.d.ts`.
- [x] Set up base project directory tree (`components/cv`, `components/portfolio`, `components/ui`, `layouts`).
- [x] Configure A4 print rules and exact color reproduction in `src/styles/global.css`.
- [x] Translate agent system documentation (`AGENTS.md`, `TASKS.md`, `DESIGN_SYSTEM.md`) to English.

## Phase 1: Data Architecture & Base Types
- [ ] Validate strict type schema in `src/types/resume.ts`.
- [ ] Consolidate comprehensive dossier in `docs/DOSSIER_PROFESIONAL.md`.
- [ ] Complete and export `src/data/cv-data.ts` without TypeScript compilation errors.
- [ ] Configure `PUBLIC_PHONE` injection via `import.meta.env` with safe fallback and sanitize `src/data/cv-data.ts`.
- [ ] Implement anti-scraping technique (CSS obfuscation / click-to-reveal) for phone numbers in web views.

## Phase 2: Print Engine & CV View (/cv)
- [ ] Create print layout `src/layouts/PrintLayout.astro` with `@page { size: A4; margin: 10mm 12mm; }`.
- [ ] Create component `src/components/cv/CVHeader.astro` (name, title, contact details, links).
- [ ] Create component `src/components/cv/CVExperience.astro` (filtering `featuredInCV: true`, `break-inside-avoid`).
- [ ] Create component `src/components/cv/CVSkills.astro` (compact categories, minimalist badges).
- [ ] Create component `src/components/cv/CVCertificates.astro` (training groups from NTT Data and others).
- [ ] Assemble `src/pages/cv.astro` and verify content fits strictly into 1 A4 page with no orphan scroll.
- [ ] Add floating utility toolbar with print trigger (`window.print()`) hidden with `print:hidden`.

## Phase 3: Interactive Web Portfolio (/)
- [ ] Create root layout `src/layouts/BaseLayout.astro` (meta tags, Open Graph, SEO, font links).
- [ ] Create `Hero.astro` component with full bio and social links.
- [ ] Create `ProjectsGrid.astro` section with interactive cards, GitHub/demo links, and tech badges.
- [ ] Create complete timeline section covering education and work experience (including coaching and hospitality).
- [ ] Create interactive certifications modal/viewer filtered by categories.

## Phase 4: Automation & Deployment
- [ ] Configure strict type check script (`astro check`).
- [x] Configure GitHub Actions CI workflow to validate compilation on push/PR (`.github/workflows/ci.yml`).
- [ ] Configure static deployment pipeline (Cloudflare Pages or GitHub Pages).