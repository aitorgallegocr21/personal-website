# Backlog de Tareas - Portfolio & CV SSOT

> **Regla para agentes:** Tomar una única microtarea por ciclo. Tras implementarla y verificarla con `npm run build`, marcar la casilla `[x]`, actualizar la documentación si aplica y realizar el commit correspondiente.

---

## Fase 1: Arquitectura de Datos y Tipos Base
- [x] Inicializar repositorio Astro con Tailwind CSS y TypeScript estricto.
- [x] Configurar directrices operativas en `AGENTS.md`.
- [ ] Validar esquema estricto de tipos en `src/types/resume.ts`.
- [ ] Consolidar dossier exhaustivo en `docs/DOSSIER_PROFESIONAL.md`.
- [ ] Rellenar y exportar `src/data/cv-data.ts` sin errores de compilación TypeScript.

## Fase 2: Motor de Impresión y Vista CV (/cv)
- [ ] Crear layout de impresión `src/layouts/PrintLayout.astro` con `@page { size: A4; margin: 10mm 12mm; }`.
- [ ] Crear componente `src/components/cv/CVHeader.astro` (nombre, títulos, datos de contacto, enlaces).
- [ ] Crear componente `src/components/cv/CVExperience.astro` (filtrando `featuredInCV: true`, `break-inside-avoid`).
- [ ] Crear componente `src/components/cv/CVSkills.astro` (categorías compactas, badges minimalistas).
- [ ] Crear componente `src/components/cv/CVCertificates.astro` (agrupaciones formativas de NTT Data y otros).
- [ ] Ensamblar `src/pages/cv.astro` y verificar que el contenido quepa en exactamente 1 página A4 sin scroll huérfano.
- [ ] Agregar barra de utilidades flotante con botón de imprimir (`window.print()`) oculta con `print:hidden`.

## Fase 3: Portfolio Web Interactivo (/)
- [ ] Crear layout principal `src/layouts/BaseLayout.astro` (meta tags, Open Graph, SEO, fuentes).
- [ ] Crear componente `Hero.astro` con biografía extendida y enlaces a perfiles.
- [ ] Crear sección `ProjectsGrid.astro` con cards interactivas, links a GitHub/demos y badges de tecnología.
- [ ] Crear sección de trayectoria formativa y laboral completa (incluyendo experiencia de tenis y hostelería).
- [ ] Crear visor o modal interactivo de certificaciones por categorías.

## Fase 4: Automatización y Despliegue
- [ ] Configurar script de verificación de tipos estricta (`astro check`).
- [ ] Configurar GitHub Action de CI para validar compilación en cada Push.
- [ ] Configurar despliegue estático en Cloudflare Pages o GitHub Pages.