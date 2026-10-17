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

| Semantic Token | Tailwind Class | Hex / Channel | Purpose |
|---|---|---|---|
| **Primary Background** | `bg-zinc-950` | `#09090b` | Global app canvas |
| **Card Surface** | `bg-zinc-900/40` | `rgba(24, 24, 27, 0.4)` | Card backdrop with `backdrop-blur-sm` |
| **Hover Surface** | `hover:bg-zinc-900/70` | `rgba(24, 24, 27, 0.7)` | Active card hover state |
| **Base Border** | `border-zinc-800/80` | `rgba(39, 39, 42, 0.8)` | Subtle precision borders |
| **Hover Border** | `hover:border-zinc-700` | `#3f3f46` | Highlighted border on hover |
| **Primary Text** | `text-zinc-100` | `#f4f4f5` | Headings, name, highlighted links |
| **Secondary Text** | `text-zinc-400` | `#a1a1aa` | Body copy and summaries |
| **Tertiary / Muted Text**| `text-zinc-500` | `#71717a` | Dates, metadata, secondary tags |
| **Tech Accent** | `text-emerald-400` | `#34d399` | Availability status indicator |
| **Accent Fill** | `bg-emerald-500/10` | `rgba(16, 185, 129, 0.1)` | Pill badge background |

### B. Print / PDF View (Swiss Minimalist - Light Mode)

| Semantic Token | Tailwind Class | Purpose |
|---|---|---|
| **Document Background** | `bg-white` | Pure white background mandatory for printing |
| **Primary Text** | `text-zinc-900` | High-contrast readable typography |
| **Secondary Text** | `text-zinc-700` | Body and descriptive paragraphs |
| **Tertiary Text** | `text-zinc-500` | Dates, companies, institutions |
| **Dividers** | `border-zinc-200` | Thin horizontal separation lines |

---

## 3. Typography & Scales

### Recommended Font Stacks
* **Sans-serif (Body & Headings):** `Inter`, `Geist Sans`, or system sans fallback (`font-sans`).
* **Monospace (Stack, Badges, Paths):** `JetBrains Mono`, `Geist Mono`, or system mono fallback (`font-mono`).

### Typographic Scales
* **Hero / Primary Title:** `text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl`
* **Subtitles / Role:** `text-lg font-medium text-zinc-300`
* **Section Titles (Web):** `text-xl font-semibold text-zinc-100 flex items-center gap-2`
* **Tech Badges:** `font-mono text-xs font-medium px-2 py-0.5 rounded-md`
* **CV A4 Text (Body):** `text-[12px] leading-relaxed text-zinc-700`
* **CV A4 Metadata:** `text-[11px] font-mono text-zinc-500`

---

## 4. Component Patterns (Reference Implementations)

### A. Availability Badge (Pulsing Indicator)
```html
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
  </span>
  Available for projects & internships
</div>
```

---

### B. Bento Grid Card with Active Border
```html
<div class="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-zinc-950/50">
  <div class="flex items-start justify-between gap-4 mb-3">
    <h3 class="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
      Local Music Management Engine
    </h3>
    <span class="font-mono text-xs px-2 py-0.5 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
      Python
    </span>
  </div>

  <p class="text-sm text-zinc-400 leading-relaxed mb-4">
    Open-source music manager focusing on metadata normalization and local streaming.
  </p>

  <div class="flex flex-wrap gap-1.5">
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
      yt-dlp
    </span>
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
      ListenBrainz API
    </span>
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
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
  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
  data-email="aitorgallegocr21@gmail.com"
>
  <svg id="copy-icon" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
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
  class="group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
>
  <span>View repository</span>
  <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
</a>
```

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
   * Use `print:hidden` on floating toolbars, navigation bars, and language switchers.
   * Use `print:block` or `print:text-zinc-900` to enforce high contrast on pure white PDF backgrounds.