# Task 24.5: Dock Vertical Alignment, Directional Popovers, Page Backdrop & Tooltip Unification

**Status:** Completed  
**Branch:** `feat/phase-24-desktop-dockable-navbar-and-fluid-scrollspy`  
**Prerequisites:** Tasks 24.1, 24.2, 24.3, 24.4 completed.

---

## 1. Technical Context & Detailed Problem Diagnosis

### A. Fallo de alineación vertical en ThemeToggle (Left / Right Docks)

- **Causa raíz:** `Navbar.astro` tiene estilos CSS encapsulados (scoped por Astro mediante `data-astro-cid-*`). Las reglas `#site-header[data-dock='left'] #theme-controls-container` definidas en `Navbar.astro` nunca penetraban en el componente hijo `ThemeToggle.astro` porque Astro no aplica selectores scoped a elementos de componentes hijos salvo que se use `:global(...)`.
- **Efecto observado:** Los iconos de paleta y cambio de modo claro/oscuro permanecían en una fila horizontal dentro de un dock lateral de solo ~56px de ancho, rompiendo la geometría de columna única.
- **Solución técnica:**
  1. Aplicar `:global(#theme-controls-container)` o encapsular las reglas reactivas de dock directamente en `ThemeToggle.astro` mediante selectores `:global(#site-header[data-dock='left']) #theme-controls-container` y `:global(#site-header[data-dock='right']) #theme-controls-container`.
  2. Forzar `flex-col items-center gap-2 w-full` en docks verticales.
  3. Mantener el orden estricto de apilamiento vertical:
     1. Botón CV PDF (`.cv-btn`)
     2. Selector de paleta de colores (`#palette-menu-btn`)
     3. Alternador claro/oscuro (`#theme-toggle-btn`)
     4. Menú de opciones de anclaje del dock (`#dock-menu-btn`)

### B. Posicionamiento direccional erróneo del desplegable de estilos (`#palette-dropdown`)

- **Causa raíz:** `#palette-dropdown` se encontraba estilizado en `ThemeToggle.astro` con clases fijas `absolute right-0 mt-2`, provocando que en la posición Bottom se desbordara hacia abajo fuera de la pantalla, y en los modos Left/Right no se adaptara direccionalmente hacia el interior del viewport.
- **Efecto observado:** El recuadro se abría siempre hacia abajo, independientemente de si el dock estaba en Bottom, Left o Right.
- **Solución técnica:** Implementar una lógica de posicionamiento direccional anclada equivalente a la del popover del menú de dock (`#dock-menu-popover`):
  - **Dock Top:** Abre hacia abajo (`top: calc(100% + 0.5rem); right: 0;`).
  - **Dock Bottom:** Abre hacia arriba (`bottom: calc(100% + 0.5rem); top: auto; right: 0;`).
  - **Dock Left:** Despliega hacia la derecha (`left: calc(100% + 0.75rem); right: auto; top: 0;`).
  - **Dock Right:** Despliega hacia la izquierda (`right: calc(100% + 0.75rem); left: auto; top: 0;`).
  - Incorporar límites dinámicos (`max-height: calc(100vh - 4rem); overflow-y: auto;`) para prevenir desbordamientos verticales si la pantalla tiene poca altura.

### C. Difuminado de la página completa manteniendo el Dock nítido y visible

- **Causa raíz:** `#palette-backdrop` estaba ubicado como hijo directo de un contenedor relativo dentro de `ThemeToggle.astro`, dentro de un `#site-header` con propiedades CSS `transform` en modos `bottom`, `left` y `right`. En CSS, cualquier elemento ancestro con `transform` crea un nuevo contexto de apilamiento (_stacking context_) y bloque de contención (_containing block_), restringiendo el `position: fixed; inset: 0` del backdrop y solapando las capas del dock.
- **Efecto observado:** El propio dock se difuminaba junto con el fondo o quedaba bajo el oscurecido, en lugar de permanecer nítido y accesible.
- **Solución técnica:**
  1. Garantizar que `#palette-backdrop` opere con `z-40`, mientras que `#site-header` cuente con `z-50` inalterable.
  2. Ajustar la opacidad y desenfoque a un nivel sutil y elegante (`backdrop-blur-sm bg-black/25 dark:bg-black/40`) que difumine suavemente el contenido de la página (`<main>` y `<footer`), manteniendo el dock y sus popovers 100% nítidos por encima.

### D. Bug de persistencia del backdrop al cambiar de color

- **Causa raíz:** En `src/lib/theme-manager.ts`, los event listeners de selección de paleta (`paletteOptions.forEach(...)`) y de rotación viva (`autoRotateBtn?.addEventListener(...)`) ejecutaban manualmente `paletteDropdown?.classList.add('hidden')` pero **no** invocaban la función central `closePaletteMenu()`, omitiendo ocultar `#palette-backdrop` (`paletteBackdrop?.classList.add('hidden')`).
- **Efecto observado:** Al seleccionar una paleta de color o activar el modo dinámico, el dropdown se cerraba pero el backdrop permanecía activo en el DOM, manteniendo la pantalla difuminada y bloqueada hasta que el usuario hacía clic extra para disparar el listener de backdrop.
- **Solución técnica:** Reemplazar las asignaciones manuales en `theme-manager.ts` por llamadas directas a `closePaletteMenu()` o garantizar que tanto `#palette-dropdown` como `#palette-backdrop` sincronicen su visibilidad en todos los casos de selección.

### E. Unificación de Tooltips Estilizados en Dock Vertical

- **Objetivo:** Equipar los botones `#palette-menu-btn`, `#theme-toggle-btn` y `#dock-menu-btn` con elementos flotantes `.nav-tooltip` idénticos a los de los enlaces de navegación y el botón de CV PDF.
- **Comportamiento:** En dock Left se muestran flotando a la derecha (`left: calc(100% + 12px)`), y en dock Right se muestran flotando a la izquierda (`right: calc(100% + 12px)`), con fondo glassmorphic, tipografía consistente y microinteracciones de escala.

---

## 2. Implementation Steps

1. **`src/components/portfolio/ThemeToggle.astro` & `Navbar.astro`:**
   - Añadir selectores `:global()` para `#theme-controls-container` asegurando que en `data-dock='left'` y `data-dock='right'` se aplique `flex-direction: column; align-items: center; gap: 0.5rem;`.
   - Ajustar las reglas direccionales de `#palette-dropdown` para Top, Bottom, Left y Right con paridad exacta respecto a `#dock-menu-popover`.
   - Añadir `.nav-tooltip` a `#palette-menu-btn`, `#theme-toggle-btn` y `#dock-menu-btn`.
   - Asegurar que `#palette-backdrop` cubra la pantalla sin interferir con el `z-index: 50` del dock.

2. **`src/lib/theme-manager.ts`:**
   - Corregir los listeners de selección de paleta fija y auto-rotate para invocar `closePaletteMenu()`, asegurando que `paletteBackdrop` se oculte instantáneamente junto al popover.

3. **Verificación & Calidad:**
   - Ejecutar `npm run verify:fast` y `npm run build` para garantizar cero errores de tipos, estilos y linting.
   - Probar manualmente en viewport de escritorio (>= 1024px) todas las transiciones entre las 4 posiciones del dock.

---

## 3. Acceptance Criteria

- [x] Los iconos de paleta de colores y alternador de tema se alinean estrictamente en columna vertical única en los docks Left y Right.
- [x] El orden de controles de acción en dock vertical es: 1. CV PDF → 2. Paleta → 3. Modo Claro/Oscuro → 4. Menú Dock.
- [x] El recuadro `#palette-dropdown` se abre direccionalmente hacia arriba en Bottom, hacia la derecha en Left, hacia la izquierda en Right, y hacia abajo en Top.
- [x] Al abrir el recuadro de estilos, el fondo de la página se difumina sutilmente (`backdrop-blur-sm bg-black/25 dark:bg-black/40`), mientras el dock permanece 100% nítido, visible y operable sobre él.
- [x] Al seleccionar una paleta de color o pulsar rotación viva, el recuadro se cierra y el fondo difuminado desaparece inmediatamente sin requerir clics adicionales.
- [x] Todos los botones de acción cuentan con tooltips flotantes estilizados en el dock vertical.
- [x] `npm run build` compila con 0 errores.
