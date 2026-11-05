/**
 * Dockable Desktop Navbar Manager
 *
 * Coordinates magnetic edge snapping, layout metamorphosis (horizontal <-> vertical),
 * quick-dock controls, drag gestures, and localStorage state persistence.
 * Strictly scoped to desktop viewports (>= 1024px).
 */

export type DockPosition = 'top' | 'bottom' | 'left' | 'right';

export interface DockManagerOptions {
  header: HTMLElement;
  dragHandle?: HTMLElement | null;
  menuButton?: HTMLElement | null;
  menuPopover?: HTMLElement | null;
  snapThreshold?: number;
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
 * Reads the persisted dock position from storage with fallback.
 */
export function getStoredDockPosition(storage?: Storage): DockPosition {
  try {
    const s =
      storage ??
      (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (!s) return DEFAULT_DOCK_POSITION;
    const item = s.getItem(DOCK_STORAGE_KEY);
    return isValidDockPosition(item) ? item : DEFAULT_DOCK_POSITION;
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
 * Detects the nearest viewport snap edge if cursor is within snap threshold.
 * Uses exact Euclidean distance to boundaries to resolve corner conflicts.
 */
export function detectSnapEdge(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
  threshold = 110
): DockPosition | null {
  const dTop = y;
  const dBottom = viewportHeight - y;
  const dLeft = x;
  const dRight = viewportWidth - x;

  const minDistance = Math.min(dTop, dBottom, dLeft, dRight);

  if (minDistance > threshold) {
    return null;
  }

  if (minDistance === dTop) return 'top';
  if (minDistance === dBottom) return 'bottom';
  if (minDistance === dLeft) return 'left';
  return 'right';
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
      'pointer-events-none fixed z-40 transition-all duration-200 opacity-0 bg-[var(--color-accent-subtle)] border-2 border-dashed border-[var(--color-accent)] rounded-2xl shadow-[0_0_24px_var(--color-accent-glow)]';
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
      indicator.style.width = 'min(1024px, calc(100% - 2rem))';
      indicator.style.height = '60px';
      break;
    case 'bottom':
      indicator.style.bottom = '16px';
      indicator.style.left = '50%';
      indicator.style.top = 'auto';
      indicator.style.right = 'auto';
      indicator.style.transform = 'translateX(-50%)';
      indicator.style.width = 'min(1024px, calc(100% - 2rem))';
      indicator.style.height = '60px';
      break;
    case 'left':
      indicator.style.left = '16px';
      indicator.style.top = '50%';
      indicator.style.right = 'auto';
      indicator.style.bottom = 'auto';
      indicator.style.transform = 'translateY(-50%)';
      indicator.style.width = '60px';
      indicator.style.height = 'min(500px, calc(100% - 4rem))';
      break;
    case 'right':
      indicator.style.right = '16px';
      indicator.style.top = '50%';
      indicator.style.left = 'auto';
      indicator.style.bottom = 'auto';
      indicator.style.transform = 'translateY(-50%)';
      indicator.style.width = '60px';
      indicator.style.height = 'min(500px, calc(100% - 4rem))';
      break;
  }
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
    snapThreshold = 110,
  } = options;

  let currentPosition: DockPosition = getStoredDockPosition();

  function applyPosition(pos: DockPosition, persist = true) {
    currentPosition = pos;
    header.setAttribute('data-dock', pos);

    if (persist) {
      saveDockPosition(pos);
    }

    if (options.onPositionChange) {
      options.onPositionChange(pos);
    }

    // Close popover if open
    if (menuPopover && !menuPopover.classList.contains('hidden')) {
      menuPopover.classList.add('hidden');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  }

  // Initial application
  applyPosition(currentPosition, false);

  // Drag Interaction
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let candidateEdge: DockPosition | null = null;
  let snapIndicator: HTMLElement | null = null;

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return; // Primary button only
    if (window.innerWidth < 1024) return; // Desktop only

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    candidateEdge = null;
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

    if (Math.hypot(dx, dy) > 8) {
      candidateEdge = detectSnapEdge(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight,
        snapThreshold
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

  // Double click reset on handle
  function onDoubleClick() {
    if (window.innerWidth < 1024) return;
    applyPosition('top', true);
  }

  if (dragHandle) {
    dragHandle.addEventListener('pointerdown', onPointerDown);
    dragHandle.addEventListener('pointermove', onPointerMove);
    dragHandle.addEventListener('pointerup', onPointerUp);
    dragHandle.addEventListener('pointercancel', onPointerUp);
    dragHandle.addEventListener('dblclick', onDoubleClick);
  }

  // Quick-dock menu popover controls
  function toggleMenu(e: Event) {
    e.stopPropagation();
    if (!menuPopover) return;
    const isHidden = menuPopover.classList.contains('hidden');
    if (isHidden) {
      menuPopover.classList.remove('hidden');
      menuButton?.setAttribute('aria-expanded', 'true');
    } else {
      menuPopover.classList.add('hidden');
      menuButton?.setAttribute('aria-expanded', 'false');
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
      if (!menuPopover.classList.contains('hidden')) {
        menuPopover.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (
      e.key === 'Escape' &&
      menuPopover &&
      !menuPopover.classList.contains('hidden')
    ) {
      menuPopover.classList.add('hidden');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.focus();
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeyDown);

  // Wire dock option buttons in popover
  const optionButtons =
    menuPopover?.querySelectorAll<HTMLButtonElement>('[data-dock-target]');
  optionButtons?.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-dock-target');
      if (isValidDockPosition(target)) {
        applyPosition(target, true);
      }
    });
  });

  return {
    getPosition: () => currentPosition,
    setPosition: (pos: DockPosition) => applyPosition(pos, true),
    reset: () => applyPosition('top', true),
    destroy: () => {
      if (dragHandle) {
        dragHandle.removeEventListener('pointerdown', onPointerDown);
        dragHandle.removeEventListener('pointermove', onPointerMove);
        dragHandle.removeEventListener('pointerup', onPointerUp);
        dragHandle.removeEventListener('pointercancel', onPointerUp);
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
