# Task 5.6: In-Page Certificate Viewer Modal

## Objective
Implement an accessible in-page preview modal/drawer to inspect and download official course certificates and vocational degree documents without leaving the page.

## Context & Artifacts
- **Files:** `src/components/portfolio/CertificateModal.astro`, `src/components/portfolio/Certifications.astro`, `src/components/portfolio/Timeline.astro`
- **Asset Directory:** `public/docs/certificates/`

## Detailed Requirements
1. **Interactive Trigger:**
   - Add a *"Ver credencial"* / *"Ver documento"* button on each certification card and educational milestone that has a `documentUrl` configured.
2. **Modal Viewer Architecture:**
   - Render a centered dialog with glassmorphism backdrop (`backdrop-blur-md bg-zinc-950/80`).
   - Embed document viewer (`<iframe>` or `<img>` based on file extension).
   - Action toolbar with "Descargar PDF" button (`download` attribute) and "Cerrar" button.
3. **Accessibility & Zero-Overhead:**
   - Accessible keyboard controls (`Escape` to close, `Tab` trap).
   - Zero heavyweight external PDF libraries (uses native browser rendering).

## Acceptance Criteria
- [x] Modal opens smoothly on clicking a certificate document trigger.
- [x] Clicking backdrop or pressing `Escape` closes the modal immediately.
- [x] Download button provides the exact file with proper filename.
