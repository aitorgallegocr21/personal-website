# Task 13.3: Print Engine Hardening & Font Synchronization

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** In Progress  

---

## 1. Intent & Scope
Harden `PrintLayout.astro` and global print styles to guarantee identical rendering across different devices and operating systems by loading web typography, resolving FOUC, locking zero-margin page boxes, and aligning localStorage key naming conventions.

---

## 2. Implementation Steps
1. **Font Synchronization in `PrintLayout.astro`:**
   - Add Google Fonts preconnect and stylesheets (`Inter` and `JetBrains Mono`) to `<head>`:
     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
     <link
       href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
       rel="stylesheet"
     />
     ```
2. **Zero-FOUC Palette Script in `PrintLayout.astro`:**
   - In `<head>`, insert an inline blocking script reading `localStorage.getItem('portfolio-palette')` or URL parameter `?palette=...` and setting `document.documentElement.dataset.palette` immediately.
3. **Storage Key Consistency:**
   - In `CVPrintBar.astro`, update `STORAGE_KEY = 'portfolio_palette'` to `STORAGE_KEY = 'portfolio-palette'`, unifying it with `BaseLayout.astro` and `ThemeToggle.astro`.
4. **CSS Print Box Hardening:**
   - Set `@page { size: A4 portrait; margin: 8mm 10mm; }` in `PrintLayout.astro` and `global.css`, ensuring explicit mm padding in the printable wrapper and preventing browser margin stacking.

---

## 3. Verification Criteria
- `PrintLayout.astro` loads `Inter` and `JetBrains Mono`.
- Changing palette in portfolio immediately reflects in `/cv` via unified `portfolio-palette` key.
- URL parameter `?palette=...` overrides palette immediately without flash.
