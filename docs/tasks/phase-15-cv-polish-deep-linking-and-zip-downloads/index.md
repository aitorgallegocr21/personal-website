# Phase 15: External Links Polish, Interactive Modal Deep-Linking & Zip Download Engine

**Status:** Completed  
**Branch:** `feat/phase-15-cv-polish-deep-linking-and-zip-downloads`  
**Core Mission:** Polish the CV layout margins, enhance bottom bar palette picker spacing, implement a robust URL deep-linking engine for credentials and vocational education (SMR) linking from the CV to the web document viewer modal, and upgrade the multi-document batch download to package all PDFs into a single `.zip` archive.

---

## 1. Context & Architectural Motivation

1. **CV Header Web Button Margin Inset:**
   - On the printable CV and in generated A4 PDFs, the "Web Personal" button sits flush against the right container edge, causing its right border to appear slightly clipped by print margins or overly close to the paper edge.
   - Adding an explicit right inset margin (`print:mr-2.5` / `mr-1 sm:mr-2`) pulls the badge cleanly inside the safe printable zone without impacting the vertical rhythm.

2. **Palette Selector Swatch Spacing in CV Floating Bar:**
   - In `CVPrintBar.astro`, the palette swatch circles use tight gap spacing (`gap-1.5`) while the active selection applies `ring-2`, `ring-offset-2`, and `scale-115`.
   - This causes the active ring and offset to visually encroach upon adjacent color circles.
   - Expanding the swatch gap to `gap-2.5 sm:gap-3` and tuning the active ring ensures pristine visual isolation between color options.

3. **Credential & Degree Deep-Linking Engine (CV -> Web Document Viewer):**
   - The visible certificates in the CV (`CVCertificates.astro`) and the CFGM SMR degree in `CVEducation.astro` should not just point to raw static PDF files; they should link to the canonical personal website with deep-link query parameters (`?doc=<id>`).
   - On page load, `CertificateModal.astro` detects the `doc` or `cert` query param, resolves the corresponding credential (from certifications or education), and smoothly opens the interactive modal viewer showing all PDF modules, viewer, and download options.
   - For the CV printable layout, linking must be done cleanly with zero height deformation to strictly maintain 1-page A4 balance.

4. **Single-Action ZIP Archive Download Engine:**
   - The "Descargar todos" button in `CertificateModal.astro` previously triggered sequential simulated anchor clicks, opening multiple browser file save dialogs.
   - By integrating `jszip`, all PDFs associated with a credential are asynchronously fetched into memory and bundled into a clean, uncorrupted `.zip` archive (e.g., `Certificados_<titulo>.zip`), triggering a single save prompt.

---

## 2. Tasks Breakdown

- [x] **[15.1 CV Header Button Margin Inset & Palette Swatch Spacing](task-15.1-cv-header-margin-and-palette-spacing.md)** — Pull "Web Personal" button inward away from print margins and increase spacing between palette selector swatches in the CV bar.
- [x] **[15.2 Document Viewer Deep-Linking Engine (Web Portfolio & CV)](task-15.2-document-viewer-deep-linking-engine.md)** — Implement query param listener in `CertificateModal.astro`, register degree credential, and update CV certificate and education links.
- [x] **[15.3 Single-Click Zip Archive Download Engine](task-15.3-zip-archive-batch-download-engine.md)** — Refactor multi-document batch download to bundle all PDFs into a single `.zip` file via `JSZip`.
- [x] **[15.4 Full Build, Multi-Palette PDF Regeneration & Layout Verification](task-15.4-a4-verification-and-multi-palette-build.md)** — Validate TypeScript compilation, build static routes, regenerate all 6 PDF palettes, and verify strict 1-page A4 alignment.
