# Task 1.4: Environment Phone Injection & Data Sanitization

## Objective
Decouple phone number from git tracking by reading `import.meta.env.PUBLIC_PHONE` and sanitizing `src/data/cv-data.ts`.

## Context & Security
- **Location:** `src/data/cv-data.ts`, `.env.example`
- **Security Rule:** Personal phone must NEVER exist in plaintext in committed git files.
- **Typing:** Uses `src/env.d.ts` where `PUBLIC_PHONE` is typed as optional string.

## Detailed Requirements
1. **Dynamic Phone Resolution:**
   ```ts
   phone: import.meta.env.PUBLIC_PHONE || undefined,
   ```
2. **Fallback Safety:**
   - If `PUBLIC_PHONE` is absent, the value resolves cleanly to `undefined`.
   - Components will conditionally render the phone block only if `cvData.personal.phone` exists.
3. **Environment Template:**
   - Verify `.env.example` contains dummy placeholder: `PUBLIC_PHONE="+34 000 00 00 00"`.
   - Ensure real `.env` remains in `.gitignore`.

## Acceptance Criteria
- [x] No hardcoded phone number in `src/data/cv-data.ts`.
- [x] Safe fallback when environment variable is unset.
- [x] `npm run build` succeeds without `PUBLIC_PHONE` being mandatory.
