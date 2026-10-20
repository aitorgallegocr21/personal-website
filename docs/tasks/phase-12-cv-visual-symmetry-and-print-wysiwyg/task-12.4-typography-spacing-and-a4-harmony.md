# Task 12.4: Typography & Spacing Fine-Tuning for A4 Harmony

**Status:** Ready to Implement  
**Phase:** 12  
**Components:** `src/pages/cv.astro`, `src/components/cv/*.astro`

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
   - Both columns should finish at approximately the same vertical distance from the page footer.
   - Fine-tune padding and spacing inside `CVCertificates.astro` and `CVCompetencies.astro` to match the exact end point of `CVExperience.astro` (complementary).

3. **Checklist:**
   - [ ] Audit vertical spacing across all CV section components.
   - [ ] Verify that tag chips in `CVCertificates` and `CVSkills` have harmonious margins in both screen and print views.
   - [ ] Confirm baseline alignment of both columns.
