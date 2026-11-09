# Task 25.3: Mobile Bottom Dock & Tablet Bounds

**Status:** Ready to Implement  
**Branch:** `feat/phase-25-dock-v2-and-interface-hub`  
**Goal:** Expand dock positioning to mobile and tablet devices with strict viewport bounds (disabling side docks where they obscure content), supporting bottom dock positioning with safe-area handling, tactile vertical touch drag snapping, and an upward-opening mobile navigation drawer.

---

## 1. Context & Motivation

In Phase 24, docking was restricted to desktop screens (`>= 1024px`) to ensure mobile simplicity. However:

1. **Tablet / Medium Viewports (768px – 1023px):**
   - Side docking (Left/Right) obscures the portfolio cards and timeline because lateral margins are too tight.
   - However, **Top and Bottom docking** are perfectly ergonomic and functional on tablets.
2. **Mobile Viewports (< 768px):**
   - Modern mobile operating systems (iOS Safari, Chrome Android) increasingly place primary navigation controls at the bottom for thumb ergonomics.
   - Allowing users to dock the portfolio navbar at the bottom of the screen significantly improves mobile one-handed usability.
3. **The Upward Drawer Requirement:**
   - When the mobile navbar is docked at the bottom, opening the menu drawer downwards would shoot off-screen below the viewport.
   - The mobile menu drawer must recognize when the dock is in `bottom` position and open **upwards** (`bottom-up`), springing gracefully above the dock.

---

## 2. Technical Implementation Spec

1. **Responsive Viewport Docking Constraints (`src/lib/dock-manager.ts`):**
   - Define capability tiers based on viewport width:
     - **Full Freedom (>= 1024px / Wide Desktop):** `top`, `bottom`, `left`, `right`.
     - **Vertical Only (< 1024px / Tablets & Mobile):** `top`, `bottom`.
   - In `dock-manager.ts`, if the user switches to a viewport `< 1024px` while currently docked to `left` or `right`, automatically trigger a graceful fallback snap to `top`.
   - In the Interface Hub popover, hide or disable the `left` and `right` buttons on viewports `< 1024px` with a subtle helper note or responsive utility classes (`hidden lg:flex`).

2. **Mobile Bottom Dock Positioning (`src/components/portfolio/Navbar.astro`):**
   - When `data-dock="bottom"` on mobile (< 768px):
     - Header geometry: `fixed bottom-3 sm:bottom-4 inset-x-0 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-50 mb-[env(safe-area-inset-bottom)]`.
     - Maintain consistent backdrop blur, border, and dynamic accent shadow.

3. **Upward-Opening Mobile Menu Drawer:**
   - Update `#mobile-nav-menu` positioning classes dynamically or via CSS attribute selector:
     - When `[data-dock="top"]`: `top-[calc(100%+0.5rem)]` (opens downward, existing behavior).
     - When `[data-dock="bottom"]`: `bottom-[calc(100%+0.5rem)]` (opens upward).
   - Upward animation:
     - Initial state when closed: `opacity-0 translate-y-3 pointer-events-none scale-95`.
     - Open state: `opacity-100 translate-y-0 pointer-events-auto scale-100`.
     - Hardware-accelerated cubic-bezier transition (`transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-out`).
   - Backdrop overlay (`#mobile-nav-backdrop`) remains fullscreen fixed with `backdrop-blur-sm` and `bg-black/30 dark:bg-black/50`.

4. **Tactile Vertical Touch Drag (`touchstart`, `touchmove`, `touchend`):**
   - Add touch event handling to the drag handle (`#dock-drag-handle` or header touch surface).
   - On mobile/tablet, constrain drag movement strictly to the vertical Y-axis.
   - When dragged past the vertical midpoint of the screen (`window.innerHeight / 2`), magnetically snap to `bottom` (if pulled downward) or `top` (if pulled upward).
   - Provide subtle visual feedback (spring resistance and haptic/CSS glow) during touch drag.

---

## 3. Verification Checklist

- [ ] Tablets (768px – 1023px) allow Top and Bottom docking, with Left and Right options cleanly disabled/hidden.
- [ ] If window is resized from desktop to tablet while docked at Left or Right, dock automatically snaps back to Top.
- [ ] Mobile devices (< 768px) allow positioning the dock at Bottom.
- [ ] When docked at Bottom on mobile, tapping hamburger opens the menu upwards with zero horizontal overflow or clipping.
- [ ] Safe area insets (`env(safe-area-inset-bottom)`) prevent home indicator collision on modern iOS/Android phones.
- [ ] Vertical touch drag allows dragging the dock between top and bottom on touch devices.
- [ ] Automated Playwright tests verify both top and bottom mobile drawer states.
