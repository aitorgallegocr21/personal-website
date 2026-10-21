# Task 13.5: Multi-Palette Headless PDF Build Engine

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** In Progress  

---

## 1. Intent & Scope
Create an automated Node.js build script (`scripts/generate-pdf.mjs`) that spins up headless Chromium during build to render and save 100% deterministic, pixel-perfect A4 PDFs for each of the 6 color palettes:
- `cv-aitor-gallego-emerald.pdf` (default)
- `cv-aitor-gallego-slate.pdf`
- `cv-aitor-gallego-sky.pdf`
- `cv-aitor-gallego-violet.pdf`
- `cv-aitor-gallego-rose.pdf`
- `cv-aitor-gallego-monochrome.pdf`
- `cv-aitor-gallego.pdf` (canonical alias)

---

## 2. Implementation Steps
1. **Script Architecture (`scripts/generate-pdf.mjs`):**
   - Use `puppeteer` (or `puppeteer-core` with system Chrome fallback `/usr/bin/google-chrome`) to launch headless browser.
   - Serve static `dist` or connect to preview server.
   - For each palette:
     - Navigate to `http://localhost:.../cv?palette=${id}`.
     - Wait for fonts and network idle (`document.fonts.ready`).
     - Call `page.pdf({ format: 'A4', printBackground: true, margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' } })`.
     - Save into `public/cv/` and `dist/cv/`.
2. **Build Integration:**
   - Add `"build:pdf": "node scripts/generate-pdf.mjs"` to `package.json`.
   - Update `"build": "astro check && astro build && npm run build:pdf"` (with safe fallback if running in environments without headless Chromium).
   - Ensure GitHub Actions workflow (`.github/workflows/deploy.yml`) supports headless Chrome generation.
3. **Precompiled Static Assets:**
   - Commit initial precompiled PDFs in `public/cv/` to ensure offline builds and immediate availability.

---

## 3. Verification Criteria
- Running `npm run build:pdf` produces valid, selectable A4 PDFs for all 6 palettes.
- All PDF files are located in `dist/cv/` and `public/cv/`.
- Download links in `CVPrintBar` successfully serve the generated PDFs.
