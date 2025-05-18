// هذا الملف يعمل على جانب الخادم فقط
import type { Request, Response } from "express"

export default function handler(req: Request, res: Response) {
  // التحقق من طريقة الطلب
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // الحصول على المفتاح من متغيرات البيئة على الخادم
    // لاحظ أن هذا المفتاح لم يعد يبدأ بـ NEXT_PUBLIC_ أو VITE_
    const publishableKey = process.env.STACK_PUBLISHABLE_CLIENT_KEY || ""

    // إرجاع المفتاح بشكل آمن
    return res.status(200).json({ key: publishableKey })
  } catch (error) {
    console.error("Error fetching publishable key:", error)
    return res.status(500).json({ error: "Failed to fetch publishable key" })
  }
}
