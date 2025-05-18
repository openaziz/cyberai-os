// هذا الملف يعمل فقط على جانب الخادم
import "server-only"

// الحصول على المفتاح الحساس من متغيرات البيئة على الخادم
export async function getStackPublishableKey() {
  // لاحظ أن هذا المفتاح لم يعد يبدأ بـ NEXT_PUBLIC_ أو VITE_
  const key = process.env.STACK_PUBLISHABLE_CLIENT_KEY || ""

  if (!key) {
    console.warn("Stack publishable client key is not set")
  }

  return key
}
