import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isValidDockPosition,
  getAllowedDockPositions,
  getStoredDockPosition,
  saveDockPosition,
  detectSnapEdge,
  syncDockUI,
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

  describe('getAllowedDockPositions', () => {
    it('returns top and bottom only for viewports < 1024px', () => {
      expect(getAllowedDockPositions(375)).toEqual(['top', 'bottom']);
      expect(getAllowedDockPositions(768)).toEqual(['top', 'bottom']);
      expect(getAllowedDockPositions(1023)).toEqual(['top', 'bottom']);
    });

    it('returns all 4 positions for viewports >= 1024px', () => {
      expect(getAllowedDockPositions(1024)).toEqual([
        'top',
        'bottom',
        'left',
        'right',
      ]);
      expect(getAllowedDockPositions(1920)).toEqual([
        'top',
        'bottom',
        'left',
        'right',
      ]);
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

    it('falls back to top if stored value is lateral on viewports < 1024px', () => {
      mockStorage.setItem(DOCK_STORAGE_KEY, 'left');
      vi.stubGlobal('window', { innerWidth: 768 });
      expect(getStoredDockPosition(mockStorage)).toBe('top');

      mockStorage.setItem(DOCK_STORAGE_KEY, 'bottom');
      expect(getStoredDockPosition(mockStorage)).toBe('bottom');

      vi.unstubAllGlobals();
    });

    it('saves dock position to storage correctly', () => {
      saveDockPosition('right', mockStorage);
      expect(mockStorage.getItem(DOCK_STORAGE_KEY)).toBe('right');
    });
  });

  describe('detectSnapEdge (Early Magnetic Snapping)', () => {
    const width = 1920;
    const height = 1080;
    const deadzone = 40;

    it('returns null when cursor is inside the deadzone at exact center', () => {
      expect(detectSnapEdge(960, 540, width, height, deadzone)).toBe(null);
      expect(detectSnapEdge(970, 545, width, height, deadzone)).toBe(null);
    });

    it('early snaps to left when moving left of center', () => {
      // (600, 540) is left of center (dx = -360, dy = 0)
      expect(detectSnapEdge(600, 540, width, height, deadzone)).toBe('left');
      expect(detectSnapEdge(100, 540, width, height, deadzone)).toBe('left');
    });

    it('early snaps to right when moving right of center', () => {
      // (1300, 540) is right of center (dx = +340, dy = 0)
      expect(detectSnapEdge(1300, 540, width, height, deadzone)).toBe('right');
      expect(detectSnapEdge(1800, 540, width, height, deadzone)).toBe('right');
    });

    it('early snaps to top when moving above center', () => {
      // (960, 300) is above center (dx = 0, dy = -240)
      expect(detectSnapEdge(960, 300, width, height, deadzone)).toBe('top');
      expect(detectSnapEdge(960, 50, width, height, deadzone)).toBe('top');
    });

    it('early snaps to bottom when moving below center', () => {
      // (960, 800) is below center (dx = 0, dy = +260)
      expect(detectSnapEdge(960, 800, width, height, deadzone)).toBe('bottom');
      expect(detectSnapEdge(960, 1000, width, height, deadzone)).toBe('bottom');
    });

    it('correctly decides between horizontal and vertical quadrants', () => {
      // normX = -500/960 ≈ -0.52, normY = -100/540 ≈ -0.18 -> dominant horizontal left
      expect(detectSnapEdge(460, 440, width, height, deadzone)).toBe('left');

      // normX = -100/960 ≈ -0.10, normY = -300/540 ≈ -0.55 -> dominant vertical top
      expect(detectSnapEdge(860, 240, width, height, deadzone)).toBe('top');
    });

    it('strictly constrains to top/bottom on viewports < 1024px (mobile/tablet)', () => {
      const mobileWidth = 390;
      const mobileHeight = 844;

      // Above center -> top
      expect(detectSnapEdge(50, 200, mobileWidth, mobileHeight, deadzone)).toBe(
        'top'
      );
      // Below center -> bottom
      expect(
        detectSnapEdge(350, 700, mobileWidth, mobileHeight, deadzone)
      ).toBe('bottom');
      // Deadzone around center -> null
      expect(
        detectSnapEdge(195, 422, mobileWidth, mobileHeight, deadzone)
      ).toBe(null);
    });
  });

  describe('syncDockUI', () => {
    it('updates active styles for dock target buttons', () => {
      const createMockBtn = (target: string) => {
        const classes = new Set<string>();
        return {
          getAttribute: (attr: string) =>
            attr === 'data-dock-target' ? target : null,
          classList: {
            add: (...cls: string[]) => cls.forEach((c) => classes.add(c)),
            remove: (...cls: string[]) => cls.forEach((c) => classes.delete(c)),
            contains: (c: string) => classes.has(c),
          },
        };
      };

      const buttons = [
        createMockBtn('top'),
        createMockBtn('bottom'),
        createMockBtn('left'),
        createMockBtn('right'),
      ];

      vi.stubGlobal('document', {
        querySelectorAll: () => buttons,
      });

      syncDockUI('bottom');

      expect(buttons[1].classList.contains('text-[var(--color-accent)]')).toBe(
        true
      );
      expect(buttons[0].classList.contains('text-[var(--color-accent)]')).toBe(
        false
      );

      syncDockUI('left');
      expect(buttons[2].classList.contains('text-[var(--color-accent)]')).toBe(
        true
      );
      expect(buttons[1].classList.contains('text-[var(--color-accent)]')).toBe(
        false
      );

      vi.unstubAllGlobals();
    });
  });
});
