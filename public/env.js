// هذا الملف سيتم استبداله بواسطة سكريبت process-env.js أثناء البناء
// يحتوي على المتغيرات البيئية الآمنة للاستخدام في جانب العميل
window.ENV = {
  // القيم الافتراضية للمتغيرات البيئية
  NEXT_PUBLIC_APP_URL: "https://openaziz.github.io/cyberai-os",
  NEXT_PUBLIC_API_URL: "https://api.cyberai-os.vercel.app",
  LOCAL_MODELS_PATH: "./models",
  DEFAULT_LOCAL_MODEL: "tinyllama",
  MAX_THREADS: 4,
  USE_GPU: "auto",
  DEFAULT_THEME: "dark",
  DEFAULT_LANGUAGE: "ar",
  ENABLE_ANALYTICS: false,
  ENABLE_LOCAL_STORAGE: true,
  ENCRYPT_LOCAL_DATA: true,
  IS_PRODUCTION: true,
  BASE_URL: "/cyberai-os/",
  TRAINING_TEMP_DIR: "./training_temp",
  MAX_TRAINING_EPOCHS: 3,
  LEARNING_RATE: 0.00002,
  BATCH_SIZE: 4,
  TERMINAL_HISTORY_SIZE: 1000,
  TERMINAL_ENABLE_NETWORK: true,
  TERMINAL_MAX_PROCESSES: 5,
  NEON_NEXT_PUBLIC_STACK_PROJECT_ID: "",
  NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: "",
}
