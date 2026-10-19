# Task 7.1: Modal Architecture Bugfix & Native Dialog Reset

## 1. Problem Description & Root Cause Analysis

### Visual Bug Reported
When a user navigates to the root web portfolio (`/` or `/personal-website/`), the `CertificateModal` (`Visor de Documento`) appears immediately rendered on top of the hero section without the user having clicked any certificate trigger:
1. The modal iframe is completely white and blank (`src=""`).
2. Clicking the close button (`X`) does not dismiss or hide the modal.
3. Clicking the backdrop or outside container does not close it.
4. Clicking "Descargar PDF" initiates a download of an empty document or the current page HTML (since `href="#"`).
5. Clicking "Abrir" opens the exact same page in a new tab because `href="#"`.

### Root Cause
1. **CSS Selector Clash with Tailwind v4:**
   In [`src/components/portfolio/CertificateModal.astro`](src/components/portfolio/CertificateModal.astro#L7), the HTML `<dialog>` tag has the classes:
   ```html
   class="... flex items-center justify-center border-0 open:flex"
   ```
   In modern CSS and browsers, native `<dialog>` elements without the `open` attribute are by default styled by the user-agent as `display: none`.
   However, applying the utility class `flex` directly on `<dialog>` **overrides the native `display: none`** with `display: flex !important` or high-specificity rule, forcing the modal to be permanently visible upon initial DOM rendering even before `modal.showModal()` is invoked.
2. **Missing `hidden` state when closed:**
   The dialog must use `dialog:not([open]) { display: none !important; }` or standard dialog patterns where `open:flex hidden` or `data-[state=open]` ensures `display: none` unless open.
3. **Empty Anchor Fallbacks:**
   When the modal is not open with a valid document URL, the download anchor defaults to `href="#"` and external link to `href="#"`, causing strange browser behaviors if clicked prematurely.

---

## 2. Technical Solution Specification

### File: `src/components/portfolio/CertificateModal.astro`

1. **Fix Dialog Display Rules:**
   - Change the `<dialog>` class declaration from `flex ... open:flex` to:
     ```html
     class="fixed inset-0 m-0 h-screen w-screen max-h-none max-w-none bg-transparent p-4 sm:p-6 md:p-10 backdrop:bg-zinc-950/80 backdrop:backdrop-blur-md z-50 items-center justify-center border-0 open:flex hidden"
     ```
     Or explicitly declare scoped CSS:
     ```css
     dialog:not([open]) {
       display: none !important;
     }
     dialog[open] {
       display: flex !important;
     }
     ```
2. **Improve Modal State Machine & Reset:**
   - In `closeCertificateModal()`, reset title, subtitle, download link, external link, and iframe `src`:
     ```ts
     modalIframe.src = 'about:blank';
     ```
   - Ensure `modal.close()` properly toggles the `[open]` attribute.
   - Prevent click event bubbling when clicking inside `#cert-modal-container` to avoid false triggers.
3. **Esc Key & Backdrop Dismissal:**
   - Verify `dialog::backdrop` click detection:
     ```ts
     modal.addEventListener('click', (e) => {
       const rect = modalContainer.getBoundingClientRect();
       const isInDialog = (
         rect.top <= e.clientY &&
         e.clientY <= rect.top + rect.height &&
         rect.left <= e.clientX &&
         e.clientX <= rect.left + rect.width
       );
       if (!isInDialog) {
         closeCertificateModal();
       }
     });
     ```
4. **Safety Defaults for Action Buttons:**
   - Hide or disable `cert-modal-download` and `cert-modal-external` if `url` is missing or invalid.

---

## 3. Step-by-Step Implementation Plan

1. **Step 1:** Modify `src/components/portfolio/CertificateModal.astro` with scoped dialog styles ensuring `display: none` when closed and `display: flex` when `[open]`.
2. **Step 2:** Refactor the client script to handle exact close button clicks, escape key events, body scroll lock/unlock, and container bounding-box backdrop dismiss.
3. **Step 3:** Validate manual triggers in `src/components/portfolio/Certifications.astro` and `src/components/portfolio/Timeline.astro`.
4. **Step 4:** Run `npm run check` and `npm run build` to confirm 0 compile errors.
5. **Step 5:** Manually test in browser dev mode:
   - Initial load: modal is completely invisible.
   - Clicking a certificate: modal pops up with correct PDF in iframe, title, and working download button.
   - Clicking `X`, `Escape`, or outside backdrop closes the modal cleanly.

---

## 4. Acceptance Criteria

- [ ] On initial page load (`/` and `/personal-website/`), no modal is visible.
- [ ] Clicking on any credential or certificate card opens the modal with the matching PDF.
- [ ] Clicking the `X` button closes the modal immediately.
- [ ] Clicking outside the modal container (the dark backdrop) closes the modal.
- [ ] Pressing the `Escape` key closes the modal and restores scrolling.
- [ ] "Descargar PDF" downloads the legitimate `.pdf` file with correct filename.
- [ ] `npm run build` passes with 0 errors.
