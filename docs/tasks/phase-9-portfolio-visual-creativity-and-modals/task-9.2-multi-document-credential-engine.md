# Task 9.2: Multi-Document & Credential Engine V2

**Status:** Completed (2026-10-20)
**Branch:** `feat/phase-9-portfolio-creativity-and-modals`

## Context & Problem
Currently, each certificate only supported a single `documentUrl?: string`. However:
- Several certifications (such as NTT Data Java, Unit Testing, Spring APIs, Prompt Engineering, Angular) possess multiple PDF files (main certificate plus multiple granular syllabus/content modules).
- Some courses lack a single "diploma" and only consist of multiple module PDFs.
- Previously, users could not view all related PDFs or download them cohesively; either only one arbitrary PDF was linked or content modules remained inaccessible from the UI.

## Requirements
1. **Schema Evolution (`src/types/resume.ts`):**
   - Extended `Certificate` interface with `CertificateDocument`:
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
   - Mapped all 34 certificate and modular PDFs across Java SE 8, Spring Boot, JUnit/Mockito, Angular (9 modules), BBDD (4 modules), Prompt Engineering (6 documents), and BIG School.
3. **Smart Modal Viewer (`CertificateModal.astro`):**
   - When a credential has **1 single document**: renders standard viewer with quick download & external tab button.
   - When a credential has **multiple documents**:
     - Provides an interactive horizontal tab bar inside the modal subheader to switch between PDFs smoothly.
     - Adds a "Descargar todos ({count})" batch download action that downloads all documents sequentially.
     - Clearly displays the document counter badge (`[1 de 4]`).
   - If a course only has module documents without a main diploma: immediately loads module 1 in preview while giving clear tabs to all remaining modules.
4. **Card UI Triggers (`Certifications.astro`):**
   - Displays a `{count} PDFs` badge when multiple documents exist.
   - Modal trigger button displays `Ver documentos ({count})` and passes structured document payload via `data-docs` attribute without requiring bundle bloat.

## Acceptance Criteria
- [x] Schema strictly typed with 0 `any`.
- [x] All multi-document certificates allow inspecting and downloading their associated PDFs.
- [x] UI provides clear indicator of document count and clean switching controls.
- [x] Accessible dismissal (Esc, close button, backdrop click) remains fully functional.
- [x] Verified build with `astro check && astro build` (0 errors, 0 warnings, 0 hints).
