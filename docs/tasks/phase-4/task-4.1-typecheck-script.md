# Task 4.1: Strict Typecheck Verification Script

## Objective
Configure and verify strict typecheck scripts (`npm run check` and `npm run build`) in `package.json` to ensure zero compilation regressions.

## Context & Commands
- **Scripts:** `astro check`, `tsc --noEmit`.
- **Target:** Fail immediately if any component violates TypeScript schemas or imports untyped data.

## Detailed Requirements
1. **Script Validation:**
   - Verify `"check": "astro check"` in `package.json`.
   - Verify `"build": "astro check && astro build"`.
2. **Execution Test:**
   - Execute both locally and confirm 0 errors.

## Acceptance Criteria
- [ ] `npm run check` exits with code 0.
- [ ] Typecheck runs as a mandatory prerequisite for all builds.
