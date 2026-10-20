# Phase 11: Portfolio Filter Fixes, CV Editorial Density & A4 Print Engine Calibration

**Status:** Completed (2026-10-20)  
**Branch:** `feat/phase-11-filters-and-cv-a4-calibration`

## Objective
Resolver la sincronización y estilado dinámico de los filtros de certificaciones en el portfolio web (`/`), rediseñar el botón de acceso web en el CV (`/cv`) con una estética moderna y minimalista, adaptar en el SSOT la biografía y descripciones para ganar legibilidad con tipografía más grande sin comprimir, sustituir niveles de inglés por competencia técnica, eliminar desbordamientos a 2 páginas en la impresión PDF garantizando limpieza absoluta sin cabeceras del navegador, y asegurar la preservación del aspect ratio A4 en pantallas móviles.

---

## Tasks Breakdown
- [x] **[11.1 Technical Certifications Filter State & Dynamic Accent Swatches](task-11.1-certifications-filter-accent-fix.md)** — Corregir la gestión de clases y el estado activo al filtrar categorías en `Certifications.astro`, aplicando transiciones y acento `--color-accent` en `:hover` y selección activa.
- [x] **[11.2 SSOT Data Schema & Content Refinement](task-11.2-ssot-schema-and-content-refinement.md)** — Incorporar `cvSummary` en `ResumeData['about']`, podar bullets de experiencia/educación para ganar claridad, y actualizar inglés a `Nivel Técnico` sin referencias B1/B2.
- [x] **[11.3 Minimalist Web Header Anchor & CV Color Presence](task-11.3-minimalist-web-anchor-and-cv-palette.md)** — Sustituir el botón de la web por un diseño limpio con etiqueta `Web Personal`, e intensificar sutilmente la presencia de la paleta en bordes y acentos visuales del CV.
- [x] **[11.4 Editorial Balance, Typography Scale & Project Links](task-11.4-editorial-balance-and-projects-semantics.md)** — Reemplazar `Demo ↗` por `Web ↗` en proyectos, aumentar el tamaño de fuente para mejorar la legibilidad sin hacer zoom, y equilibrar la retícula de dos columnas para aprovechar el espacio inferior izquierdo.
- [x] **[11.5 Print Engine Precision & Mobile A4 Aspect Ratio](task-11.5-print-engine-and-mobile-aspect-ratio.md)** — Calibrar `@page` y `@media print` para impedir desbordamiento a 2 páginas y ocultar metadatos del navegador, y preservar la proporción geométrica A4 en dispositivos móviles.
