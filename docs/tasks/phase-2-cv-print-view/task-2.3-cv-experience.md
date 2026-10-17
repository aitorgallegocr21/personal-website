# Task 2.3: Create CV Experience Component (CVExperience.astro)

## Objective
Build `src/components/cv/CVExperience.astro` displaying professional experience items that have `featuredInCV: true`, using anti-overflow print techniques.

## Context & Rules
- **Location:** `src/components/cv/CVExperience.astro`
- **Data Source:** `cvData.experience.filter(e => e.featuredInCV)`.
- **Print Rule:** Every card must include `break-inside-avoid`.

## Detailed Requirements
1. **Filtering:**
   - Filter experiences where `featuredInCV === true` (prioritizing NTT Data software internship and relevant technical roles).
2. **Card Structure:**
   - Role + Company + Location in primary row.
   - Date range (e.g. `2026-03 — 2026-04`) formatted with monospace date styling (`text-[11px] font-mono text-zinc-500`).
   - Bullet points rendered with concise typography (`text-[11px] leading-relaxed text-zinc-700`).
   - Tech tag list: inline badges (`text-[10px] font-mono bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded`).
3. **Break Avoidance:**
   - Apply `break-inside-avoid` to the container of each job entry.

## Acceptance Criteria
- [x] Only featured items render in CV view.
- [x] No hardcoded text; consumes SSOT.
- [x] Clean bullet alignment and typography.
