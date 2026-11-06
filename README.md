# ⚡ Portfolio & Automated Resume (SSOT)

<div align="center">

[![CI & Quality Check](https://github.com/aitorgallegocr21/personal-website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/aitorgallegocr21/personal-website/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/aitorgallegocr21/personal-website/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/aitorgallegocr21/personal-website/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

<p align="center">
  <strong>High-performance personal engineering portfolio & pixel-perfect printable A4 PDF CV.</strong><br>
  Built with Astro, TypeScript strict typing, and Tailwind CSS under a zero-compromise Single Source of Truth (SSOT) architecture.
</p>

<p align="center">
  🇬🇧 <strong>English</strong> • 🇪🇸 <a href="README.es.md">Leer en Español</a>
</p>

</div>

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Live Views & Routes](#-live-views--routes)
- [Tech Stack & Tools](#-tech-stack--tools)
- [Repository Structure](#-repository-structure)
- [Quick Start](#-quick-start)
- [Development Workflow & Scripts](#-development-workflow--scripts)
- [Print & PDF Export Guidelines](#-print--pdf-export-guidelines)
- [AI Agent & Contributor Standards](#-ai-agent--contributor-standards)
- [License](#-license)

---

## 🏛 Overview & Architecture

This repository powers both an interactive web portfolio and a printable, ATS-friendly curriculum vitae generated from one single dataset.

```
                      ┌────────────────────────────────┐
                      │   src/data/cv-data.ts (SSOT)   │
                      │  Typed against resume.ts schema│
                      └──────────────┬─────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌────────────────────────┐              ┌────────────────────────┐
    │  Web Portfolio Route   │              │  Printable CV Route    │
    │        (/)             │              │        (/cv)           │
    │  - Interactive Bento   │              │  - Exact A4 sheet fit  │
    │  - Dark/Light Theme    │              │  - Zero page overflow  │
    │  - 3D Tilt Card        │              │  - Print bar switcher  │
    │  - 0 KB unneeded JS    │              │  - Crisp PDF export    │
    └────────────────────────┘              └────────────────────────┘
```

### Core Design Principles

1. **Single Source of Truth (SSOT):** Strictly zero hardcoded personal information or metrics in `.astro` components. Everything flows from [`src/data/cv-data.ts`](src/data/cv-data.ts).
2. **Strict Typing:** All data structures are modeled with TypeScript interfaces in [`src/types/resume.ts`](src/types/resume.ts). No loose `any`.
3. **Maximum Web Performance:** Zero unnecessary client JavaScript sent to the browser. Client hydration is strictly opt-in for interactive widgets (theme toggle, certificate modal).
4. **Mathematical Print Layout:** The `/cv` route uses CSS `@page` rules and container queries calibrated to fit standard A4 paper without awkward orphan items.

---

## ✨ Key Features

- **🎯 Centralized SSOT Data:** Biography, project catalog, tech skills, work experience, and educational credentials configured in one place.
- **🎨 Dynamic Theming & Daily Rotation:** Multi-accent palette system (Emerald, Sky, Violet, Rose, Amber) with automatic weekday rotation, manual switching, and dark/light mode.
- **🎭 Multi-Skin Architecture & Visual Switcher:** Modular skin engine (`bento-modern` default) allowing complete visual restyling from the same SSOT dataset, with local persistence (`localStorage`), zero-FOUC attribute injection, and UI switcher.
- **🎴 Modern Bento Grid & Interactive Portrait:** 3D perspective tilt avatar card, real-time availability indicator, and GitHub/project direct links.
- **🏝️ Dockable Desktop Island Navbar & Fluid Scroll-Spy:** Relocatable navigation island on desktop (>= 1024px) with magnetic edge snapping (Top, Bottom, Left, Right), layout metamorphosis into compact icon rails (~56px) with floating glassmorphic tooltips, double-click reset, 1-click quick-dock selector, and a continuous fluid scroll-spy indicator physically gliding along the link track at 60/120 FPS with real-time text glow cross-fading.
- **📜 Multi-Document Credential & Deep-Linking Engine:** Mobile-first fullscreen dialog (`h-[100dvh]`), touch-friendly horizontal module tabs, resilient PDF fallback banner with direct native viewing, URL deep-linking (`?doc=<id>`), single PDF download, and one-click `.zip` batch export via JSZip.
- **✨ Accent Polish & Structured Footer:** Responsive 3-column footer with dynamic availability indicator, project card glow micro-interactions, illuminated tech chips, and non-overlapping status badges.
- **📰 Editorial 2-Column CV Layout:** Modern magazine-inspired 2-column printable A4 layout with prominent interactive portfolio badge, prioritized formal education (DAM with 9.2 average grade & SMR with 8.7) on the main column, technical experience, software projects with repository links, personal profile & virtues (organization, competitive tennis, reading), and driver's license/technical English competencies.
- **🧠 Engineering Philosophy & Work Approach:** Dedicated portfolio section reflecting foundational systems mastery, deep curiosity over black-box abstractions, and a pragmatic balance preventing over-engineering while delivering real value.
- **🖨️ Multi-Palette Headless PDF Build Engine & Dual-Action Print Bar:** Automated build-time generation of 100% deterministic A4 PDFs across all 6 color palettes via headless Chromium, paired with an interactive 1-click download button and an accessible print layout warning modal.
- **📐 Editorial Portrait & Contact Column:** Crisp rectangular portrait badge, `// CONTACTO` section header aligned with dedicated phone icon, and streamlined contact badges with anti-scraping defense.
- **🔍 Rich Schema.org & Automated SEO:** JSON-LD structured data (`Person` & `ProfilePage`), auto-generated `sitemap-index.xml` via `@astrojs/sitemap`, search crawler directives in `robots.txt`, and dedicated 1200x630 Open Graph preview card for social sharing.
- **🖼️ Native Asset Optimization Pipeline:** Astro's built-in `<Image />` component powered by Sharp, transcoding project previews and portraits to lightweight WebP with zero Cumulative Layout Shift (CLS) and a 97% image payload reduction.
- **🧪 Comprehensive Test Suite (Unit & E2E):** 86 unit tests with Vitest (SSOT integrity, date math, Zod schemas, skin state, scroll-spy calculations, dock manager) paired with 19 End-to-End browser tests via Playwright automated in GitHub Actions CI with resilient system Chrome detection.
- **🛡️ Privacy & Anti-Scraping Protection:** Phone numbers are injected via build-time environment variables (`PUBLIC_PHONE`) and protected from automated crawlers.

---

## 🌐 Live Views & Routes

| Route     | Purpose                   | Key Capabilities                                                                                                                                               |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`/`**   | Interactive Web Portfolio | Bento showcase, project live/code links, tech timeline, credential viewer, responsive layout.                                                                  |
| **`/cv`** | Printable / PDF CV        | Bold editorial 2-column layout, strict single A4 page fit, prominent web portfolio CTA, repository links, interactive color bar, ATS-friendly semantic markup. |

---

## 🛠 Tech Stack & Tools

- **Core Framework:** [Astro 5.x](https://astro.build/) (Static Site Generation / SSG)
- **Language:** [TypeScript 5.x](https://www.typescriptlang.org/) (Strict Mode enabled)
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/) with CSS Custom Properties
- **Code Quality & Validation:** ESLint (Flat Config), Prettier with `prettier-plugin-tailwindcss`, Zod runtime schemas & `@astrojs/check`
- **Testing & SEO:** Vitest (Unit testing), Playwright (E2E browser tests & A4 print calibration), `@astrojs/sitemap` (automated sitemap)
- **Deployment:** GitHub Pages automated via GitHub Actions workflow (`.github/workflows/deploy.yml`)

---

## 📂 Repository Structure

```text
.
├── .agents/skills/              # Specialized agent workflows for Antigravity AI
├── docs/                        # Complete project documentation & specifications
│   ├── DESIGN_SYSTEM.md         # Design tokens, color palettes & print layout specs
│   ├── DOSSIER_PROFESIONAL.md   # Raw candidate history, achievements & reference data
│   ├── tasks/                   # Comprehensive phase & micro-task breakdown
│   └── TASKS.md                 # Sprint tracking index & phase roadmap
├── src/
│   ├── components/              # Modular Astro components
│   │   ├── cv/                  # A4 print-optimized layout components
│   │   └── portfolio/           # Interactive portfolio sections (Hero, Bento, Modal)
│   ├── data/
│   │   └── cv-data.ts           # 🌟 SSOT: Centralized resume and profile dataset
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Global HTML shell, theme scripts, and metadata
│   │   └── PrintLayout.astro    # Dedicated @page print document wrapper
│   ├── pages/
│   │   ├── index.astro          # Web portfolio view (/)
│   │   └── cv.astro             # Printable A4 CV view (/cv)
│   ├── styles/                  # Global CSS, Tailwind setup & dynamic theme variables
│   ├── types/
│   │   └── resume.ts            # TypeScript interfaces & data contracts
│   └── utils/                   # Reusable formatters (dates, age calculation)
├── public/                      # Static assets served at root
│   ├── docs/certificates/       # PDF certificates and verification records
│   ├── images/                  # Profile avatars, project screenshots, icons
│   └── _headers                 # Cache control rules for static assets
├── AGENTS.md                    # Inviolable agent rules, execution loops & commit guide
├── README.md                    # English documentation (this file)
└── README.es.md                 # Spanish documentation
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js:** `v20.x` or higher (LTS recommended)
- **Package Manager:** `npm` (v10+ recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aitorgallegocr21/personal-website.git
cd personal-website

# 2. Install dependencies cleanly
npm clean-install

# 3. Configure optional environment variables
cp .env.example .env
```

> **Note:** In `.env`, set `PUBLIC_PHONE="+34 600 00 00 00"` for private phone injection. If omitted, the phone field will cleanly disappear without build errors.

---

## 💻 Development Workflow & Scripts

| Command                  | Action                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `npm run dev`            | Starts local development server at `http://localhost:4321`.                                                  |
| `astro dev --background` | Runs development server in background mode.                                                                  |
| `npm run check`          | Runs `@astrojs/check` and TypeScript validation without building.                                            |
| `npm run lint`           | Runs ESLint (flat config) for TypeScript, Astro, and JSX a11y rules.                                         |
| `npm run format`         | Checks code formatting using Prettier and Tailwind CSS class sorter.                                         |
| `npm test`               | Runs the Vitest unit test suite (59 tests covering SSOT, dates, themes, self-hosted fonts, and Zod schemas). |
| `npm run test:e2e`       | Runs Playwright End-to-End test suite (12 tests verifying live interactions and A4 print containment).       |
| `npm run build`          | Full production build (`astro check && astro build && npm run build:pdf`).                                   |
| `npm run preview`        | Spins up a local server to preview production output from `dist/`.                                           |

---

## 🖨️ Print & PDF Export Guidelines

To generate a crisp, ATS-compliant PDF resume from the `/cv` view:

1. Start the server (`npm run dev`) or visit the deployed `/cv` page.
2. Select your desired accent palette in the floating top bar (e.g. _Emerald_, _Sky_, _Slate_).
3. Open your browser print dialog:
   - **Shortcut:** `Ctrl + P` (Windows/Linux) or `Cmd + P` (macOS).
4. Apply the following print dialog settings:
   - **Destination:** Save as PDF
   - **Paper Size:** A4
   - **Margins:** Default (handled internally via `@page { margin: 10mm 12mm }`)
   - **Options:** Enable **"Background graphics"** (required for badges and palette accents)
   - **Scale:** Default (100%)

---

## 🤖 AI Agent & Contributor Standards

If you are developing features or using AI pair-programming agents on this codebase:

- **Follow [AGENTS.md](AGENTS.md):** Respect the mandatory 5-step loop (`Spec` ➔ `Code` ➔ `npm run build` ➔ `Docs Sync` ➔ `Semantic Commit`).
- **Never hardcode static data:** Update `src/data/cv-data.ts` and ensure types exist in `src/types/resume.ts`.
- **Zero Ambiguity:** Backlog status and next actions must always be traceable in [`docs/TASKS.md`](docs/TASKS.md).
- **Audit Documentation:** After tasks affecting architecture, interfaces, or configs, evaluate and update corresponding doc files.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
