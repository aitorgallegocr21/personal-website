# Portfolio & Automated Resume (SSOT)

> 🌐 **Language:** English | [Leer en Español](README.es.md)

Personal portfolio and automated single-page curriculum vitae generator built with **Astro**, **TypeScript**, and **Tailwind CSS**, designed under a strict **Single Source of Truth (SSOT)** architecture.

---

## Key Features

- **Single Source of Truth (SSOT):** All professional data, project achievements, technical skills, and educational background are centralized in `src/data/cv-data.ts`. Both the web portfolio and the printable CV consume the exact same typed dataset.
- **Zero JavaScript Runtime:** Static Site Generation (SSG) with 0 KB of client-side JavaScript by default, achieving top performance and instant load times.
- **Pixel-Perfect A4 PDF Export:** Dedicated print route (`/cv`) styled with CSS `@media print` rules, margin presets, and page-break guards (`break-inside-avoid`) for seamless physical printing or PDF generation (`Cmd + P` / `Ctrl + P`).
- **Strictly Typed Architecture:** End-to-end type safety using TypeScript interfaces without any loose `any` declarations.
- **Spec-Driven Agent Workflow:** Comprehensive developer and AI-agent protocols specified in `AGENTS.md` to guarantee clean iterations and automated commits.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linting & Formatting:** Prettier with `prettier-plugin-tailwindcss`, `@astrojs/check`
- **Deployment:** Cloudflare Pages / GitHub Pages

---

## Project Structure

```text
.
├── docs/                   # Full professional dossier and task backlog
│   ├── DOSSIER_PROFESIONAL.md
│   └── TASKS.md
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
├── public/                 # Static assets and generated PDF outputs
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