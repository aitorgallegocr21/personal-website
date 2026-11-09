# Task 25.1: Dock Link Layout with Icon + Micro-Labels

**Status:** Ready to Implement  
**Branch:** `feat/phase-25-dock-v2-and-interface-hub`  
**Goal:** Transition the horizontal desktop navigation links to a modern macOS/iOS application dock design featuring a vertically stacked icon (`w-4 h-4`) and micro-label (`text-[10px]` uppercase or tabular text) to optimize horizontal space, while maintaining pure icon rails with tooltips for vertical docks, and recalibrating fluid scroll-spy calculations.

---

## 1. Context & Motivation

Current horizontal navigation links render inline text (`Proyectos`, `Trayectoria`, `Certificaciones`, `Filosofía`, `Contacto`). When adding a new section for GitHub Activity and preserving the action cluster, horizontal space becomes constrained on standard laptop displays (1024px–1280px).

By adopting a stacked icon + micro-label structure:

- Every navigation link displays its dedicated Lucide icon centered above a concise micro-label.
- Each link cell maintains a predictable hit target and compact bounding box (~48px–56px wide x 40px–44px tall).
- The fluid scroll-spy indicator (`#navbar-fluid-indicator`) smoothly wraps this new rectangular geometry.
- In vertical docks (Left/Right), the micro-label is hidden, preserving the slim ~56px icon rail with directional tooltips.

---

## 2. Technical Implementation Spec

1. **Component Updates (`src/components/portfolio/Navbar.astro`):**
   - Update `navItems` array structure if needed to ensure each link has an associated icon (FolderGit2, Briefcase, Award, Sparkles, Mail, and GitHub icon prepared).
   - In `#desktop-nav`:
     - Render `.nav-link` as a flexible column layout: `flex flex-col items-center justify-center gap-0.5 px-2.5 py-1 rounded-xl`.
     - Display `.nav-icon` in horizontal dock: `w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-transform group-hover:scale-110`.
     - Render `.nav-link-text` as micro-label: `text-[10px] font-semibold tracking-wider uppercase transition-colors`.
   - In vertical dock modes (`data-dock="left"`, `data-dock="right"`):
     - Hide `.nav-link-text` via CSS rules (`[data-dock="left"] .nav-link-text { display: none }`).
     - Display `.nav-tooltip` on hover as established in Phase 24.

2. **Fluid Scroll-Spy Adaptation (`src/lib/scroll-spy.ts`):**
   - Ensure the bounding box calculation for the sliding indicator (`#navbar-fluid-indicator`) dynamically measures `link.getBoundingClientRect()` relative to `#desktop-nav`.
   - Maintain seamless GPU interpolation (`transform: translate3d(...)`) across the stacked icon + micro-label dimensions.
   - Retain proportional text and icon brightness transitions.

3. **Responsive Spacing:**
   - Adjust `#site-header-inner` height to comfortably accommodate the stacked icon + label layout (e.g. `h-14` or `h-16`).

---

## 3. Verification Checklist

- [ ] Horizontal dock links show icon centered above the micro-label.
- [ ] Hover transitions apply smoothly to both icon and label text.
- [ ] Switching to vertical dock (Left/Right) cleanly hides the micro-label and renders pure icons with floating tooltips.
- [ ] Fluid scroll-spy indicator glides and resizes accurately around the active link cell.
- [ ] Astro build and TypeScript checks pass with 0 errors (`npm run check`).
