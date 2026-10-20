# Phase 8: Project Links, Assets & External Identity Audit

**Status:** In Progress (2026-10-20)

## Objective
Audit, correct, and populate all external hyperlinks (GitHub profile, LinkedIn profile, repository URLs, live demo URLs) and project preview assets across the web portfolio (`/`) and printable CV (`/cv`). Ensure strict adherence to the SSOT architecture in `src/data/cv-data.ts` without broken links (HTTP 404) or missing preview media.

---

## Tasks Breakdown
- [ ] [8.1 Audit and Template of External Links & Visual Assets](task-8.1-links-and-assets-manifest.md) — Create structured staging manifest for the user to provide exact profile handles, project repository URLs, live URLs, and image specifications.
- [ ] [8.2 Update SSOT Data & Image Assets Integration](task-8.2-update-ssot-and-assets.md) — Inject validated URLs into `src/data/cv-data.ts`, place required preview images in `public/images/projects/`, and verify component rendering.
- [ ] [8.3 Automated Link Verification & Production Build Validation](task-8.3-link-validation-and-build.md) — Run type-check (`npm run check`) and build (`npm run build`) to ensure 0 errors, correct navigation behavior, and zero broken assets.
