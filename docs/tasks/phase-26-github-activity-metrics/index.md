# Phase 26: GitHub Live Metrics Engine & Bento Showcase

**Status:** Planned (Next Phase following Phase 25)  
**Target Branch:** `feat/phase-26-github-activity-metrics`  
**Core Mission:** Implement a dedicated, rich GitHub Activity and Open Source metrics section in the portfolio web flow, positioned between Certificaciones and Filosofía, featuring a native theme-colored contribution calendar heatmap, live streak statistics, top languages distribution, repository highlights, and automated build-time data ingestion via GitHub Actions GraphQL daily cron.

---

## 1. Context & Architectural Principles

1. **Strategic Placement in Portfolio Flow:**
   - **Sequence:** `#proyectos` (01) ➔ `#trayectoria` (02) ➔ `#certificaciones` (03) ➔ **`#github` (04: Actividad GitHub)** ➔ `#filosofia` (05) ➔ `#contacto` (06).
   - Serves as the tangible proof of continuous coding habits, open source dedication, and programming craft immediately following official credentials and preceding personal engineering philosophy.

2. **Automated Daily Ingestion & Zero-Runtime Overhead:**
   - Instead of making unauthenticated client-side requests from the visitor's browser (vulnerable to strict rate-limits, CORS issues, slow third-party servers, and layout shifts):
   - A dedicated GitHub Actions workflow runs on a **daily cron schedule (00:00 UTC) and on every git push**, executing an ingestion script (`scripts/fetch-github-data.mjs`).
   - The script calls the **GitHub GraphQL API** using the repo's secure `GITHUB_TOKEN` to retrieve:
     - Exact contribution calendar matrix (weeks, days, contribution counts, and intensity levels 0–4).
     - Streak calculations (current streak, longest streak, total contributions in past year).
     - Repository metrics (total public repos, stars, forks).
     - Top programming languages distribution calculated across repositories.
   - The payload is saved into a typed SSOT dataset (`src/data/github-data.json`), validated in runtime by Zod (`src/schemas/github.schema.ts`).
   - Astro compiles this static data into **native SVG/HTML markup**, resulting in 0 KB unnecessary client JS, zero API rate limits for visitors, and zero Cumulative Layout Shift (CLS).

3. **Active Palette Adaptation for the Contribution Graph:**
   - GitHub's default green graph will be re-styled to consume the portfolio's active theme custom properties:
     - Level 0 (no activity): `bg-zinc-100 dark:bg-zinc-800/80`
     - Level 1 (light activity): `bg-[var(--color-accent-subtle)]`
     - Level 2 (moderate activity): `bg-[var(--color-accent)] opacity-50`
     - Level 3 (high activity): `bg-[var(--color-accent)] opacity-80`
     - Level 4 (peak activity): `bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]`
   - When the user switches color palettes (e.g. from Emerald to Sky or Rose), the contribution graph transitions color in real time.

4. **Rich Bento Grid Architecture:**
   - **Contribution Heatmap Card:** Full annual interactive calendar grid with hover tooltips showing date and contributions count.
   - **Metrics Ribbon:** 4 highlight cards: Total Contributions, Current Streak (días en racha), Longest Streak (máxima racha), and Public Repositories.
   - **Languages Breakdown Card:** Horizontal stacked bar and chip list showing top languages (TypeScript, Java, Python, Astro, etc.) with accurate percentages.
   - **Direct Profile Card / CTA:** Quick links to visit GitHub profile `@aitorgcr`, follow, or view latest commits.

---

## 2. Planned Task Breakdown

- **Task 26.1: GitHub GraphQL Fetcher & Daily CI Automation Engine:** Ingestion script, GraphQL queries, SSOT JSON storage, and GitHub Actions cron workflow.
- **Task 26.2: Data Schema, Zod Validation & SSOT Typing:** TypeScript interfaces (`src/types/github.ts`) and Zod schema (`src/schemas/github.schema.ts`).
- **Task 26.3: Theme-Adaptive Contribution Heatmap Component:** Native SVG/Grid calendar consuming CSS theme tokens with tooltips and streak calculations.
- **Task 26.4: GitHub Bento Grid Section & Navigation Link Integration:** Assembly of metrics cards, language breakdown, profile CTA, and integration into the navbar/dock item `#github` (`04`).
- **Task 26.5: Verification, Unit Testing & Documentation Sync:** Unit tests for streak/stats algorithms, responsive mobile audit, and documentation updates.
