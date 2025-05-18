import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // الحصول على آخر 10 معرفات تعليق
    const ids = await kv.lrange("recent_feedback", 0, 9)

    // الحصول على بيانات التعليقات
    const feedback = await Promise.all(
      ids.map(async (id) => {
        const data = await kv.hgetall(`feedback:${id}`)
        return { id, ...data }
      }),
    )

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error fetching recent feedback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
