# Task 21.1: Automatización de Pruebas E2E con Playwright

**Status:** Completed  
**Scope:** `playwright.config.ts`, `tests/e2e/portfolio.spec.ts`, `tests/e2e/cv-print.spec.ts`, `package.json`

---

## 1. Objetivo Técnico

Configurar Playwright para ejecutar pruebas de integración y comportamiento en navegadores reales de manera automática antes de cada despliegue, garantizando que ninguna regresión visual ni funcional pase inadvertida.

---

## 2. Especificación Detallada

1. **Instalación y Configuración (`playwright.config.ts`):**
   - Instalar `@playwright/test` en `devDependencies`.
   - Configurar `webServer` en Playwright para lanzar `astro preview` en el puerto local durante la ejecución de los tests.
2. **`tests/e2e/portfolio.spec.ts`:**
   - Carga de la página de inicio sin errores de JavaScript en la consola (`page.on('console', ...)`).
   - Verificación de renderizado de las secciones clave (`#proyectos`, `#experiencia`, `#filosofia`, `#contacto`).
   - Prueba interactiva del selector de paletas: comprobar que al hacer clic en una paleta, `document.documentElement` actualiza el atributo `data-palette`.
   - Prueba del visor de certificados: hacer clic en una credencial, verificar que el modal se hace visible con `role="dialog"`, y cerrarlo con la tecla `Escape`.
3. **`tests/e2e/cv-print.spec.ts`:**
   - Carga de `/cv`.
   - Medición programática de la altura del elemento `#cv-container` bajo emulación de `@media print`.
   - Verificación estricta de que la altura no excede el límite de 1 página A4 (evitando saltos de página).
4. **Scripts en `package.json`:**
   - `"test:e2e": "playwright test"`

---

## 3. Verificación

```bash
npm run test:e2e
npm run check
```
