import { type NextRequest, NextResponse } from "next/server"
import { checkLocalModelExists } from "@/lib/local-models"
import { groqModels } from "@/lib/groq-ai"
import { openRouterModels } from "@/lib/openrouter"
import { xaiModels } from "@/lib/xai"

export async function GET(request: NextRequest) {
  try {
    // قائمة النماذج المتاحة
    const availableModels = []

    // إضافة نماذج Groq إذا كان مفتاح API متاحاً
    if (process.env.GROQ_API_KEY) {
      Object.entries(groqModels).forEach(([key, value]) => {
        availableModels.push({
          id: `groq-${key}`,
          name: `${key.charAt(0).toUpperCase() + key.slice(1)} (Groq)`,
          description: `نموذج ${key} بسرعة فائقة من Groq`,
          type: "cloud",
          provider: "groq",
          icon: "GQ",
          color: "#8e44ad",
          apiId: value,
          multimodal: false,
        })
      })
    }

    // إضافة نماذج Together إذا كان مفتاح API متاحاً
    if (process.env.TOGETHER_API_KEY) {
      availableModels.push(
        {
          id: "deepseek",
          name: "DeepSeek-R1",
          description: "نموذج متقدم للمهام المعقدة",
          type: "cloud",
          provider: "together",
          icon: "DS",
          color: "#2196f3",
          apiId: "deepseek-ai/DeepSeek-R1",
          multimodal: false,
        },
        {
          id: "llama4",
          name: "Llama-4-Maverick-17B",
          description: "نموذج متعدد الوسائط من Meta",
          type: "cloud",
          provider: "together",
          icon: "LL",
          color: "#4caf50",
          apiId: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
          multimodal: true,
        },
        {
          id: "gemma3",
          name: "Gemma-3-27B",
          description: "نموذج متعدد الوسائط من Google",
          type: "cloud",
          provider: "together",
          icon: "GM",
          color: "#ff9800",
          apiId: "google/gemma-3-27b-it",
          multimodal: true,
        },
      )
    }

    // إضافة نماذج OpenRouter إذا كان مفتاح API متاحاً
    if (process.env.OPENROUTER_API_KEY) {
      Object.entries(openRouterModels).forEach(([key, value]) => {
        availableModels.push({
          id: `openrouter-${key}`,
          name: `${key.charAt(0).toUpperCase() + key.slice(1)} (OpenRouter)`,
          description: `نموذج ${key} من OpenRouter`,
          type: "cloud",
          provider: "openrouter",
          icon: "OR",
          color: "#e91e63",
          apiId: value,
          multimodal: key.includes("claude") || key.includes("llama3"),
        })
      })
    }

    // إضافة نماذج XAI إذا كان مفتاح API متاحاً
    if (process.env.XAI_API_KEY) {
      Object.entries(xaiModels).forEach(([key, value]) => {
        availableModels.push({
          id: `xai-${key}`,
          name: `${key.charAt(0).toUpperCase() + key.slice(1)} (XAI)`,
          description: `نموذج ${key} من XAI`,
          type: "cloud",
          provider: "xai",
          icon: "XA",
          color: "#009688",
          apiId: value,
          multimodal: false,
        })
      })
    }

    // التحقق من وجود النماذج المحلية
    const llama3_8b_gguf = process.env.LLAMA3_8B_GGUF_PATH || ""
    const llama3_8b_hf = process.env.LLAMA3_8B_PATH || ""

    const localModels = [
      {
        id: "llama3-8b",
        name: "Llama 3 (8B) - GGUF",
        description: "نموذج Llama 3 المحلي بحجم 8 مليار معلمة (صيغة GGUF)",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_gguf,
        available: checkLocalModelExists(llama3_8b_gguf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      },
      {
        id: "llama3-8b-hf",
        name: "Llama 3 (8B) - Finetuned",
        description: "نموذج Llama 3 المدرب محلياً بحجم 8 مليار معلمة",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_hf,
        available: checkLocalModelExists(llama3_8b_hf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      },
    ]

    // إضافة النماذج المحلية المتوفرة فقط
    const availableLocalModels = localModels.filter((model) => model.available)
    const allModels = [...availableLocalModels, ...availableModels]

    return NextResponse.json(
      { models: allModels },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error: any) {
    console.error("خطأ في استرجاع النماذج:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء استرجاع النماذج" }, { status: 500 })
  }
}
