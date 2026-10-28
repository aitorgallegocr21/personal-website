# Phase 16: CV Editorial Restructure, Personal Profile & Engineering Philosophy

**Status:** In Progress  
**Branch:** `feat/phase-16-cv-personal-profile-and-structure`  
**Core Mission:** Restructure the printable CV layout by promoting "Educación & Formación Reglada" to the top position of the main column (col 1, row 1) with expanded real academic modules, cascading Technical Experience and Featured Projects downward. Move the new human-centered "Aspectos Personales & Aptitudes" section to the right column with authentic personal tone and condensed density. Add an "Engineering Philosophy & Work Approach" section to the web portfolio with a direct navbar link, and reflect extreme organization and collaborative team leadership. Ensure Single Source of Truth (SSOT) data architecture in `src/data/cv-data.ts`, strict typing in `src/types/resume.ts`, and millimeter-calibrated 1-page A4 print balance across all 6 color palettes.

---

## 1. Context & Architectural Motivation

1. **Hierarchy Rebalance & Promotion of Education:**
   - As a rising software developer with an exceptional academic record (DAM 1º año: 9,2 y SMR final: 8,7), education deserves prime visibility.
   - Moving `CVEducation` to the first column (7 cols) and first row gives it maximum prominence at a glance, placing clean average grades (`Media: 9,2` / `Media: 8,7`) on the second line right beside the institution to maximize space for syllabus bullets with tight leading.
   - Technical Experience (NTT DATA) and Featured Software Projects cascade naturally into positions 2 and 3 in the main column.

2. **Personal Traits & Aptitudes in the Right Column:**
   - The non-tech complementary experience (hostelería, clases de tenis como empleo) is completely retired.
   - The new human profile component (`CVPersonalProfile.astro`) is placed in the right column (5 cols) below `CVCertificates`, with condensed text and a personal, approachable voice (sports, reading, and extreme organization).

3. **Web Engineering Philosophy & Header Navigation:**
   - Direct link in the website header (`Navbar.astro`) to `#filosofia`.
   - Content enriched to emphasize intense focus on order and organization, plus proven talent for team coordination and project leadership in DAM and NTT DATA.

4. **Single Source of Truth (SSOT):**
   - Zero hardcoded text in components. All data modeled in `src/types/resume.ts` and fed through `src/data/cv-data.ts`.

5. **Multi-Palette A4 Print Calibration:**
   - Precompile all 6 PDF palettes via headless Chromium during build.
   - Ensure zero page overflow or orphan margins.

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

- [x] **[16.1 SSOT Data Architecture: Enriched Education, Personal Traits & Engineering Philosophy](task-16.1-ssot-profile-and-philosophy.md)** — Model schemas in `src/types/resume.ts` and expand `cv-data.ts` with real academic curriculum details (DAM/SMR), personal traits, and philosophy.
- [x] **[16.2 CV Layout Restructure: Education Promotion & Personal Profile Integration](task-16.2-cv-personal-profile-and-a4-restructure.md)** — Reorder `cv.astro` grid: move `CVEducation` to col 1 row 1, cascade tech experience and projects, integrate `CVPersonalProfile.astro` in col 2, and tune typography.
- [x] **[16.3 Web Portfolio: Engineering Philosophy Component](task-16.3-web-engineering-philosophy-component.md)** — Implement `EngineeringPhilosophy.astro` in `src/components/portfolio/` and embed into `src/pages/index.astro`.
- [x] **[16.4 A4 Print Calibration, Multi-Palette Build & Verification (Base)](task-16.4-a4-calibration-and-multi-palette-build.md)** — Base A4 verification and multi-palette PDF generation.
- [x] **[16.5 Web Navbar Link & Engineering Philosophy Content Expansion](task-16.5-web-navbar-and-philosophy-expansion.md)** — Add "Filosofía" to navbar header and enrich philosophy in SSOT with extreme organization and team project leadership.
- [x] **[16.6 CV Education Header Polish, Grade Placement & Tight Leading](task-16.6-cv-education-header-and-grade-alignment.md)** — Place clean average grades on line 2 right beside institution, tighten interlineado, and maximize technical syllabus room.
- [ ] **[16.7 CV Personal Profile Condensation & Authentic Human Tone](task-16.7-cv-personal-profile-concise-and-authentic-tone.md)** — Condense traits text, reduce visual clutter, and adopt a personal, approachable voice for sports, reading, and methodical organization.
- [ ] **[16.8 Final A4 Calibration, Multi-Palette Build & Phase 16 Verification](task-16.8-final-a4-calibration-and-multi-palette-verification.md)** — Recompile all 6 PDF palettes, verify strictly 1 page each, update documentation, and prepare for final push.
