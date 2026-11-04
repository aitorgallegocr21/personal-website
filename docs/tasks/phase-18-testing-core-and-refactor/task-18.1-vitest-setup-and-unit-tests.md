# Task 18.1: Configuración de Vitest y Tests Unitarios Core

**Status:** Completed  
**Scope:** `package.json`, `vitest.config.ts`, `tests/unit/date.test.ts`, `tests/unit/cv-data.test.ts`

---

## 1. Objetivo Técnico

Configurar Vitest como el test runner unitario oficial del proyecto, respetando los aliases de TypeScript definidos en `tsconfig.json` (`@/*`), y escribir pruebas unitarias exhaustivas para la lógica matemática y de fechas (`calculateAge`) y para la integridad estructural de los datos SSOT (`cvData`).

---

## 2. Especificación Detallada

1. **Instalación de Dependencias:**
   - Instalar `vitest` en `devDependencies`.
   - Añadir script `"test": "vitest run"` y `"test:watch": "vitest"` en `package.json`.
2. **Configuración (`vitest.config.ts`):**
   - Configurar resolución de aliases (`@` mapeado a `./src`).
   - Entorno `node` para pruebas unitarias de datos y lógica pura.
3. **Casos de Prueba para `date.test.ts`:**
   - Cálculo exacto de edad cuando el cumpleaños ya pasó en el año actual.
   - Cálculo exacto de edad cuando el cumpleaños aún no ha llegado.
   - Caso exacto el mismo día del cumpleaños.
   - Años bisiestos (ej. 29 de febrero).
   - Manejo de excepciones ante cadenas con formato inválido (diferente a `YYYY-MM-DD`).
4. **Casos de Prueba para `cv-data.test.ts`:**
   - El objeto `cvData` contiene las secciones obligatorias: `personal`, `about`, `skills`, `projects`, `experience`, `education`, `certificates`.
   - `cvData.personal.birthDate` tiene formato ISO válido `YYYY-MM-DD`.
   - Todas las URLs de proyectos y certificados son válidas o rutas locales existentes.
   - La lista de paletas válidas coincide con el sistema de 7 días más monochrome.

---

## 3. Verificación

```bash
npm run test
npm run check
```
