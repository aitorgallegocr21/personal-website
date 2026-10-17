# Task 2.5: Create CV Certificates Component (CVCertificates.astro)

## Objective
Build `src/components/cv/CVCertificates.astro` to highlight high-impact training and certifications (e.g. NTT Data specialized program, Cisco/Linux modules) that have `featuredInCV: true`.

## Context & SSOT
- **Location:** `src/components/cv/CVCertificates.astro`
- **Data Source:** `cvData.certificates.filter(c => c.featuredInCV)` and `cvData.education`.

## Detailed Requirements
1. **Filtering & Layout:**
   - Display items where `featuredInCV === true`.
   - Title + Issuer + Date + Hours (e.g. `NTT Data Technical Training | 120h | 2026`).
2. **Compact Description:**
   - Single-line summary or 2 bullet points detailing tech outcomes (Java, Spring Boot, Angular).
3. **Break Avoidance:**
   - Apply `break-inside-avoid`.

## Acceptance Criteria
- [x] Only featured certificates displayed.
- [x] Clear typography matching Swiss print scale (`text-[11px]`).
