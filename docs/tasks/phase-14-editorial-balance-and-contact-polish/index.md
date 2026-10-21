# Phase 14: Editorial Balance, Contact Architecture & Symmetrical Bottom Rhythm

**Status:** Planned / Ready to Execute  
**Branch:** `feat/phase-13-multi-palette-pdf-build-and-editorial-cv`  
**Core Mission:** Polish the CV layout with millimeter precision: make the `// CONTACTO` header visually prominent with the active color palette, restore the phone number via `.env` configuration, stack GitHub and LinkedIn vertically in clean single lines, justify the bio summary text, and balance the bottom of both columns so they terminate at the exact same horizontal line leaving an elegant, balanced bottom margin on 1 strict A4 page.

---

## 1. Context & Architectural Motivation

1. **Header & Contact Polish:**
   - The label `// CONTACTO` should adopt the active color palette (`text-[var(--color-accent)]`) to create a cohesive typographic anchor.
   - GitHub and LinkedIn links should be stacked vertically (underneath each other) rather than horizontally, aligning with Location, Email, and Phone.
   - The phone number was hidden because local development lacked a `.env` file containing `PUBLIC_PHONE`. A local `.env` must be created and a clean fallback mechanism ensured.
   - The bio summary under the candidate title should use justified alignment (`text-justify`) for architectural symmetry.

2. **Column Symmetry & Bottom Whitespace Tuning:**
   - Currently, the left column ends lower than the right column because `Otras Experiencias` contains multiple bullets and chips.
   - By condensing `clases-tenis` and `hosteleria` into 1 high-impact bullet each, the left column shrinks to align with the right column.
   - Adjusting right column vertical spacing (`space-y-*`) or optionally promoting a key certification (e.g., *Prompt Engineering with GenAI Tools*) allows both columns to terminate at the exact same horizontal baseline, leaving a clean, intentional bottom breathing space on the A4 page.

---

## 2. Tasks Breakdown

- [x] **[14.1 Contact Section Architecture & Visual Accent](task-14.1-contact-architecture-and-accent.md)** — Style `// CONTACTO` with the active accent color, stack GitHub and LinkedIn vertically, and restore phone number rendering via local `.env`.
- [ ] **[14.2 Editorial Bio Text Justification](task-14.2-editorial-bio-justification.md)** — Apply `text-justify` to candidate bio summary in `CVHeader.astro` for symmetrical margin alignment.
- [ ] **[14.3 Column Baseline Symmetry & Complementary Experience Condensation](task-14.3-column-baseline-symmetry.md)** — Condense complementary experience bullets, align both columns to the exact same baseline, and verify strict 1-page A4 PDF compilation across all palettes.
