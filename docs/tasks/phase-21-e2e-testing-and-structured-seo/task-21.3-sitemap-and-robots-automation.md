# Task 21.3: Integración de Sitemap y Robots Automatizados

**Status:** Completed  
**Scope:** `package.json`, `astro.config.mjs`, `public/robots.txt`

---

## 1. Objetivo Técnico

Automatizar la generación del mapa del sitio web (`sitemap-index.xml`) en cada compilación estática y configurar el archivo de directivas para rastreadores web `robots.txt`, mejorando el posicionamiento orgánico en motores de búsqueda.

---

## 2. Especificación Detallada

1. **Instalación e Integración de `@astrojs/sitemap`:**
   - Añadir `@astrojs/sitemap` a `package.json`.
   - Modificar `astro.config.mjs`:
     ```javascript
     import sitemap from '@astrojs/sitemap';
     // ...
     export default defineConfig({
       site: 'https://aitorgallegocr21.github.io',
       base: '/personal-website',
       integrations: [sitemap()],
     });
     ```
2. **Archivo `public/robots.txt`:**
   - Permitir el rastreo general a buscadores.
   - Indicar la URL canónica al sitemap generado:
     ```
     User-agent: *
     Allow: /

     Sitemap: https://aitorgallegocr21.github.io/personal-website/sitemap-index.xml
     ```

---

## 3. Verificación

```bash
npm run check
npm run build
```

- Comprobar que en `dist/` se generan `sitemap-index.xml`, `sitemap-0.xml` y `robots.txt` con las rutas estáticas correctas.
