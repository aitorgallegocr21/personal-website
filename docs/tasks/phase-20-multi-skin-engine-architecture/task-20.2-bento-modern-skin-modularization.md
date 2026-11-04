# Task 20.2: Modularización del Skin Bento Moderno

**Status:** Planned  
**Scope:** `src/components/skins/bento/`, `src/pages/index.astro`, `src/components/portfolio/`

---

## 1. Objetivo Técnico
Modularizar la implementación visual existente del portfolio bajo la carpeta de skin `src/components/skins/bento/` sin alterar su comportamiento ni estilos, permitiendo que la página principal delegue el renderizado a un orquestador de skins limpio y escalable.

---

## 2. Especificación Detallada

1. **Reorganización Estructural:**
   - Crear el módulo `src/components/skins/bento/`:
     - `BentoHero.astro` (o referencia al Hero actual)
     - `BentoProjects.astro`
     - `BentoTimeline.astro`
     - `BentoCertifications.astro`
     - `BentoPhilosophy.astro`
     - `BentoContact.astro`
     - `BentoSkin.astro` (ensamblador maestro del skin Bento)
2. **Orquestador Principal (`src/pages/index.astro`):**
   - La página principal importa el orquestador de skin o el skin activo por defecto.
   - Preservación íntegra de la accesibilidad, IDs semánticos de anclaje (`#proyectos`, `#experiencia`, `#filosofia`, `#contacto`) para que la navegación de la barra de navegación continúe funcionando exactamente igual en cualquier skin.
3. **Preservación de Componentes Universales:**
   - Componentes transversales independientes del skin (como `Navbar.astro`, `Footer.astro`, `CertificateModal.astro` y `PhoneContact.astro`) permanecen en carpetas comunes (`src/components/common/` o `portfolio/`).

---

## 3. Verificación
```bash
npm run check
npm run build
```
- Verificar en navegador que `http://localhost:4321/personal-website/` es visualmente indistinguible del estado actual previo a la modularización.
