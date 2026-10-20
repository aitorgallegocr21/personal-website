# Task 10.3: Links, Projects & Non-Tech Work Section Polish

**Status:** Planned
**Branch:** `docs/phases-9-and-10-portfolio-and-cv-redesign`

## Context & Requirements
1. **Clean Semantic Handles & Links:**
   - In `CVHeader.astro` and contact lines:
     - Replace raw URLs with user-friendly text: `LinkedIn`, `GitHub`, `aitorgallegocr21@gmail.com`.
     - Preserve valid `href` attributes (`mailto:`, `https://...`) so clickable links function seamlessly in PDF viewers.
2. **Prioritize Software Projects over Lengthy Certifications:**
   - **Projects:** Allocate significant vertical space. For each featured project, display:
     - Title, tech badges, concise impact summary (1-2 lines), and clickable `[Repositorio GitHub ↗]` link.
   - **Certificates Section:** Condense into a lean, elegant inline chip list or compact two-column summary of core credentials (e.g., *Java SE 8 Programmer, Spring REST APIs, Unit Testing & Mockito, Angular 16/18*), eliminating redundant multi-line summaries.
3. **Complementary Work Experience:**
   - Dedicate a compact section or highlighted subsection: *"Otras Experiencias & Competencias Laborales"* (e.g., Camarero / Profesor de Tenis) summarizing adaptability, customer service under pressure, and communication skills in 1-2 concise lines.

## Acceptance Criteria
- [ ] All links use descriptive anchor text (`LinkedIn`, `GitHub`, `Repositorio`) while remaining clickable.
- [ ] Projects section expanded with prominent repository links.
- [ ] Certifications streamlined to save vertical budget.
- [ ] Non-tech cross-functional work experience neatly integrated without overwhelming technical focus.
