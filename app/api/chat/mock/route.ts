import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // التحقق من البيانات المدخلة
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "يجب توفير رسائل صالحة" }, { status: 400 })
    }

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // الحصول على آخر رسالة من المستخدم
    const lastUserMessage = messages[messages.length - 1].content

    // إنشاء رد بسيط
    const response = {
      id: "mock-response-" + Date.now(),
      object: "chat.completion",
      created: Date.now(),
      model: "mock-model",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: `هذه استجابة اختبار للرسالة: "${lastUserMessage}". \n\nنظراً لأن هذا وضع المحاكاة، فإن هذه الاستجابة مولدة محلياً وليست من نموذج ذكاء اصطناعي حقيقي.`,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: lastUserMessage.length,
        completion_tokens: 100,
        total_tokens: lastUserMessage.length + 100,
      },
    }

    return NextResponse.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    console.error("خطأ في واجهة برمجة التطبيقات للدردشة المحاكاة:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء معالجة الطلب" }, { status: 500 })
  }
}
