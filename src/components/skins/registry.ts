import type { SkinId, SkinMetadata } from '@/types/skin';

export const DEFAULT_SKIN_ID: SkinId = 'bento-modern';

export const SKINS: readonly SkinMetadata[] = [
  {
    id: 'bento-modern',
    name: 'Bento Modern',
    tagline: 'Cuadrícula modular',
    description:
      'Diseño visual contemporáneo con tarjetas interactivas, paletas dinámicas y estética tecnológica oscura.',
    badge: 'Activo',
    author: 'Aitor Gallego',
    isAvailable: true,
  },
  {
    id: 'retro-terminal',
    name: 'Retro Terminal',
    tagline: 'Consola CRT hacker',
    description:
      'Estética CLI inspirada en emuladores de terminal con comandos ejecutables y modo fósforo verde.',
    badge: 'Próx.',
    author: 'Aitor Gallego',
    isAvailable: false,
  },
  {
    id: 'editorial-paper',
    name: 'Editorial Paper',
    tagline: 'Tipografía suiza',
    description:
      'Estilo minimalista de alta densidad tipográfica con contrastes refinados y lectura relajada.',
    badge: 'Próx.',
    author: 'Aitor Gallego',
    isAvailable: false,
  },
] as const;

/**
 * Obtiene los metadatos de un skin por su identificador.
 * Si el ID no existe en el catálogo, retorna el skin por defecto (bento-modern).
 */
export function getSkinMetadata(id: string): SkinMetadata {
  const match = SKINS.find((skin) => skin.id === id);
  if (match) return match;

  const fallback = SKINS.find((skin) => skin.id === DEFAULT_SKIN_ID);
  if (!fallback) {
    throw new Error(
      `Default skin "${DEFAULT_SKIN_ID}" is not registered in SKINS catalog.`
    );
  }
  return fallback;
}

/**
 * Retorna todos los skins registrados en el catálogo.
 */
export function getAllSkins(): readonly SkinMetadata[] {
  return SKINS;
}

/**
 * Retorna únicamente los skins disponibles para activación en el entorno actual.
 */
export function getAvailableSkins(): readonly SkinMetadata[] {
  return SKINS.filter((skin) => skin.isAvailable === true);
}

/**
 * Verifica si un identificador corresponde a un skin registrado.
 */
export function isValidSkinId(id: string): boolean {
  return SKINS.some((skin) => skin.id === id);
}
