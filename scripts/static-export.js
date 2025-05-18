// هذا السكريبت يقوم بتنفيذ عملية التصدير الثابت للموقع
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// تنفيذ سكريبت معالجة المتغيرات البيئية
console.log("جاري معالجة المتغيرات البيئية...")
try {
  require("./process-env.js")
} catch (error) {
  console.error("خطأ في معالجة المتغيرات البيئية:", error)
  process.exit(1)
}

// بناء الموقع الثابت
console.log("جاري بناء الموقع الثابت...")
try {
  execSync("next build", { stdio: "inherit" })
} catch (error) {
  console.error("خطأ في بناء الموقع:", error)
  process.exit(1)
}

// إنشاء ملف .nojekyll لتعطيل معالجة Jekyll في GitHub Pages
console.log("جاري إنشاء ملف .nojekyll...")
fs.writeFileSync(path.resolve(process.cwd(), "out", ".nojekyll"), "")

// نسخ ملف CNAME إذا كان موجودًا
const cnamePath = path.resolve(process.cwd(), "CNAME")
if (fs.existsSync(cnamePath)) {
  console.log("جاري نسخ ملف CNAME...")
  fs.copyFileSync(cnamePath, path.resolve(process.cwd(), "out", "CNAME"))
}

console.log("تم بناء الموقع الثابت بنجاح!")
console.log("المخرجات موجودة في مجلد 'out'")
