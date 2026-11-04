# Task 18.2: Desacoplamiento de Scripts a Módulos TypeScript en src/lib/

**Status:** Completed  
**Scope:** `src/lib/theme-manager.ts`, `src/lib/modal-manager.ts`, `src/lib/clipboard.ts`, `src/components/portfolio/ThemeToggle.astro`, `src/components/portfolio/CertificateModal.astro`, `src/components/portfolio/ContactSection.astro`, `src/components/portfolio/Hero.astro`

---

## 1. Objetivo Técnico
Desacoplar la lógica cliente imperativa incrustada en etiquetas `<script>` dentro de archivos `.astro` hacia servicios y módulos TypeScript puros en `src/lib/`. Esto reduce el tamaño de los componentes, mejora la legibilidad, facilita la reutilización y permite someter la lógica a pruebas automáticas.

---

## 2. Especificación Detallada

1. **`src/lib/theme-manager.ts`:**
   - Centralizar constantes de temas (`light`, `dark`) y paletas (`amber`, `emerald`, `teal`, `sky`, `slate`, `violet`, `rose`, `monochrome`).
   - Funciones exportadas:
     - `getStoredTheme()`, `setTheme(theme)`
     - `getStoredPalette()`, `setPalette(palette)`
     - `isAutoRotateEnabled()`, `setAutoRotate(enabled)`
     - `initThemeEngine()`
     - `bindThemeControls(containerElement)`
   - Limpiar `ThemeToggle.astro` para que su bloque `<script>` solo invoque `bindThemeControls()`.
2. **`src/lib/modal-manager.ts`:**
   - Manejo de apertura y cierre de modal mediante atributos semánticos.
   - Trampa de foco (`focus-trap`) para accesibilidad a11y.
   - Cierre con tecla `Escape` y click en el backdrop exterior.
   - Renderizado dinámico del documento (PDF embebido o imagen).
   - Limpiar `CertificateModal.astro` para delegar la interactividad al módulo.
3. **`src/lib/clipboard.ts`:**
   - Función `copyToClipboard(text: string): Promise<boolean>`.
   - Utilidad de feedback visual temporal para botones de copia en `ContactSection.astro` y `Hero.astro`.

---

## 3. Verificación
```bash
npm run check
npm run build
```
- Comprobar manualmente que el selector de tema y paleta cambia los colores en tiempo real sin recargar.
- Comprobar que los modales de certificados abren y cierran limpiamente.
- Comprobar que la copia de email/teléfono funciona con el mensaje de confirmación correspondiente.
