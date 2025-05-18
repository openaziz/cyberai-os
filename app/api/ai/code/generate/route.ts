import { NextResponse, type NextRequest } from "next/server"
import { generateCode } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { modelId, prompt, language, apiKey } = await request.json()

    if (!modelId || !prompt || !language || !apiKey) {
      return NextResponse.json({ error: "معرف النموذج والسؤال واللغة ومفتاح API مطلوبة" }, { status: 400 })
    }

    const code = await generateCode(modelId, prompt, language, apiKey)

    return NextResponse.json({ code })
  } catch (error) {
    console.error("Error in AI code generate API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ أثناء توليد الكود" },
      { status: 500 },
    )
  }
}
