import { type NextRequest, NextResponse } from "next/server"
import {
  callGroqModel,
  callOpenRouterModel,
  callTogetherModel,
  callSearch1ApiModel,
  type ModelOptions,
} from "@/services/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { prompt, modelId, options = {} } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!modelId) {
      return NextResponse.json({ error: "Model ID is required" }, { status: 400 })
    }

    let response
    const modelOptions: ModelOptions = {
      model: modelId,
      ...options,
    }

    // تحديد مزود النموذج بناءً على معرف النموذج
    if (modelId.startsWith("llama3-") || modelId.startsWith("mixtral-")) {
      // استخدام Groq API
      response = await callGroqModel(prompt, modelOptions)
    } else if (modelId === "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free") {
      // استخدام Together API
      response = await callTogetherModel(prompt, modelOptions)
    } else if (modelId === "deepseek-r1-70b-online") {
      // استخدام Search1API (بدون مفتاح API)
      response = await callSearch1ApiModel(prompt, modelOptions)
    } else {
      // استخدام OpenRouter API كخيار افتراضي
      response = await callOpenRouterModel(prompt, modelOptions)
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
