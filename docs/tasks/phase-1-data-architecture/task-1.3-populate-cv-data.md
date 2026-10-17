# Task 1.3: Populate and Export CV Data (SSOT)

## Objective
Ensure `src/data/cv-data.ts` exports `cvData: ResumeData` with zero TypeScript errors, fully populated with verified biographical, technical, and academic records.

## Context & Inviolable Rules
- **Location:** `src/data/cv-data.ts`
- **Rule:** Golden Rule SSOT: Components must never hardcode bio copy. All text comes from this file.
- **Privacy Rule:** Personal phone must not be hardcoded in versioned git files.

## Detailed Requirements
1. **Import Strict Types:**
   - Import `ResumeData` from `@types/resume`.
2. **Sections to Validate:**
   - `personal`: Contact details, links (GitHub, LinkedIn, personal domain).
   - `about`: Concise summary for CV (`shortSummary`) and complete bio for web (`fullBio`).
   - `skills`: Categorized groups (`Lenguajes & Backend`, `Frontend & Web`, `Bases de Datos`, `Sistemas & Herramientas`).
   - `experience`: Items with `featuredInCV` flags appropriately configured.
   - `projects`: Projects with descriptions, tags, repo URLs.
   - `certificates`: NTT Data training, academic awards, courses with hours and categories.
   - `education`: DAM and SMR details.

## Acceptance Criteria
- [x] Export `const cvData: ResumeData`.
- [x] Strict TypeScript validation (`npm run check`) succeeds with 0 errors.
