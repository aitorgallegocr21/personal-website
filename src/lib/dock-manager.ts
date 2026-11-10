/**
 * Dockable Desktop Navbar Manager
 *
 * Coordinates magnetic edge snapping, layout metamorphosis (horizontal <-> vertical),
 * quick-dock controls, drag gestures, and localStorage state persistence.
 * Strictly scoped to desktop viewports (>= 1024px).
 */

import { closePaletteMenu } from '@/lib/theme-manager';

export type DockPosition = 'top' | 'bottom' | 'left' | 'right';

export interface DockManagerOptions {
  header: HTMLElement;
  dragHandle?: HTMLElement | null;
  menuButton?: HTMLElement | null;
  menuPopover?: HTMLElement | null;
  deadzoneRadius?: number;
  onPositionChange?: (position: DockPosition) => void;
}

export interface DockManagerController {
  getPosition: () => DockPosition;
  setPosition: (position: DockPosition) => void;
  reset: () => void;
  destroy: () => void;
}

export const DOCK_STORAGE_KEY = 'portfolio-dock-position';
export const DEFAULT_DOCK_POSITION: DockPosition = 'top';

/**
 * Validates if a string value is a recognized DockPosition.
 */
export function isValidDockPosition(val: unknown): val is DockPosition {
  return val === 'top' || val === 'bottom' || val === 'left' || val === 'right';
}

/**
 * Returns allowed dock positions based on viewport width capability tiers:
 * - < 1024px (Tablets & Mobile): ['top', 'bottom']
 * - >= 1024px (Desktop): ['top', 'bottom', 'left', 'right']
 */
export function getAllowedDockPositions(
  viewportWidth: number
): readonly DockPosition[] {
  return viewportWidth < 1024
    ? (['top', 'bottom'] as const)
    : (['top', 'bottom', 'left', 'right'] as const);
}

/**
 * Reads the persisted dock position from storage with fallback.
 * Automatically falls back to 'top' if stored value is 'left' or 'right'
 * on viewports smaller than 1024px.
 */
export function getStoredDockPosition(storage?: Storage): DockPosition {
  try {
    const s =
      storage ??
      (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (!s) return DEFAULT_DOCK_POSITION;
    const item = s.getItem(DOCK_STORAGE_KEY);
    if (!isValidDockPosition(item)) return DEFAULT_DOCK_POSITION;
    if (
      typeof window !== 'undefined' &&
      window.innerWidth < 1024 &&
      (item === 'left' || item === 'right')
    ) {
      return DEFAULT_DOCK_POSITION;
    }
    return item;
  } catch {
    return DEFAULT_DOCK_POSITION;
  }
}

/**
 * Persists the chosen dock position to storage.
 */
export function saveDockPosition(pos: DockPosition, storage?: Storage): void {
  try {
    const s =
      storage ??
      (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (!s) return;
    s.setItem(DOCK_STORAGE_KEY, pos);
  } catch {
    // Ignore storage quota or permission errors
  }
}

/**
 * Detects the nearest viewport snap edge using early magnetic attraction.
 * Divides the viewport into normalized directional attraction quadrants.
 * On viewports < 1024px (tablets & mobile), docking is strictly constrained to 'top' and 'bottom'.
 */
export function detectSnapEdge(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
  deadzoneRadius = 40
): DockPosition | null {
  const centerY = viewportHeight / 2;
  const dy = y - centerY;

  // Tablet & Mobile viewport (< 1024px): Strictly constrain to vertical top/bottom
  if (viewportWidth < 1024) {
    if (Math.abs(dy) < deadzoneRadius) {
      return null;
    }
    return dy < 0 ? 'top' : 'bottom';
  }

  const centerX = viewportWidth / 2;
  const dx = x - centerX;
  const distance = Math.hypot(dx, dy);

  if (distance < deadzoneRadius) {
    return null;
  }

  // Normalized coordinates [-1, 1] accounting for viewport aspect ratio
  const normX = dx / (viewportWidth / 2);
  const normY = dy / (viewportHeight / 2);

  if (Math.abs(normX) > Math.abs(normY)) {
    return normX > 0 ? 'right' : 'left';
  } else {
    return normY > 0 ? 'bottom' : 'top';
  }
}

/**
 * Creates or retrieves the floating snap zone preview element.
 */
function getOrCreateSnapIndicator(): HTMLElement {
  let indicator = document.getElementById('dock-snap-preview');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'dock-snap-preview';
    indicator.className =
      'pointer-events-none fixed z-40 transition-all duration-200 opacity-0 bg-[var(--color-accent-subtle)] border-2 border-dashed border-[var(--color-accent)] shadow-[0_0_24px_var(--color-accent-glow)]';
    document.body.appendChild(indicator);
  }
  return indicator;
}

/**
 * Updates the visual snap preview geometry based on candidate position.
 */
function updateSnapIndicator(
  indicator: HTMLElement,
  position: DockPosition | null
): void {
  if (!position) {
    indicator.style.opacity = '0';
    return;
  }

  indicator.style.opacity = '1';

  switch (position) {
    case 'top':
      indicator.style.top = '12px';
      indicator.style.left = '50%';
      indicator.style.right = 'auto';
      indicator.style.bottom = 'auto';
      indicator.style.transform = 'translateX(-50%)';
      indicator.style.width = 'min(1024px, calc(100% - 1.5rem))';
      indicator.style.height = '60px';
      indicator.style.borderRadius = '9999px';
      break;
    case 'bottom':
      indicator.style.bottom = 'calc(16px + env(safe-area-inset-bottom, 0px))';
      indicator.style.left = '50%';
      indicator.style.top = 'auto';
      indicator.style.right = 'auto';
      indicator.style.transform = 'translateX(-50%)';
      indicator.style.width = 'min(1024px, calc(100% - 1.5rem))';
      indicator.style.height = '60px';
      indicator.style.borderRadius = '9999px';
      break;
    case 'left':
      indicator.style.left = '16px';
      indicator.style.top = '50%';
      indicator.style.right = 'auto';
      indicator.style.bottom = 'auto';
      indicator.style.transform = 'translateY(-50%)';
      indicator.style.width = '60px';
      indicator.style.height = 'min(520px, calc(100% - 4rem))';
      indicator.style.borderRadius = '2rem';
      break;
    case 'right':
      indicator.style.right = '16px';
      indicator.style.top = '50%';
      indicator.style.left = 'auto';
      indicator.style.bottom = 'auto';
      indicator.style.transform = 'translateY(-50%)';
      indicator.style.width = '60px';
      indicator.style.height = 'min(520px, calc(100% - 4rem))';
      indicator.style.borderRadius = '2rem';
      break;
  }
}

/**
 * Synchronizes the visual active state on dock position selector buttons.
 */
export function syncDockUI(currentPos: DockPosition): void {
  if (typeof document === 'undefined') return;
  const buttons =
    document.querySelectorAll<HTMLButtonElement>('[data-dock-target]');
  buttons.forEach((btn) => {
    const target = btn.getAttribute('data-dock-target');
    if (target === currentPos) {
      btn.classList.add(
        'border-[var(--color-accent-border)]',
        'bg-[var(--color-accent-subtle)]',
        'text-[var(--color-accent)]'
      );
      btn.classList.remove('bg-zinc-50/50', 'dark:bg-zinc-800/30');
    } else {
      btn.classList.remove(
        'border-[var(--color-accent-border)]',
        'bg-[var(--color-accent-subtle)]',
        'text-[var(--color-accent)]'
      );
      btn.classList.add('bg-zinc-50/50', 'dark:bg-zinc-800/30');
    }
  });
}

/**
 * Initializes desktop dock management.
 */
export function initDockManager(
  options: DockManagerOptions
): DockManagerController {
  const {
    header,
    dragHandle,
    menuButton,
    menuPopover,
    deadzoneRadius = 40,
  } = options;

  let currentPosition: DockPosition = getStoredDockPosition();

  function applyPosition(pos: DockPosition, persist = true) {
    let resolvedPos = pos;
    if (
      typeof window !== 'undefined' &&
      window.innerWidth < 1024 &&
      (pos === 'left' || pos === 'right')
    ) {
      resolvedPos = 'top';
    }

    currentPosition = resolvedPos;
    header.setAttribute('data-dock', resolvedPos);

    if (persist) {
      saveDockPosition(resolvedPos);
    }

    syncDockUI(resolvedPos);

    if (options.onPositionChange) {
      options.onPositionChange(resolvedPos);
    }

    // Close popovers if open
    closeMenu();
    closePaletteMenu();
  }

  // Initial application
  applyPosition(currentPosition, false);

  // Resize monitor: automatically fallback to 'top' if resized to tablet/mobile while docked left/right
  function onWindowResize() {
    if (
      typeof window !== 'undefined' &&
      window.innerWidth < 1024 &&
      (currentPosition === 'left' || currentPosition === 'right')
    ) {
      applyPosition('top', false);
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onWindowResize);
  }

  // Drag Interaction
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let touchStartY = 0;
  let candidateEdge: DockPosition | null = null;
  let snapIndicator: HTMLElement | null = null;

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0 && e.pointerType === 'mouse') return; // Primary button only for mouse

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    candidateEdge = detectSnapEdge(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight,
      deadzoneRadius
    );
    snapIndicator = getOrCreateSnapIndicator();

    if (dragHandle && 'setPointerCapture' in dragHandle) {
      try {
        dragHandle.setPointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }

    header.classList.add('is-dragging');
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Show snap preview immediately on initial subtle movement (4px)
    if (Math.hypot(dx, dy) >= 4) {
      candidateEdge = detectSnapEdge(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight,
        deadzoneRadius
      );

      if (snapIndicator) {
        updateSnapIndicator(snapIndicator, candidateEdge);
      }
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;

    isDragging = false;
    header.classList.remove('is-dragging');

    if (dragHandle && 'releasePointerCapture' in dragHandle) {
      try {
        dragHandle.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }

    if (snapIndicator) {
      updateSnapIndicator(snapIndicator, null);
    }

    if (candidateEdge && candidateEdge !== currentPosition) {
      applyPosition(candidateEdge, true);
    }
  }

  // Dedicated touch event listeners for tactile mobile/tablet drag
  function onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    isDragging = true;
    touchStartY = e.touches[0].clientY;
    candidateEdge = detectSnapEdge(
      e.touches[0].clientX,
      e.touches[0].clientY,
      window.innerWidth,
      window.innerHeight,
      deadzoneRadius
    );
    snapIndicator = getOrCreateSnapIndicator();
    header.classList.add('is-dragging');
  }

  function onTouchMove(e: TouchEvent) {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dy = Math.abs(touch.clientY - touchStartY);

    if (dy >= 4) {
      candidateEdge = detectSnapEdge(
        touch.clientX,
        touch.clientY,
        window.innerWidth,
        window.innerHeight,
        deadzoneRadius
      );

      if (snapIndicator) {
        updateSnapIndicator(snapIndicator, candidateEdge);
      }
    }
  }

  function onTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    header.classList.remove('is-dragging');

    if (snapIndicator) {
      updateSnapIndicator(snapIndicator, null);
    }

    if (candidateEdge && candidateEdge !== currentPosition) {
      applyPosition(candidateEdge, true);
    }
  }

  // Double click reset on handle
  function onDoubleClick() {
    applyPosition('top', true);
  }

  if (dragHandle) {
    dragHandle.addEventListener('pointerdown', onPointerDown);
    dragHandle.addEventListener('pointermove', onPointerMove);
    dragHandle.addEventListener('pointerup', onPointerUp);
    dragHandle.addEventListener('pointercancel', onPointerUp);
    dragHandle.addEventListener('touchstart', onTouchStart, { passive: true });
    dragHandle.addEventListener('touchmove', onTouchMove, { passive: true });
    dragHandle.addEventListener('touchend', onTouchEnd, { passive: true });
    dragHandle.addEventListener('touchcancel', onTouchEnd, { passive: true });
    dragHandle.addEventListener('dblclick', onDoubleClick);
  }

  // Quick-dock menu popover controls with GPU directional transitions
  let menuCloseTimeout: number | null = null;

  function openMenu() {
    if (!menuPopover) return;
    if (menuCloseTimeout !== null) {
      window.clearTimeout(menuCloseTimeout);
      menuCloseTimeout = null;
    }
    menuPopover.classList.remove('hidden');
    menuPopover.setAttribute('data-state', 'open');
    menuButton?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menuPopover || menuPopover.classList.contains('hidden')) return;
    if (menuCloseTimeout !== null) {
      window.clearTimeout(menuCloseTimeout);
      menuCloseTimeout = null;
    }
    menuPopover.setAttribute('data-state', 'closed');
    menuButton?.setAttribute('aria-expanded', 'false');

    menuCloseTimeout = window.setTimeout(() => {
      menuPopover.classList.add('hidden');
      menuPopover.removeAttribute('data-state');
      menuCloseTimeout = null;
    }, 120);
  }

  function toggleMenu(e: Event) {
    e.stopPropagation();
    if (!menuPopover) return;
    const isClosed =
      menuPopover.classList.contains('hidden') ||
      menuPopover.getAttribute('data-state') === 'closed';
    if (isClosed) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function onDocumentClick(e: MouseEvent) {
    const target = e.target as Node | null;
    if (!target) return;
    if (
      menuPopover &&
      !menuPopover.contains(target) &&
      menuButton &&
      !menuButton.contains(target)
    ) {
      closeMenu();
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeMenu();
      menuButton?.focus();
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeyDown);

  // Wire dock option buttons across popover and document
  const optionButtons =
    document.querySelectorAll<HTMLButtonElement>('[data-dock-target]');
  const optionCleanups: Array<() => void> = [];

  optionButtons.forEach((btn) => {
    const onOptionClick = (e: MouseEvent) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-dock-target');
      if (isValidDockPosition(target)) {
        applyPosition(target, true);
      }
    };
    btn.addEventListener('click', onOptionClick);
    optionCleanups.push(() => btn.removeEventListener('click', onOptionClick));
  });

  return {
    getPosition: () => currentPosition,
    setPosition: (pos: DockPosition) => applyPosition(pos, true),
    reset: () => applyPosition('top', true),
    destroy: () => {
      optionCleanups.forEach((cleanup) => cleanup());
      optionCleanups.length = 0;
      if (menuCloseTimeout !== null) {
        window.clearTimeout(menuCloseTimeout);
        menuCloseTimeout = null;
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onWindowResize);
      }
      if (dragHandle) {
        dragHandle.removeEventListener('pointerdown', onPointerDown);
        dragHandle.removeEventListener('pointermove', onPointerMove);
        dragHandle.removeEventListener('pointerup', onPointerUp);
        dragHandle.removeEventListener('pointercancel', onPointerUp);
        dragHandle.removeEventListener('touchstart', onTouchStart);
        dragHandle.removeEventListener('touchmove', onTouchMove);
        dragHandle.removeEventListener('touchend', onTouchEnd);
        dragHandle.removeEventListener('touchcancel', onTouchEnd);
        dragHandle.removeEventListener('dblclick', onDoubleClick);
      }
      if (menuButton) {
        menuButton.removeEventListener('click', toggleMenu);
      }
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
      snapIndicator?.remove();
    },
  };
}
