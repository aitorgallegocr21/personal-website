# Task 2.7: CV Floating Utility Toolbar

## Objective
Add a floating utility bar on `/cv` with an action button triggering browser print dialog (`window.print()`), hidden completely on print output (`print:hidden`).

## Context & User Experience
- **Location:** `src/components/cv/CVPrintBar.astro` (or integrated in `/cv`)
- **Behavior:** Fixed bottom or top right on screen, disappears during paper/PDF print.

## Detailed Requirements
1. **Floating Bar Element:**
   - Position: `fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 text-white shadow-xl border border-zinc-800 print:hidden`.
2. **Print Action Button:**
   - Button triggering `window.print()`.
   - Clear icon (e.g. Printer from `lucide-astro`) and label `"Descargar / Imprimir PDF"`.
3. **Back to Portfolio Button:**
   - Semantic `<a>` link returning to `/`.
4. **Print Visibility Constraint:**
   - Enforce `print:hidden` so neither the bar nor its shadow renders on physical paper or generated PDF.

## Acceptance Criteria
- [ ] Bar is visible and clickable on screen.
- [ ] Bar is 100% hidden when opening Print Preview (`print:hidden`).
- [ ] Zero hydration footprint beyond simple inline script.
