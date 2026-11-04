# Phase 21: Testing E2E & SEO Enriquecido

**Status:** Completed  
**Branch:** `feat/phase-21-e2e-testing-and-structured-seo`  
**Core Mission:** Culminar la modernización técnica del proyecto integrando una suite completa de pruebas End-to-End con Playwright para verificar de forma desatendida la experiencia de usuario y la contención estricta A4 de los PDFs, incorporando datos estructurados Schema.org en JSON-LD para SEO enriquecido en motores de búsqueda, y automatizando la generación de `sitemap-index.xml` y `robots.txt`.

---

## 1. Contexto & Objetivos

1. **Pruebas End-to-End con Playwright:**
   - Automatizar la navegación por el sitio en un navegador Chromium real.
   - Comprobar que no se emiten errores no capturados ni advertencias en la consola del navegador.
   - Verificar la interacción con el visor de certificados, selector de temas y paletas.
   - Testear que el contenedor A4 en la ruta `/cv` mide exactamente 297mm de alto máximo y no genera una segunda página vacía o desbordada.
2. **SEO Estructurado con Schema.org JSON-LD:**
   - Inyectar etiquetas `<script type="application/ld+json">` con las entidades `Person` y `ProfilePage` consumidas directamente del SSOT `cvData`.
   - Permite a Google y otros motores de búsqueda comprender de forma semántica el perfil profesional, habilidades, enlaces a GitHub/LinkedIn y datos de contacto.
3. **Generación Automatizada de Sitemap:**
   - Añadir `@astrojs/sitemap` a `astro.config.mjs` para mantener actualizado el índice de páginas disponibles sin intervención manual.

---

## 2. Índice de Tareas

- [x] **[Task 21.1: Automatización de Pruebas E2E con Playwright](task-21.1-playwright-e2e-automation.md)** — Configuración de `playwright.config.ts` y tests para portfolio interactivo y calibración A4 de `/cv`.
- [x] **[Task 21.2: Marcado Estructurado Schema.org en JSON-LD](task-21.2-schema-org-json-ld.md)** — Creación del componente `JsonLd.astro` y validación con la herramienta de resultados enriquecidos.
- [x] **[Task 21.3: Integración de Sitemap y Robots Automatizados](task-21.3-sitemap-and-robots-automation.md)** — Configuración de `@astrojs/sitemap` en `astro.config.mjs` y archivo `public/robots.txt`.

---

## 3. Criterios de Aceptación & Verificación

- `npx playwright test` pasa al 100% en local y en entornos CI.
- El validador de Schema.org confirma 0 errores en las entidades JSON-LD.
- La compilación `npm run build` genera `dist/sitemap-index.xml` y los 8 PDFs A4 sin incidencias.
