import { type NextRequest, NextResponse } from "next/server"
import { getGroqAI } from "@/lib/groq-ai"
import Together from "together-ai"

// قائمة النماذج المدعومة من Together
const TOGETHER_MODELS = {
  deepseek: "deepseek-ai/DeepSeek-R1",
  llama4: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "deepseek-v3": "deepseek-ai/DeepSeek-V3",
  gemma3: "google/gemma-3-27b-it",
  coder: "arcee-ai/coder-large",
  perplexity: "perplexity-ai/r1-1776",
  qwen: "Qwen/Qwen2.5-VL-72B-Instruct",
  "llama-guard": "meta-llama/Llama-Guard-4-12B",
}

// قائمة النماذج المدعومة من Groq
const GROQ_MODELS = {
  "groq-llama3": "llama3-70b-8192",
  "groq-mixtral": "mixtral-8x7b-32768",
  "groq-gemma": "gemma-7b-it",
}

// قائمة النماذج المدعومة من OpenRouter
const OPENROUTER_MODELS = {
  "openrouter-llama3": "meta-llama/llama-3-70b-instruct",
  "openrouter-claude": "anthropic/claude-3-opus",
  "openrouter-mixtral": "mistralai/mixtral-8x7b-instruct",
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model, image_url } = await request.json()

    // التحقق من البيانات المدخلة
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "يجب توفير رسائل صالحة" }, { status: 400 })
    }

    // تحديد المزود والنموذج المناسب
    let provider = "groq" // استخدام Groq كمزود افتراضي لأنه متاح
    let modelId = GROQ_MODELS["groq-llama3"] // استخدام llama3 كنموذج افتراضي

    if (model in TOGETHER_MODELS && process.env.TOGETHER_API_KEY) {
      provider = "together"
      modelId = TOGETHER_MODELS[model as keyof typeof TOGETHER_MODELS]
    } else if (model in GROQ_MODELS && process.env.GROQ_API_KEY) {
      provider = "groq"
      modelId = GROQ_MODELS[model as keyof typeof GROQ_MODELS]
    } else if (model in OPENROUTER_MODELS && process.env.OPENROUTER_API_KEY) {
      provider = "openrouter"
      modelId = OPENROUTER_MODELS[model as keyof typeof OPENROUTER_MODELS]
    }

    // إعداد الرسائل
    let formattedMessages = messages

    // إذا كان هناك صورة وكان النموذج يدعم الصور
    if (image_url && provider === "together" && (model === "gemma3" || model === "llama4" || model === "qwen")) {
      // تنسيق الرسالة الأخيرة لتتضمن الصورة
      const lastMessage = messages[messages.length - 1]
      formattedMessages = [
        ...messages.slice(0, -1),
        {
          role: lastMessage.role,
          content: [
            {
              type: "image_url",
              image_url: { url: image_url },
            },
            {
              type: "text",
              text: lastMessage.content,
            },
          ],
        },
      ]
    }

    let response

    // استدعاء النموذج المناسب حسب المزود
    try {
      switch (provider) {
        case "together":
          if (!process.env.TOGETHER_API_KEY) {
            throw new Error("مفتاح API لـ Together غير متوفر")
          }

          const together = new Together({
            apiKey: process.env.TOGETHER_API_KEY,
          })

          response = await together.chat.completions.create({
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        case "groq":
          if (!process.env.GROQ_API_KEY) {
            throw new Error("مفتاح API لـ Groq غير متوفر")
          }
          const groq = getGroqAI()
          response = await groq.chat.completions.create({
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        case "openrouter":
          if (!process.env.OPENROUTER_API_KEY) {
            throw new Error("مفتاح API لـ OpenRouter غير متوفر")
          }

          const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
              model: modelId,
              messages: formattedMessages,
              temperature: 0.7,
              max_tokens: 1000,
            }),
          })

          if (!openRouterResponse.ok) {
            throw new Error(`خطأ في استدعاء OpenRouter: ${openRouterResponse.status}`)
          }

          response = await openRouterResponse.json()
          break

        default:
          throw new Error("مزود غير مدعوم")
      }
    } catch (apiError: any) {
      console.error(`خطأ في استدعاء API ${provider}:`, apiError)

      // محاولة استخدام مزود بديل
      if (provider !== "groq" && process.env.GROQ_API_KEY) {
        try {
          console.log("محاولة استخدام Groq كبديل")
          const groqFallback = getGroqAI()
          response = await groqFallback.chat.completions.create({
            messages: formattedMessages,
            model: GROQ_MODELS["groq-llama3"],
            temperature: 0.7,
            max_tokens: 1000,
          })
        } catch (fallbackError: any) {
          console.error("فشل أيضاً في استخدام Groq كبديل:", fallbackError)
          return NextResponse.json(
            {
              error: `فشل في استخدام ${provider} وGroq: ${apiError.message}`,
              details: apiError.toString(),
            },
            { status: 500 },
          )
        }
      } else {
        // إذا كان المزود هو Groq بالفعل أو لم يكن متاحاً، نعود بخطأ
        return NextResponse.json(
          {
            error: `خطأ في استدعاء ${provider}: ${apiError.message}`,
            details: apiError.toString(),
          },
          { status: 500 },
        )
      }
    }

    // التحقق من وجود البيانات في الاستجابة قبل إرجاعها
    if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error("استجابة غير صالحة من واجهة برمجة التطبيقات")
    }

    return NextResponse.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    console.error("خطأ في واجهة برمجة التطبيقات للدردشة:", error)

    // إنشاء استجابة محاكاة في حالة الخطأ
    const mockResponse = {
      id: "error-response-" + Date.now(),
      object: "chat.completion",
      created: Date.now(),
      model: "error-fallback",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: `عذراً، حدثت مشكلة في الاتصال بالخادم: ${error.message}. يرجى التحقق من اتصالك بالإنترنت ومحاولة إعادة تحميل الصفحة.`,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
    }

    return NextResponse.json(mockResponse, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
