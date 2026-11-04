# Phase 20: Arquitectura del Motor Multi-Skin

**Status:** Planned  
**Branch:** `feat/phase-20-multi-skin-engine-architecture`  
**Core Mission:** Diseñar e implementar la infraestructura arquitectónica para soportar **múltiples estilos visuales completos (Skins)** en el portfolio web, preservando intactos los datos de la fuente única de verdad (`cvData`), modularizando el diseño actual como el skin predeterminado (`bento-modern`), y proveyendo un mecanismo de selección e intercambio fluido tanto en UI como en almacenamiento local.

---

## 1. Contexto & Objetivos

1. **Visión Multi-Skin:**
   - El proyecto cuenta actualmente con un diseño visual excelente basado en tarjetas Bento y estética oscura tecnológica moderna.
   - En el futuro, se añadirán estilos completamente diferentes (p. ej. estética terminal retro, diseño editorial clásico, neo-brutalismo, etc.) donde la disposición, tipografía, bordes y representación de cada objeto cambiarán por completo.
   - En lugar de reescribir la página o duplicar componentes y datos, el sistema debe operar con una arquitectura de **Skins intercambiables**: cada Skin es una implementación visual completa que implementa el mismo contrato de secciones y consume el mismo SSOT `cvData`.
2. **Modularización del Skin Actual (`bento-modern`):**
   - El conjunto de componentes actual (`Hero`, `ProjectsGrid`, `Timeline`, `Certifications`, `EngineeringPhilosophy`, `ContactSection`) se organiza bajo la carpeta `src/components/skins/bento/`.
   - Cero cambios visuales: el usuario final verá exactamente la misma página al 100%.
3. **Selector y Persistencia:**
   - Creación de `src/types/skin.ts`, `src/lib/skin-manager.ts` y un control UI intuitivo integrado en el menú de estilos (`SkinSwitcher.astro`) para permitir seleccionar el skin activo y persistirlo en `localStorage` (`portfolio-skin`).

---

## 2. Índice de Tareas

- [x] **[Task 20.1: Definición de Tipos, Contratos y Registro de Skins](task-20.1-skin-contracts-and-types.md)** — Creación de `src/types/skin.ts` y `src/components/skins/registry.ts`.
- [ ] **[Task 20.2: Modularización del Skin Bento Moderno](task-20.2-bento-modern-skin-modularization.md)** — Organización de los componentes actuales en `src/components/skins/bento/` e integración en el orquestador principal.
- [ ] **[Task 20.3: Motor de Estado de Skin y Selector UI](task-20.3-skin-manager-and-ui-selector.md)** — Implementación de `skin-manager.ts` con persistencia en `localStorage`, inicialización zero-FOUC y selector visual accesible.

---

## 3. Criterios de Aceptación & Verificación

- La página principal (`/`) continúa renderizando el diseño Bento actual de manera 100% idéntica.
- El registro de skins expone formalmente la lista extensible de estilos.
- El selector de skins permite alternar o dejar seleccionado el skin activo.
- `npm run check`, `npm test` y `npm run build` pasan con 0 errores.
