# AGENTS.md - Protocolo y Arquitectura del Proyecto

## 1. Misión del Proyecto
Construir y mantener el portfolio personal y el generador de CV imprimible en PDF con arquitectura de Fuente Única de Verdad (SSOT), rendimiento web máximo (0 KB de JS innecesario) y diseño responsive y de impresión optimizado con Astro, TypeScript y Tailwind CSS.

---

## 2. Jerarquía de Habilidades y Reglas Inviolables
1. **Regla de Oro (SSOT):** Queda estrictamente PROHIBIDO escribir texto biográfico, nombres de empresas, fechas, descripciones de proyectos o habilidades dentro de los componentes `.astro` o `.html`. Todo debe consumirse desde `src/data/cv-data.ts`.
2. **Tipado Estricto:** Si se requiere un nuevo campo, debe modelarse primero en `src/types/resume.ts`. Cero uso de `any`.
3. **Optimización de Tokens y Contexto:**
   - No releer archivos completos sin necesidad; leer solo los fragmentos o interfaces afectadas.
   - En respuestas y logs, ser conciso: ir al grano, mostrar solo el diff o archivo editado, sin prosa de relleno.
4. **Verificación Previa a la Entrega:** No se da por completada una tarea sin verificar que `npm run build` pase con 0 errores de tipado o compilación.

---

## 3. Ciclo de Trabajo Obligatorio en Cada Iteración
En CADA tarea o modificación que el agente ejecute, debe seguir estrictamente este flujo:

```
[Análisis puntual] ➔ [Edición mínima necesaria] ➔ [Validación: npm run build] ➔ [Actualizar Documentación si aplica] ➔ [Git Commit Semántico]
```

1. **Paso 1 (Spec/Plan):** Definir en 1 o 2 líneas la acción técnica precisa.
2. **Paso 2 (Código):** Implementar cambios modulares respetando Tailwind y Astro.
3. **Paso 3 (Validación):** Comprobar que no hay errores de sintaxis ni de tipos (`npm run build`).
4. **Paso 4 (Docs & README):** Si la tarea introduce nuevos scripts, rutas, variables o componentes estructurales, actualizar el `README.md` o la documentación correspondiente en el mismo paso.
5. **Paso 5 (Git Commit):** Proponer o ejecutar el commit bajo el estándar **Conventional Commits**:
   - `feat(...)`: Nueva funcionalidad o componente.
   - `fix(...)`: Corrección de errores o ajustes de layout/print.
   - `data(...)`: Actualización de información profesional en `cv-data.ts`.
   - `docs(...)`: Actualización de README o guías.
   - `refactor(...)`: Reestructuración sin cambio funcional.

---

## 4. Reglas Específicas por Vista

### A. Vista Web (`/` -> `src/pages/index.astro`)
- Orientada a reclutadores y desarrolladores técnicos: interactiva, enlaces a demos, repositorio, diseño moderno.
- Usar componentes Astro puros (`.astro`). Solo usar directivas `client:*` si se requiere interactividad real en cliente.

### B. Vista CV / PDF (`/cv` -> `src/pages/cv.astro`)
- **Objetivo:** Caber exactamente en 1 página A4 (o máximo 2 páginas si la experiencia lo justifica), sin líneas huérfanas ni desbordamiento.
- **Configuración de impresión obligatoria:**
  ```css
  @page {
    size: A4;
    margin: 10mm 12mm;
  }
  ```
- **Evitar roturas:** Aplicar siempre `break-inside-avoid` en tarjetas de experiencia, proyectos y educación.
- **Elementos no imprimibles:** Usar `print:hidden` en barras de navegación, botones de descarga o pie de página.
- **Tipografía y densidad:** Utilizar `text-xs` o `text-sm`, márgenes compactos y enlaces semánticos `<a>` visibles.

---

## 5. Scripts y Comandos de Referencia
- `npm run dev`: Inicia el servidor de desarrollo local.
- `astro dev --background`: Inicia el servidor en segundo plano (`astro dev stop`, `astro dev status`, `astro dev logs`).
- `npm run build`: Comprueba tipos con TypeScript (`astro check`) y compila a HTML/CSS estático en `/dist`.
- `npm run preview`: Previsualiza la build de producción localmente.