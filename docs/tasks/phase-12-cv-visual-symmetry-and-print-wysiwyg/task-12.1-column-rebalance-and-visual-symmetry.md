# Task 12.1: Column Structural Redistribution & Visual Symmetry

**Status:** Ready to Implement  
**Phase:** 12  
**Components:** `src/pages/cv.astro`, `src/components/cv/CVExperience.astro`

## Context & Diagnostic
In the current layout of `src/pages/cv.astro`, the 2-column layout has an acute vertical imbalance:
- **Left Column:**
  - `CVExperience` (tech)
  - `CVProjects`
  - Total vertical height: ~400px (45% empty void below).
- **Right Column:**
  - `CVSkills`
  - `CVEducation`
  - `CVCertificates`
  - `CVExperience` (complementary)
  - `CVCompetencies`
  - Total vertical height: ~610px (fills to the bottom).

## Specification & Architectural Plan
1. **Redistribute Sections Semantically:**
   - **Left Column (Experiencia y Proyectos / Ejecución):**
     1. `CVExperience` (category="tech", title="Experiencia Técnica")
     2. `CVProjects` (title="Proyectos Software Destacados")
     3. `CVExperience` (category="complementary", title="Otras Experiencias & Competencias")
   - **Right Column (Fundamentos, Habilidades y Acreditaciones):**
     1. `CVSkills` (title="Habilidades Técnicas")
     2. `CVEducation` (title="Educación & Formación Reglada")
     3. `CVCertificates` (title="Certificaciones Clave")
     4. `CVCompetencies` (title="Idiomas & Movilidad")

2. **Height Balance Impact:**
   - Left Column Height: ~185px (Tech Exp) + ~215px (Projects) + ~110px (Complementary Exp) = **~510px**.
   - Right Column Height: ~180px (Skills) + ~140px (Education) + ~90px (Certifications) + ~75px (Languages/Mobility) = **~485px - ~505px**.
   - Both columns terminate at the exact same visual horizontal plane, eliminating the blank void on the left.

3. **Checklist:**
   - [ ] Relocate `<CVExperience category="complementary" />` from right column to bottom of left column in `src/pages/cv.astro`.
   - [ ] Verify semantic titles and responsive flow.
