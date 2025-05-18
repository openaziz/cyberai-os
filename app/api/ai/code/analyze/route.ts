import { NextResponse, type NextRequest } from "next/server"
import { analyzeCode } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { modelId, code, language, apiKey } = await request.json()

    if (!modelId || !code || !language || !apiKey) {
      return NextResponse.json({ error: "معرف النموذج والكود واللغة ومفتاح API مطلوبة" }, { status: 400 })
    }

    const analysis = await analyzeCode(modelId, code, language, apiKey)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error in AI code analyze API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ أثناء تحليل الكود" },
      { status: 500 },
    )
  }
}
