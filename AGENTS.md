# AGENTS.md - Project Protocols & Agent Operating System

> 🌐 **Language:** English | [Leer en Español](README.es.md)

## 1. Project Mission

Build and maintain a personal portfolio and printable A4 PDF CV generator with Single Source of Truth (SSOT) architecture, maximum web performance (0 KB unnecessary client JS), and responsive/print layouts using Astro, TypeScript, and Tailwind CSS.

---

## 2. Inviolable Core Rules

1. **Golden Rule (SSOT):** Strictly FORBIDDEN to hardcode biographical text, company names, dates, project descriptions, or skills inside `.astro` or `.html` components. Everything must be consumed from `src/data/cv-data.ts`.
2. **Strict Typing & Runtime Validation:** Any new field or structure must first be modeled in `src/types/resume.ts` and validated in `src/schemas/resume.schema.ts`. Zero `any`.
3. **Continuous Documentation & Context Synchronization (Zero Loss of Context):**
   - It is strictly mandatory to update documentation on **EVERY** change made to the codebase.
   - If a change affects code, architecture, component props, styles, design tokens, data schema, or operational commands, immediately update the corresponding docs (`docs/TASKS.md`, `docs/tasks/`, `docs/DESIGN_SYSTEM.md`, `README.md`, and `README.es.md`).
   - Never postpone documentation updates. No task or PR is considered complete without synchronized documentation.
4. **Dual-Branch Strategy (`main` & `develop`):**
   - `main`: Production release branch. Clean, stable, and deployable at all times.
   - `develop`: Primary integration and active development branch. All feature or fix branches must branch from and merge into `develop`. Once validated, `develop` merges into `main`.
5. **Pre-delivery Verification Gate:** No task is complete without verifying that `npm run check` (0 errors), `npm test` (all unit tests passing), and `npm run build` (or `npm run verify`) succeed with 0 TypeScript/Astro errors.
6. **Mobile-First Parity:** Any visual or interactive modification to the portfolio must be verified against mobile viewports (375px/390px) ensuring touch targets >= 44x44px, safe area insets, and zero horizontal overflow. Follow `.agents/skills/responsive-mobile-design/SKILL.md`.
7. **Token & Context Optimization:**
   - Do not re-read entire files unnecessarily; inspect only affected interfaces or line ranges.
   - Keep agent responses and logs ultra-concise: show only new/modified code diffs, zero filler prose.

---

## 3. Mandatory Iteration Workflow

On EVERY task or change executed by an agent, strictly follow this loop:

```
[Targeted Spec] ➔ [Minimal Code Edit] ➔ [Validation: npm run build] ➔ [Update Docs/Tasks] ➔ [Semantic Git Commit]
```

1. **Step 1 (Spec/Plan):** Define technical intent in 1-2 lines.
2. **Step 2 (Code):** Implement modular changes following Tailwind CSS and Astro best practices.
3. **Step 3 (Validation):** Run `npm run build` to confirm zero type or syntax errors.
4. **Step 4 (Docs & Backlog Synchronization):**
   - **Post-Task Audit:** Evaluate if the task modified architecture, components, props, routes, styles, data schema, or operational commands. If so, update the relevant docs (`README.md`, `README.es.md`, `DESIGN_SYSTEM.md`, or task spec file). Only update when there is an actual delta or outdated info; do not generate noise.
   - **Post-Phase Audit:** When concluding a phase or major milestone, update the high-level roadmap in `docs/TASKS.md`, the phase summary in `docs/tasks/`, and both `README.md` and `README.es.md` (features and progress) to keep project status 100% synchronized for users and incoming agents.
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
    size: A4 portrait;
    margin: 8mm 10mm;
  }
  ```
- **Page Break Avoidance:** Always apply `break-inside-avoid` to experience cards, projects, and education items.
- **Non-printable Elements:** Use `print:hidden` on navigation, action buttons (e.g., print floating bar), and footer.
- **Typography & Density:** Use compact scale (`text-xs` / `text-sm`), tight margins, and clean semantic `<a>` links showing handles rather than lengthy URLs.
- **Print Palette Customization:** Support real-time accent switching in `CVPrintBar.astro` that applies instantly to print styles before PDF generation.

---

## 5. Reference Scripts

- `npm run verify`: Full deterministic quality gate (`check` + `lint` + `format` + `test` + `build`).
- `npm run verify:fast`: Quick quality gate (`check` + `lint` + `format` + `test`).
- `npm run dev`: Start local dev server.
- `astro dev --background`: Run server in background (`astro dev stop`, `astro dev status`, `astro dev logs`).
- `npm run check`: Check TypeScript and Astro types (`astro check && tsc --noEmit`).
- `npm run lint`: Run ESLint checks across codebase.
- `npm run format`: Check Prettier formatting and Tailwind class ordering.
- `npm test`: Run Vitest unit tests (122 tests).
- `npm run test:e2e`: Run Playwright End-to-End browser tests.
- `npm run build`: Type-check and compile static output to `/dist` and build PDF variants.
- `npm run build:pdf`: Compile deterministic headless Chromium A4 PDFs across all 8 color palettes.
- `npm run build:og`: Generate 1200x630 Open Graph banner image for social sharing.
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
5. **PDF Binary Privacy:** Precompiled PDF binaries in `public/cv/*.pdf` are strictly gitignored to guarantee that builds generated with local `.env` never leak sensitive phone numbers into git history. Production PDFs are compiled deterministically during CI/CD in `dist/cv/` via GitHub Actions secrets.

---

## 7. Autonomous Execution Protocol & Zero-Ambiguity Standard

When requested to progress on the project (e.g., _"next task"_ or _"do task X"_), or when an agent joins the project without direct instructions:

1. **Zero-Ambiguity Principle:** Project state and active direction must always be decipherable from `docs/TASKS.md` and the active phase in `docs/tasks/`. No agent should need to guess or ask obvious context questions if the documentation is properly maintained.
2. **Strict Scope:** Select the next unchecked task `[ ]` in `docs/TASKS.md` (or the specific task indicated). Do not edit unrelated files.
3. **JIT Context:** Refer to `docs/DESIGN_SYSTEM.md` for visual tokens and `src/types/resume.ts` for schemas. Never hardcode static copy (SSOT).
4. **Build Check:** Always verify with `npm run build` (`astro check && astro build`).
5. **Documentation & Backlog Sync:**
   - Mark task completed `[x]` in its dedicated file in `docs/tasks/<phase>/` and reflect completion status.
   - If the task completes an entire phase, update `docs/TASKS.md` to move the phase into `Completed Phases` and register the next active phase.
   - If user-facing features or system commands were added/altered, reflect changes in both `README.md` and `README.es.md`.
6. **Ultra-Concise Output:** Provide only modified/created files and the commit command:
   ```bash
   git add . && git commit -m "type(scope): descriptive message"
   ```

---

## 8. Autonomous Pull Request & Release Protocol

When requested to create and manage a Pull Request (e.g., _"crea la PR y gestiónala"_ or _"release develop to main"_):

1. **Diff & Scope Analysis:**
   - Run `git diff main..develop --stat` and `git log main..develop --oneline` to identify all delivered phases, components, and fixes.
2. **Pull Request Template Adherence:**
   - Strictly populate `.github/pull_request_template.md` without omitting any section:
     - `## 📋 Summary of Changes`: Explicitly link related phases from `docs/tasks/` and select appropriate change type checkboxes (`feat`, `fix`, `perf`, `docs`, etc.).
     - `## 🔍 Key Architectural Changes`: Detail modifications to data schemas, components, and layout contracts.
     - `## ✅ Quality Gate & Inviolable Rules Checklist`: Mark all verified checks (`[x]`) ensuring SSOT compliance, strict typing, A4 budget, mobile touch ergonomics, and documentation sync.
3. **Automated PR Creation:**
   - Execute PR creation using GitHub CLI:
     ```bash
     gh pr create --base main --head develop --title "release: <scope>" --body "..."
     ```
4. **CI Workflow Monitoring:**
   - Track GitHub Actions workflow progress using `gh pr checks` or `gh run watch`.
   - **If any check fails:** Inspect failed step logs via `gh run view --log-failed`, diagnose root cause, fix directly on `develop`, push updates, and resume monitoring.
   - **Never bypass failed checks:** Do not merge with failing CI gates.
5. **Automated Merge & Release Deployment:**
   - Once all CI workflows succeed in green, execute standard merge:
     ```bash
     gh pr merge --merge
     ```
   - Monitor post-merge GitHub Pages deployment workflow (`deploy.yml`) on `main` to verify static assets and multi-palette PDFs compile and deploy cleanly in production.
6. **Local Synchronization:**
   - Checkout `main`, pull latest commits (`git pull origin main`), and switch back to `develop` if active development continues.
