# Phase 12: CV Visual Symmetry, 2-Column Balance & Strict A4 WYSIWYG Print Engine

**Status:** Completed  
**Branch:** `feat/phase-12-cv-visual-symmetry-and-print-wysiwyg`  
**Reference Images / Issues:**
- Screen view visual void: Left column ends prematurely (~50% height) with huge empty space beneath projects.
- Print / PDF export collapse: Print view drops the 2-column grid into 1 vertical column, causing an overflow page 2 with broken layout.

---

## 1. Diagnostics & Root Cause Analysis

### A. Web View Column Asymmetry (Left vs. Right)
- **Problem:** Currently, the left column (7 columns width) contains only `CVExperience` (tech, 2 entries) and `CVProjects` (3 entries), summing ~400px of vertical height. The right column (5 columns width) contains 5 full sections (`CVSkills`, `CVEducation`, `CVCertificates`, `CVExperience complementary`, `CVCompetencies`), summing ~610px.
- **Visual Impact:** The left column leaves an awkward, unfinished white void taking up ~45% of its bottom area, while the right column stretches down to the bottom margin.
- **Root Cause:** Uneven semantic distribution of sections without vertical height balancing.

### B. Print / PDF Export Collapse & Page 2 Overflow
- **Problem 1 (Grid Collapse):** In `src/pages/cv.astro`, the grid uses `grid grid-cols-1 md:grid-cols-12`. In `@media print`, standard browser print engines calculate the printable width (210mm - 20mm margins = 190mm ≈ 718px). Tailwind's `md:` breakpoint requires `min-width: 768px`. Because 718px < 768px, Tailwind does NOT activate `md:grid-cols-12`, `md:col-span-7`, or `md:col-span-5` during print. The entire CV collapses into a single column (`grid-cols-1`).
- **Problem 2 (Spillover to Page 2):** Because all sections stack vertically into a single column, vertical length reaches ~1010px, exceeding the printable A4 page height (281mm ≈ 1060px with headers/margins) and pushing `IDIOMAS & MOVILIDAD` onto a 2nd page.
- **Problem 3 (Print Layout Height Bug):** In `PrintLayout.astro`, `@media print` explicitly declares `html, body { height: 297mm !important; }`. When combined with `@page { margin: 8mm 10mm; }`, the effective height becomes 297mm + 16mm = 313mm, which mechanically forces the print driver to emit a second page.

---

## 2. Technical Objective
1. **Visual Symmetry (Web & Print):** Redistribute sections between Left and Right columns so both sides achieve balanced vertical heights (~510px vs ~505px) and end at virtually the same horizontal baseline.
2. **True WYSIWYG Print Engine:** Enforce 2-column grid in print via `print:grid-cols-12`, `print:col-span-7`, and `print:col-span-5` so the printed PDF matches the on-screen presentation with 100% fidelity.
3. **Strict 1-Page A4 Guarantee:** Fix `PrintLayout.astro` print bounds, eliminate body height overflow, and verify that the exported PDF contains exactly 1 page with 0 page breaks or orphan elements.

---

## 3. Tasks Breakdown

- [x] **[12.1 Column Structural Redistribution & Visual Symmetry](task-12.1-column-rebalance-and-visual-symmetry.md)** — Mover `Otras Experiencias & Competencias` a la columna izquierda (o reubicar educación/proyectos) para equilibrar las alturas de ambas columnas y eliminar el espacio vacío inferior.
- [x] **[12.2 Dual-Mode Multi-Column Grid Architecture (Web & Print Parity)](task-12.2-print-grid-architecture-wysiwyg.md)** — Añadir clases `print:grid-cols-12`, `print:col-span-7`, `print:col-span-5` y `print:gap-4` para evitar el colapso a 1 sola columna en el motor de impresión.
- [x] **[12.3 Print Engine Page Sizing & Anti-Overflow Constraint Fix](task-12.3-print-engine-overflow-and-page-bounds.md)** — Corregir `PrintLayout.astro` eliminando `height: 297mm` en body de impresión y aplicando contenciones estrictas para asegurar 1 página A4 exacta.
- [x] **[12.4 Typography & Spacing Fine-Tuning for A4 Harmony](task-12.4-typography-spacing-and-a4-harmony.md)** — Calibrar espaciados internos, tags y márgenes de sección para que el diseño ocupe armónicamente el espacio A4 sin vacíos ni compresiones.
- [x] **[12.5 Build & Verification](task-12.5-verification-and-acceptance.md)** — Verificar build limpio con TypeScript y validar exportación de 1 página exacta en Chromium/Firefox.
