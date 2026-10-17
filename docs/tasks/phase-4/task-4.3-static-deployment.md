# Task 4.3: Static Hosting Deployment Pipeline

## Objective
Configure automated static hosting deployment on GitHub Pages or Cloudflare Pages from the `dist/` production build output.

## Context & Artifacts
- **Output Directory:** `dist/`
- **Output Mode:** Static HTML/CSS (`output: "static"` in `astro.config.mjs`).

## Detailed Requirements
1. **Hosting Choice & Configuration:**
   - Configure GitHub Pages deployment workflow or Cloudflare Pages git integration.
2. **Custom Domain & Canonical URL:**
   - Configure domain `site` in `astro.config.mjs` (e.g. `https://aitorgcr.dev`).
3. **Cache & Performance:**
   - Ensure static assets in `_astro/` have immutable cache headers.

## Acceptance Criteria
- [ ] Deployed production site loads under 1 second.
- [ ] Lighthouse Performance score > 98.
