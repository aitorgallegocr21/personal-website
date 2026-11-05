# Task 22.1: Playwright CI Automation & Browser Detection

**Status:** Pending  
**Scope:** `playwright.config.ts`, `.github/workflows/ci.yml`, `package.json`

---

## 1. Technical Objective

Harden the Playwright configuration to automatically detect locally installed Chrome or Chromium binaries if Playwright's browser cache is unpopulated, and integrate automated E2E testing into `.github/workflows/ci.yml` with dependencies installation.

---

## 2. Detailed Specification

1. **Browser Discovery in `playwright.config.ts`:**
   - Scan for candidate browser paths in order:
     1. Local repo binary (`chrome/linux-*/chrome-linux64/chrome`) if present.
     2. System Google Chrome (`/usr/bin/google-chrome`, `/usr/bin/google-chrome-stable`).
     3. System Chromium (`/usr/bin/chromium`, `/usr/bin/chromium-browser`).
     4. Default Playwright managed browser if none of the above are discovered.
   - Set `launchOptions.executablePath` when a valid system or local binary is found, preventing unhandled launch errors in environments where only system Chrome exists.

2. **Continuous Integration Pipeline (`.github/workflows/ci.yml`):**
   - Add step before test execution:
     ```yaml
     - name: Install Playwright Browsers & OS Dependencies
       run: npx playwright install --with-deps chromium
     ```
   - Add E2E execution step:
     ```yaml
     - name: Run Playwright E2E Tests
       run: npm run test:e2e
     ```
   - Verify that test artifacts, traces, and HTML reports are captured on failure.

---

## 3. Verification

```bash
npm run test:e2e
git diff .github/workflows/ci.yml
npm run check
```
