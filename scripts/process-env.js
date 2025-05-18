// هذا السكريبت يقوم بمعالجة ملف .env وإنشاء ملف env.js آمن للاستخدام في الموقع الثابت
const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")

// قراءة ملف .env.local أو .env
let envConfig = {}
try {
  // محاولة قراءة .env.local أولاً
  const envLocalPath = path.resolve(process.cwd(), ".env.local")
  if (fs.existsSync(envLocalPath)) {
    envConfig = dotenv.parse(fs.readFileSync(envLocalPath))
    console.log("تم قراءة ملف .env.local بنجاح")
  } else {
    // محاولة قراءة .env إذا لم يكن .env.local موجودًا
    const envPath = path.resolve(process.cwd(), ".env")
    if (fs.existsSync(envPath)) {
      envConfig = dotenv.parse(fs.readFileSync(envPath))
      console.log("تم قراءة ملف .env بنجاح")
    } else {
      console.warn("لم يتم العثور على ملف .env.local أو .env")
    }
  }
} catch (error) {
  console.error("خطأ في قراءة ملف البيئة:", error)
}

// تحديد المتغيرات التي يمكن استخدامها في جانب العميل بأمان
const safeClientEnvVars = {
  // إعدادات التطبيق العامة
  NEXT_PUBLIC_APP_URL: envConfig.NEXT_PUBLIC_APP_URL || "https://openaziz.github.io/cyberai-os",
  NEXT_PUBLIC_API_URL: envConfig.NEXT_PUBLIC_API_URL || "https://cyberai-os-api.vercel.app",

  // إعدادات واجهة المستخدم
  DEFAULT_THEME: envConfig.DEFAULT_THEME || "dark",
  DEFAULT_LANGUAGE: envConfig.DEFAULT_LANGUAGE || "ar",
  ENABLE_ANALYTICS: envConfig.ENABLE_ANALYTICS === "true",
  ENABLE_LOCAL_STORAGE: envConfig.ENABLE_LOCAL_STORAGE !== "false",
  ENCRYPT_LOCAL_DATA: envConfig.ENCRYPT_LOCAL_DATA !== "false",

  // إعدادات أخرى آمنة للعميل
  BASE_URL: "/cyberai-os/",
  IS_PRODUCTION: true,

  // معرف مشروع Neon Stack (آمن للمشاركة في جانب العميل)
  NEON_NEXT_PUBLIC_STACK_PROJECT_ID: envConfig.NEON_NEXT_PUBLIC_STACK_PROJECT_ID || "",
  NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: envConfig.NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "",
}

// إنشاء ملف env.js للاستخدام في جانب العميل
const clientEnvContent = `// هذا الملف تم إنشاؤه تلقائيًا بواسطة سكريبت process-env.js
// يحتوي فقط على المتغيرات البيئية الآمنة للاستخدام في جانب العميل
window.ENV = ${JSON.stringify(safeClientEnvVars, null, 2)};
`

// كتابة الملف في المجلد العام
const outputPath = path.resolve(process.cwd(), "public", "env.js")
fs.writeFileSync(outputPath, clientEnvContent)
console.log("تم إنشاء ملف env.js بنجاح في المجلد public")

// إنشاء ملف config.json للاستخدام في وقت البناء
const configJsonContent = {
  apiBaseUrl: safeClientEnvVars.NEXT_PUBLIC_API_URL,
  stackProjectId: safeClientEnvVars.NEON_NEXT_PUBLIC_STACK_PROJECT_ID,
  stackKey: safeClientEnvVars.NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  theme: safeClientEnvVars.DEFAULT_THEME,
  language: safeClientEnvVars.DEFAULT_LANGUAGE,
}

// كتابة ملف config.json في المجلد العام
const configJsonPath = path.resolve(process.cwd(), "public", "config.json")
fs.writeFileSync(configJsonPath, JSON.stringify(configJsonContent, null, 2))
console.log("تم إنشاء ملف config.json بنجاح في المجلد public")
