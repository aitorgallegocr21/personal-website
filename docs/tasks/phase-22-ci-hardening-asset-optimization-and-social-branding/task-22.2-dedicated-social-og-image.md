# Task 22.2: Dedicated Open Graph Social Image & Meta Ingestion

**Status:** Pending  
**Scope:** `public/images/og-image.png`, `src/layouts/BaseLayout.astro`, `src/data/cv-data.ts`, `tests/unit/schema-org.test.ts`

---

## 1. Technical Objective

Create a dedicated 1200x630 pixel Open Graph preview image (`og-image.png`) with clean typography, developer title, core tech stack badges, and branding aesthetics, and update `BaseLayout.astro` to serve it with full canonical URL resolution for social platforms (LinkedIn, Twitter/X, Discord, Slack).

---

## 2. Detailed Specification

1. **Asset Creation (`public/images/og-image.png`):**
   - Resolution: Exactly 1200x630 pixels (standard 1.91:1 ratio for Facebook, LinkedIn, Twitter `summary_large_image`).
   - Dark tech aesthetic aligned with the project's design system tokens (zinc background `#09090b`, accent borders, readable typography).
   - Content: Developer Full Name (`Aitor Gallego`), Professional Title (`Full Stack & AI Engineer`), key highlights, and portfolio URL.

2. **Metadata Integration in `src/layouts/BaseLayout.astro`:**
   - Update default `image` prop in `BaseLayout.astro` to prefer `/images/og-image.png`.
   - Ensure `og:image:width` (`1200`), `og:image:height` (`630`), and `og:image:type` (`image/png`) metadata tags are included for instant social crawler caching without re-scraping delays.
   - Maintain Twitter `summary_large_image` configuration with the new image URL.

3. **Schema.org Integration:**
   - Ensure `JsonLd.astro` continues to receive the appropriate image URL representation for `ProfilePage` and `Person`.

---

## 3. Verification

```bash
npm run build
npm run test:e2e
```

Verify generated `<meta property="og:image" ...>` points to the new 1200x630 asset.
