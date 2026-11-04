# Task 20.1: Definición de Tipos, Contratos y Registro de Skins

**Status:** Completed  
**Scope:** `src/types/skin.ts`, `src/components/skins/registry.ts`, `tests/unit/skin-registry.test.ts`

---

## 1. Objetivo Técnico

Modelar el sistema de tipos y el catálogo centralizado de skins para el portfolio web, formalizando las propiedades que identifican cada diseño visual completo (identificador único, nombre descriptivo, autor, versión, preview/icono y capacidades).

---

## 2. Especificación Detallada

1. **Tipos en `src/types/skin.ts`:**
   ```typescript
   export type SkinId = 'bento-modern' | string;

   export interface SkinMetadata {
     id: SkinId;
     name: string;
     tagline: string;
     description: string;
     badge?: string;
     author?: string;
   }
   ```
2. **Registro de Skins (`src/components/skins/registry.ts`):**
   - Catálogo ordenado de skins soportados.
   - Constante `DEFAULT_SKIN_ID = 'bento-modern'`.
   - Función auxiliar `getSkinMetadata(id: string): SkinMetadata`.
   - Listado preparado para recibir futuros skins (marcando provisionalmente como disponibles o futuros).

---

## 3. Verificación

```bash
npm run check
npm run test
```
