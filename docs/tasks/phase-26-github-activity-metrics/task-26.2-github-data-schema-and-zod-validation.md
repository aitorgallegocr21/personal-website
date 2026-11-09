# Task 26.2: GitHub Data Schema, Zod Validation & SSOT Typing

**Status:** Planned  
**Branch:** `feat/phase-26-github-activity-metrics`  
**Goal:** Define strict TypeScript contracts in `src/types/github.ts` and runtime Zod validation schemas in `src/schemas/github.schema.ts` to ensure type safety, eliminate `any`, provide default fallbacks, and validate the `github-data.json` snapshot with unit tests in `tests/unit/github-schema.test.ts`.

---

## 1. Context & Motivation

Following the project's inviolable Golden Rule (SSOT & Strict Typing), all external data ingested into the system must be rigorously typed at compile-time and validated at runtime.

Because GitHub GraphQL API responses or cached snapshots can be corrupted, outdated, or incomplete, a runtime validation barrier using **Zod** protects Astro templates against `undefined` exceptions, unexpected nulls, or schema mutations. If invalid data is encountered during testing or build, Zod produces actionable validation errors before deployment.

---

## 2. Technical Implementation Spec

1. **TypeScript Interface Modeling (`src/types/github.ts`):**
   - `ContributionLevel`: `'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'` (or `0 | 1 | 2 | 3 | 4`).
   - `ContributionDay`:
     ```ts
     export interface ContributionDay {
       date: string; // ISO date 'YYYY-MM-DD'
       count: number;
       level: 0 | 1 | 2 | 3 | 4;
       weekday: number; // 0 (Sunday) to 6 (Saturday)
     }
     ```
   - `ContributionWeek`:
     ```ts
     export interface ContributionWeek {
       days: ContributionDay[];
     }
     ```
   - `ContributionCalendar`:
     ```ts
     export interface ContributionCalendar {
       totalContributions: number;
       weeks: ContributionWeek[];
     }
     ```
   - `LanguageMetric`:
     ```ts
     export interface LanguageMetric {
       name: string;
       color: string;
       percentage: number;
       size: number;
     }
     ```
   - `RepositoryHighlight`:
     ```ts
     export interface RepositoryHighlight {
       name: string;
       description: string | null;
       url: string;
       stars: number;
       forks: number;
       language: string | null;
       languageColor: string | null;
     }
     ```
   - `GitHubMetrics`:
     ```ts
     export interface GitHubMetrics {
       username: string;
       updatedAt: string;
       totalContributions: number;
       currentStreak: number;
       longestStreak: number;
       totalRepositories: number;
       totalStars: number;
       totalForks: number;
       topLanguages: LanguageMetric[];
       highlights: RepositoryHighlight[];
       calendar: ContributionCalendar;
     }
     ```

2. **Zod Runtime Validation Schema (`src/schemas/github.schema.ts`):**
   - Build Zod schemas mirroring the TypeScript interfaces (`contributionDaySchema`, `contributionWeekSchema`, `languageMetricSchema`, `repositoryHighlightSchema`, `gitHubMetricsSchema`).
   - Define a safe parsing helper `validateGitHubMetrics(data: unknown): GitHubMetrics` that validates data and provides robust defaults if optional fields are missing.
   - Export an empty/mock fallback object `fallbackGitHubMetrics` to ensure zero runtime panics if the JSON file is missing.

3. **Data Loader Utility (`src/data/github.ts`):**
   - Provide a safe loader function `getGitHubMetrics(): GitHubMetrics` that reads `src/data/github-data.json`, validates it via `gitHubMetricsSchema.parse()`, and returns typed data.

4. **Unit Testing (`tests/unit/github-schema.test.ts`):**
   - Verify that `src/data/github-data.json` conforms 100% to `gitHubMetricsSchema`.
   - Verify that corrupted or partial data triggers specific Zod validation errors.
   - Verify that `fallbackGitHubMetrics` passes validation and supplies sensible default values.

---

## 3. Verification Checklist

- [ ] All GitHub data types are strongly typed in `src/types/github.ts` with zero `any`.
- [ ] Zod schema in `src/schemas/github.schema.ts` accurately parses valid payloads and rejects malformed inputs.
- [ ] Unit tests in `tests/unit/github-schema.test.ts` pass with 100% success.
- [ ] `npm run check` confirms 0 TypeScript / Astro type errors.
