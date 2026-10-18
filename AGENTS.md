# AGENTS.md - Project Protocols & Agent Operating System

> 🌐 **Language:** English | [Leer en Español](README.es.md)

## 1. Project Mission
Build and maintain a personal portfolio and printable A4 PDF CV generator with Single Source of Truth (SSOT) architecture, maximum web performance (0 KB unnecessary client JS), and responsive/print layouts using Astro, TypeScript, and Tailwind CSS.

---

## 2. Inviolable Core Rules
1. **Golden Rule (SSOT):** Strictly FORBIDDEN to hardcode biographical text, company names, dates, project descriptions, or skills inside `.astro` or `.html` components. Everything must be consumed from `src/data/cv-data.ts`.
2. **Strict Typing:** Any new field or structure must first be modeled in `src/types/resume.ts`. Zero `any`.
3. **Token & Context Optimization:**
   - Do not re-read entire files unnecessarily; inspect only affected interfaces or line ranges.
   - Keep agent responses and logs ultra-concise: show only new/modified code diffs, zero filler prose.
4. **Pre-delivery Verification:** No task is complete without verifying that `npm run build` succeeds with 0 TypeScript/Astro errors.

---

## 3. Mandatory Iteration Workflow
On EVERY task or change executed by an agent, strictly follow this loop:

```
[Targeted Spec] ➔ [Minimal Code Edit] ➔ [Validation: npm run build] ➔ [Update Docs/Tasks] ➔ [Semantic Git Commit]
```

1. **Step 1 (Spec/Plan):** Define technical intent in 1-2 lines.
2. **Step 2 (Code):** Implement modular changes following Tailwind CSS and Astro best practices.
3. **Step 3 (Validation):** Run `npm run build` to confirm zero type or syntax errors.
4. **Step 4 (Docs & Backlog):** If changes introduce scripts, routes, variables, or structure, update `docs/TASKS.md` and `README.md`.
5. **Step 5 (Git Commit):** Propose or run semantic commit adhering to **Conventional Commits**:
   - `feat(...)`: New feature or component.
   - `fix(...)`: Bug fix or layout/print adjustment.
   - `data(...)`: Update professional data in `cv-data.ts`.
   - `docs(...)`: Documentation or guide update.
   - `refactor(...)`: Restructuring without functional changes.
   - `chore(...)`: Tooling, dependencies, or configuration.

---

## 4. View-Specific Guidelines

### A. Web Portfolio View (`/` -> `src/pages/index.astro`)
- Oriented towards recruiters and engineering leads: interactive, demo/repo links, sleek dual UI (dark/light mode).
- Use pure Astro components (`.astro`). Only use client scripts or minimal vanilla JS when genuine client-side interactivity is required (theming, modals, copy feedback).
- **Theming & Color Palettes:** Consume CSS custom properties (`--color-accent`, etc.) defined in `src/styles/global.css`. Never hardcode static color classes (`text-emerald-400`, `bg-emerald-500`) when semantic accent tokens apply.
- **Dynamic Calculation Rule:** Never hardcode age or dynamic periods in biographical copy. Compute dynamically from `birthDate` in `src/data/cv-data.ts`.
- **Static Assets Convention:**
  - Avatars and portraits: `public/images/`
  - Project screenshots / previews: `public/images/projects/`
  - Certificate documents / diplomas: `public/docs/certificates/`

### B. Printable CV View (`/cv` -> `src/pages/cv.astro`)
- **Target:** Exactly fit 1 A4 page (or maximum 2 pages if career length strictly justifies it), with zero orphan lines or vertical overflow.
- **Mandatory Print Configuration:**
  ```css
  @page {
    size: A4;
    margin: 10mm 12mm;
  }
  ```
- **Page Break Avoidance:** Always apply `break-inside-avoid` to experience cards, projects, and education items.
- **Non-printable Elements:** Use `print:hidden` on navigation, action buttons (e.g., print floating bar), and footer.
- **Typography & Density:** Use compact scale (`text-xs` / `text-sm`), tight margins, and clean semantic `<a>` links showing handles rather than lengthy URLs.
- **Print Palette Customization:** Support real-time accent switching in `CVPrintBar.astro` that applies instantly to print styles before PDF generation.

---

## 5. Reference Scripts
- `npm run dev`: Start local dev server.
- `astro dev --background`: Run server in background (`astro dev stop`, `astro dev status`, `astro dev logs`).
- `npm run check`: Check TypeScript types (`astro check`).
- `npm run build`: Type-check and compile static output to `/dist`.
- `npm run preview`: Preview production build locally.

---

## 6. Privacy, Environment Variables & Anti-Scraping
1. **Zero Plaintext Sensitive Data:** Strictly FORBIDDEN to commit personal phone numbers or exact residential addresses in versioned git files (`cv-data.ts`, components, or markdown).
2. **Build-Time Injection:**
   - Phone numbers must be read via environment variable: `import.meta.env.PUBLIC_PHONE`.
   - If `PUBLIC_PHONE` is undefined, resolve safely to `undefined` and omit phone rendering cleanly without compile errors.
3. **Template `.env.example`:**
   - Always keep a root `.env.example`:
     ```bash
     PUBLIC_PHONE="+34 000 00 00 00"
     ```
   - Real `.env` must NEVER be committed (enforced by `.gitignore`).
4. **Anti-Scraping Defenses:**
   - On web interactive view (`/`), visually obfuscate phone or render via user interaction (click-to-reveal or CSS reverse rendering `[direction:rtl] [unicode-bidi:bidi-override]`).
   - On print view (`/cv`), ensure clean semantic `tel:` link for PDF export.

---

## 7. Autonomous Execution Protocol

When requested to progress on the project (e.g., *"next task"* or *"do task X"*):
1. **Strict Scope:** Select the next unchecked task `[ ]` in `docs/TASKS.md` (or the one indicated). Do not edit unrelated files.
2. **JIT Context:** Refer to `docs/DESIGN_SYSTEM.md` for visual tokens and `src/types/resume.ts` for schemas. Never hardcode static copy (SSOT).
3. **Build Check:** Always verify with `npm run build`.
4. **Close Iteration:** Check off task in `docs/TASKS.md` `[x]`, update docs if required.
5. **Ultra-Concise Output:** Provide only modified/created files and the commit command:
   ```bash
   git add . && git commit -m "type(scope): descriptive message"
   ```