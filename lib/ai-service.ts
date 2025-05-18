// خدمة الذكاء الاصطناعي
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { groq } from "@ai-sdk/groq"
import { anthropic } from "@ai-sdk/anthropic"

// نوع بيانات مزود الذكاء الاصطناعي
export type AIProvider = "openai" | "groq" | "anthropic" | "other"

// نوع بيانات نموذج الذكاء الاصطناعي
export interface AIModel {
  id: string
  name: string
  provider: AIProvider
  contextLength: number
  description: string
}

// قائمة النماذج المدعومة
export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    contextLength: 128000,
    description: "أحدث نموذج من OpenAI مع قدرات متقدمة في فهم النصوص والصور",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    contextLength: 128000,
    description: "نموذج قوي من OpenAI مع سياق طويل وأداء سريع",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    contextLength: 16000,
    description: "نموذج سريع وفعال من حيث التكلفة من OpenAI",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    contextLength: 200000,
    description: "أقوى نموذج من Anthropic مع قدرات متقدمة في التفكير المنطقي",
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    contextLength: 180000,
    description: "نموذج متوازن من Anthropic بين الأداء والتكلفة",
  },
  {
    id: "llama3-70b-8192",
    name: "Llama 3 70B",
    provider: "groq",
    contextLength: 8192,
    description: "نموذج Llama 3 من Meta مع أداء سريع عبر Groq",
  },
  {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    provider: "groq",
    contextLength: 32768,
    description: "نموذج Mixtral مفتوح المصدر مع أداء سريع عبر Groq",
  },
]

// الحصول على نموذج بواسطة المعرف
export function getModelById(modelId: string): AIModel | undefined {
  return AI_MODELS.find((model) => model.id === modelId)
}

// الحصول على نماذج مزود معين
export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return AI_MODELS.filter((model) => model.provider === provider)
}

// توليد نص باستخدام نموذج معين
export async function generateAIResponse(
  modelId: string,
  prompt: string,
  apiKey: string,
  systemPrompt?: string,
): Promise<string> {
  try {
    const model = getModelById(modelId)
    if (!model) {
      throw new Error(`النموذج غير مدعوم: ${modelId}`)
    }

    let result

    switch (model.provider) {
      case "openai":
        result = await generateText({
          model: openai(modelId, { apiKey }),
          prompt,
          system: systemPrompt,
        })
        break

      case "groq":
        result = await generateText({
          model: groq(modelId, { apiKey }),
          prompt,
          system: systemPrompt,
        })
        break

      case "anthropic":
        result = await generateText({
          model: anthropic(modelId, { apiKey }),
          prompt,
          system: systemPrompt,
        })
        break

      default:
        throw new Error(`مزود الخدمة غير مدعوم: ${model.provider}`)
    }

    return result.text
  } catch (error) {
    console.error("Error generating AI response:", error)
    throw error
  }
}

// توليد كود باستخدام نموذج معين
export async function generateCode(modelId: string, prompt: string, language: string, apiKey: string): Promise<string> {
  const systemPrompt = `أنت مبرمج محترف. قم بإنشاء كود ${language} استنادًا إلى الطلب. قدم الكود فقط بدون شرح أو تعليقات إضافية.`

  try {
    return await generateAIResponse(modelId, prompt, apiKey, systemPrompt)
  } catch (error) {
    console.error("Error generating code:", error)
    throw error
  }
}

// تحسين كود باستخدام نموذج معين
export async function improveCode(
  modelId: string,
  code: string,
  language: string,
  instructions: string,
  apiKey: string,
): Promise<string> {
  const systemPrompt = `أنت مبرمج محترف. قم بتحسين الكود التالي بلغة ${language} وفقًا للتعليمات المقدمة. قدم الكود المحسن فقط بدون شرح أو تعليقات إضافية.`

  const prompt = `الكود الأصلي:
\`\`\`${language}
${code}
\`\`\`

تعليمات التحسين:
${instructions}

قم بتقديم الكود المحسن فقط.`

  try {
    return await generateAIResponse(modelId, prompt, apiKey, systemPrompt)
  } catch (error) {
    console.error("Error improving code:", error)
    throw error
  }
}

// تحليل كود باستخدام نموذج معين
export async function analyzeCode(modelId: string, code: string, language: string, apiKey: string): Promise<string> {
  const systemPrompt = `أنت مبرمج محترف ومحلل كود. قم بتحليل الكود التالي بلغة ${language} وتقديم ملاحظات حول جودة الكود والأخطاء المحتملة وفرص التحسين.`

  const prompt = `قم بتحليل الكود التالي:
\`\`\`${language}
${code}
\`\`\``

  try {
    return await generateAIResponse(modelId, prompt, apiKey, systemPrompt)
  } catch (error) {
    console.error("Error analyzing code:", error)
    throw error
  }
}
