import { describe, it, expect, beforeEach } from 'vitest';
import {
  isValidDockPosition,
  getStoredDockPosition,
  saveDockPosition,
  detectSnapEdge,
  DOCK_STORAGE_KEY,
  DEFAULT_DOCK_POSITION,
  type DockPosition,
} from '@/lib/dock-manager';

describe('Dock Manager Helper Functions', () => {
  let mockStorage: Storage;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    mockStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      key: () => null,
      length: 0,
    };
  });

  describe('isValidDockPosition', () => {
    it('returns true for all valid dock positions', () => {
      const valid: DockPosition[] = ['top', 'bottom', 'left', 'right'];
      valid.forEach((pos) => {
        expect(isValidDockPosition(pos)).toBe(true);
      });
    });

    it('returns false for invalid positions or types', () => {
      expect(isValidDockPosition('center')).toBe(false);
      expect(isValidDockPosition('')).toBe(false);
      expect(isValidDockPosition(null)).toBe(false);
      expect(isValidDockPosition(undefined)).toBe(false);
      expect(isValidDockPosition(123)).toBe(false);
    });
  });

  describe('Storage persistence', () => {
    it('returns default position when storage is empty', () => {
      expect(getStoredDockPosition(mockStorage)).toBe(DEFAULT_DOCK_POSITION);
    });

    it('returns stored position when valid', () => {
      mockStorage.setItem(DOCK_STORAGE_KEY, 'left');
      expect(getStoredDockPosition(mockStorage)).toBe('left');
    });

    it('falls back to default if stored value is invalid', () => {
      mockStorage.setItem(DOCK_STORAGE_KEY, 'invalid-pos');
      expect(getStoredDockPosition(mockStorage)).toBe(DEFAULT_DOCK_POSITION);
    });

    it('saves dock position to storage correctly', () => {
      saveDockPosition('right', mockStorage);
      expect(mockStorage.getItem(DOCK_STORAGE_KEY)).toBe('right');
    });
  });

  describe('detectSnapEdge', () => {
    const width = 1920;
    const height = 1080;
    const threshold = 100;

    it('returns null when cursor is inside central viewport', () => {
      expect(detectSnapEdge(960, 540, width, height, threshold)).toBe(null);
      expect(detectSnapEdge(300, 300, width, height, threshold)).toBe(null);
    });

    it('detects top edge when near top boundary', () => {
      expect(detectSnapEdge(960, 40, width, height, threshold)).toBe('top');
      expect(detectSnapEdge(500, 99, width, height, threshold)).toBe('top');
    });

    it('detects bottom edge when near bottom boundary', () => {
      expect(detectSnapEdge(960, 1020, width, height, threshold)).toBe(
        'bottom'
      );
    });

    it('detects left edge when near left boundary', () => {
      expect(detectSnapEdge(50, 540, width, height, threshold)).toBe('left');
    });

    it('detects right edge when near right boundary', () => {
      expect(detectSnapEdge(1880, 540, width, height, threshold)).toBe('right');
    });

    it('resolves corners based on closest boundary distance', () => {
      // Near top-left: x=40, y=20 -> y distance to top is 20 < 40 -> top
      expect(detectSnapEdge(40, 20, width, height, threshold)).toBe('top');
      // Near top-left: x=20, y=40 -> x distance to left is 20 < 40 -> left
      expect(detectSnapEdge(20, 40, width, height, threshold)).toBe('left');
      // Near bottom-right: x=1900 (dx=20), y=1050 (dy=30) -> right
      expect(detectSnapEdge(1900, 1050, width, height, threshold)).toBe(
        'right'
      );
    });
  });
});
