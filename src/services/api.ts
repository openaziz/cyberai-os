// نسخة من الدوال في services/api.ts
import { ENV } from "../config/env"

/**
 * دالة للتعامل مع نماذج DeepSeek
 */
export async function callDeepSeekModel(prompt: string, options: any = {}) {
  try {
    const apiUrl = "https://api.search1api.com/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
    }

    const body = {
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
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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
 * دالة للتعامل مع نماذج Together.xyz
 */
export async function callTogetherModel(prompt: string, options: any = {}) {
  try {
    const apiUrl = "https://api.together.xyz/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY || ""}`,
    }

    const body = {
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
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `خطأ في الاتصال بـ Together API: ${response.status}`)
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
 * دالة للتعامل مع نماذج OpenRouter
 */
export async function callOpenRouterModel(prompt: string, options: any = {}) {
  try {
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || ""}`,
      "HTTP-Referer": ENV.NEXT_PUBLIC_APP_URL || "https://cyberai-os.vercel.app",
      "X-Title": "CyberAI OS",
    }

    const body = {
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
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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
