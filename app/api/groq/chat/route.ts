import { type NextRequest, NextResponse } from "next/server"
import { getGroqAI, groqModels } from "@/lib/groq-ai"

export async function POST(request: NextRequest) {
  try {
    const { messages, model } = await request.json()

    // التحقق من البيانات المدخلة
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new NextResponse(JSON.stringify({ error: "يجب توفير رسائل صالحة" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // تحديد النموذج المناسب
    const modelId = groqModels[model as keyof typeof groqModels] || groqModels.llama3

    const groq = getGroqAI()

    // استدعاء النموذج
    const response = await groq.chat.completions.create({
      messages,
      model: modelId,
      temperature: 0.7,
      max_tokens: 1000,
    })

    // التحقق من وجود البيانات في الاستجابة قبل إرجاعها
    if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error("استجابة غير صالحة من واجهة برمجة التطبيقات")
    }

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("خطأ في واجهة برمجة التطبيقات للدردشة مع Groq:", error)
    return new NextResponse(JSON.stringify({ error: error.message || "حدث خطأ أثناء معالجة الطلب" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
