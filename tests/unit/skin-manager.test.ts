import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  SKIN_STORAGE_KEY,
  getStoredSkin,
  setSkin,
  initSkinEngine,
} from '@/lib/skin-manager';
import { DEFAULT_SKIN_ID } from '@/components/skins/registry';

describe('skin-manager', () => {
  beforeEach(() => {
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

    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-skin');
    }
  });

  it('returns DEFAULT_SKIN_ID when no skin is stored in localStorage', () => {
    expect(getStoredSkin()).toBe(DEFAULT_SKIN_ID);
  });

  it('returns DEFAULT_SKIN_ID when an invalid or unknown skin is stored', () => {
    localStorage.setItem(SKIN_STORAGE_KEY, 'invalid-non-existent-skin');
    expect(getStoredSkin()).toBe(DEFAULT_SKIN_ID);
  });

  it('sets and persists a valid skin to localStorage and documentElement', () => {
    setSkin('bento-modern');
    expect(localStorage.getItem(SKIN_STORAGE_KEY)).toBe('bento-modern');
    expect(getStoredSkin()).toBe('bento-modern');
    if (typeof document !== 'undefined') {
      expect(document.documentElement.getAttribute('data-skin')).toBe(
        'bento-modern'
      );
    }
  });

  it('dispatches a CustomEvent "skinchange" on window when setSkin is invoked', () => {
    const dispatchMock = vi.fn();
    vi.stubGlobal('window', {
      dispatchEvent: dispatchMock,
    });

    setSkin('bento-modern');

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    const event = dispatchMock.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('skinchange');
    expect(event.detail.skinId).toBe('bento-modern');
    expect(event.detail.metadata.id).toBe('bento-modern');

    vi.unstubAllGlobals();
  });

  it('initializes the skin engine correctly and sets the root attribute', () => {
    localStorage.setItem(SKIN_STORAGE_KEY, 'bento-modern');
    const active = initSkinEngine();
    expect(active).toBe('bento-modern');
    if (typeof document !== 'undefined') {
      expect(document.documentElement.getAttribute('data-skin')).toBe(
        'bento-modern'
      );
    }
  });
});
