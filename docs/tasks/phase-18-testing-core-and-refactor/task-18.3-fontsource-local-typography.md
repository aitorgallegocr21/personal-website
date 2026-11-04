# Task 18.3: Auto-alojamiento Tipográfico con @fontsource

**Status:** Completed  
**Scope:** `package.json`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/layouts/PrintLayout.astro`

---

## 1. Objetivo Técnico

Eliminar las peticiones externas a `fonts.googleapis.com` y `fonts.gstatic.com`. Reemplazarlas instalando y sirviendo las tipografías oficiales del proyecto (`Inter` y `JetBrains Mono`) mediante paquetes de `@fontsource`. Esto garantiza cumplimiento estricto de GDPR, 0 bloqueos de red en el First Contentful Paint (FCP) y builds deterministas y sin red para Puppeteer.

---

## 2. Especificación Detallada

1. **Instalación de Dependencias:**
   - Instalar `@fontsource/inter` y `@fontsource/jetbrains-mono` en `dependencies`.
2. **Importación Local en `src/styles/global.css`:**
   - Importar los pesos tipográficos requeridos por el diseño:
     - `@fontsource/inter/400.css`
     - `@fontsource/inter/500.css`
     - `@fontsource/inter/600.css`
     - `@fontsource/inter/700.css`
     - `@fontsource/inter/800.css`
     - `@fontsource/jetbrains-mono/400.css`
     - `@fontsource/jetbrains-mono/500.css`
     - `@fontsource/jetbrains-mono/600.css`
3. **Limpieza de Layouts:**
   - Eliminar los tags `<link rel="preconnect" href="https://fonts.googleapis.com" />` y `<link href="https://fonts.googleapis.com/css2?..." />` de `BaseLayout.astro` y `PrintLayout.astro`.
4. **Verificación de Renderizado:**
   - Confirmar que las variables de tema `--font-sans` y `--font-mono` continúan resolviendo a `Inter` y `JetBrains Mono` con métricas idénticas.

---

## 3. Verificación

```bash
npm run check
npm run build
```

- Comprobar que en la pestaña _Network_ de DevTools ya no se realiza ninguna petición externa a dominios de Google Fonts.
- Verificar que los PDFs en `public/cv/*.pdf` se generan con la tipografía perfecta y sin cambios en la altura ni saltos de línea.
