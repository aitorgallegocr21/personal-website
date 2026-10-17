# Task 4.2: CI Pipeline Validation (GitHub Actions)

## Objective
Validate and document `.github/workflows/ci.yml` so that every push and pull request executes dependency installation, TypeScript verification, and static production build.

## Context & File
- **Workflow:** `.github/workflows/ci.yml`
- **Environment:** Node.js 22 LTS on `ubuntu-latest`.

## Detailed Requirements
1. **Pipeline Steps:**
   - Actions checkout (`actions/checkout@v4`).
   - Setup Node.js 22 (`actions/setup-node@v4`) with npm cache.
   - Clean install (`npm ci`).
   - Type check (`npm run check`).
   - Build (`npm run build`) with placeholder `PUBLIC_PHONE` secret.
2. **Branch Triggers:**
   - Triggers on push and pull requests targeting `main` (and release branches).

## Acceptance Criteria
- [ ] Workflow passes all jobs in green on GitHub Actions.
- [ ] Safe fallback for missing secrets.
