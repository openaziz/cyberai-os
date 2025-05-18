import { NextResponse, type NextRequest } from "next/server"
import { improveCode } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { modelId, code, language, instructions, apiKey } = await request.json()

    if (!modelId || !code || !language || !instructions || !apiKey) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const improvedCode = await improveCode(modelId, code, language, instructions, apiKey)

    return NextResponse.json({ code: improvedCode })
  } catch (error) {
    console.error("Error in AI code improve API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ أثناء تحسين الكود" },
      { status: 500 },
    )
  }
}
