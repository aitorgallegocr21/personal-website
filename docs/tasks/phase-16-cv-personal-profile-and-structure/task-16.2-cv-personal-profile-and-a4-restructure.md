# Task 16.2: CV Layout Restructure: Personal Profile Component

**Status:** Pending  
**Objective:** Replace the non-tech complementary experience section in `/cv` with a dedicated, compact personal profile component (`CVPersonalProfile.astro`), respecting strict 1-page A4 vertical limits.

---

## 1. Architectural Changes

1. **Remove / Deactivate:**
   - Retire `<CVExperience category="complementary" title="Otras Experiencias & Competencias" />` from `src/pages/cv.astro`.
2. **Create `CVPersonalProfile.astro`:**
   - Location: `src/components/cv/CVPersonalProfile.astro`
   - Consumes `cvData.personalTraits` or `cvData.interests`.
   - Title: *"Aspectos Personales & Aptitudes"* or *"Perfil Personal & Hábitos"*.
   - Left accent pill bar (`bg-[var(--color-accent)]`).
   - Clean, compact typography (`text-[10.5px]`, `leading-snug`, monospace tags if applicable).
   - Display virtues (organización, constancia), habits (tenis competitivo, running, lectura analítica).
3. **Column Balance & Symmetrical Layout:**
   - Placed at the bottom of the left column (7 cols) in `src/pages/cv.astro`, directly under `CVProjects`.
   - Must achieve baseline parity with the right column (`CVEducation` + `CVCertificates` + `CVCompetencies`).

---

## 2. Verification Criteria
- [ ] No hardcoded strings inside `CVPersonalProfile.astro`.
- [ ] Visual preview matches the existing design system tokens (`--color-accent`, etc.).
- [ ] Page break avoidance (`break-inside-avoid`) applied cleanly.
