# Task 19.2: Hardening de Cabeceras de Seguridad en public/_headers

**Status:** Planned  
**Scope:** `public/_headers`

---

## 1. Objetivo Técnico
Blindar la seguridad de la entrega web estática en producción incorporando directivas y cabeceras de respuesta HTTP estándar de la industria, previniendo ataques de tipo Clickjacking, Cross-Site Scripting (XSS), MIME sniffing e interceptación no autorizada de APIs de hardware.

---

## 2. Especificación Detallada

1. **Cabeceras Globales (`/*`):**
   - `X-Frame-Options: DENY`: Evita que el portfolio sea embebido en iframes externos maliciosos.
   - `X-Content-Type-Options: nosniff`: Previene que el navegador interprete archivos con tipos MIME erróneos.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Protege la privacidad del usuario al seguir enlaces salientes.
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`: Bloquea el acceso a sensores y periféricos innecesarios.
   - `Content-Security-Policy`:
     - `default-src 'self'`
     - `script-src 'self' 'unsafe-inline'` (requerido para scripts de inicialización zero-FOUC y temas)
     - `style-src 'self' 'unsafe-inline'`
     - `img-src 'self' data: https:` (soporte de avatares y logos externos)
     - `font-src 'self' data:`
     - `connect-src 'self'`
     - `frame-ancestors 'none'`
2. **Caché de Activos Estáticos (`/_astro/*` y `/images/*`):**
   - Preservar `Cache-Control: public, max-age=31536000, immutable` para hashes inmutables de Vite/Astro.

---

## 3. Verificación
- Revisión de sintaxis de `public/_headers`.
- Comprobar que en local `npm run preview` o inspección de cabeceras no bloquea la carga de estilos, iconos ni imágenes locales.
