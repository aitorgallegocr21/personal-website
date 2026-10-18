# Task 5.4: Projects Bento Enhancements

## Objective
Upgrade the Bento project grid cards in `ProjectsGrid.astro` to showcase preview screenshots/mockups, a distinct "Proyecto Actual" animated badge for the personal website, and direct repository and live demo action links.

## Context & Artifacts
- **Files:** `src/components/portfolio/ProjectsGrid.astro`, `src/data/cv-data.ts`
- **Asset Directory:** `public/images/projects/`

## Detailed Requirements
1. **Current Project Badge:**
   - Display a distinct, glowing badge (*"⚡ Proyecto actual"* or *"En desarrollo"*) on the portfolio card.
2. **Project Preview Images:**
   - Add responsive screenshot/preview container with hover zoom effect for projects that have images configured.
   - Clean gradient placeholder when no image is assigned.
3. **Action Links:**
   - Direct button to GitHub repository.
   - Direct button to Live Demo / Web page (when available).

## Acceptance Criteria
- [ ] Portfolio project card visually highlighted with "Proyecto actual" badge.
- [ ] Cards handle projects with or without images gracefully.
- [ ] All external links open with `target="_blank"` and `rel="noopener noreferrer"`.
