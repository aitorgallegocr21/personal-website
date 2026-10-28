# Phase 16: CV Personal Profile, Engineering Philosophy & Layout Restructure

**Status:** In Progress  
**Branch:** `feat/phase-16-cv-personal-profile-and-structure`  
**Core Mission:** Restructure the printable CV layout by replacing "Otras Experiencias & Competencias" with a human-centered personal profile section ("Aspectos Personales & Hábitos"). Simultaneously, enrich the interactive web portfolio with an "Engineering Philosophy & Work Approach" section based on deep technical principles and pragmatic balance. Ensure Single Source of Truth (SSOT) data architecture in `src/data/cv-data.ts`, strict typing in `src/types/resume.ts`, and millimeter-calibrated 1-page A4 print balance across all 6 color palettes.

---

## 1. Context & Architectural Motivation

1. **CV Personal Profile & Human Traits (Printable CV):**
   - Replace non-tech complementary experience (hostelería, clases de tenis) with a human-centered block highlighting candidate virtues: organization, discipline, sports (tennis de competición, fuerza, running), reading habits, and attention to detail.
   - Preserves strict 1-page A4 vertical rhythm and visual symmetry with the right column.

2. **Engineering Philosophy & Work Approach (Interactive Web Portfolio):**
   - Professionalize the Gemini introspective profile into an engineering manifesto:
     - **Core Principles:** Dominio de fundamentos sin depender de cajas negras, rigor metodológico y documentación, seguridad y privacidad por diseño, aprendizaje estructurado.
     - **Pragmatic Balance:** Adaptabilidad constructiva en equipo, prevención de sobreingeniería (*over-engineering*), equilibrio entre arquitectura sólida y rapidez de entrega.
   - Implemented as a clean, responsive component in `src/pages/index.astro` using theme tokens and 0 KB client JS overhead.

3. **Single Source of Truth (SSOT) Architecture:**
   - Under the inviolable project rules, zero copy is hardcoded into `.astro` components.
   - Schemas modeled strictly in `src/types/resume.ts`.
   - Data stored centrally in `src/data/cv-data.ts`.

4. **Multi-Palette A4 Print Calibration:**
   - Precompile all 6 PDF palettes via headless Chromium during build.
   - Ensure zero page overflow or orphan margins.

---

## 2. Tasks Breakdown

- [ ] **[16.1 SSOT Data Architecture: Personal Profile, Traits & Engineering Philosophy](task-16.1-ssot-profile-and-philosophy.md)** — Model schema in `src/types/resume.ts` and populate data in `src/data/cv-data.ts`.
- [ ] **[16.2 CV Layout Restructure: Personal Profile Component](task-16.2-cv-personal-profile-and-a4-restructure.md)** — Create `CVPersonalProfile.astro` replacing complementary experience in `cv.astro`, maintaining strict A4 1-page alignment.
- [ ] **[16.3 Web Portfolio: Engineering Philosophy Component](task-16.3-web-engineering-philosophy-component.md)** — Implement `EngineeringPhilosophy.astro` in `src/components/portfolio/` and integrate into `index.astro`.
- [ ] **[16.4 A4 Print Calibration, Multi-Palette Build & Verification](task-16.4-a4-calibration-and-multi-palette-build.md)** — Verify `npm run check` and `npm run build`, regenerate all 6 PDF palettes, and inspect print layouts.
