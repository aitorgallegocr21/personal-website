# Task 26.3: Theme-Adaptive Contribution Heatmap Component

**Status:** Planned  
**Branch:** `feat/phase-26-github-activity-metrics`  
**Goal:** Build a native SVG/CSS Grid contribution calendar component (`src/components/portfolio/GitHubHeatmap.astro`) that dynamically adapts to the portfolio's active color palette (`--color-accent`), calculates streaks with pure algorithmic utilities (`src/utils/github.ts`), and includes accessible date/count tooltips with 0 KB unnecessary client JS.

---

## 1. Context & Motivation

Standard third-party GitHub contribution widgets (e.g. static PNG badges or GitHub iframe embeds) suffer from several flaws:

- They are locked to GitHub's default green shade, clashing with the user's custom accent palette (Emerald, Teal, Sky, Slate, Violet, Rose, Amber, Monochrome).
- They load third-party assets that delay initial render, fail ad-blockers, and cannot be dynamically themed.
- They lack keyboard accessibility and clean mobile adaptations.

By crafting a custom, native Astro component:

- The 52-week contribution matrix is rendered at build-time using clean SVG `<rect>` elements or CSS Grid squares.
- Color levels (0 to 4) consume CSS custom properties defined in `src/styles/global.css`:
  - **Level 0 (No activity):** `bg-zinc-100 dark:bg-zinc-800/60`
  - **Level 1 (Light):** `bg-[var(--color-accent-subtle)]`
  - **Level 2 (Moderate):** `bg-[var(--color-accent)] opacity-40`
  - **Level 3 (High):** `bg-[var(--color-accent)] opacity-75`
  - **Level 4 (Peak):** `bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]`
- When the user rotates or switches color themes in the Interface Hub, the entire calendar transitions instantaneously without requiring page reloads or DOM manipulation.

---

## 2. Technical Implementation Spec

1. **Streak & Metric Calculation Utilities (`src/utils/github.ts`):**
   - Implement pure functions for testability:
     - `calculateCurrentStreak(days: ContributionDay[]): number`: Scans backward from today/latest date counting consecutive days with `count > 0` (accounting for active day grace period).
     - `calculateLongestStreak(days: ContributionDay[]): number`: Determines the maximum continuous sequence of active contribution days.
     - `calculateYearlyContributions(calendar: ContributionCalendar): number`: Sums all contributions across the recorded 52-week window.
     - `formatContributionDate(dateStr: string): string`: Formats ISO date into human-readable Spanish locale (e.g., `12 de oct. de 2026`).

2. **Heatmap Component (`src/components/portfolio/GitHubHeatmap.astro`):**
   - Props: `calendar: ContributionCalendar`, `class?: string`.
   - Grid Layout:
     - 52 columns (weeks) x 7 rows (days).
     - Weekday labels on the left (L, M, X, J, V, S, D or Lun, Mié, Vie).
     - Month header labels aligned above corresponding weeks (Ene, Feb, Mar...).
     - Legend in the bottom-right corner showing "Menos" -> [0, 1, 2, 3, 4] -> "Más".
   - Tooltips:
     - Pure CSS/HTML hover tooltips or lightweight microinteraction (`role="tooltip"` and `aria-label`).
     - Tooltip text: `"{count} contribuciones el {date}"` (or `"Sin contribuciones el {date}"`).
   - Responsive & Mobile Handling:
     - Wrap calendar grid in a horizontally scrollable container with custom smooth scrollbar (`overflow-x-auto pb-2`).
     - On mobile screens, automatically scroll or snap to the rightmost edge (latest activity) so visitors immediately see recent contributions.
     - Ensure minimum cell size is touch-friendly or properly contained within the card padding.

3. **Unit Tests (`tests/unit/github-utils.test.ts`):**
   - Test `calculateCurrentStreak` across edge cases (streak broken today, streak alive yesterday, empty history, leap years).
   - Test `calculateLongestStreak` with intermittent activity.
   - Test date formatting and contribution sum integrity.

---

## 3. Verification Checklist

- [ ] Heatmap renders 52 weeks of GitHub activity cleanly without layout shifts.
- [ ] Cells accurately reflect intensity levels 0 through 4 based on GitHub contribution volume.
- [ ] Colors dynamically adopt the active palette CSS tokens (`--color-accent`, etc.) across all 8 themes.
- [ ] Hover/focus on any day cell reveals an accessible tooltip with the exact date and contribution count.
- [ ] Mobile viewports (< 640px) allow smooth horizontal swiping without page horizontal scroll overflow.
- [ ] Pure utility functions in `src/utils/github.ts` achieve 100% test coverage in `tests/unit/github-utils.test.ts`.
