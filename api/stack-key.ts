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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // التحقق من وجود مفتاح Stack
    if (!process.env.NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY) {
      return res.status(500).json({ error: "Stack key is not configured" })
    }

    // إرجاع مفتاح Stack العام
    res.status(200).json({
      key: process.env.NEON_NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
      projectId: process.env.NEON_NEXT_PUBLIC_STACK_PROJECT_ID || "",
    })
  } catch (error: any) {
    console.error("Error getting Stack key:", error)
    res.status(500).json({ error: error.message || "Error getting Stack key" })
  }
}
