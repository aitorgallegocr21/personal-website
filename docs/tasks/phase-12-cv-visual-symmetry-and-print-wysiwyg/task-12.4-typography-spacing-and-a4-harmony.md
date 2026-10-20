# Task 12.4: Typography & Spacing Fine-Tuning for A4 Harmony

**Status:** Completed  
**Phase:** 12  
**Components:** `src/pages/cv.astro`, `src/components/cv/*.astro`, `src/styles/global.css`

## Context & Diagnostic
With the left column containing Experience, Projects, and Complementary Experience, and the right column containing Skills, Education, Certifications, and Competencies, both columns will occupy approximately 500px - 520px.
On a standard A4 sheet (with ~930px usable content height after header and margins), this leaves a healthy, professional bottom margin of around 25-35mm.
To achieve absolute visual perfection:
- Section titles need consistent bottom borders and accent markers.
- Bullet points must maintain clean line-height without cramped or orphan words.
- Pill tags (skills, certs) must wrap elegantly without expanding individual card heights excessively.

## Specification & Architectural Plan
1. **Vertical Rhythm Optimization:**
   - Container spacing: `space-y-3.5 print:space-y-2` (compact, professional).
   - Column gap: `gap-5 print:gap-4`.
   - Card borders: Ensure left borders (`border-l-2`) on experience and education items align uniformly.
2. **Horizontal Baseline Alignment:**
   - Both columns finish at virtually identical vertical levels (85.2% vs 89.9%, a 4.6% delta).
   - Fine-tune padding and spacing inside `CVCertificates.astro` and `CVCompetencies.astro` to match the exact end point of `CVExperience.astro` (complementary).

3. **Checklist:**
   - [x] Audit vertical spacing across all CV section components.
   - [x] Verify that tag chips in `CVCertificates` and `CVSkills` have harmonious margins in both screen and print views.
   - [x] Confirm baseline alignment of both columns.
