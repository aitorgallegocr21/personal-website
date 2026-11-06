# Task 24.6: Hero Origin Dock Indicator, Directional Popover Transitions & Colors Viewport Fit

**Status:** Completed  
**Branch:** `feat/phase-24-desktop-dockable-navbar-and-fluid-scrollspy`  
**Prerequisites:** Task 24.5 completed.

---

## 1. Technical Intent & Architecture

### A. Indicador de "Inicio" (Hero Zone) en el Dock

- **Comportamiento en scroll:**
  - Cuando el scroll de la página se sitúa en la parte superior (zona Hero, por encima de `#proyectos`), el indicador fluido del scroll-spy oculta la píldora de las secciones.
  - En su lugar, el cluster de marca del dock activa el estado `data-hero-active="true"`.
- **Estilo en vista Horizontal:**
  - La palabra "Portfolio" y su píldora contenedora adquieren un estilo sutil e interactivo distintivo:
    - Fondo cristalino con tinte de acento: `bg-[var(--color-accent-subtle)]`.
    - Borde tenue iluminado: `border border-[var(--color-accent-border)]`.
    - Sombra de resplandor suave: `shadow-[0_0_12px_var(--color-accent-glow)]`.
    - Texto `.brand-text` coloreado con `var(--color-accent)` y ligero brillo cromático.
- **Estilo en vista Vertical (Left / Right):**
  - Dado que la tipografía se oculta en el dock vertical para preservar la geometría ultra-compacta (~56px), el orbe/dot de acento (`.brand-logo` beacon) activa un pulso concéntrico especial (_Hero Beacon_):
    - Doble halo brillante con `ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-zinc-950` y un resplandor ambiental suave (`shadow-[0_0_14px_var(--color-accent)]`).

### B. Transiciones elásticas direccionales en Popovers (`#palette-dropdown` y `#dock-menu-popover`)

- **Aceleración por GPU & Rendimiento:**
  - Movimiento exclusivamente basado en `opacity` y `transform`, evitando cualquier reflow o cálculo de layout en el hilo principal.
  - Curva elástica tipo Apple: `cubic-bezier(0.16, 1, 0.3, 1)` con duración de 180ms.
- **Apertura direccional con origen adaptado (_Adaptive Directional Spring_):**
  - **Dock Top (abre hacia abajo):** Transiciona desde `opacity: 0; transform: translateY(-6px) scale(0.96);` hasta `opacity: 1; transform: translateY(0) scale(1);`.
  - **Dock Bottom (abre hacia arriba):** Transiciona desde `opacity: 0; transform: translateY(6px) scale(0.96);` hasta `opacity: 1; transform: translateY(0) scale(1);`.
  - **Dock Left (abre hacia la derecha):** Transiciona desde `opacity: 0; transform: translateY(-50%) translateX(-8px) scale(0.96);` hasta `opacity: 1; transform: translateY(-50%) translateX(0) scale(1);`.
  - **Dock Right (abre hacia la izquierda):** Transiciona desde `opacity: 0; transform: translateY(-50%) translateX(8px) scale(0.96);` hasta `opacity: 1; transform: translateY(-50%) translateX(0) scale(1);`.
- **Cierre fluido:**
  - Ocultación con transición rápida de 120ms para una sensación de respuesta instantánea.
  - Respeto a accesibilidad y `prefers-reduced-motion`.

### C. Eliminación de scrollbar en la lista de colores en pantallas de escritorio

- **Problema previo:** La lista de paletas fijas forzaba `max-h-56 overflow-y-auto` en cualquier resolución, mostrando una barra de scroll vertical innecesaria en monitores de ordenador donde los 7 colores caben con holgura.
- **Solución responsiva:**
  - En pantallas medianas y de escritorio (`sm:`, `>= 640px`): `max-h-none overflow-visible`, mostrando los 7 colores de una vez con estética limpia.
  - En pantallas móviles o visores con altura vertical restringida (`@media (max-height: 600px)` o `< 640px`): se preserva el límite de altura con scroll para evitar desbordamientos del viewport.

---

## 2. Implementation Steps

1. **`src/lib/scroll-spy.ts`:**
   - Detectar si el usuario está en la zona Hero (`isHero: boolean`) y reportarlo a través de un callback o atributo en el controlador.
2. **`src/components/portfolio/Navbar.astro`:**
   - Escuchar el estado de Hero en el controlador de scroll-spy y conmutar `data-hero-active="true"` en `#site-header`.
   - Definir las clases y animaciones CSS para el estilo creativo de "Portfolio" en horizontal y el halo Beacon en vertical.
   - Implementar las clases y keyframes/transiciones de apertura y cierre direccional para `#dock-menu-popover` y `#palette-dropdown`.
3. **`src/components/portfolio/ThemeToggle.astro`:**
   - Reemplazar el contenedor rígido `max-h-56 overflow-y-auto` por la regla responsiva adaptable `sm:max-h-none sm:overflow-visible`.
   - Adaptar las animaciones de `#palette-dropdown` y la sincronización con el backdrop.
4. **Verificación & Tests:**
   - Ejecutar `npm run verify` (`check`, `lint`, `format`, `test`, `build`).
   - Comprobar en Playwright E2E que el Hero activa `data-hero-active`, las transiciones se ejecutan fluidamente y la lista de colores se muestra sin scroll en desktop.

---

## 3. Acceptance Criteria

- [x] En la sección inicial (Hero / foto e información), "Portfolio" en horizontal luce un estilo creativo distintivo de píldora translúcida con acento y resplandor.
- [x] En los docks verticales (Left / Right), cuando se está en el Hero, el punto de estado activa un efecto Beacon con halo pulsante concéntrico.
- [x] Al descender hacia `#proyectos` u otras secciones, el estilo de inicio se desvanece de forma suave y da paso al scroll-spy fluido de apartados.
- [x] Tanto el recuadro de estilos/colores (`#palette-dropdown`) como el menú del dock (`#dock-menu-popover`) abren y cierran con una transición direccional elástica fluida acelerada por GPU (180ms).
- [x] En pantallas normales de escritorio (>= 640px y altura estándar), la lista de 7 colores se muestra al 100% visible sin barras de scroll.
- [x] `npm run verify` supera todos los gates con 0 errores.
