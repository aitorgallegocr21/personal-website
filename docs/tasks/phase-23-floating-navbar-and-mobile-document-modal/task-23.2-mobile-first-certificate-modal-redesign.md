# Task 23.2: Mobile-First Certificate Modal Redesign

**Status:** Pending  
**Assignee:** Agent  
**Context:** `CertificateModal.astro` and `src/lib/modal-manager.ts` display documents inside a desktop-centric dialog. On mobile screens, iframe-embedded PDFs suffer from browser rendering limitations (especially on iOS Safari), action buttons cause header wrapping and overflow, and multi-document tab scrolling needs enhanced touch usability.

---

## Technical Objectives

1. **Responsive Modal Container & Geometry:**
   - On mobile screens (< 640px), expand the modal container to optimal viewing proportions (full viewport height or maximized sheet with minimal outer margins, `h-full sm:h-[90vh] rounded-none sm:rounded-2xl`).
   - Remove clunky outer padding on phones to provide maximum visual area for document review.

2. **Mobile-Optimized Header & Actions:**
   - Re-architect modal header action bar to avoid wrapping:
     - Group secondary actions or adapt labels dynamically (e.g. icon-only or shortened labels on mobile: "Descargar PDF" -> icon with tooltip or compact badge; "Descargar todos (ZIP)" -> "ZIP" / icon with badge on small viewports).
     - Keep title and credential counter visible and truncated gracefully.
     - Ensure prominent and easy-to-tap close button (`min-h-[44px] min-w-[44px]` touch target).

3. **Touch-Friendly Multi-Document Navigation:**
   - Enhance `#cert-modal-nav-container` with smooth horizontal touch-scrolling (`overflow-x-auto scrollbar-none`), tactile pill tab buttons, and active indicator tokens using `var(--color-accent)`.
   - Show document index badge and clear module names.

4. **Mobile PDF Viewing Resilience & Fallback Engine:**
   - Introduce an intelligent mobile helper / banner inside the viewer body:
     - When viewed on mobile devices where PDF iframes have inconsistent inline scrolling, surface a sleek floating/top banner: "Vista previa de documento · Toca para abrir o descargar".
     - Provide immediate high-visibility quick actions: "Abrir en pestaña nueva" (opens browser's native PDF reader) and "Descargar PDF".
     - Maintain the standard iframe viewer on desktop browsers where native PDF controls are well supported.

---

## Verification Plan

1. Test single-document certificates (e.g. Prompt Engineering, SQL) on mobile and desktop viewports.
2. Test multi-document credentials (e.g. NTT Data Java backend modules) with 4 PDFs and batch ZIP download.
3. Test education diploma modal trigger from Bento timeline.
4. Verify ZIP generation feedback and single PDF direct download on mobile viewports.
5. Confirm no visual overflows, clipping, or broken buttons across all screen widths.
