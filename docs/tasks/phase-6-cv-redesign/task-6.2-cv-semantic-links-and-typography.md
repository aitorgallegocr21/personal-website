# Task 6.2: Semantic Handles & Typography Polish

## Objective
Refactor contact links and section headers across all CV components to show human-readable semantic handles (e.g. `github.com/aitorgcr` or `LinkedIn: /in/aitor-gallego-casilda`) rather than lengthy URLs, preserving functional `href` attributes.

## Context & Artifacts
- **Files:** `src/components/cv/CVHeader.astro`, `src/components/cv/CVExperience.astro`, `src/components/cv/CVProjects.astro`

## Detailed Requirements
1. **Clean Handle Presentation:**
   - Display concise labels with corresponding Lucide icons.
   - Retain full semantic `href` for interactive PDF viewers.
2. **Typography Hierarchy:**
   - Tight, elegant font scale (`text-[10px]` to `text-sm`) with high contrast in monochrome and color modes.

## Acceptance Criteria
- [x] No raw, sprawling URLs visible on the printable CV.
- [x] Links remain fully clickable in exported PDFs.
