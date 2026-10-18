# Portfolio & Automated Resume (SSOT)

> 🌐 **Language:** English | [Leer en Español](README.es.md)

Personal portfolio and automated single-page curriculum vitae generator built with **Astro**, **TypeScript**, and **Tailwind CSS**, designed under a strict **Single Source of Truth (SSOT)** architecture.

---

## Key Features

- **Single Source of Truth (SSOT):** All professional data, project achievements, technical skills, and educational background are centralized in `src/data/cv-data.ts`. Both the web portfolio and the printable CV consume the exact same typed dataset.
- **Dynamic Theming & Daily Rotation:** Multi-accent color palette switcher (Emerald, Sky, Violet, Rose, Amber) with daily automated rotation, dark/light theme switch, and smooth 60fps CSS transitions.
- **Interactive Portrait & Modern Bento:** 3D tilt profile card with availability badge, project screenshot previews, and "Current Project" indicators.
- **In-Page Certificate Viewer:** Accessible modal to inspect and download verified course credentials and academic titles without leaving the page.
- **Pixel-Perfect A4 PDF Export:** Dedicated print route (`/cv`) with interactive color picker in print bar, styled with CSS `@media print` rules, margin presets, and page-break guards (`break-inside-avoid`).
- **Strictly Typed Architecture:** End-to-end type safety using TypeScript interfaces without any loose `any` declarations.
- **Spec-Driven Agent Workflow:** Comprehensive developer and AI-agent protocols specified in `AGENTS.md` and custom Antigravity workspace skills.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linting & Formatting:** Prettier with `prettier-plugin-tailwindcss`, `@astrojs/check`
- **Deployment:** GitHub Pages (Automated via GitHub Actions)

---

## Project Structure

```text
.
├── .agents/skills/         # Workspace skills for Antigravity AI pair programming
├── docs/                   # Full professional dossier, design system and task backlog
│   ├── DESIGN_SYSTEM.md
│   ├── DOSSIER_PROFESIONAL.md
│   ├── tasks/              # Phase-by-phase task specifications
│   └── TASKS.md            # Active sprint and roadmap index
├── src/
│   ├── components/         # Modular Astro components
│   │   ├── cv/             # A4 print-optimized components
│   │   └── portfolio/      # Interactive web components
│   ├── data/
│   │   └── cv-data.ts      # SSOT: Centralized professional data
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PrintLayout.astro
│   ├── pages/
│   │   ├── index.astro     # Interactive portfolio (/)
│   │   └── cv.astro        # Printable A4 CV (/cv)
│   ├── styles/             # Global CSS and print stylesheets
│   └── types/
│       └── resume.ts       # TypeScript schemas and data models
├── public/                 # Static assets and user documents
│   ├── docs/certificates/  # Official diplomas and certificate PDFs
│   ├── images/             # Avatars and portrait photos
│   │   └── projects/       # Project screenshots and previews
│   └── _headers            # Static immutable cache rules
├── AGENTS.md               # Agent directives and development protocol
├── README.md               # English project documentation
└── README.es.md            # Spanish project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js:** v20.x or higher (LTS recommended)
- **Package Manager:** `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/tu-usuario/portfolio-cv.git
cd portfolio-cv

# Install dependencies
npm clean-install
```

### Development Scripts

```bash
# Start local dev server (http://localhost:4321)
npm run dev

# Start local dev server in background
astro dev --background

# Run strict type checking across all .astro and .ts files
npm run check

# Build production static bundle in /dist
npm run build

# Preview production build locally
npm run preview
```

---

## Routes & Exporting

- **`/`**: Full interactive web portfolio featuring project overviews, technical stacks, source code links, and complete career background.
- **`/cv`**: Minimalist, print-optimized document view configured for A4 paper. Use your browser's print dialog (`Ctrl + P` / `Cmd + P`) and select **"Save as PDF"** with background graphics enabled and zero margin overrides.

---

## Development Protocols & Rules

Before contributing or prompting AI coding agents, please refer to:
- [`AGENTS.md`](AGENTS.md) for architectural constraints, token optimization, and commit conventions.
- [`docs/TASKS.md`](docs/TASKS.md) for the active task backlog.

---

## License

This project is licensed under the [MIT License](LICENSE).