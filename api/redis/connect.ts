import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // إعداد CORS للسماح بالطلبات من موقع GitHub Pages
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "https://openaziz.github.io")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )

  // التعامل مع طلبات OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  // التحقق من طريقة الطلب
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // التحقق من وجود معلومات الاتصال
    if (!process.env.KV_URL && !process.env.REDIS_URL) {
      return res.status(500).json({ error: "Redis connection info is not configured" })
    }

    // هنا يمكن إضافة منطق الاتصال بـ Redis
    // في هذه المرحلة، نعيد استجابة نجاح فقط لاختبار الاتصال

    // إرجاع استجابة نجاح
    res.status(200).json({ success: true, message: "تم الاتصال بـ Redis بنجاح" })
  } catch (error: any) {
    console.error("Error connecting to Redis:", error)
    res.status(500).json({ error: error.message || "Error connecting to Redis" })
  }
}
