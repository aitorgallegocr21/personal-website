# Task 2.2: Create CV Header Component (CVHeader.astro)

## Objective
Build `src/components/cv/CVHeader.astro` to display candidate identity, professional title, contact data, and key external profile links compactly.

## Context & SSOT
- **Location:** `src/components/cv/CVHeader.astro`
- **Data Source:** `cvData.personal` from `@data/cv-data`.
- **Constraint:** Zero hardcoded text.

## Detailed Requirements
1. **Candidate Identity:**
   - Full Name: `text-2xl font-bold tracking-tight text-zinc-900`.
   - Professional Role / Title: `text-sm font-medium text-zinc-600`.
2. **Contact Row:**
   - Location, Email (`mailto:` link), GitHub (`github.com/aitorgcr`), LinkedIn (`linkedin.com/in/...`), and optional Phone (`tel:` link).
   - Compact horizontal flex wrap layout with bullet or icon separators.
3. **Short Summary / Executive Summary:**
   - Display `cvData.about.shortSummary` in `text-[11.5px] text-zinc-700 leading-snug`.

## Acceptance Criteria
- [ ] Header consumes only typed data from SSOT.
- [ ] Layout height remains ultra-compact (<70mm) to reserve room for experience and skills.
