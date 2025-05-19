import { type NextRequest, NextResponse } from "next/server"
import { getUserConversations, saveConversation, deleteConversation } from "@/lib/upstash"

// الحصول على محادثات المستخدم
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId") || "anonymous"

    const conversations = await getUserConversations(userId)

    return new NextResponse(JSON.stringify({ conversations }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("خطأ في استرجاع المحادثات:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء استرجاع المحادثات" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// حفظ محادثة جديدة أو تحديث محادثة موجودة
export async function POST(request: NextRequest) {
  try {
    const { userId = "anonymous", conversationId, data } = await request.json()

    if (!conversationId || !data) {
      return new NextResponse(JSON.stringify({ error: "يجب توفير معرف المحادثة والبيانات" }), {
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
    console.error("خطأ في حفظ المحادثة:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء حفظ المحادثة" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// حذف محادثة
export async function DELETE(request: NextRequest) {
  try {
    const { userId = "anonymous", conversationId } = await request.json()

    if (!conversationId) {
      return new NextResponse(JSON.stringify({ error: "يجب توفير معرف المحادثة" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await deleteConversation(userId, conversationId)

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("خطأ في حذف المحادثة:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء حذف المحادثة" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
