/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_NOINDEX?: string;
  readonly PUBLIC_CANONICAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
