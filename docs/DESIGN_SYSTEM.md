# UI/UX Design System - Portfolio & Automated CV

UI/UX design specification inspired by modern engineering tools (Linear, Raycast, Vercel). Combines a sleek dark mode for web browsing with a crisp, Swiss-style minimalist layout for A4 print/PDF.

---

## 1. Design Philosophy

1. **Dark Mode First with Depth:** Avoid flat black (`#000000`). Use deep zinc tones with subtle transparency and backdrops (`backdrop-blur`).
2. **Immediate Visual Hierarchy:** Core data (tech stack, key projects, availability) must be parsed in <5 seconds.
3. **Refined Micro-interactions:** Subtle border transitions, hover focus rings, and visual feedback for interactive buttons (e.g. copy email).
4. **Zero Performance Tax:** Pure Tailwind CSS utilities and native CSS. Zero heavy animation libraries or unnecessary client JS.

---

## 2. Color Palette & Surfaces

### A. Web View (Dark Mode)

| Semantic Token            | Tailwind Class          | Hex / Channel             | Purpose                               |
| ------------------------- | ----------------------- | ------------------------- | ------------------------------------- |
| **Primary Background**    | `bg-zinc-950`           | `#09090b`                 | Global app canvas                     |
| **Card Surface**          | `bg-zinc-900/40`        | `rgba(24, 24, 27, 0.4)`   | Card backdrop with `backdrop-blur-sm` |
| **Hover Surface**         | `hover:bg-zinc-900/70`  | `rgba(24, 24, 27, 0.7)`   | Active card hover state               |
| **Base Border**           | `border-zinc-800/80`    | `rgba(39, 39, 42, 0.8)`   | Subtle precision borders              |
| **Hover Border**          | `hover:border-zinc-700` | `#3f3f46`                 | Highlighted border on hover           |
| **Primary Text**          | `text-zinc-100`         | `#f4f4f5`                 | Headings, name, highlighted links     |
| **Secondary Text**        | `text-zinc-400`         | `#a1a1aa`                 | Body copy and summaries               |
| **Tertiary / Muted Text** | `text-zinc-500`         | `#71717a`                 | Dates, metadata, secondary tags       |
| **Tech Accent**           | `text-emerald-400`      | `#34d399`                 | Availability status indicator         |
| **Accent Fill**           | `bg-emerald-500/10`     | `rgba(16, 185, 129, 0.1)` | Pill badge background                 |

### B. Web View (Light Mode)

| Semantic Token         | Tailwind Class          | Hex / Channel              | Purpose                                    |
| ---------------------- | ----------------------- | -------------------------- | ------------------------------------------ |
| **Primary Background** | `bg-zinc-50`            | `#fafafa`                  | Canvas background                          |
| **Card Surface**       | `bg-white/80`           | `rgba(255, 255, 255, 0.8)` | Clean card surface with `backdrop-blur-sm` |
| **Hover Surface**      | `hover:bg-white`        | `#ffffff`                  | Elevated hover state                       |
| **Base Border**        | `border-zinc-200`       | `#e4e4e7`                  | Separation borders                         |
| **Hover Border**       | `hover:border-zinc-300` | `#d4d4d8`                  | Active border on card hover                |
| **Primary Text**       | `text-zinc-900`         | `#18181b`                  | Main headings and active titles            |
| **Secondary Text**     | `text-zinc-600`         | `#52525b`                  | Descriptive paragraphs                     |
| **Tertiary Text**      | `text-zinc-400`         | `#a1a1aa`                  | Dates, secondary badges                    |

### C. Dynamic Accent Palette Engine (Tokens & Presets)

The system supports real-time accent shifting across both Dark and Light modes using CSS custom properties:

```css
:root {
  /* Dynamic Accent Tokens */
  --accent-hue: 160; /* Computed dynamically or per preset */
  --color-accent: var(--palette-accent);
  --color-accent-hover: var(--palette-accent-hover);
  --color-accent-subtle: var(--palette-accent-subtle);
  --color-accent-glow: var(--palette-accent-glow);
}
```

| Palette Preset        | Key Hue / Role       | Accent Hex            | Subtle Bg Fill            | Glow Shadow                 |
| --------------------- | -------------------- | --------------------- | ------------------------- | --------------------------- |
| **Emerald** (Default) | Tech & Reliability   | `#34d399` / `#10b981` | `rgba(16, 185, 129, 0.1)` | `rgba(52, 211, 153, 0.25)`  |
| **Sky**               | Logic & Clarity      | `#38bdf8` / `#0284c7` | `rgba(2, 132, 199, 0.1)`  | `rgba(56, 189, 248, 0.25)`  |
| **Violet**            | Modern & Creative    | `#a78bfa` / `#7c3aed` | `rgba(124, 58, 237, 0.1)` | `rgba(167, 139, 250, 0.25)` |
| **Rose**              | Bold & High-Contrast | `#fb7185` / `#e11d48` | `rgba(225, 29, 72, 0.1)`  | `rgba(251, 113, 133, 0.25)` |
| **Amber**             | Energetic & Warm     | `#fbbf24` / `#d97706` | `rgba(217, 119, 6, 0.1)`  | `rgba(251, 191, 36, 0.25)`  |

### D. Print / PDF View (Swiss Minimalist - A4 Print Layout)

| Semantic Token          | Tailwind Class      | Purpose                                      |
| ----------------------- | ------------------- | -------------------------------------------- |
| **Document Background** | `bg-white`          | Pure white background mandatory for printing |
| **Primary Text**        | `text-zinc-900`     | High-contrast readable typography            |
| **Secondary Text**      | `text-zinc-700`     | Body and descriptive paragraphs              |
| **Tertiary Text**       | `text-zinc-500`     | Dates, companies, institutions               |
| **Dividers**            | `border-zinc-200`   | Thin horizontal separation lines             |
| **Print Accent**        | `text-accent-print` | Configurable accent header/rule              |

---

## 3. Typography & Scales

### Recommended Font Stacks

- **Sans-serif (Body & Headings):** `Inter`, `Geist Sans`, or system sans fallback (`font-sans`).
- **Monospace (Stack, Badges, Paths):** `JetBrains Mono`, `Geist Mono`, or system mono fallback (`font-mono`).

### Typographic Scales

- **Hero / Primary Title:** `text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl`
- **Subtitles / Role:** `text-lg font-medium text-zinc-300`
- **Section Titles (Web):** `text-xl font-semibold text-zinc-100 flex items-center gap-2`
- **Tech Badges:** `font-mono text-xs font-medium px-2 py-0.5 rounded-md`
- **CV A4 Text (Body):** `text-[12px] leading-relaxed text-zinc-700`
- **CV A4 Metadata:** `text-[11px] font-mono text-zinc-500`

---

## 4. Component Patterns (Reference Implementations)

### A. Availability Badge (Pulsing Indicator)

```html
<div
  class="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
>
  <span class="relative flex h-2 w-2">
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
    ></span>
    <span
      class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
    ></span>
  </span>
  Available for projects & internships
</div>
```

---

### B. Bento Grid Card with Active Border

```html
<div
  class="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-zinc-950/50"
>
  <div class="mb-3 flex items-start justify-between gap-4">
    <h3
      class="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-white"
    >
      Local Music Management Engine
    </h3>
    <span
      class="rounded-md border border-zinc-700/50 bg-zinc-800/70 px-2 py-0.5 font-mono text-xs text-zinc-300"
    >
      Python
    </span>
  </div>

  <p class="mb-4 text-sm leading-relaxed text-zinc-400">
    Open-source music manager focusing on metadata normalization and local
    streaming.
  </p>

  <div class="flex flex-wrap gap-1.5">
    <span
      class="rounded border border-zinc-800 bg-zinc-800/40 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
    >
      yt-dlp
    </span>
    <span
      class="rounded border border-zinc-800 bg-zinc-800/40 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
    >
      ListenBrainz API
    </span>
    <span
      class="rounded border border-zinc-800 bg-zinc-800/40 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
    >
      ID3 Tagging
    </span>
  </div>
</div>
```

---

### C. "Copy Email" Button with Instant Feedback

```html
<button
  type="button"
  id="copy-email-btn"
  class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
  data-email="aitorgallegocr21@gmail.com"
>
  <svg
    id="copy-icon"
    class="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    ></path>
  </svg>
  <span id="copy-text">Copy email</span>
</button>

<script>
  const btn = document.getElementById('copy-email-btn');
  const text = document.getElementById('copy-text');
  btn?.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || '';
    navigator.clipboard.writeText(email).then(() => {
      if (text) text.textContent = 'Copied!';
      btn.classList.add('border-emerald-500/50', 'text-emerald-400');
      setTimeout(() => {
        if (text) text.textContent = 'Copy email';
        btn.classList.remove('border-emerald-500/50', 'text-emerald-400');
      }, 2000);
    });
  });
</script>
```

---

### D. External Link with Micro-translation

```html
<a
  href="https://github.com/aitorgcr"
  target="_blank"
  rel="noopener noreferrer"
  class="group inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
>
  <span>View repository</span>
  <svg
    class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    ></path>
  </svg>
</a>
```

---

### E. Interactive Profile Portrait with Dynamic Glow

```html
<div class="group relative h-48 w-48 perspective-[1000px] sm:h-56 sm:w-56">
  <!-- Dynamic glow backdrop -->
  <div
    class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-30 blur-lg transition duration-500 group-hover:opacity-70"
  ></div>

  <!-- Image frame with subtle 3D tilt -->
  <div
    class="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
  >
    <img
      src="/images/avatar.webp"
      alt="Aitor Gallego"
      class="h-full w-full object-cover"
    />

    <!-- Floating status pill -->
    <div
      class="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/75 px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md"
    >
      <span
        class="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent)]"
      ></span>
      <span>19 años · Open to work</span>
    </div>
  </div>
</div>
```

---

### F. Floating Island Navbar & Responsive Mobile Drawer

```html
<!-- Floating Pill Container -->
<header
  id="site-header"
  class="sticky top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-5xl rounded-2xl border border-zinc-200/80 bg-white/85 shadow-lg shadow-zinc-950/5 backdrop-blur-md transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_4px_24px_-4px_var(--color-accent-glow)] sm:top-4 sm:w-[calc(100%-2rem)] md:rounded-full dark:border-zinc-800/80 dark:bg-zinc-950/85 dark:shadow-zinc-950/30 dark:hover:border-zinc-700/80"
>
  <div
    class="flex h-14 items-center justify-between gap-2 px-3.5 sm:h-16 sm:gap-4 sm:px-6"
  >
    <!-- Brand with glowing pulse dot -->
    <a href="/" class="group flex items-center gap-2.5 font-semibold">
      <span class="relative flex h-2.5 w-2.5 items-center justify-center">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-40"
        ></span>
        <span
          class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]"
        ></span>
      </span>
      <span class="text-sm font-bold tracking-tight sm:text-base"
        >Portfolio</span
      >
    </a>

    <!-- Desktop Nav Links with hover underline micro-indicator -->
    <nav
      class="hidden items-center gap-1.5 text-xs font-medium md:flex lg:text-sm"
    >
      <a
        href="#proyectos"
        class="group relative rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900/80"
      >
        <span>Proyectos</span>
        <span
          class="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-0 transition-all group-hover:w-3.5 group-hover:opacity-100"
        ></span>
      </a>
    </nav>

    <!-- Right Controls: CV PDF, Theme Picker & Mobile Menu Trigger -->
    <div class="flex items-center gap-1.5 sm:gap-2">
      <a
        href="/cv"
        class="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-white"
      >
        <span>CV PDF</span>
      </a>
      <ThemeToggle />
      <button
        id="mobile-nav-toggle"
        class="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full md:hidden"
        aria-expanded="false"
      >
        <menu class="menu-open-icon h-5 w-5" />
      </button>
    </div>
  </div>

  <!-- Mobile Drawer -->
  <div
    id="mobile-nav-menu"
    class="hidden space-y-1 border-t border-zinc-200/70 px-3.5 pt-2 pb-4 md:hidden dark:border-zinc-800/70"
  >
    <a
      href="#proyectos"
      class="mobile-nav-link flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium"
    >
      <span>Proyectos</span>
      <span class="font-mono text-xs text-zinc-500">01</span>
    </a>
  </div>
</header>
```

---

### G. Mobile-First Certificate & PDF Viewer (`CertificateModal.astro`)

```html
<dialog
  id="certificate-modal"
  class="fixed inset-0 z-50 m-0 h-screen max-h-none w-screen max-w-none items-center justify-center border-0 bg-transparent p-0 backdrop:bg-zinc-950/80 backdrop:backdrop-blur-md sm:p-6 md:p-8"
  aria-labelledby="cert-modal-title"
  aria-modal="true"
>
  <div
    class="relative flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden rounded-none border-0 border-zinc-200 bg-white shadow-2xl sm:h-[90vh] sm:max-h-[920px] sm:rounded-2xl sm:border dark:border-zinc-800 dark:bg-zinc-900"
    id="cert-modal-container"
  >
    <!-- Modal Header with mobile close and compact action buttons -->
    <div
      class="flex shrink-0 flex-col gap-2.5 border-b border-zinc-200 bg-zinc-50/90 px-3.5 py-2.5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3.5 dark:border-zinc-800 dark:bg-zinc-900/95"
    >
      <div
        class="flex min-w-0 items-center justify-between gap-2.5 sm:justify-start"
      >
        <div class="flex min-w-0 items-center gap-2.5">
          <FileText class="h-4 w-4 text-[var(--color-accent)]" />
          <h2
            id="cert-modal-title"
            class="truncate text-sm font-semibold sm:text-base"
          >
            Visor de Documento
          </h2>
        </div>
        <button
          type="button"
          class="cert-modal-close-trigger flex min-h-[44px] min-w-[44px] items-center justify-center sm:hidden"
          aria-label="Cerrar visor"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <div
        class="flex w-full shrink-0 items-center justify-end gap-1.5 sm:w-auto sm:gap-2"
      >
        <button
          id="cert-modal-download-all"
          class="hidden min-h-[38px] flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold sm:flex-initial"
        >
          ZIP
        </button>
        <a
          id="cert-modal-download"
          href="#"
          download
          class="inline-flex min-h-[38px] flex-1 items-center justify-center rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-white sm:flex-initial"
          >Descargar</a
        >
        <a
          id="cert-modal-external"
          href="#"
          target="_blank"
          class="shrink-0 rounded-lg border p-2 text-xs"
          ><ExternalLink class="h-4 w-4"
        /></a>
        <button
          id="cert-modal-close"
          class="cert-modal-close-trigger hidden shrink-0 rounded-lg p-2 sm:flex"
        >
          <X class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Multi-document Touch Tabs -->
    <div
      id="cert-modal-nav-container"
      class="flex hidden shrink-0 scrollbar-none items-center gap-2 overflow-x-auto border-b border-zinc-200 bg-zinc-100/90 px-3.5 py-2 sm:px-5 dark:border-zinc-800/80 dark:bg-zinc-800/70"
    >
      <div
        id="cert-modal-nav-tabs"
        class="flex flex-nowrap items-center gap-1.5"
      ></div>
    </div>

    <!-- Viewer Body with Mobile PDF Helper Banner -->
    <div
      class="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-950"
    >
      <div
        id="cert-modal-mobile-banner"
        class="z-20 flex w-full shrink-0 items-center justify-between gap-2 bg-zinc-900 px-3 py-2 text-white sm:hidden"
      >
        <span class="truncate text-[11px] text-zinc-300"
          >Vista móvil · ¿Deseas ver a pantalla completa?</span
        >
        <a
          id="cert-modal-mobile-open"
          href="#"
          target="_blank"
          class="rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-[11px] font-semibold text-white"
          >Ver PDF</a
        >
      </div>
      <iframe
        id="cert-modal-iframe"
        src="about:blank"
        class="relative z-10 w-full flex-1 border-0"
        title="Vista previa del documento"
      ></iframe>
    </div>
  </div>
</dialog>
```

> [!IMPORTANT]
> **Native `<dialog>` Rule:** Never add an unconditional `flex` class to a `<dialog>` element without `hidden` or `open:flex`. Otherwise, modern browsers will display the dialog permanently even when `dialog.close()` is called or the `open` attribute is removed.

---

## 5. Mandatory Rules for Print View (/cv)

1. **A4 Sheet Configuration:**
   ```css
   @page {
     size: A4 portrait;
     margin: 10mm 12mm 10mm 12mm;
   }
   ```
2. **Page-break Controls (`break-inside-avoid`):**
   Every experience block, project card, or education entry MUST include `break-inside-avoid` to prevent split headings or orphaned lists across page cuts.
3. **Conditional Visibility:**
   - Use `print:hidden` on floating toolbars, navigation bars, and language switchers.
   - Use `print:block` or `print:text-zinc-900` to enforce high contrast on pure white PDF backgrounds.

---

## 6. Dockable Navigation, Interface Hub & Fluid Scroll-Spy System

### A. Viewport Capability Tiers & Magnetic Dock Positions (`data-dock`)

Navigation island geometry adapts across responsive tiers managed via `src/lib/dock-manager.ts`:

- **Desktop (`>= 1024px`):** Full 4-edge positioning (`top`, `bottom`, `left`, `right`).
- **Tablet (`768px – 1023px`):** Constrained strictly to `top` and `bottom` (lateral docks disabled to avoid covering central cards).
- **Mobile (`< 768px`):** Supports `top` and `bottom` with `env(safe-area-inset-bottom)` home indicator padding, tactile vertical touch drag snapping, and an upward-opening mobile menu drawer.

| Position        | Viewports Supported  | Anchor Style                                           | Visual Characteristics                                                                 |
| :-------------- | :------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `top` (Default) | Universal (All)      | `sticky top-3 sm:top-4 left-1/2 -translate-x-1/2`      | Micro-label dock on desktop, full mobile header on small screens                       |
| `bottom`        | Universal (All)      | `fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2` | macOS-style floating dock; mobile menu and popovers open upwards (`bottom-up`)         |
| `left`          | Desktop (`>=1024px`) | `fixed left-5 top-1/2 -translate-y-1/2`                | Compact ~56px icon-first rail with inside-facing floating tooltips (`left-full ml-3`)  |
| `right`         | Desktop (`>=1024px`) | `fixed right-5 top-1/2 -translate-y-1/2`               | Compact ~56px icon-first rail with inside-facing floating tooltips (`right-full mr-3`) |

### B. Dock Navigation Link Geometry (macOS Dock Style)

Horizontal docks (`top` and `bottom`) adopt a space-efficient icon + micro-label column layout:

- **Cell Structure:** `flex flex-col items-center justify-center px-2.5 py-1 min-w-[50px] rounded-xl`.
- **Micro-Label:** `text-[9.5px] font-semibold tracking-wider uppercase` with tabular numbers.
- **Dynamic Glow:** Real-time CSS property `--nav-glow` interpolating typography and icon drop shadow with `color-mix(in srgb, var(--color-accent) calc(var(--nav-glow) * 100%), currentColor)`.
- **Vertical Rails (`left` / `right`):** Clean icon-only square cells (`w-10 h-10`) with floating directional glassmorphic tooltips.

### C. Unified Interface Hub (`#palette-dropdown`)

A consolidated command center replacing multiple independent action buttons with a single `Sliders` icon button featuring a live accent dot:

- **Desktop Layout:** 3-column Bento grid (`sm:w-[680px] lg:w-[720px] rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl p-3.5`):
  - **Column 1 (Modo & Aspecto):** Segmented Light (`☀️ Claro`) vs Dark (`🌙 Oscuro`) switcher + visual skin picker (`bento-modern`).
  - **Column 2 (Acento Cromático):** "Rotación Viva 7 Días" hero card + 7 weekday accent palette swatches with active check indicators.
  - **Column 3 (Posición del Dock):** 4-quadrant visual placement selector (Top, Bottom, Left, Right) + double-click restore action.
- **Mobile Layout:** High-density vertically stacked sheet with smooth scrolling, clear section dividers, and >= 44x44px touch targets.
- **Directional Animations:** Popover dynamically emerges from the active dock edge (`popover-spring-top`, `popover-spring-bottom`, `popover-spring-left`, `popover-spring-right`).

### D. Upward-Opening Mobile Menu Drawer & Touch Drag Snapping

- **Upward Drawer:** When docked at the bottom on mobile, `#mobile-nav-menu` opens above the dock (`bottom-[calc(100%+0.5rem)]`) using `mobile-drawer-open-bottom` spring keyframes.
- **Vertical Touch Drag:** Tactile grip handle (`#dock-drag-handle`) with `touch-action: none` allows dragging the dock vertically along the Y-axis. Dragging past the viewport midpoint (`window.innerHeight / 2`) magnetically snaps to `top` or `bottom`.

### E. Fluid Scroll-Spy Engine (`src/lib/scroll-spy.ts`)

Replaces discrete threshold toggling with continuous mathematical interpolation across the active sections (`#proyectos`, `#trayectoria`, `#certificaciones`, `#filosofia`, `#contacto`):

- **Continuous 2D Pill Glide:** GPU-composited `transform: translate3d(x, y, 0)` smoothly moving between link boundaries on both X and Y axes.
- **Dynamic Text Glow:** Real-time CSS property `--nav-glow` interpolating typography brightness with `color-mix(in srgb, var(--color-accent) calc(var(--nav-glow) * 100%), currentColor)`.
- **Zero-Jank Guarantee:** Caches section tops and relative link bounding boxes via `ResizeObserver`; updates exclusively inside passive `requestAnimationFrame`.
- **Viewport Isolation:** Gated strictly to tablet/desktop viewports (`min-width: 768px` for scroll-spy), maintaining mobile drawer simplicity.
