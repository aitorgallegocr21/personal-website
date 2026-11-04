export type KnownSkinId = 'bento-modern';
export type SkinId = KnownSkinId | (string & {});

export interface SkinMetadata {
  id: SkinId;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  author?: string;
  isAvailable?: boolean;
}
