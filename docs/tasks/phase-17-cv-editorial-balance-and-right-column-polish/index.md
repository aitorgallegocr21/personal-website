# Phase 17: CV Editorial Balance, Header Polish & 7-Day Palette Synchronization

**Status:** Completed  
**Branch:** `feat/cv-details-and-tweaks`  
**Core Mission:** Rebalance the printable CV (`/cv`) layout by decompressing the right column (5 cols) to achieve exact baseline parity, streamline header branding to "Portfolio", upgrade the style menu with default Live Rotation and clear visual feedback, and unify the palette ecosystem between the Web portfolio and the CV with 7 harmonized chromatic colors (one for each day of the week) plus classic Monochrome for print.

---

## 1. Context & Motivation

1. **CV Right-Column Decompression & Baseline Parity:**
   - The left column (7 cols) exhibited comfortable leading (`leading-snug`) and balanced bullet spacing, while the right column (5 cols) compressed skills, certificates, traits, and languages with ultra-compact margins (`leading-tight`, `print:py-0.2`), leaving a 70.5px unutilized vertical gap at the bottom right.
   - Fine-tuning typography, badge paddings, and inter-section rhythm eliminated this discrepancy, achieving subpixel baseline parity (0.6px difference) while strictly fitting 1 A4 page across all palettes.

2. **Header Branding Refinement:**
   - The candidate's full name was previously displayed in both the navbar and the hero `h1` header.
   - The navbar title was streamlined to **"Portfolio"**, providing cleaner visual hierarchy and preventing mobile viewport congestion.

3. **Style Menu Redesign & Live Rotation Clarity:**
   - Previously, when "Rotación viva" was active, a checkmark remained on the daily color in the static list, causing confusion about whether manual or dynamic mode was selected.
   - Live Rotation is now active by default, displaying the checkmark exclusively on the "Rotación viva" card alongside an animated pulse indicator and descriptive status (`Activa · Hoy: [Color] ([Día])`), while static options remain clean without misleading checkmarks.

4. **Web & CV Palette Unification (7 Days of the Week):**
   - Harmonized colors between both platforms so that the 7 chromatic palettes map directly to the 7 days of the week (`getDay()` 0–6), plus classic Monochrome for paper printing on the CV:
     - **Domingo (0):** Ámbar Cálido (`amber` - `#d97706` / `#fbbf24`)
     - **Lunes (1):** Verde Tech (`emerald` - `#059669` / `#34d399`)
     - **Martes (2):** Turquesa (`teal` - `#0d9488` / `#2dd4bf`)
     - **Miércoles (3):** Azul Cielo (`sky` - `#0284c7` / `#38bdf8`)
     - **Jueves (4):** Azul Marino (`slate` - `#1e3a8a` / `#60a5fa`)
     - **Viernes (5):** Violeta (`violet` - `#7c3aed` / `#a78bfa`)
     - **Sábado (6):** Rosa Coral (`rose` - `#e11d48` / `#fb7185`)
     - **CV Exclusivo:** Monocromo Clásico (`monochrome` - `#18181b` / `#ffffff`)

---

## 2. Implementation Summary

1. **CV Layout & Spacing (`src/pages/cv.astro` & `src/components/cv/`):**
   - `cv.astro`: Side column container spacing expanded to `space-y-4 print:space-y-3`.
   - `CVSkills.astro`: Category spacing relaxed to `print:space-y-2`, badge padding to `print:py-0.5`, category bottom margin to `print:mb-1`.
   - `CVCertificates.astro`: Badge gap expanded to `print:gap-1.5`, font size tuned to `text-[10.5px] print:text-[10px]`.
   - `CVPersonalProfile.astro`: Loosened line-heights to `leading-snug` and `leading-relaxed print:leading-snug`, inter-trait spacing to `print:space-y-2`, accent left border padding to `pl-2.5`.
   - `CVCompetencies.astro`: Language row spacing increased to `print:space-y-1.5`, mobility divider padding to `pt-2 print:pt-1.5`.

2. **Header Branding (`src/components/portfolio/Navbar.astro`):**
   - Brand anchor label updated to `"Portfolio"` with accessible `aria-label="Inicio - Portfolio de Aitor Gallego-Casilda Romero"`.

3. **Style Menu & Palette Engine (`src/components/portfolio/ThemeToggle.astro`):**
   - Popover restructured into two labeled sections: **Modo dinámico** (Rotación viva con badge "7 Días") y **Colores fijos** (7 paletas con día de la semana asociado).
   - Dynamic state logic ensures the checkmark appears exclusively on "Rotación viva" when active, removing all checkmarks from static colors.
   - When a fixed color is chosen, the checkmark moves exclusively to that color.

4. **Global CSS & Layouts (`src/styles/global.css`, `BaseLayout.astro`, `PrintLayout.astro`):**
   - Added `--color-accent` design tokens for `teal` in both light and dark modes.
   - Updated `BaseLayout.astro` and `PrintLayout.astro` zero-FOUC inline scripts to recognize the 7-day chromatic array plus `monochrome`.
   - Configured `CVPrintBar.astro` with all 8 swatches.

5. **Headless PDF Engine (`scripts/generate-pdf.mjs`):**
   - Expanded target compilation array to all 8 palettes: `emerald`, `teal`, `sky`, `slate`, `violet`, `rose`, `amber`, `monochrome`.
   - Automated local Chrome discovery without external dependencies.

---

## 3. Verification & Metrics

- **TypeScript / Astro Check:** `0 errors, 0 warnings, 0 hints` across 32 project files.
- **Column Baseline Parity (A4 Print):**
  - Before: Left height 829.4px vs Right height 758.9px (diff: 70.5px unutilized space).
  - After: Left height 829.4px vs Right height 828.8px (diff: 0.6px, exact visual alignment).
- **A4 PDF Verification:** Exactly 1 page for canonical `cv-aitor-gallego.pdf` and all 8 precompiled palettes (`emerald`, `teal`, `sky`, `slate`, `violet`, `rose`, `amber`, `monochrome`).
- **State Synchronization:** Fully bidirectional synchronization of `portfolio-palette` in `localStorage` across portfolio navigation and CV view.
