// تكوين المتغيرات البيئية للتطبيق

// استيراد المتغيرات البيئية من ملف .env أو من متغيرات البيئة
const getEnvVariable = (key: string, defaultValue = ""): string => {
  // في بيئة الإنتاج، استخدم متغيرات البيئة الفعلية
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string
  }

  // في بيئة التطوير، استخدم متغيرات Vite
  const envKey = `VITE_${key}`
  if (import.meta.env[envKey] !== undefined) {
    return import.meta.env[envKey] as string
  }

  return defaultValue
}

// تصدير المتغيرات البيئية المستخدمة في التطبيق
export const ENV = {
  // مفاتيح API للنماذج السحابية
  OPENROUTER_API_KEY: getEnvVariable("OPENROUTER_API_KEY"),
  TOGETHER_API_KEY: getEnvVariable("TOGETHER_API_KEY"),

  // إعدادات قاعدة البيانات
  NEON_DATABASE_URL: getEnvVariable("NEON_DATABASE_URL"),
  NEON_POSTGRES_URL: getEnvVariable("NEON_POSTGRES_URL"),
  NEON_POSTGRES_PRISMA_URL: getEnvVariable("NEON_POSTGRES_PRISMA_URL"),
  NEON_POSTGRES_URL_NO_SSL: getEnvVariable("NEON_POSTGRES_URL_NO_SSL"),
  NEON_POSTGRES_HOST: getEnvVariable("NEON_POSTGRES_HOST"),
  NEON_POSTGRES_DATABASE: getEnvVariable("NEON_POSTGRES_DATABASE"),
  NEON_POSTGRES_USER: getEnvVariable("NEON_POSTGRES_USER"),
  NEON_POSTGRES_PASSWORD: getEnvVariable("NEON_POSTGRES_PASSWORD"),

  // إعدادات Redis
  KV_URL: getEnvVariable("KV_URL"),
  REDIS_URL: getEnvVariable("REDIS_URL"),
  KV_REST_API_URL: getEnvVariable("KV_REST_API_URL"),
  KV_REST_API_TOKEN: getEnvVariable("KV_REST_API_TOKEN"),
  KV_REST_API_READ_ONLY_TOKEN: getEnvVariable("KV_REST_API_READ_ONLY_TOKEN"),

  // مفاتيح Neon Stack - تمت إزالة المفتاح الحساس
  NEON_NEXT_PUBLIC_STACK_PROJECT_ID: getEnvVariable("NEON_NEXT_PUBLIC_STACK_PROJECT_ID"),
  // المفتاح الحساس تمت إزالته تمامًا
  NEON_STACK_SECRET_SERVER_KEY: getEnvVariable("NEON_STACK_SECRET_SERVER_KEY"),

  // إعدادات التطبيق
  NEXT_PUBLIC_APP_URL: getEnvVariable("NEXT_PUBLIC_APP_URL", "https://cyberai-os.vercel.app"),
  NEXT_PUBLIC_API_URL: getEnvVariable("NEXT_PUBLIC_API_URL", "https://api.cyberai-os.vercel.app"),

  // إعدادات النماذج المحلية
  LOCAL_MODELS_PATH: getEnvVariable("LOCAL_MODELS_PATH", "./models"),
  DEFAULT_LOCAL_MODEL: getEnvVariable("DEFAULT_LOCAL_MODEL", "tinyllama"),
  MAX_THREADS: Number.parseInt(getEnvVariable("MAX_THREADS", "4")),
  USE_GPU: getEnvVariable("USE_GPU", "auto"),

  // إعدادات واجهة المستخدم
  DEFAULT_THEME: getEnvVariable("DEFAULT_THEME", "dark"),
  DEFAULT_LANGUAGE: getEnvVariable("DEFAULT_LANGUAGE", "ar"),
  ENABLE_ANALYTICS: getEnvVariable("ENABLE_ANALYTICS", "false") === "true",
  ENABLE_LOCAL_STORAGE: getEnvVariable("ENABLE_LOCAL_STORAGE", "true") === "true",
  ENCRYPT_LOCAL_DATA: getEnvVariable("ENCRYPT_LOCAL_DATA", "true") === "true",

  // إعدادات التطبيق
  IS_PRODUCTION: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL || "/cyberai-os/",

  // إعدادات التدريب المحلي
  TRAINING_TEMP_DIR: getEnvVariable("TRAINING_TEMP_DIR", "./training_temp"),
  MAX_TRAINING_EPOCHS: Number.parseInt(getEnvVariable("MAX_TRAINING_EPOCHS", "3")),
  LEARNING_RATE: Number.parseFloat(getEnvVariable("LEARNING_RATE", "0.00002")),
  BATCH_SIZE: Number.parseInt(getEnvVariable("BATCH_SIZE", "4")),

  // إعدادات Terminal
  TERMINAL_HISTORY_SIZE: Number.parseInt(getEnvVariable("TERMINAL_HISTORY_SIZE", "1000")),
  TERMINAL_ENABLE_NETWORK: getEnvVariable("TERMINAL_ENABLE_NETWORK", "true") === "true",
  TERMINAL_MAX_PROCESSES: Number.parseInt(getEnvVariable("TERMINAL_MAX_PROCESSES", "5")),
}

// وظائف مساعدة للتحقق من توفر الخدمات
export const isOpenRouterAvailable = (): boolean => Boolean(ENV.OPENROUTER_API_KEY)
export const isTogetherAvailable = (): boolean => Boolean(ENV.TOGETHER_API_KEY)
export const isNeonDatabaseAvailable = (): boolean => Boolean(ENV.NEON_DATABASE_URL)
export const isRedisAvailable = (): boolean => Boolean(ENV.KV_URL || ENV.REDIS_URL)
