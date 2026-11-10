/**
 * Theme & Accent Palette Manager.
 * Handles dark/light modes, live 7-day palette rotation, manual overrides, and DOM synchronization.
 */

export type ThemeMode = 'light' | 'dark';

export interface DayPalette {
  id: string;
  name?: string;
  color?: string;
  label: string;
  day: string;
}

export const DAY_PALETTES: readonly DayPalette[] = [
  { id: 'amber', label: 'Ámbar Cálido', day: 'Domingo', color: '#f59e0b' },
  { id: 'emerald', label: 'Verde Tech', day: 'Lunes', color: '#10b981' },
  { id: 'teal', label: 'Turquesa', day: 'Martes', color: '#14b8a6' },
  { id: 'sky', label: 'Azul Cielo', day: 'Miércoles', color: '#0284c7' },
  { id: 'slate', label: 'Azul Marino', day: 'Jueves', color: '#1e3a8a' },
  { id: 'violet', label: 'Violeta', day: 'Viernes', color: '#8b5cf6' },
  { id: 'rose', label: 'Rosa Coral', day: 'Sábado', color: '#f43f5e' },
] as const;

export const THEME_STORAGE_KEY = 'portfolio-theme';
export const PALETTE_STORAGE_KEY = 'portfolio-palette';

function getLocalStorage(): Storage | null {
  if (typeof localStorage !== 'undefined') return localStorage;
  if (typeof window !== 'undefined' && window.localStorage)
    return window.localStorage;
  return null;
}

/**
 * Returns the palette assigned to today's day of the week (0 = Sunday, ..., 6 = Saturday).
 */
export function getTodayPalette(): DayPalette {
  const todayIndex = new Date().getDay();
  return DAY_PALETTES[todayIndex];
}

/**
 * Retrieves the currently saved or preferred theme mode.
 */
export function getStoredTheme(): ThemeMode {
  const storage = getLocalStorage();
  const stored = storage?.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return 'dark';
}

/**
 * Synchronizes the visual state of the segmented Light/Dark toggle buttons.
 */
export function syncThemeModeUI(
  container: HTMLElement | Document = document
): void {
  if (typeof document === 'undefined') return;
  const isDark = document.documentElement.classList.contains('dark');
  const lightBtn = container.querySelector(
    '#theme-mode-light-btn, [data-theme-set="light"]'
  );
  const darkBtn = container.querySelector(
    '#theme-mode-dark-btn, [data-theme-set="dark"]'
  );

  const activeClasses = [
    'bg-white',
    'dark:bg-zinc-900',
    'text-zinc-950',
    'dark:text-zinc-100',
    'shadow-xs',
    'font-semibold',
  ];
  const inactiveClasses = ['text-zinc-600', 'dark:text-zinc-400'];

  if (isDark) {
    darkBtn?.classList.add(...activeClasses);
    darkBtn?.classList.remove(...inactiveClasses);
    lightBtn?.classList.remove(...activeClasses);
    lightBtn?.classList.add(...inactiveClasses);
  } else {
    lightBtn?.classList.add(...activeClasses);
    lightBtn?.classList.remove(...inactiveClasses);
    darkBtn?.classList.remove(...activeClasses);
    darkBtn?.classList.add(...inactiveClasses);
  }
}

/**
 * Applies and persists theme mode (light or dark).
 */
export function setTheme(theme: ThemeMode): void {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
    syncThemeModeUI();
  }
  const storage = getLocalStorage();
  storage?.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Checks whether the automatic live 7-day rotation mode is active.
 */
export function isAutoRotateEnabled(): boolean {
  const storage = getLocalStorage();
  if (!storage) return true;
  const currentStored = storage.getItem(PALETTE_STORAGE_KEY);
  return (
    !currentStored ||
    currentStored === 'auto' ||
    !DAY_PALETTES.some((p) => p.id === currentStored)
  );
}

/**
 * Returns the current active palette ID, either from auto-rotation or fixed storage.
 */
export function getStoredPalette(): string {
  if (isAutoRotateEnabled()) {
    return getTodayPalette().id;
  }
  const storage = getLocalStorage();
  return storage?.getItem(PALETTE_STORAGE_KEY) || getTodayPalette().id;
}

/**
 * Applies and persists a fixed palette ID.
 */
export function setPalette(paletteId: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-palette', paletteId);
  }
  const storage = getLocalStorage();
  storage?.setItem(PALETTE_STORAGE_KEY, paletteId);
}

/**
 * Toggles live rotation on or off.
 */
export function setAutoRotate(enabled: boolean): void {
  const storage = getLocalStorage();
  if (enabled) {
    storage?.removeItem(PALETTE_STORAGE_KEY);
    const today = getTodayPalette();
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-palette', today.id);
    }
  } else {
    const current =
      (typeof document !== 'undefined' &&
        document.documentElement.getAttribute('data-palette')) ||
      getTodayPalette().id;
    setPalette(current);
  }
}

/**
 * Synchronizes the visual state of the palette dropdown UI controls.
 */
export function syncPaletteUI(
  container: HTMLElement | Document,
  currentPalette: string | null,
  isAuto: boolean
): void {
  const today = getTodayPalette();
  const autoRotateBtn = container.querySelector('#palette-auto-rotate-btn');
  const autoStatusText = container.querySelector('#auto-status-text');
  const autoCheckContainer = container.querySelector('#auto-check-container');
  const autoLiveIndicator = container.querySelector('#auto-live-indicator');
  const autoIconBox = container.querySelector('#auto-icon-box');
  const paletteOptions = container.querySelectorAll('.palette-select-option');
  const checkIcons = container.querySelectorAll('.palette-check-icon');

  if (isAuto) {
    autoRotateBtn?.classList.add(
      'bg-[var(--color-accent-subtle)]',
      'border-[var(--color-accent-border)]',
      'shadow-xs'
    );
    autoRotateBtn?.classList.remove(
      'hover:bg-zinc-100',
      'dark:hover:bg-zinc-800',
      'border-transparent'
    );

    if (autoIconBox) {
      autoIconBox.className =
        'p-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shrink-0 transition-colors shadow-xs';
    }
    if (autoLiveIndicator) {
      autoLiveIndicator.classList.remove('hidden');
    }
    if (autoCheckContainer) {
      autoCheckContainer.classList.remove('hidden');
    }
    if (autoStatusText) {
      autoStatusText.textContent = `Activa · ${today.day}`;
      autoStatusText.className =
        'text-[10.5px] font-semibold text-[var(--color-accent)] truncate';
    }

    checkIcons.forEach((icon) => icon.classList.add('hidden'));

    paletteOptions.forEach((btn) => {
      btn.classList.remove(
        'bg-zinc-100',
        'dark:bg-zinc-800/90',
        'font-semibold',
        'border-zinc-200',
        'dark:border-zinc-700'
      );
      btn.classList.add('border-transparent');
    });
  } else {
    autoRotateBtn?.classList.remove(
      'bg-[var(--color-accent-subtle)]',
      'border-[var(--color-accent-border)]',
      'shadow-xs'
    );
    autoRotateBtn?.classList.add(
      'hover:bg-zinc-100',
      'dark:hover:bg-zinc-800',
      'border-transparent'
    );

    if (autoIconBox) {
      autoIconBox.className =
        'p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0 transition-colors';
    }
    if (autoLiveIndicator) {
      autoLiveIndicator.classList.add('hidden');
    }
    if (autoCheckContainer) {
      autoCheckContainer.classList.add('hidden');
    }
    if (autoStatusText) {
      autoStatusText.textContent = 'Fijado manual';
      autoStatusText.className =
        'text-[10.5px] text-zinc-500 dark:text-zinc-400 truncate';
    }

    paletteOptions.forEach((btn) => {
      const id = btn.getAttribute('data-palette-id');
      const check = btn.querySelector('.palette-check-icon');
      if (id === currentPalette) {
        check?.classList.remove('hidden');
        btn.classList.add(
          'bg-zinc-100',
          'dark:bg-zinc-800/90',
          'font-semibold',
          'border-zinc-200',
          'dark:border-zinc-700'
        );
        btn.classList.remove('border-transparent');
      } else {
        check?.classList.add('hidden');
        btn.classList.remove(
          'bg-zinc-100',
          'dark:bg-zinc-800/90',
          'font-semibold',
          'border-zinc-200',
          'dark:border-zinc-700'
        );
        btn.classList.add('border-transparent');
      }
    });
  }
}

let isScrollLocked = false;

function onScrollLockEvent(e: Event) {
  const target = e.target as HTMLElement | null;
  if (target?.closest('#palette-dropdown, #mobile-nav-menu')) {
    return;
  }
  e.preventDefault();
}

/**
 * Locks page scroll with full backdrop coverage, keeping sticky header on screen
 * even when the page was scrolled down before opening.
 */
export function lockBackgroundScroll(): void {
  if (typeof window === 'undefined' || isScrollLocked) return;
  isScrollLocked = true;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';

  // If page was scrolled down and header is in sticky top dock, anchor it to viewport so overflow:hidden doesn't push it offscreen
  const header = document.getElementById('site-header');
  if (
    header &&
    header.getAttribute('data-dock') === 'top' &&
    window.scrollY > 0
  ) {
    header.style.position = 'fixed';
    header.style.top = window.innerWidth >= 640 ? '1rem' : '0.75rem';
    header.style.left = '50%';
    header.style.transform = 'translateX(-50%)';
    header.setAttribute('data-scroll-locked-fixed', 'true');
  }

  window.addEventListener('wheel', onScrollLockEvent, { passive: false });
  window.addEventListener('touchmove', onScrollLockEvent, { passive: false });
}

/**
 * Restores normal background page scrolling.
 */
export function unlockBackgroundScroll(): void {
  if (typeof window === 'undefined' || !isScrollLocked) return;
  isScrollLocked = false;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.touchAction = '';

  const header = document.getElementById('site-header');
  if (header && header.getAttribute('data-scroll-locked-fixed') === 'true') {
    header.style.position = '';
    header.style.top = '';
    header.style.left = '';
    header.style.transform = '';
    header.removeAttribute('data-scroll-locked-fixed');
  }

  window.removeEventListener('wheel', onScrollLockEvent);
  window.removeEventListener('touchmove', onScrollLockEvent);
}

/**
 * Ensures the palette backdrop overlay exists directly under <body> to prevent
 * stacking context and containing block traps from transformed header ancestors.
 */
export function getOrCreatePaletteBackdrop(): HTMLElement {
  let backdrop = document.getElementById('palette-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'palette-backdrop';
    document.body.appendChild(backdrop);
  } else if (backdrop.parentElement !== document.body) {
    document.body.appendChild(backdrop);
  }
  backdrop.className =
    'fixed inset-0 z-40 hidden bg-black/25 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-200 touch-none';
  backdrop.setAttribute('aria-hidden', 'true');
  return backdrop;
}

let paletteCloseTimeout: number | null = null;

/**
 * Closes the palette and skin selector dropdown popover and hides the blurred page backdrop.
 */
export function closePaletteMenu(): void {
  const paletteDropdown = document.getElementById('palette-dropdown');
  const paletteBackdrop = document.getElementById('palette-backdrop');
  const paletteBtn = document.getElementById('palette-menu-btn');

  // Unlock document scroll unless mobile drawer is actively open
  if (typeof document !== 'undefined') {
    const mobileMenu = document.getElementById('mobile-nav-menu');
    const isMobileMenuOpen =
      mobileMenu &&
      !mobileMenu.classList.contains('hidden') &&
      mobileMenu.getAttribute('data-state') === 'open';
    if (!isMobileMenuOpen) {
      unlockBackgroundScroll();
    }
  }

  if (!paletteDropdown || paletteDropdown.classList.contains('hidden')) {
    paletteBackdrop?.classList.add('hidden');
    paletteBackdrop?.removeAttribute('data-state');
    paletteBtn?.setAttribute('aria-expanded', 'false');
    return;
  }

  if (paletteCloseTimeout !== null) {
    window.clearTimeout(paletteCloseTimeout);
    paletteCloseTimeout = null;
  }

  paletteDropdown.setAttribute('data-state', 'closed');
  paletteBackdrop?.setAttribute('data-state', 'closed');
  paletteBtn?.setAttribute('aria-expanded', 'false');

  paletteCloseTimeout = window.setTimeout(() => {
    paletteDropdown.classList.add('hidden');
    paletteDropdown.removeAttribute('data-state');
    paletteBackdrop?.classList.add('hidden');
    paletteBackdrop?.removeAttribute('data-state');
    paletteCloseTimeout = null;
  }, 120);
}

/**
 * Opens the palette dropdown popover and displays the subtle page-blur backdrop.
 */
export function openPaletteMenu(): void {
  const paletteDropdown = document.getElementById('palette-dropdown');
  const backdrop = getOrCreatePaletteBackdrop();
  const paletteBtn = document.getElementById('palette-menu-btn');

  if (paletteCloseTimeout !== null) {
    window.clearTimeout(paletteCloseTimeout);
    paletteCloseTimeout = null;
  }

  // Lock document scroll without destroying sticky positioning on scroll
  lockBackgroundScroll();

  paletteDropdown?.classList.remove('hidden');
  paletteDropdown?.setAttribute('data-state', 'open');
  backdrop.classList.remove('hidden');
  backdrop.setAttribute('data-state', 'open');
  paletteBtn?.setAttribute('aria-expanded', 'true');
}

/**
 * Initializes and binds interactive event listeners to theme and palette controls.
 */
export function bindThemeControls(
  container: HTMLElement | Document = document
): void {
  if (container instanceof HTMLElement) {
    if (container.dataset.themeBound === 'true') {
      syncThemeModeUI(container);
      return;
    }
    container.dataset.themeBound = 'true';
  }

  const themeBtn = container.querySelector('#theme-toggle-btn');
  const paletteBtn = container.querySelector('#palette-menu-btn');
  const paletteDropdown = container.querySelector('#palette-dropdown');
  const autoRotateBtn = container.querySelector('#palette-auto-rotate-btn');
  const paletteOptions = container.querySelectorAll('.palette-select-option');

  // Toggle Theme
  themeBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme: ThemeMode = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  });

  const lightBtn = container.querySelector(
    '#theme-mode-light-btn, [data-theme-set="light"]'
  );
  const darkBtn = container.querySelector(
    '#theme-mode-dark-btn, [data-theme-set="dark"]'
  );

  lightBtn?.addEventListener('click', () => {
    setTheme('light');
  });

  darkBtn?.addEventListener('click', () => {
    setTheme('dark');
  });

  syncThemeModeUI(container);

  const backdrop = getOrCreatePaletteBackdrop();

  // Toggle Dropdown
  paletteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isClosed =
      paletteDropdown?.classList.contains('hidden') ||
      paletteDropdown?.getAttribute('data-state') === 'closed';
    if (isClosed) {
      openPaletteMenu();
    } else {
      closePaletteMenu();
    }
  });

  backdrop.addEventListener('click', () => {
    closePaletteMenu();
  });

  // Outside click & Escape handlers
  document.addEventListener('click', (e) => {
    const target = e.target as Node | null;
    if (
      target &&
      paletteDropdown &&
      !paletteDropdown.contains(target) &&
      paletteBtn &&
      !paletteBtn.contains(target)
    ) {
      closePaletteMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePaletteMenu();
    }
  });

  // Select static palette
  paletteOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-palette-id');
      if (selected && DAY_PALETTES.some((p) => p.id === selected)) {
        setPalette(selected);
        syncPaletteUI(container, selected, false);
        closePaletteMenu();
      }
    });
  });

  // Activate live rotation
  autoRotateBtn?.addEventListener('click', () => {
    setAutoRotate(true);
    const daily = getTodayPalette();
    syncPaletteUI(container, daily.id, true);
    closePaletteMenu();
  });

  // Initial UI sync: always default to live rotation upon page load
  setAutoRotate(true);
  const daily = getTodayPalette();
  document.documentElement.setAttribute('data-palette', daily.id);
  syncPaletteUI(container, daily.id, true);
}

/**
 * Initializes theme and palette on page load.
 */
export function initThemeEngine(): void {
  setAutoRotate(true);
  const daily = getTodayPalette();
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-palette', daily.id);
  }

  const activeTheme = getStoredTheme();
  setTheme(activeTheme);
}
