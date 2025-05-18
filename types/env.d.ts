/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string
  readonly VITE_OPENROUTER_API_KEY: string
  readonly VITE_NEON_DATABASE_URL: string
  readonly VITE_KV_URL: string
  readonly VITE_REDIS_URL: string
  readonly VITE_LOCAL_MODELS_PATH: string
  readonly VITE_DEFAULT_LOCAL_MODEL: string
  readonly VITE_MAX_THREADS: string
  readonly VITE_USE_GPU: string
  readonly VITE_DEFAULT_THEME: string
  readonly VITE_DEFAULT_LANGUAGE: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_LOCAL_STORAGE: string
  readonly VITE_ENCRYPT_LOCAL_DATA: string
  readonly VITE_TERMINAL_HISTORY_SIZE: string
  readonly VITE_TERMINAL_ENABLE_NETWORK: string
  readonly VITE_TERMINAL_MAX_PROCESSES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
