import { kv } from "@vercel/kv"
import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  try {
    const feedback = await request.json()

    if (!feedback.name || !feedback.feedback) {
      return NextResponse.json({ error: "Name and feedback are required" }, { status: 400 })
    }

    const id = nanoid()
    await kv.hset(`feedback:${id}`, feedback)

    // إضافة المعرف إلى قائمة التعليقات الحديثة
    await kv.lpush("recent_feedback", id)
    // الاحتفاظ فقط بآخر 100 تعليق
    await kv.ltrim("recent_feedback", 0, 99)

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("Error storing feedback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
