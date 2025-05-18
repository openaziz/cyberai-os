import { NextResponse } from "next/server"
import { getAvailableModels } from "@/services/ai-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const modelId = params.id
    const models = await getAvailableModels()
    const model = models.find((m) => m.id === modelId)

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    return NextResponse.json({ model }, { status: 200 })
  } catch (error) {
    console.error(`Error fetching model ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch model details" }, { status: 500 })
  }
}
