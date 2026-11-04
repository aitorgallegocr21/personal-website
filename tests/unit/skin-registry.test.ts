import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SKIN_ID,
  SKINS,
  getSkinMetadata,
  getAllSkins,
  getAvailableSkins,
  isValidSkinId,
} from '@/components/skins/registry';

describe('Skin Registry & Contracts', () => {
  it('defines bento-modern as the default skin ID', () => {
    expect(DEFAULT_SKIN_ID).toBe('bento-modern');
  });

  it('contains bento-modern with available status in the skins catalog', () => {
    const bento = SKINS.find((skin) => skin.id === 'bento-modern');
    expect(bento).toBeDefined();
    expect(bento?.isAvailable).toBe(true);
    expect(bento?.name).toBe('Bento Modern');
    expect(bento?.tagline).toBeDefined();
    expect(bento?.description).toBeDefined();
  });

  it('retrieves correct metadata for a valid skin ID', () => {
    const meta = getSkinMetadata('bento-modern');
    expect(meta.id).toBe('bento-modern');
    expect(meta.name).toBe('Bento Modern');
  });

  it('falls back to bento-modern for unknown or invalid skin IDs', () => {
    const fallback = getSkinMetadata('non-existent-skin');
    expect(fallback.id).toBe('bento-modern');
  });

  it('returns all skins registered in catalog', () => {
    const all = getAllSkins();
    expect(all.length).toBeGreaterThanOrEqual(1);
    expect(all).toBe(SKINS);
  });

  it('returns only currently available skins with getAvailableSkins', () => {
    const available = getAvailableSkins();
    expect(available.every((skin) => skin.isAvailable === true)).toBe(true);
    expect(available.some((skin) => skin.id === 'bento-modern')).toBe(true);
  });

  it('validates skin IDs correctly with isValidSkinId', () => {
    expect(isValidSkinId('bento-modern')).toBe(true);
    expect(isValidSkinId('retro-terminal')).toBe(true);
    expect(isValidSkinId('unknown-random-skin')).toBe(false);
  });
});
