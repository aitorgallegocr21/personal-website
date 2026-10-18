---
name: portfolio-ssot-workflow
description: Enforce Single Source of Truth (SSOT), strict typing, A4 print math, dynamic age calculation, and theme tokens across the portfolio and printable CV.
---

# Portfolio & Automated Resume Workflow Skill

This skill guides AI agents and developers working on this repository to uphold architectural integrity, zero-overflow A4 printing, strict typing, and Single Source of Truth (SSOT) compliance.

---

## 1. Golden Architectural Principles

### A. Single Source of Truth (SSOT)
- **Rule:** Never hardcode biographical copy, project names, descriptions, tech stacks, credentials, or companies inside `.astro` or `.html` components.
- **Data Source:** Everything must be consumed from `src/data/cv-data.ts`.
- **Typing:** Any new field or structure must first be modeled in `src/types/resume.ts` with strict TypeScript types (zero `any`).

### B. Dynamic Calculations
- **Age:** Never hardcode age strings (e.g., "19 años") in text. Compute dynamically using `birthDate: "YYYY-MM-DD"` from `cvData.personal.birthDate`.
- **Years/Periods:** Calculate durations dynamically or format strictly via utility functions.

### C. Asset Storage Conventions
- Avatars and personal portraits: `public/images/`
- Project screenshots and preview mockups: `public/images/projects/`
- Certificate documents and degree PDFs: `public/docs/certificates/`

---

## 2. Theming & Palette Design Tokens

- **CSS Variables:** Consume theme variables defined in `src/styles/global.css`:
  - `--color-accent`
  - `--color-accent-hover`
  - `--color-accent-subtle`
  - `--color-accent-glow`
- **Avoid Static Color Hardcoding:** Do not use `text-emerald-400` or `bg-emerald-500` for core brand elements where the user's selected palette should apply. Use `[var(--color-accent)]` or Tailwind utility classes bound to CSS variables.
- **Dual Surface Support:** Always verify both dark mode (`bg-zinc-950`, `text-zinc-100`) and light mode (`bg-zinc-50`, `text-zinc-900`) contrast ratios.

---

## 3. Strict A4 Printable CV Rules (`/cv`)

1. **Physical Page Fit:** The CV must fit exactly into **1 single A4 sheet** (210mm x 297mm) under standard browser print rendering.
2. **Mandatory Margins:**
   ```css
   @page {
     size: A4 portrait;
     margin: 10mm 12mm;
   }
   ```
3. **Break Guards:** Apply `break-inside-avoid` to every card, role, project, and education item.
4. **Clean Semantic Handles:** Format links as human-readable handles (`github.com/aitorgcr`) instead of sprawling URLs, while maintaining semantic `href` for clickable PDFs.
5. **Print Bar:** Ensure `CVPrintBar.astro` uses `print:hidden` and allows real-time palette switching before printing.

---

## 4. Verification & Quality Gates

Before concluding any iteration or proposing a commit:
1. Run `npm run check` (`astro check && tsc --noEmit`).
2. Run `npm run build` (`astro check && astro build`).
3. Confirm zero TypeScript errors, zero warnings, and zero broken assets in `dist/`.
