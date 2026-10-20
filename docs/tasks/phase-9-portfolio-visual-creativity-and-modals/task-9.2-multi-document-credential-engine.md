# Task 9.2: Multi-Document & Credential Engine V2

**Status:** Planned
**Branch:** `docs/phase-9-portfolio-visual-creativity-and-modals`

## Context & Problem
Currently, each certificate only supports a single `documentUrl?: string`. However:
- Several certifications (such as NTT Data Java, Unit Testing, Spring APIs, Prompt Engineering, Angular) possess multiple PDF files (main certificate plus multiple granular syllabus/content modules).
- Some courses lack a single "diploma" and only consist of multiple module PDFs.
- Currently, users cannot view all related PDFs or download them cohesively; either only one arbitrary PDF is linked or content modules remain completely inaccessible from the UI.

## Requirements
1. **Schema Evolution (`src/types/resume.ts`):**
   - Extend `Certificate` interface:
     ```typescript
     export interface CertificateDocument {
       title: string;
       url: string;
       type?: 'main' | 'module' | 'syllabus';
     }

     export interface Certificate {
       // ... existing fields ...
       documentUrl?: string; // Main credential fallback
       documents?: CertificateDocument[]; // Multiple documents support
     }
     ```
2. **SSOT Update (`src/data/cv-data.ts`):**
   - Map existing certificates to their corresponding PDF files in `public/docs/certificates/`.
3. **Smart Modal Viewer (`CertificateModal.astro`):**
   - When a credential has **1 single document**: render standard viewer with quick download & external tab button.
   - When a credential has **multiple documents**:
     - Provide an interactive tab bar / selector inside the modal header/sidebar to switch between PDFs smoothly.
     - Add a "Descargar todos" (or batch download action) and clearly display the document counter (e.g. `[1 de 4 documentos]`).
   - If a course only has module documents without a main diploma: allow previewing each module via the document selector, or prompt direct download/viewing with clear indicators.
4. **Card UI Triggers (`Certifications.astro`):**
   - Display a badge or indicator when multiple documents exist (e.g., `"3 documentos disponibles"`).
   - Modal trigger button passes structured document payload via `data-*` attributes without requiring external bundle bloat.

## Acceptance Criteria
- [ ] Schema strictly typed with 0 `any`.
- [ ] All multi-document certificates allow inspecting and downloading their associated PDFs.
- [ ] UI provides clear indicator of document count and clean switching controls.
- [ ] Accessible dismissal (Esc, close button, backdrop click) remains fully functional.
