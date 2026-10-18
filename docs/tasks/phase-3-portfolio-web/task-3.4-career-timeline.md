# Task 3.4: Create Career & Education Timeline

## Objective
Build `src/components/portfolio/Timeline.astro` to present the complete chronological path across software development, academic degrees (DAM & SMR), coaching, and hospitality.

## Context & SSOT
- **Location:** `src/components/portfolio/Timeline.astro`
- **Data Source:** `cvData.experience` and `cvData.education`.
- **Storytelling:** Highlights versatility, communication, and work ethic.

## Detailed Requirements
1. **Vertical Timeline Layout:**
   - Subtle vertical connecting line (`border-l border-zinc-800 ml-3 pl-6 space-y-8`).
   - Node indicators with status dots.
2. **Entries:**
   - Technical roles (NTT Data, Software projects).
   - Education (DAM 9.2, SMR 9.0).
   - Complementary experience (Tennis Coach, Customer service).
3. **Typography:**
   - Dates in monospace muted text (`font-mono text-xs text-zinc-500`).
   - Organization and role clearly distinguished.

## Acceptance Criteria
- [x] Complete chronological items rendered cleanly.
- [x] Fully responsive on mobile and desktop viewports.
