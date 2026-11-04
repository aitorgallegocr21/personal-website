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
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
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
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
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
  return !currentStored || currentStored === 'auto' || !DAY_PALETTES.some((p) => p.id === currentStored);
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
      (typeof document !== 'undefined' && document.documentElement.getAttribute('data-palette')) ||
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
      autoStatusText.textContent = `Activa · Hoy: ${today.label} (${today.day})`;
      autoStatusText.className = 'text-[10.5px] font-semibold text-[var(--color-accent)] truncate';
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
      autoStatusText.textContent = 'Pulsa para activar la rotación diaria';
      autoStatusText.className = 'text-[10.5px] text-zinc-500 dark:text-zinc-400 truncate';
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

/**
 * Initializes and binds interactive event listeners to theme and palette controls.
 */
export function bindThemeControls(container: HTMLElement | Document = document): void {
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

  // Toggle Dropdown
  paletteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = paletteDropdown?.classList.contains('hidden');
    if (isHidden) {
      paletteDropdown?.classList.remove('hidden');
      paletteBtn.setAttribute('aria-expanded', 'true');
    } else {
      paletteDropdown?.classList.add('hidden');
      paletteBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Outside click & Escape handlers
  document.addEventListener('click', (e) => {
    if (!paletteDropdown?.contains(e.target as Node) && e.target !== paletteBtn) {
      paletteDropdown?.classList.add('hidden');
      paletteBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !paletteDropdown?.classList.contains('hidden')) {
      paletteDropdown?.classList.add('hidden');
      paletteBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // Select static palette
  paletteOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-palette-id');
      if (selected && DAY_PALETTES.some((p) => p.id === selected)) {
        setPalette(selected);
        syncPaletteUI(container, selected, false);
        paletteDropdown?.classList.add('hidden');
        paletteBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Activate live rotation
  autoRotateBtn?.addEventListener('click', () => {
    setAutoRotate(true);
    const daily = getTodayPalette();
    syncPaletteUI(container, daily.id, true);
    paletteDropdown?.classList.add('hidden');
    paletteBtn?.setAttribute('aria-expanded', 'false');
  });

  // Initial UI sync
  const isAuto = isAutoRotateEnabled();
  const activePalette = isAuto ? getTodayPalette().id : getStoredPalette();
  document.documentElement.setAttribute('data-palette', activePalette);
  syncPaletteUI(container, activePalette, isAuto);
}

/**
 * Initializes theme and palette on page load.
 */
export function initThemeEngine(): void {
  const isAuto = isAutoRotateEnabled();
  const activePalette = isAuto ? getTodayPalette().id : getStoredPalette();
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-palette', activePalette);
  }

  const activeTheme = getStoredTheme();
  setTheme(activeTheme);
}
