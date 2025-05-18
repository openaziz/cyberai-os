// تكوين المتغيرات البيئية للتطبيق
export const ENV = {
  // المسار الأساسي للتطبيق
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || "https://cyberai-os.vercel.app/",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.cyberai-os.vercel.app/",

  // إعدادات قاعدة البيانات
  DATABASE_URL: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,

  // مفاتيح API للنماذج السحابية
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  TOGETHER_API_KEY: process.env.TOGETHER_API_KEY,

  // إعدادات Redis
  REDIS_URL: process.env.REDIS_URL || process.env.KV_URL,

  // إعدادات التطبيق
  DEFAULT_THEME: process.env.DEFAULT_THEME || "dark",
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || "ar",
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === "true",
  ENABLE_LOCAL_STORAGE: process.env.ENABLE_LOCAL_STORAGE !== "false",
  ENCRYPT_LOCAL_DATA: process.env.ENCRYPT_LOCAL_DATA === "true",

  // إعدادات النماذج المحلية
  LOCAL_MODELS_PATH: process.env.LOCAL_MODELS_PATH || "./models",
  DEFAULT_LOCAL_MODEL: process.env.DEFAULT_LOCAL_MODEL || "tinyllama",
  MAX_THREADS: Number.parseInt(process.env.MAX_THREADS || "4"),
  USE_GPU: process.env.USE_GPU || "auto",

  // إعدادات التدريب
  TRAINING_TEMP_DIR: process.env.TRAINING_TEMP_DIR || "./training_temp",
  MAX_TRAINING_EPOCHS: Number.parseInt(process.env.MAX_TRAINING_EPOCHS || "3"),
  LEARNING_RATE: Number.parseFloat(process.env.LEARNING_RATE || "0.00002"),
  BATCH_SIZE: Number.parseInt(process.env.BATCH_SIZE || "4"),

  // إعدادات Terminal
  TERMINAL_HISTORY_SIZE: Number.parseInt(process.env.TERMINAL_HISTORY_SIZE || "1000"),
  TERMINAL_ENABLE_NETWORK: process.env.TERMINAL_ENABLE_NETWORK !== "false",
  TERMINAL_MAX_PROCESSES: Number.parseInt(process.env.TERMINAL_MAX_PROCESSES || "5"),
}

// دوال مساعدة للتحقق من توفر الخدمات
export function isGroqAvailable(): boolean {
  return !!ENV.GROQ_API_KEY
}

export function isOpenRouterAvailable(): boolean {
  return !!ENV.OPENROUTER_API_KEY
}

export function isTogetherAvailable(): boolean {
  return !!ENV.TOGETHER_API_KEY
}

export function isDatabaseAvailable(): boolean {
  return !!ENV.DATABASE_URL
}

export function isRedisAvailable(): boolean {
  return !!ENV.REDIS_URL
}
