/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_PHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
