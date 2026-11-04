# Task 20.3: Motor de Estado de Skin y Selector UI

**Status:** Planned  
**Scope:** `src/lib/skin-manager.ts`, `src/components/portfolio/ThemeToggle.astro`, `src/layouts/BaseLayout.astro`

---

## 1. Objetivo Técnico

Construir el servicio de gestión de skin activo con persistencia en `localStorage` (`portfolio-skin`), inyección de atributo raíz `data-skin="bento-modern"` en el layout HTML para evitar FOUC, e integración visual del selector de skins en el panel de personalización de la interfaz.

---

## 2. Especificación Detallada

1. **Gestor de Skin (`src/lib/skin-manager.ts`):**
   - Función `getStoredSkin(): SkinId`.
   - Función `setSkin(skinId: SkinId): void`.
   - Disparo de evento personalizado `skinchange` en `window` para reactividad cliente si es necesaria.
2. **Inicialización Zero-FOUC (`src/layouts/BaseLayout.astro`):**
   - Extender el script inline de `<head>` para leer `portfolio-skin` y aplicar `document.documentElement.setAttribute('data-skin', skinId)`.
3. **Integración en UI (`ThemeToggle.astro` o subcomponente `SkinSwitcher.astro`):**
   - Incorporar una sección dedicada a "Estilo Visual / Skin" dentro del menú desplegable de la barra de navegación.
   - Mostrar el skin activo con retroalimentación clara e indicador de futuros estilos.

---

## 3. Verificación

```bash
npm run check
npm run test
npm run build
```

- Verificar que el atributo `data-skin` se establece correctamente en `<html>`.
- Confirmar que la selección de skins se conserva al recargar la página.
