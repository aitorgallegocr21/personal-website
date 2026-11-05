# Task 22.3: Native Asset Pipeline Migration with `astro:assets`

**Status:** Completed  
**Scope:** `src/components/portfolio/ProfilePortrait.astro`, `src/components/skins/bento/BentoHero.astro`, `src/components/skins/bento/BentoProjects.astro`, `astro.config.mjs`

---

## 1. Technical Objective

Migrate static portrait and project images to Astro's native `<Image />` asset optimization pipeline, enabling build-time format transcoding (WebP/AVIF), automatic dimension attribution to eliminate Cumulative Layout Shift (CLS), and priority loading directives.

---

## 2. Detailed Specification

1. **Asset Imports & Pipeline Integration:**
   - Place source raster images inside `src/assets/images/` or import them directly so Astro's image service (Vite/Sharp) can process them.
   - Replace raw `<img>` markup in `ProfilePortrait.astro` and `BentoHero.astro` with `import { Image } from 'astro:assets'`.
   - Specify explicit `width`, `height`, and appropriate `alt` descriptions derived from `cvData`.

2. **Performance Flags:**
   - For above-the-fold hero portrait:
     - `loading="eager"`
     - `fetchpriority="high"`
     - Modern format transcoding.
   - For below-the-fold images (e.g. project screenshots):
     - `loading="lazy"`
     - `decoding="async"`

3. **Fallback & Static Path Compatibility:**
   - Preserve GitHub Pages subpath compatibility (`import.meta.env.BASE_URL`).
   - Ensure the print view (`/cv`) portrait remains unaltered or fully compatible with print media rules.

---

## 3. Verification

```bash
npm run check
npm run build
npm run test:e2e
```

Verify generated HTML outputs `<picture>` or `<img>` with automatic WebP/AVIF `srcset` attributes and zero CLS.
