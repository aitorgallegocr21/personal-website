# Task 26.1: GitHub GraphQL Fetcher & Daily CI Automation Engine

**Status:** Completed  
**Branch:** `feat/phase-26-github-activity-metrics`  
**Goal:** Build a robust, offline-resilient build-time data ingestion engine (`scripts/fetch-github-data.mjs`) that queries the GitHub GraphQL API for user `aitorgallegocr21`, stores an SSOT snapshot in `src/data/github-data.json`, provides a fallback mock for offline/local builds, and configures a GitHub Actions daily cron workflow (`.github/workflows/github-sync.yml`).

---

## 1. Context & Motivation

Fetching third-party metrics directly in the client browser introduces critical disadvantages:

- Unauthenticated GitHub REST/GraphQL requests are severely rate-limited (60 requests/hr per IP).
- Exposure to network latency and third-party downtime causes Cumulative Layout Shift (CLS).
- Unnecessary client-side JavaScript overhead contradicts the portfolio's **0 KB unnecessary client JS** mission.

By moving metric ingestion to build-time via GitHub Actions and static compilation:

- A secure `GITHUB_TOKEN` is used on GitHub CI without exposing secrets to client browsers.
- Data is fetched once daily at 00:00 UTC and cached into a versioned JSON snapshot (`src/data/github-data.json`).
- If no token is provided (local offline development or clean clones), the engine gracefully falls back to the existing snapshot or an embedded mock structure, never breaking `npm run build` or `npm run check`.
- Astro renders 100% static SVG and HTML markup with instant page loads and zero layout shifts.

---

## 2. Technical Implementation Spec

1. **Ingestion Script (`scripts/fetch-github-data.mjs`):**
   - Read token from `process.env.GITHUB_TOKEN` or `process.env.GH_TOKEN`.
   - If token is absent and `src/data/github-data.json` exists, emit an informative log: `ℹ️ [GitHub Sync] No token provided; keeping existing snapshot.` and exit with code 0.
   - If token is present, execute a GraphQL query against `https://api.github.com/graphql`:
     ```graphql
     query ($username: String!) {
       user(login: $username) {
         name
         login
         avatarUrl
         bio
         url
         followers {
           totalCount
         }
         repositories(
           first: 100
           ownerAffiliations: OWNER
           privacy: PUBLIC
           isFork: false
           orderBy: { field: STARGAZERS, direction: DESC }
         ) {
           totalCount
           nodes {
             name
             description
             url
             stargazerCount
             forkCount
             primaryLanguage {
               name
               color
             }
             languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
               edges {
                 size
                 node {
                   name
                   color
                 }
               }
             }
           }
         }
         contributionsCollection {
           totalCommitContributions
           totalIssueContributions
           totalPullRequestContributions
           totalPullRequestReviewContributions
           contributionCalendar {
             totalContributions
             weeks {
               contributionDays {
                 date
                 contributionCount
                 contributionLevel
                 color
                 weekday
               }
             }
           }
         }
       }
     }
     ```
   - Transform and aggregate raw data:
     - Compute top languages aggregated by byte size across public non-fork repos.
     - Calculate star count, fork count, and repository totals.
     - Calculate contribution streaks (current streak, longest streak, yearly count).
     - Store output deterministically in `src/data/github-data.json` formatted with 2-space indentation.

2. **Snapshot Storage & Fallback (`src/data/github-data.json`):**
   - Provide a valid, fully populated initial snapshot committed to git to ensure fresh clones immediately compile without needing API tokens.
   - Add snapshot file to `.prettierignore` or ensure formatting matches Prettier standards.

3. **Automation Workflow (`.github/workflows/github-sync.yml`):**
   - Trigger on schedule (`cron: '0 0 * * *'`) and manual execution (`workflow_dispatch`).
   - Steps:
     - Checkout repository.
     - Setup Node.js 22.
     - Run `node scripts/fetch-github-data.mjs` with `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.
     - Detect git changes in `src/data/github-data.json`.
     - If changed, commit with `chore(data): update github live metrics snapshot [skip ci]` and push to `develop`.

4. **NPM Script Integration (`package.json`):**
   - Add `"sync:github": "node scripts/fetch-github-data.mjs"`.

---

## 3. Verification Checklist

- [x] `scripts/fetch-github-data.mjs` runs safely without `GITHUB_TOKEN` and falls back cleanly without crashing.
- [x] Running with a valid token retrieves accurate metrics for `aitorgallegocr21` and writes `src/data/github-data.json`.
- [x] Aggregation logic correctly sorts top programming languages by percentage and total bytes.
- [x] `.github/workflows/github-sync.yml` workflow syntax is valid and passes CI linting.
- [x] `npm run check` and `npm run build` pass with 0 errors.
