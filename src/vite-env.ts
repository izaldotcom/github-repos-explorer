/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN?: string;
  readonly BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
