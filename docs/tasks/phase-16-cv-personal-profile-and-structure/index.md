# Phase 16: CV Editorial Restructure, Personal Profile & Engineering Philosophy

**Status:** In Progress  
**Branch:** `feat/phase-16-cv-personal-profile-and-structure`  
**Core Mission:** Restructure the printable CV layout by promoting "Educación & Formación Reglada" to the top position of the main column (col 1, row 1) with expanded real academic modules, cascading Technical Experience and Featured Projects downward. Move the new human-centered "Aspectos Personales & Aptitudes" section to the right column under key certifications. Additionally, enrich the web portfolio with an "Engineering Philosophy & Work Approach" section. Ensure Single Source of Truth (SSOT) data architecture in `src/data/cv-data.ts`, strict typing in `src/types/resume.ts`, and millimeter-calibrated 1-page A4 print balance across all 6 color palettes.

---

## 1. Context & Architectural Motivation

1. **Hierarchy Rebalance & Promotion of Education:**
   - As a rising software developer with an exceptional academic record (DAM 1º año: 9,2 / 10 y SMR final: 8,7 / 10), education deserves prime visibility.
   - Moving `CVEducation` to the first column (7 cols) and first row gives it maximum prominence at a glance, allowing more space to detail technical modules (POO avanzada con Java, persistencia relacional SQL, interfaces multiplataforma, administración de servidores Linux/Windows y redes).
   - Technical Experience (NTT DATA) and Featured Software Projects cascade naturally into positions 2 and 3 in the main column.

2. **Personal Traits & Aptitudes in the Right Column:**
   - The non-tech complementary experience (hostelería, clases de tenis como empleo) is completely retired.
   - The new human profile component (`CVPersonalProfile.astro`) is placed in the right column (5 cols) below `CVCertificates`, perfectly balancing vertical height against the expanded left column while logically presenting personal virtues, sports discipline (tennis), reading, and methodical organization.

3. **Web Engineering Philosophy:**
   - The interactive web portfolio receives a dedicated "Filosofía de Ingeniería & Enfoque de Trabajo" component (`EngineeringPhilosophy.astro`) reflecting principles (no cajas negras, rigor, seguridad) and pragmatic balance (prevención de over-engineering, foco en valor).

4. **Single Source of Truth (SSOT):**
   - Zero hardcoded text in components. All enriched education bullets, personal traits, and engineering principles are modeled in `src/types/resume.ts` and fed through `src/data/cv-data.ts`.

---

## 2. Grid Architecture Map

```
========================================================================
[ CVHeader ] (Nombre, Titular, Badges de Contacto, Redes, Botón Web)
------------------------------------------------------------------------
RETÍCULA EDITORIAL 12 COLS (gap-5 print:gap-4):

COLUMNA PRINCIPAL (7 cols)          COLUMNA LATERAL (5 cols)
[Foco Técnico y Formativo]          [Competencias, Virtudes y Credenciales]
--------------------------          --------------------------------------
1. Educación & Formación Reglada    1. Stack & Habilidades Técnicas
   (DAM 9,2 + SMR 8,7 enriquecidos)    (Java, Spring, TS, SQL, Linux)
2. Experiencia Técnica              2. Certificaciones Clave
   (NTT DATA - Dev Java / Backend)     (NTT DATA JUnit/Mockito, Prompt Eng.)
3. Proyectos Software Destacados    3. Aspectos Personales & Aptitudes
   (Reservas, BookStack, etc.)         (Organización, Tenis, Lectura)
                                    4. Idiomas & Movilidad
                                       (Español, Inglés Técnico, Carnet B)
========================================================================
```

---

## 3. Tasks Breakdown

- [ ] **[16.1 SSOT Data Architecture: Enriched Education, Personal Traits & Engineering Philosophy](task-16.1-ssot-profile-and-philosophy.md)** — Model schemas in `src/types/resume.ts` and expand `cv-data.ts` with real academic curriculum details (DAM/SMR), personal traits, and philosophy.
- [ ] **[16.2 CV Layout Restructure: Education Promotion & Personal Profile Integration](task-16.2-cv-personal-profile-and-a4-restructure.md)** — Reorder `cv.astro` grid: move `CVEducation` to col 1 row 1, cascade tech experience and projects, integrate `CVPersonalProfile.astro` in col 2, and tune typography.
- [ ] **[16.3 Web Portfolio: Engineering Philosophy Component](task-16.3-web-engineering-philosophy-component.md)** — Implement `EngineeringPhilosophy.astro` in `src/components/portfolio/` and embed into `src/pages/index.astro`.
- [ ] **[16.4 A4 Print Calibration, Multi-Palette Build & Verification](task-16.4-a4-calibration-and-multi-palette-build.md)** — Verify 1-page A4 print calibration across all 6 palettes, validate 0 TypeScript/Astro errors, and recompile static PDFs.
