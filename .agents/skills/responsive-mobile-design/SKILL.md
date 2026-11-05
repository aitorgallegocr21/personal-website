---
name: responsive-mobile-design
description: Mobile-first responsive UI patterns, touch ergonomics, dynamic viewport handling, and resilient mobile modal/media standards for Tailwind CSS and Astro.
---

# Responsive Mobile-First Design Skill

This skill guides AI agents and developers implementing UI components, floating elements, interactive overlays, and media viewers to ensure flawless mobile ergonomics, visual hierarchy, and cross-browser consistency.

---

## 1. Core Ergonomic & Touch Standards

### A. Touch Targets (WCAG 2.5.5 / Apple HIG)

- All interactive controls (buttons, navigation pills, toggles, close buttons, modal tabs) must have a minimum hit target of **44x44 CSS pixels** (`min-h-[44px] min-w-[44px]` or padding that ensures an equivalent clickable/tappable surface).
- Avoid placing dense rows of small clickable icons without spacing. Use at least `gap-2` (8px) between touch targets.

### B. Mobile Viewport Units (`dvh` over `vh`)

- Never use raw `h-screen` or `h-[100vh]` for mobile full-height containers or overlays because mobile browser address bars and bottom navigation bars expand and shrink dynamically.
- Use `h-[100dvh]` or `min-h-[100dvh]` (Dynamic Viewport Height) so content does not get cut off under the mobile address bar in Safari iOS or Chrome Android.

### C. Safe Area Insets & Edge Margins

- Account for notched devices and gesture home indicators:
  - Use `pt-[env(safe-area-inset-top)]` and `pb-[env(safe-area-inset-bottom)]` where fixed/sticky bars touch the screen boundaries.
  - On floating navigation bars, maintain lateral breathing space: `w-[calc(100%-1.5rem)]` (or `mx-3 sm:mx-auto`) to prevent edge collisions on small displays (320px–375px).

---

## 2. Floating Navbar & Mobile Menu Patterns

1. **Floating Pill Layout:**
   - Position: `sticky top-3 sm:top-4 z-50 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl`.
   - Backdrop: High-contrast translucent surface with `backdrop-blur-md` and border (`border border-zinc-200/80 dark:border-zinc-800/80`).
2. **Mobile Drawer / Hamburger Navigation:**
   - Toggle button must toggle `aria-expanded` and convey clear visual state (e.g. Hamburger to X).
   - Menu drawer must render cleanly directly beneath or smoothly detached from the floating pill.
   - **Backdrop Lock:** When the mobile drawer is open, trap focus or handle outside clicks cleanly, closing automatically when an anchor link is tapped.

---

## 3. Resilient Mobile Document & Modal Guidelines

### A. The Mobile PDF & `<iframe>` Constraint

- **Constraint:** Mobile Safari (iOS) and many Android browsers either do not render multi-page PDFs inside `<iframe>` tags or trigger unwanted download loops instead of inline rendering.
- **Rule:** Never rely solely on an inline iframe on mobile screens.
- **Remedy:** Provide an integrated mobile action banner with high-contrast, direct actions:
  - "Abrir documento" (launches browser's native full-screen PDF reader).
  - "Descargar PDF" (direct download link with semantic `download` attribute).

### B. Responsive Modal Sizing

- On desktop: Centered floating dialog (`max-w-4xl h-[88vh] rounded-2xl`).
- On mobile (< 640px): Full-bleed or high-density sheet (`h-full w-full rounded-none sm:rounded-2xl p-0 sm:p-4`). Avoid double scrollbars and remove wasteful outer padding.

### C. Touch-Friendly Multi-Document Tabs

- For certifications or dossiers with multiple PDF modules, use horizontal scrolling tabs with `overflow-x-auto scrollbar-none flex-nowrap`.
- Provide active visual indicators using semantic tokens (`var(--color-accent)`) and clear document counters (`1 de 4`).

---

## 4. Verification Checkpoints for Mobile UI

Before approving any mobile or responsive change:

1. Test at **375px** (iPhone SE/standard mobile width) to ensure zero horizontal scroll desync (`overflow-x: hidden` integrity).
2. Test at **390px / 414px** (modern flagship smartphones).
3. Test at **768px** (tablet portrait breakpoint transition).
4. Verify all text, badges, and icon buttons do not wrap awkwardly or overlap.
