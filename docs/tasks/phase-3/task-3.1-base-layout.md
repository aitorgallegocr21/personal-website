# Task 3.1: Create Root Layout (BaseLayout.astro)

## Objective
Create `src/layouts/BaseLayout.astro` providing meta tags, Open Graph, SEO, font definitions, and dark canvas wrapper for the web portfolio.

## Context & Architecture
- **Location:** `src/layouts/BaseLayout.astro`
- **Design:** Dark Mode First (`bg-zinc-950 text-zinc-100 min-h-screen font-sans selection:bg-emerald-500/20 selection:text-emerald-400`).

## Detailed Requirements
1. **Metadata & OpenGraph:**
   - Title, Description, canonical URL.
   - OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:type`).
   - Twitter card metadata.
2. **Typography / Fonts:**
   - Link or embed system font stack (`font-sans` Inter/Geist fallback, `font-mono` JetBrains Mono fallback).
3. **Structured Navigation & Footer:**
   - Minimalist header with links (`Proyectos`, `Trayectoria`, `CV PDF`, `Contacto`).
   - Clean footer referencing Astro, Tailwind, and current year.

## Acceptance Criteria
- [ ] Valid HTML5 shell with responsive viewport and theme-color meta tags.
- [ ] Zero TypeScript or Astro build errors.
