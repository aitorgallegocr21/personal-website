# Phase 17: CV Editorial Balance & Right-Column Polish

**Status:** Completed  
**Branch:** `feat/cv-details-and-tweaks`  
**Core Mission:** Rebalance the printable CV (`/cv`) layout by decompressing the right column (5 cols) to eliminate visual overcrowding and tight line-heights. Adjust typography, badge paddings, inter-section rhythm, and trait descriptions across `CVSkills.astro`, `CVCertificates.astro`, `CVPersonalProfile.astro`, and `CVCompetencies.astro`. Equalize vertical baseline parity between the left and right columns while strictly preserving the 1-page A4 print format across all 6 palettes.

---

## 1. Context & Motivation

* **Visual Disparity Identified:** The left column (7 cols) displayed education, tech experience, and software projects with comfortable leading (`leading-snug`), balanced bullet spacing, and natural breathing room. In contrast, the right column (5 cols) previously compressed skills, certificates, traits, and languages with ultra-compact margins (`print:space-y-1`, `leading-tight`, `print:py-0.2`), leaving a 70.5px vertical gap at the bottom right.
* **Goal Achieved:** Distributed vertical space harmoniously across the right column components so that both columns align with subpixel parity (reduced from 70.5px difference down to 0.6px difference) while preserving strictly 1 A4 page across all 6 color palettes.

---

## 2. Implementation Summary

1. **`src/pages/cv.astro`:**
   - Relaxed side-column container spacing from `space-y-3.5 print:space-y-2` to `space-y-4 print:space-y-3`.
2. **`src/components/cv/CVSkills.astro`:**
   - Increased category spacing from `print:space-y-1.5` to `print:space-y-2`.
   - Adjusted pill vertical padding from `print:py-0.2` to `print:py-0.5` and category bottom margin from `print:mb-0.5` to `print:mb-1`.
3. **`src/components/cv/CVCertificates.astro`:**
   - Expanded badge gap from `print:gap-1` to `print:gap-1.5`.
   - Increased badge typography to `text-[10.5px] print:text-[10px]`.
4. **`src/components/cv/CVPersonalProfile.astro`:**
   - Loosened line-heights on trait titles and descriptions (`leading-snug`, `leading-relaxed print:leading-snug`) instead of `leading-tight`.
   - Increased spacing between traits from `space-y-2 print:space-y-1.5` to `space-y-2.5 print:space-y-2`.
   - Expanded left accent border padding from `pl-2` to `pl-2.5`.
5. **`src/components/cv/CVCompetencies.astro`:**
   - Expanded language row spacing from `space-y-1` to `space-y-1.5 print:space-y-1.5`.
   - Increased divider padding from `pt-2 print:pt-1` to `pt-2 print:pt-1.5`.
6. **Tooling & Build:**
   - Excluded local `chrome/` in `tsconfig.json` and `.gitignore`.
   - Automatically detected local Chrome in `scripts/generate-pdf.mjs`.

---

## 3. Verification & Metrics

- **TypeScript / Astro Check:** 0 errors, 0 warnings, 0 hints.
- **Column Baseline Parity:**
  - Before: Left height 829.4px vs Right height 758.9px (diff: 70.5px unutilized space).
  - After: Left height 829.4px vs Right height 828.8px (diff: 0.6px, exact baseline parity).
- **A4 PDF Page Count:** Exactly 1 page for canonical `cv-aitor-gallego.pdf` and all 6 palettes (`emerald`, `slate`, `sky`, `violet`, `rose`, `monochrome`).
