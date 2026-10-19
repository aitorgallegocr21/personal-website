# Task 7.2: Navigation & CV Trigger Verification

## 1. Problem Description
Users attempting to access the Curriculum Vitae must have a seamless, uninterrupted route to `/cv`. If the modal was previously stuck open or intercepting clicks, navigation felt blocked. Furthermore, all CTA buttons targeting the CV must use correct base URLs and semantic markup.

---

## 2. Technical Requirements
1. **Hero CV Link:** Verify [`src/components/portfolio/Hero.astro`](src/components/portfolio/Hero.astro) correctly points to `/cv` with `${import.meta.env.BASE_URL.replace(/\/$/, '')}/cv` and does not trigger document modal handlers.
2. **Navbar CV Link:** Verify [`src/components/portfolio/Navbar.astro`](src/components/portfolio/Navbar.astro) "CV PDF" button cleanly navigates to the dedicated A4 printable view.
3. **Footer CV Link:** Verify [`src/components/portfolio/Footer.astro`](src/components/portfolio/Footer.astro) CV icon link functions properly.
4. **Clean Click Delegation:** Ensure event delegation in `CertificateModal.astro` ignores links that do not have `data-doc-url`.

---

## 3. Acceptance Criteria
- [x] Clicking "Ver CV (PDF A4)" in Hero immediately takes the user to `/cv` (or `/personal-website/cv`).
- [x] Clicking "CV PDF" in Navbar immediately navigates to `/cv`.
- [x] No modal is opened when clicking general links or navigation anchors.
