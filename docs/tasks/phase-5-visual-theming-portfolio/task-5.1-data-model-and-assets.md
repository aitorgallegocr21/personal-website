# Task 5.1: Data Model & Asset Infrastructure

## Objective
Extend the Single Source of Truth (SSOT) architecture in `src/types/resume.ts` and `src/data/cv-data.ts` to support dynamic birthdate/age calculation, project images, current project status, certificate document URLs, and hospitality location mapping.

## Context & Artifacts
- **Files:** `src/types/resume.ts`, `src/data/cv-data.ts`, `src/utils/date.ts` (or inline helper)
- **Asset Directories:** `public/images/`, `public/images/projects/`, `public/docs/certificates/`

## Detailed Requirements
1. **Schema Extensions (`src/types/resume.ts`):**
   - Add `birthDate: string` (`YYYY-MM-DD`) and `avatarUrl?: string` to `PersonalInfo`.
   - Add `image?: string`, `isCurrentProject?: boolean` to `Project`.
   - Add `documentUrl?: string` to `Certificate` and `Education`.
   - Add `locationUrl?: string` (Google Maps link) to `Experience`.
2. **Dynamic Age Helper:**
   - Create a deterministic calculation utility that computes current age based on `birthDate` (DOB: 2007-02-21 -> 19 years old) so manual updates are never required.
3. **SSOT Centralization (`src/data/cv-data.ts`):**
   - Incorporate `birthDate: "2007-02-21"`.
   - Centralize valid social links (`github`, `linkedin`, `email`).
   - Add metadata placeholders for projects, hospitality company name in Arenas de San Juan, and certificate documents.

## Acceptance Criteria
- [ ] TypeScript schemas compiled strictly with 0 `any`.
- [ ] Age calculates dynamically to 19 years old (and updates automatically every Feb 21).
- [ ] Asset directories prepared with `.gitkeep` files.
- [ ] `npm run check` and `npm run build` exit with code 0.
