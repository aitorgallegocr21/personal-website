# Task 15.2: Document Viewer Deep-Linking Engine (Web Portfolio & CV)

**Status:** Completed  
**Scope:** `src/components/portfolio/CertificateModal.astro`, `src/components/cv/CVCertificates.astro`, `src/components/cv/CVEducation.astro`, `src/data/cv-data.ts`

---

## 1. Objectives

1. Allow direct deep-linking to credentials from external links or CV PDF via URL query parameter (`?doc=<id>` or `?cert=<id>`).
2. On page load in the web portfolio (`/`), `CertificateModal.astro` reads the query param, looks up the corresponding item from credentials or education, and automatically opens the document viewer modal.
3. Update `CVCertificates.astro` so that each featured certificate button links directly to `${cvData.personal.website}/?doc=${cert.id}#certificaciones` (canonical site URL).
4. Update `CVEducation.astro` so that the CFGM SMR degree links to `${cvData.personal.website}/?doc=gm-smr#trayectoria`, without adding vertical height or deforming the CV.

---

## 2. Technical Implementation Details

- **Modal Registry / Lookup in `CertificateModal.astro`:**
  - Built `docRegistry` containing every certificate and the CFGM SMR title, serialized into `<script id="doc-registry-data" type="application/json">`.
  - Added `checkUrlDeepLink` on `DOMContentLoaded`: reads `?doc=` or `?cert=`, retrieves data, and triggers `openCertificateModal(...)`.
  - On modal close, query parameters are gracefully stripped from `window.location` via `history.replaceState` to maintain clean URL state.
- **CV Components Update:**
  - In `CVCertificates.astro`: configured `href={`${websiteUrl}/?doc=${cert.id}#certificaciones`}`.
  - In `CVEducation.astro`: for items with `documentUrl` (specifically SMR), linked to `${websiteUrl}/?doc=gm-smr#trayectoria`.
  - Box dimensions, text sizes, and padding are 100% identical, preserving millimeter layout parity.

---

## 3. Verification Criteria

- [x] Navigating to `/?doc=java-se-8-programmer` immediately opens the modal with the Java SE 8 credential.
- [x] Navigating to `/?doc=gm-smr` immediately opens the modal with the CFGM SMR official provisional title.
- [x] In `/cv`, clicking a certificate or the SMR degree navigates to the web viewer with that document loaded.
- [x] Strict 1-page A4 height is preserved with 0 mm shift.
