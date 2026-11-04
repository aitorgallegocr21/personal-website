# Task 16.2: CV Layout Restructure: Education Promotion & Personal Profile Integration

**Status:** Completed  
**Objective:** Reconfigure the editorial grid in `/cv` by promoting `CVEducation` to column 1 row 1, cascading technical experience and projects, and embedding `CVPersonalProfile.astro` into column 2, maintaining strict 1-page A4 balance.

---

## 1. Grid Reordering in `src/pages/cv.astro`

1. **Left Column (7 cols) — Technical & Academic Core:**
   - **Row 1:** `<CVEducation />` _(Promoted to top position; displays DAM and SMR with enriched bullets and average grades)_.
   - **Row 2:** `<CVExperience category="tech" title="Experiencia Técnica" />` _(Cascaded to second position)_.
   - **Row 3:** `<CVProjects title="Proyectos Software Destacados" />` _(Cascaded to third position)_.
2. **Right Column (5 cols) — Skills, Credentials & Personal Profile:**
   - **Row 1:** `<CVSkills />` _(Tech stack & tools)_.
   - **Row 2:** `<CVCertificates />` _(Key certifications & deep-linking)_.
   - **Row 3:** `<CVPersonalProfile title="Aspectos Personales & Aptitudes" />` _(New component: organization, sports discipline, reading, attention to detail)_.
   - **Row 4:** `<CVCompetencies title="Idiomas & Movilidad" />` _(Languages & driver's license)_.

---

## 2. Component Design (`CVPersonalProfile.astro`)

- Location: `src/components/cv/CVPersonalProfile.astro`
- Design language:
  - Header with accent bar (`bg-[var(--color-accent)]`).
  - Compact vertical footprint (`text-[10.5px]`, `leading-snug`, tight margins).
  - Presentation of personal qualities (organización, constancia) alongside sporting discipline and reading habits.
- Strict page-break avoidance (`break-inside-avoid`).

---

## 3. Verification Criteria

- [x] Visual harmony and baseline alignment between the 7-col and 5-col layouts.
- [x] Zero content loss in existing sections (experience and projects preserved intact).
- [x] Zero hardcoded data in components.
