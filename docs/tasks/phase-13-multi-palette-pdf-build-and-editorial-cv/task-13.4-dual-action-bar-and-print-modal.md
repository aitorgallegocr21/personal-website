# Task 13.4: Dual-Action CV Print Bar & Layout Warning Modal

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** In Progress  

---

## 1. Intent & Scope
Redesign `CVPrintBar.astro` to feature a dual-action interface:
1. **Primary Button:** "Descargar PDF" — instantly initiates download of the precompiled A4 PDF matching the active color palette.
2. **Secondary Button:** "Imprimir" — triggers an accessible modal explaining that local browser/printer settings can distort layout and advising to use the precompiled PDF instead. If the user accepts, it proceeds to `window.print()`.

---

## 2. Implementation Steps
1. **Dual Action Buttons in `CVPrintBar.astro`:**
   - Primary: `<a id="download-pdf-btn" href="..." download class="...">` with `Download` icon and active palette URL binding (`/cv/cv-aitor-gallego-[palette].pdf` or base URL equivalent).
   - Secondary: `<button id="open-print-modal-btn" class="...">` with `Printer` icon.
2. **Warning Modal Component / Markup:**
   - Render a high-contrast modal dialog:
     - Heading: *"Recomendación de Impresión"*
     - Body: *"El diálogo de impresión del navegador puede alterar márgenes, fuentes y colores según tu sistema operativo o escala de pantalla. Para obtener el diseño 100% exacto y calibrado, te recomendamos descargar el PDF oficial generado."*
     - Action buttons:
       - *"Descargar PDF Oficial"* (primary, downloads precompiled file and closes modal).
       - *"Imprimir de todos modos"* (secondary text link, closes modal and triggers `window.print()`).
       - Cancel / Close icon button (`Escape` key support, click-outside dismissal).
3. **Accessibility:**
   - Trapped focus, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

---

## 3. Verification Criteria
- Clicking "Descargar PDF" initiates download of the appropriate precompiled PDF without dialogs.
- Clicking "Imprimir" opens the warning modal.
- "Imprimir de todos modos" executes `window.print()`.
- "Descargar PDF Oficial" triggers download.
