import { type NextRequest, NextResponse } from "next/server"
import { getConversation, saveConversation } from "@/lib/upstash"

// الحصول على محادثة محددة
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = request.nextUrl.searchParams.get("userId") || "anonymous"
    const conversationId = params.id

    const conversation = await getConversation(userId, conversationId)

    if (!conversation) {
      return new NextResponse(JSON.stringify({ error: "المحادثة غير موجودة" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new NextResponse(JSON.stringify({ conversation }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("خطأ في استرجاع المحادثة:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء استرجاع المحادثة" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// تحديث محادثة محددة
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId = "anonymous", data } = await request.json()
    const conversationId = params.id

    if (!data) {
      return new NextResponse(JSON.stringify({ error: "يجب توفير بيانات المحادثة" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await saveConversation(userId, conversationId, data)

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("خطأ في تحديث المحادثة:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء تحديث المحادثة" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
