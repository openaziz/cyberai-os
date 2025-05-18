import { NextResponse, type NextRequest } from "next/server"
import { generateAIResponse } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { modelId, prompt, systemPrompt, apiKey } = await request.json()

    if (!modelId || !prompt || !apiKey) {
      return NextResponse.json({ error: "معرف النموذج والسؤال ومفتاح API مطلوبة" }, { status: 400 })
    }

    const response = await generateAIResponse(modelId, prompt, apiKey, systemPrompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in AI generate API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ أثناء توليد الاستجابة" },
      { status: 500 },
    )
  }
}
