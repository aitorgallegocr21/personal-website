# Task 21.2: Marcado Estructurado Schema.org en JSON-LD

**Status:** Planned  
**Scope:** `src/components/seo/JsonLd.astro`, `src/layouts/BaseLayout.astro`

---

## 1. Objetivo Técnico
Inyectar metadatos estructurados compatibles con Schema.org en formato JSON-LD en el `<head>` de `BaseLayout.astro`, facilitando que Google y otros motores de búsqueda extraigan rich snippets con información del autor, experiencia profesional, educación y perfiles sociales directamente desde el SSOT `cvData`.

---

## 2. Especificación Detallada

1. **Componente `src/components/seo/JsonLd.astro`:**
   - Generación de objeto estructurado conforme al vocabulario Schema.org:
     - `@context`: `"https://schema.org"`
     - `@graph`:
       - Tipo `ProfilePage`: URL canónica, nombre del sitio, descripción, idioma.
       - Tipo `Person`:
         - `name`: `cvData.personal.name`
         - `jobTitle`: `cvData.personal.title`
         - `description`: `cvData.about.shortSummary`
         - `url`: web personal
         - `image`: URL absoluta del avatar
         - `sameAs`: array con perfiles sociales (GitHub, LinkedIn, Twitter)
         - `knowsAbout`: array de habilidades extraído de `cvData.skills`
         - `alumniOf`: instituciones educativas extraídas de `cvData.education`
2. **Integración:**
   - Incluir `<JsonLd />` dentro del `<head>` en `src/layouts/BaseLayout.astro`.

---

## 3. Verificación
- Inspección del código fuente HTML generado para comprobar que el script JSON-LD contiene JSON válido y escapado.
- Pasar el marcado por la herramienta de validación de Schema.org / Google Rich Results Test.
