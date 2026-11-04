# Phase 18: Testing Core, Desacoplamiento & Fuentes Locales

**Status:** Ready to Start  
**Branch:** `feat/phase-18-testing-core-and-refactor`  
**Core Mission:** Establecer los cimientos de fiabilidad, rendimiento y desacoplamiento del proyecto introduciendo la primera suite de pruebas automatizadas con Vitest, desacoplando la lógica de cliente embebida en componentes `.astro` hacia servicios TypeScript puros en `src/lib/`, y auto-alojando las fuentes tipográficas con `@fontsource` para eliminar dependencias de red externas y lograr FCP instantáneo y compilación de PDFs determinista y offline.

---

## 1. Contexto & Objetivos

1. **Suite de Pruebas Unitarias (Vitest):**
   - Actualmente el proyecto solo cuenta con comprobación estática de tipos (`npm run check`).
   - Se debe garantizar la exactitud matemática y de fechas en `src/utils/date.ts` (cálculo de edad dinámico, años bisiestos y husos horarios).
   - Se debe verificar la consistencia estructural del SSOT `src/data/cv-data.ts` (existencia de proyectos, enlaces, títulos y metadatos).
2. **Desacoplamiento de Lógica de Cliente:**
   - Componentes como `ThemeToggle.astro` (338 líneas), `CertificateModal.astro` (220 líneas), `ContactSection.astro` y `Hero.astro` contienen scripts vanilla JS extensos dentro de tags `<script>` inline.
   - Extraer esta lógica a módulos TypeScript puros (`src/lib/theme-manager.ts`, `src/lib/modal-manager.ts`, `src/lib/clipboard.ts`) mejora la reusabilidad, permite testear unitariamente las funciones y deja los componentes `.astro` como vistas declarativas y limpias.
3. **Auto-alojamiento de Fuentes (@fontsource):**
   - La tipografía (`Inter` y `JetBrains Mono`) se descarga en ejecución desde Google Fonts (`fonts.googleapis.com`).
   - El auto-alojamiento mediante paquetes npm locales elimina bloqueos de renderizado en red, cumple normativas de privacidad (GDPR) y permite que el motor headless de PDFs compile sin requerir conexión a internet.

---

## 2. Índice de Tareas

- [x] **[Task 18.1: Configuración de Vitest y Tests Unitarios Core](task-18.1-vitest-setup-and-unit-tests.md)** — Configuración de `vitest.config.ts`, aliases de importación y tests para `src/utils/date.ts` y consistencia de `src/data/cv-data.ts`.
- [ ] **[Task 18.2: Desacoplamiento de Scripts a Módulos TypeScript en src/lib/](task-18.2-client-scripts-decoupling.md)** — Creación de `theme-manager.ts`, `modal-manager.ts` y `clipboard.ts`, y refactorización limpia de los componentes `.astro` correspondientes.
- [ ] **[Task 18.3: Auto-alojamiento Tipográfico con @fontsource](task-18.3-fontsource-local-typography.md)** — Instalación de `@fontsource/inter` y `@fontsource/jetbrains-mono`, importación en CSS global y eliminación de dependencias externas en `BaseLayout.astro`.

---

## 3. Criterios de Aceptación & Verificación

- `npm run check` pasa con 0 errores de TypeScript y Astro.
- `npm test` ejecuta y aprueba el 100% de los tests unitarios en Vitest.
- La web interactiva (`/`) y la vista imprimible (`/cv`) conservan exactamente la misma apariencia y comportamiento visual sin ninguna regresión.
- `npm run build` compila con éxito los 8 PDFs A4 en modo headless.
