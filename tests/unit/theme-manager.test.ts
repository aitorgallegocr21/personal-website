import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  DAY_PALETTES,
  getTodayPalette,
  getStoredTheme,
  setTheme,
  isAutoRotateEnabled,
  getStoredPalette,
  setPalette,
  setAutoRotate,
  THEME_STORAGE_KEY,
  PALETTE_STORAGE_KEY,
} from '@/lib/theme-manager';

describe('theme-manager', () => {
  beforeEach(() => {
    // Reset document state and localStorage mock
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
    });

    // Mock document if needed
    if (typeof document !== 'undefined') {
      document.documentElement.className = '';
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.removeAttribute('data-palette');
    }
  });

  describe('DAY_PALETTES', () => {
    it('defines exactly 7 palettes corresponding to days of the week', () => {
      expect(DAY_PALETTES.length).toBe(7);
      expect(DAY_PALETTES.map((p) => p.id)).toEqual([
        'amber',
        'emerald',
        'teal',
        'sky',
        'slate',
        'violet',
        'rose',
      ]);
    });

    it('returns the palette matching today day index', () => {
      const today = getTodayPalette();
      const expectedDayIndex = new Date().getDay();
      expect(today).toEqual(DAY_PALETTES[expectedDayIndex]);
    });
  });

  describe('theme mode', () => {
    it('sets and stores light/dark theme', () => {
      setTheme('dark');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
      expect(getStoredTheme()).toBe('dark');

      setTheme('light');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
      expect(getStoredTheme()).toBe('light');
    });
  });

  describe('palette and rotation', () => {
    it('defaults to auto-rotate when no storage preference exists', () => {
      expect(isAutoRotateEnabled()).toBe(true);
      expect(getStoredPalette()).toBe(getTodayPalette().id);
    });

    it('sets and stores a manual palette, disabling auto-rotate', () => {
      setPalette('sky');
      expect(localStorage.getItem(PALETTE_STORAGE_KEY)).toBe('sky');
      expect(isAutoRotateEnabled()).toBe(false);
      expect(getStoredPalette()).toBe('sky');
    });

    it('restores auto-rotate when setAutoRotate(true) is called', () => {
      setPalette('violet');
      expect(isAutoRotateEnabled()).toBe(false);

      setAutoRotate(true);
      expect(isAutoRotateEnabled()).toBe(true);
      expect(localStorage.getItem(PALETTE_STORAGE_KEY)).toBeNull();
    });
  });
});
