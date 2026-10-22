# Task 15.1: CV Header Button Margin Inset & Palette Swatch Spacing

**Status:** Completed  
**Scope:** `src/components/cv/CVHeader.astro`, `src/components/cv/CVPrintBar.astro`

---

## 1. Objectives

1. In `CVHeader.astro`, adjust the "Web Personal" anchor button positioning so that in print and screen views it sits slightly inset from the right container edge (`mr-1 sm:mr-2 print:mr-2.5`), preventing the button's right border from being trimmed or touching the PDF paper edge.
2. In `CVPrintBar.astro`, increase the flex gap between palette selector swatches (`gap-2.5 sm:gap-3`) and adjust the active ring outline so that the active state never overlaps or encroaches upon adjacent color swatches.

---

## 2. Technical Implementation Details

- **`CVHeader.astro`:**
  - Added `mr-1 sm:mr-2 print:mr-2.5` to the `<a>` tag for `personal.website`.
  - Maintained right alignment with the `// Contacto` section harmoniously.
- **`CVPrintBar.astro`:**
  - Updated swatch container to `gap-2.5 sm:gap-3`.
  - Tuned active ring in JavaScript `applyPalette`:
    Applied `ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110`. With 10px flex gap, the 2px ring + 2px offset is completely isolated with generous breathing space from neighboring swatches.

---

## 3. Verification Criteria

- [x] "Web Personal" button has clear visual breathing space inside the right margin on `/cv` and in generated PDF.
- [x] Clicking any color swatch in `CVPrintBar.astro` shows the active ring without touching or obscuring adjacent circles.
- [x] No regression in layout height or existing styles.
