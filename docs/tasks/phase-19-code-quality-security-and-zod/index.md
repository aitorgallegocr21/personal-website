# Phase 19: Calidad de Código, Seguridad HTTP & Validación Zod

**Status:** Planned  
**Branch:** `feat/phase-19-code-quality-security-and-zod`  
**Core Mission:** Implementar tooling profesional de análisis estático y formateo automático (ESLint + Prettier para Astro/TS/Tailwind), blindar la seguridad de la aplicación con cabeceras HTTP de protección moderna en `_headers`, e incorporar validación de esquema en tiempo de ejecución para el archivo maestro de datos `cvData` mediante Zod.

---

## 1. Contexto & Objetivos

1. **Tooling de Calidad (ESLint + Prettier):**
   - Actualmente no existe linter ni formateador configurado, dependiendo únicamente del compilador de TypeScript.
   - Es necesario unificar reglas de estilo de código, prevenir variables no utilizadas, detectar malas prácticas de accesibilidad (a11y) y garantizar que Tailwind CSS ordene sus clases de forma automática y consistente.
2. **Hardening de Seguridad HTTP:**
   - La configuración actual de `public/_headers` solo incluye directivas de caché básica para `/_astro/*`.
   - Se deben implementar cabeceras estándar de protección contra clickjacking (`X-Frame-Options`), inyección de tipos MIME (`X-Content-Type-Options`), filtrado de referentes (`Referrer-Policy`) y una Content Security Policy (CSP) robusta.
3. **Validación de Esquema con Zod:**
   - Las interfaces TypeScript de `src/types/resume.ts` validan en desarrollo pero se desvanecen en compilación.
   - Implementar un esquema Zod que valide exhaustivamente `cvData` permite detectar campos vacíos, URLs inválidas o formatos incorrectos de fecha con mensajes descriptivos inmediatos en la fase de test y compilación.

---

## 2. Índice de Tareas

- [ ] **[Task 19.1: Configuración de ESLint y Prettier para Astro y TypeScript](task-19.1-eslint-and-prettier-tooling.md)** — Creación de `eslint.config.mjs`, `.prettierrc.mjs` y scripts de validación `npm run lint` y `npm run format`.
- [ ] **[Task 19.2: Hardening de Cabeceras de Seguridad en public/_headers](task-19.2-security-headers-hardening.md)** — Configuración de cabeceras de seguridad modernas (HSTS, CSP, Frameguard, Referrer-Policy y Permissions-Policy).
- [ ] **[Task 19.3: Esquemas Zod y Validación de Datos SSOT](task-19.3-zod-runtime-schema-validation.md)** — Modelado del esquema Zod de `ResumeData` y test unitario de validación continua.

---

## 3. Criterios de Aceptación & Verificación

- `npm run lint` ejecuta sin errores ni warnings en todo el código fuente.
- `npm run format` valida la consistencia de estilos de código.
- Los tests de validación Zod pasan al 100% certificando la salud del archivo `cv-data.ts`.
- `npm run check` y `npm run build` completan con 0 errores.
