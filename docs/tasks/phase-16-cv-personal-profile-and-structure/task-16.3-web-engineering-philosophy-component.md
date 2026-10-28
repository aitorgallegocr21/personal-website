# Task 16.3: Web Portfolio: Engineering Philosophy Component

**Status:** Completed  
**Objective:** Design and implement a high-impact, professional "Engineering Philosophy & Work Approach" component (`EngineeringPhilosophy.astro`) on the web portfolio (`/` -> `src/pages/index.astro`).

---

## 1. Component Specification (`EngineeringPhilosophy.astro`)

1. **Location:** `src/components/portfolio/EngineeringPhilosophy.astro`
2. **Visual & Layout Design:**
   - Grid of Bento-style cards or two-column architectural layout:
     - **Columna 1: Principios Fundamentales** (Fundamentos vs Cajas Negras, Rigor Metodológico, Soberanía Digital y Seguridad, Aprendizaje Estructurado).
     - **Columna 2: Enfoque Pragmático y Entrega de Valor** (Prevención de Sobreingeniería, Adaptabilidad y Trabajo en Equipo, Prototipado y Entrega Continua, Foco en Impacto Real).
   - Consume CSS theme custom properties (`--color-accent`, `--color-accent-subtle`, `--color-accent-border`).
   - Dark/Light mode full compatibility.
   - Zero unnecessary client JS (pure Astro static rendering).
3. **Integration in `src/pages/index.astro`:**
   - Positioned thoughtfully (e.g. between Experience/Projects or after About/Skills) to tell a coherent technical story.

---

## 2. Verification Criteria
- [x] Strictly consumes `cvData.engineeringPhilosophy` (SSOT).
- [x] Responsive across mobile, tablet, and desktop breakpoints.
- [x] `npm run check` passes with 0 errors.
