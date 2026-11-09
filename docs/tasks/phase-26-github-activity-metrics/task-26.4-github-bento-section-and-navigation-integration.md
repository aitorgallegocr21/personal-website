# Task 26.4: GitHub Bento Grid Section & Navigation Link Integration

**Status:** Planned  
**Branch:** `feat/phase-26-github-activity-metrics`  
**Goal:** Assemble the comprehensive Bento section (`src/components/skins/bento/BentoGitHub.astro`), position it in the portfolio flow between Certificaciones and Filosofía, integrate `#github` (04) into `src/components/portfolio/Navbar.astro` with the Lucide `Github` icon, renumber subsequent sections, and preserve fluid scroll-spy navigation.

---

## 1. Context & Motivation

Phase 26 elevates GitHub activity from a simple external profile link to a premier proof-of-work section in the web portfolio.

Positioned strategically at index `04` (between `03: Certificaciones` and `05: Filosofía`):

- It bridges validated formal training with personal engineering craft and consistent open source habits.
- The Bento card aesthetic seamlessly mirrors the existing Bento design system (`BentoHero`, `BentoProjects`, `BentoCertifications`).
- The navigation dock/header must incorporate this new anchor without overcrowding horizontal layout or disrupting the fluid 60/120 FPS scroll-spy indicator.

---

## 2. Technical Implementation Spec

1. **Bento Section Component (`src/components/skins/bento/BentoGitHub.astro`):**
   - Anchor: `<section id="github" class="scroll-mt-24 sm:scroll-mt-32 ...">`.
   - Section Header:
     - Badge/Eyebrow: `04 // OPEN SOURCE & ACTIVIDAD`.
     - Title: `Actividad en GitHub & Métricas de Código`.
     - Subtitle: Narrative describing daily commit habits, backend architectures, and open source participation.
   - **Bento Grid Layout (12-column or responsive modular grid):**
     - **Card A: Full Heatmap Showcase (col-span-12):**
       - Hosts `<GitHubHeatmap calendar={data.calendar} />`.
       - Header with live pulse status indicator (`"Sincronizado vía GitHub Actions"`).
     - **Card B: Key Metrics Ribbon (4 sub-cards or col-span-12 grid):**
       1. _Total de Contribuciones:_ Annual contribution count.
       2. _Racha Actual:_ Consecutive active coding days.
       3. _Racha Máxima:_ All-time longest streak.
       4. _Repositorios Públicos:_ Count with direct link to GitHub repos.
     - **Card C: Top Languages Distribution Card (col-span-12 lg:col-span-7):**
       - Multi-segment horizontal stacked progress bar showing language distribution by percentage.
       - Language chips list with color swatches, percentage labels, and byte indicators (TypeScript, Java, Python, Astro, etc.).
     - **Card D: Direct Profile & Star CTA Card (col-span-12 lg:col-span-5):**
       - Profile avatar, username `@aitorgallegocr21`, bio summary.
       - Quick action buttons: "Visitar Perfil en GitHub ↗" and "Explorar Repositorios".

2. **Portfolio Assembly (`src/components/skins/bento/BentoSkin.astro`):**
   - Import `BentoGitHub` and insert between `BentoCertifications` and `BentoPhilosophy`:
     ```astro
     <BentoHero />
     <BentoProjects />
     <BentoTimeline />
     <BentoCertifications />
     <BentoGitHub />
     <BentoPhilosophy />
     <BentoContact />
     ```

3. **Navigation & Dock Integration (`src/components/portfolio/Navbar.astro`):**
   - Import `Github` icon from `lucide-astro`.
   - Update `navItems` array:
     ```ts
     const navItems = [
       {
         label: 'Proyectos',
         href: '#proyectos',
         number: '01',
         icon: FolderGit2,
       },
       {
         label: 'Trayectoria',
         href: '#trayectoria',
         number: '02',
         icon: Briefcase,
       },
       {
         label: 'Certificaciones',
         href: '#certificaciones',
         number: '03',
         icon: Award,
       },
       { label: 'GitHub', href: '#github', number: '04', icon: Github },
       { label: 'Filosofía', href: '#filosofia', number: '05', icon: Sparkles },
       { label: 'Contacto', href: '#contacto', number: '06', icon: Mail },
     ];
     ```
   - Update mobile drawer navigation list to render all 6 links with responsive spacing.
   - Verify that stacked icon + micro-label formatting accommodates 6 items comfortably on 1024px+ screens without clipping.

4. **Fluid Scroll-Spy & Indicator Calibration (`src/lib/scroll-spy.ts`):**
   - Verify that `calculateScrollProgress` smoothly interpolates when scrolling through all 6 sections.
   - Confirm indicator bounding box snaps accurately to `#github` in both horizontal and vertical dock modes.

---

## 3. Verification Checklist

- [ ] Section `#github` renders with 0 console warnings or CSS layout breakage.
- [ ] Bento cards present metrics, language distribution, and profile CTA with high aesthetic fidelity.
- [ ] Navbar and dock display 6 items with proper micro-labels, icons, and renumbered badges (01 to 06).
- [ ] Fluid scroll-spy indicator glides cleanly into the `#github` link and updates active state in real time.
- [ ] Mobile navigation drawer includes the new GitHub link with minimum 44x44px touch target.
- [ ] Mobile viewports (375px/390px) exhibit zero horizontal document overflow.
