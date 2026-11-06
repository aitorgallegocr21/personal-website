## 📋 Summary of Changes

<!-- Brief 1-3 line description of what this PR introduces, fixes, or improves. -->

- **Related Phase / Task:** `docs/tasks/...` <!-- e.g., Phase 24, Task 24.7 -->
- **Type of Change:**
  - [ ] 🚀 `feat`: New feature or user-facing capability
  - [ ] 🐛 `fix`: Bug fix or layout/print adjustment
  - [ ] 💄 `style`: Visual styling, theme token or UI polish
  - [ ] ♻️ `refactor`: Code restructuring without functional changes
  - [ ] 📝 `docs`: Documentation, task specs or backlog update
  - [ ] 🧪 `test`: Unit or end-to-end tests
  - [ ] 🔧 `chore`: Tooling, workflow, dependencies or configuration

---

## 🔍 Key Architectural Changes

<!-- Bullet points summarizing modifications to components, data models, routes or styles. -->

-
-

---

## ✅ Quality Gate & Inviolable Rules Checklist

Before requesting review or merging to `main`, verify all checks:

- [ ] **SSOT Compliance:** No hardcoded biographical copy, dates, company names, or skills in components. Everything consumed from `src/data/cv-data.ts`.
- [ ] **Strict Typing:** All new data models and functions are typed without `any`.
- [ ] **Quality Verification Gate:** `npm run verify` passed with 0 errors (`check` + `lint` + `format` + `test` + `build`).
- [ ] **E2E Testing:** Playwright tests passed (`npx playwright test`).
- [ ] **A4 Print Engine Budget:** `/cv` fits strictly in 1 A4 page with zero vertical overflow across all color palettes.
- [ ] **Mobile-First & Touch Parity:** Verified on mobile viewports (375px/390px) with touch targets >= 44x44px and zero horizontal overflow.
- [ ] **Documentation & Backlog Synchronized:** `README.md`, `README.es.md`, and `docs/TASKS.md` updated if milestone/feature was altered.

---

## 📸 Visual Previews / Screenshots (Optional)

<!-- Attach before/after screenshots, GIFs, or PDF previews if visual or layout changes were made. -->
