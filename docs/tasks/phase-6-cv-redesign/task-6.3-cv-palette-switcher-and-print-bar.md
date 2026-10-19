# Task 6.3: Dynamic Print Palette Switcher in CVPrintBar

## Objective
Enhance the floating action toolbar `CVPrintBar.astro` to include an interactive color palette selector allowing recruiters or the user to preview and export the CV in different accent colors (Emerald, Slate/Navy, Sky, Violet, Rose, Monochrome).

## Context & Artifacts
- **Files:** `src/components/cv/CVPrintBar.astro`, `src/pages/cv.astro`, `src/styles/global.css`

## Detailed Requirements
1. **Interactive Palette Selector:**
   - Floating pills with color swatches in `CVPrintBar.astro`.
   - Modifies CSS print accent variables dynamically via data attributes on the CV container.
   - Hidden during actual print (`print:hidden`).
2. **Preset Accents:**
   - Tech Emerald (Default)
   - Slate / Navy Blue (Corporate / Executive)
   - Sky Blue (Modern tech)
   - Pure Monochrome (Standard black & white)

## Acceptance Criteria
- [x] Changing swatch updates CV accent highlights in real time.
- [x] Exporting to PDF via browser print preserves the currently selected color theme.
- [x] Toolbar hides completely during print.
