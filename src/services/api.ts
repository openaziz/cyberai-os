import { ENV } from "../config/env"

// الإعدادات الافتراضية لطلبات API
const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
}

/**
 * دالة مساعدة لإجراء طلبات API
 */
export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${ENV.NEXT_PUBLIC_API_URL}${endpoint}`

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `خطأ في الاتصال بالخادم: ${response.status}`)
  }

  // التحقق من نوع الاستجابة
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }

  // إرجاع النص كما هو إذا لم تكن الاستجابة JSON
  const text = await response.text()
  try {
    return JSON.parse(text) as T
  } catch {
    return text as unknown as T
  }
}

/**
 * دالة للتعامل مع نماذج DeepSeek من search1api
 */
export async function callDeepSeekModel(prompt: string, options: any = {}) {
  try {
    const response = await fetch("https://api.search1api.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: options.model || "deepseek-r1-70b-online",
        messages: [
          {
            role: "system",
            content: options.systemPrompt || "أنت مساعد ذكي ومفيد.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024,
        stream: options.stream || false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `خطأ في الاتصال بـ DeepSeek API: ${response.status}`)
    }

    // إذا كان الاستجابة مجرى (stream)
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk)
    }

    return response.json()
  } catch (error) {
    console.error("Error calling DeepSeek model:", error)
    throw error
  }
}

/**
 * دالة للتعامل مع نماذج OpenRouter
 */
export async function callOpenRouterModel(prompt: string, options: any = {}) {
  if (!ENV.OPENROUTER_API_KEY) {
    throw new Error("مفتاح API لـ OpenRouter غير متوفر")
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.OPENROUTER_API_KEY}`,
        "HTTP-Referer": ENV.NEXT_PUBLIC_APP_URL || "https://cyberai-os.vercel.app",
        "X-Title": "CyberAI OS",
      },
      body: JSON.stringify({
        model: options.model || "openai/gpt-4o",
        messages: [
          {
            role: "system",
            content: options.systemPrompt || "أنت مساعد ذكي ومفيد.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024,
        stream: options.stream || false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `خطأ في الاتصال بـ OpenRouter: ${response.status}`)
    }

    // إذا كان الاستجابة مجرى (stream)
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk)
    }

    return response.json()
  } catch (error) {
    console.error("Error calling OpenRouter model:", error)
    throw error
  }
}

/**
 * دالة للتعامل مع نماذج Together.xyz
 */
export async function callTogetherModel(prompt: string, options: any = {}) {
  if (!ENV.TOGETHER_API_KEY) {
    throw new Error("مفتاح API لـ Together.xyz غير متوفر")
  }

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: options.model || "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
        messages: [
          {
            role: "system",
            content: options.systemPrompt || "أنت مساعد ذكي ومفيد.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024,
        stream: options.stream || false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `خطأ في الاتصال بـ Together.xyz: ${response.status}`)
    }

    // إذا كان الاستجابة مجرى (stream)
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk)
    }

    return response.json()
  } catch (error) {
    console.error("Error calling Together model:", error)
    throw error
  }
}

/**
 * دالة مساعدة للتعامل مع الاستجابات المجرى (stream)
 */
async function handleStreamResponse(response: Response, onChunk?: (chunk: any) => void) {
  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error("لا يمكن قراءة استجابة المجرى")
  }

  const decoder = new TextDecoder()
  let buffer = ""
  const result = { choices: [{ message: { content: "" } }] }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      // فك تشفير البيانات المستلمة
      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      // معالجة كل سطر في المجرى
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (line.trim() === "") continue
        if (line.trim() === "data: [DONE]") continue

        try {
          // استخراج البيانات من السطر
          const dataMatch = line.match(/^data: (.*)$/i)
          if (!dataMatch) continue

          const data = JSON.parse(dataMatch[1])

          // استخراج محتوى الرسالة
          const content = data.choices?.[0]?.delta?.content || data.choices?.[0]?.message?.content || ""

          if (content) {
            // تحديث النتيجة النهائية
            result.choices[0].message.content += content

            // استدعاء دالة معالجة الجزء إذا كانت موجودة
            if (onChunk) {
              onChunk({ content })
            }
          }
        } catch (e) {
          console.warn("Error parsing stream chunk:", e)
        }
      }
    }
  } finally {
    reader.releaseLock()
  }

  return result
}

/**
 * دالة للتعامل مع قاعدة بيانات Neon
 */
export async function connectToNeonDB() {
  if (!ENV.NEON_DATABASE_URL) {
    throw new Error("معلومات الاتصال بقاعدة بيانات Neon غير متوفرة")
  }

  // هنا يمكن استخدام مكتبة مثل pg أو prisma للاتصال بقاعدة البيانات
  console.log("جاري الاتصال بقاعدة بيانات Neon...")

  // مثال على استخدام fetch للاتصال بـ API يتعامل مع قاعدة البيانات
  return fetchAPI("/api/db/connect", {
    method: "POST",
    body: JSON.stringify({
      connectionString: ENV.NEON_DATABASE_URL,
    }),
  })
}

/**
 * دالة للتعامل مع Redis
 */
export async function connectToRedis() {
  if (!ENV.KV_URL && !ENV.REDIS_URL) {
    throw new Error("معلومات الاتصال بـ Redis غير متوفرة")
  }

  // هنا يمكن استخدام مكتبة مثل ioredis للاتصال بـ Redis
  console.log("جاري الاتصال بـ Redis...")

  // مثال على استخدام fetch للاتصال بـ API يتعامل مع Redis
  return fetchAPI("/api/redis/connect", {
    method: "POST",
    body: JSON.stringify({
      url: ENV.KV_URL || ENV.REDIS_URL,
    }),
  })
}
