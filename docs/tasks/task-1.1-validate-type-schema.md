# Task 1.1: Validate Strict Type Schema

## Objective
Ensure `src/types/resume.ts` defines complete, strictly-typed TypeScript interfaces covering all CV and portfolio requirements without any usage of `any`.

## Context & Architecture
- **Location:** `src/types/resume.ts`
- **SSOT Requirement:** Every field consumed in web and print templates must be strictly typed here first.
- **Rules:** Zero `any`. Optional fields must use explicit `?` markers with safe unions (`string | undefined`).

## Detailed Specifications
1. **`ContactInfo`:**
   - `name: string`
   - `title: string`
   - `email: string`
   - `phone?: string` (Must support undefined for unconfigured env vars)
   - `location: string`
   - `website: string`
   - `github: string`
   - `linkedin: string`
2. **`Experience` & `Project`:**
   - Must include `featuredInCV: boolean` to differentiate compact CV highlights from extended web portfolio content.
   - Include arrays for `technologies: string[]` and `bullets: string[]`.
3. **`Certificate`:**
   - Supported categories union: `'Java & Backend' | 'Frontend' | 'Bases de Datos' | 'Inteligencia Artificial' | 'Metodologías & Otros'`.
   - Optional fields: `hours?: string`, `date?: string`, `platform?: string`.
   - `featuredInCV: boolean` flag.
4. **`ResumeData` (Root Schema):**
   - Must contain `personal`, `about`, `skills`, `experience`, `projects`, `certificates`, `education`, and optional `languages`.

## Acceptance Criteria
- [ ] TypeScript compilation (`npm run check`) passes with 0 errors.
- [ ] No `any` type in `src/types/resume.ts`.
- [ ] Types exported and ready for consumption in `src/data/cv-data.ts`.
