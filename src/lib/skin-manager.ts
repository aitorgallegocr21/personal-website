import {
  DEFAULT_SKIN_ID,
  isValidSkinId,
  getSkinMetadata,
} from '@/components/skins/registry';
import type { SkinId } from '@/types/skin';

export const SKIN_STORAGE_KEY = 'portfolio-skin';

function getLocalStorage(): Storage | null {
  if (typeof localStorage !== 'undefined') return localStorage;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

/**
 * Retrieves the currently saved skin ID or falls back to DEFAULT_SKIN_ID.
 */
export function getStoredSkin(): SkinId {
  const storage = getLocalStorage();
  const stored = storage?.getItem(SKIN_STORAGE_KEY);
  if (stored && isValidSkinId(stored)) {
    return stored as SkinId;
  }
  return DEFAULT_SKIN_ID;
}

/**
 * Applies and persists the selected skin ID, updating the DOM and dispatching 'skinchange'.
 */
export function setSkin(skinId: SkinId): void {
  const validId = isValidSkinId(skinId) ? skinId : DEFAULT_SKIN_ID;

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-skin', validId);
  }

  const storage = getLocalStorage();
  storage?.setItem(SKIN_STORAGE_KEY, validId);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('skinchange', {
        detail: {
          skinId: validId,
          metadata: getSkinMetadata(validId),
        },
      })
    );
  }
}

/**
 * Initializes the skin engine on page load.
 */
export function initSkinEngine(): SkinId {
  const skin = getStoredSkin();
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-skin', skin);
  }
  return skin;
}

/**
 * Synchronizes the visual state of the skin options in the UI.
 */
export function syncSkinUI(
  container: HTMLElement | Document,
  activeSkinId: SkinId
): void {
  const skinButtons = container.querySelectorAll<HTMLButtonElement>(
    '.skin-select-option'
  );
  skinButtons.forEach((btn) => {
    const id = btn.getAttribute('data-skin-id');
    const isCurrent = id === activeSkinId;
    const checkIcon = btn.querySelector('.skin-check-icon');

    if (isCurrent) {
      checkIcon?.classList.remove('hidden');
      btn.classList.add(
        'bg-[var(--color-accent-subtle)]',
        'border-[var(--color-accent-border)]',
        'text-[var(--color-accent)]',
        'font-semibold'
      );
      btn.classList.remove(
        'border-transparent',
        'text-zinc-700',
        'dark:text-zinc-300'
      );
    } else {
      checkIcon?.classList.add('hidden');
      btn.classList.remove(
        'bg-[var(--color-accent-subtle)]',
        'border-[var(--color-accent-border)]',
        'text-[var(--color-accent)]',
        'font-semibold'
      );
      btn.classList.add(
        'border-transparent',
        'text-zinc-700',
        'dark:text-zinc-300'
      );
    }
  });
}

/**
 * Binds interactive click events to skin option buttons.
 */
export function bindSkinControls(
  container: HTMLElement | Document = document
): void {
  const skinButtons = container.querySelectorAll<HTMLButtonElement>(
    '.skin-select-option'
  );
  const paletteDropdown = container.querySelector('#palette-dropdown');
  const paletteBtn = container.querySelector('#palette-menu-btn');

  skinButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isAvailable = btn.getAttribute('data-available') === 'true';
      if (!isAvailable) return;

      const skinId = btn.getAttribute('data-skin-id') as SkinId | null;
      if (skinId && isValidSkinId(skinId)) {
        setSkin(skinId);
        syncSkinUI(container, skinId);
        // Close dropdown
        paletteDropdown?.classList.add('hidden');
        paletteBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const active = getStoredSkin();
  syncSkinUI(container, active);
}
