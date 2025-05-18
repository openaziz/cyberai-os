import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // إعداد CORS للسماح بالطلبات من موقع GitHub Pages
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "https://openaziz.github.io")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )

  // التعامل مع طلبات OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  // التحقق من طريقة الطلب
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { prompt, model, systemPrompt, temperature, maxTokens, stream } = req.body

    // التحقق من وجود المفتاح
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OpenRouter API key is not configured" })
    }

    // إعداد الطلب إلى OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://openaziz.github.io/cyberai-os",
        "X-Title": "CyberAI OS",
      },
      body: JSON.stringify({
        model: model || "openai/gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt || "أنت مساعد ذكي ومفيد.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 1024,
        stream: stream || false,
      }),
    })

    // إذا كان الاستجابة مجرى (stream)
    if (stream) {
      // تمرير الاستجابة كمجرى
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      })

      // قراءة المجرى وإرساله للعميل
      const reader = response.body?.getReader()
      if (!reader) {
        return res.status(500).json({ error: "Failed to read stream response" })
      }

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        res.write(chunk)
      }

      res.end()
    } else {
      // إرجاع الاستجابة كاملة
      const data = await response.json()
      res.status(200).json(data)
    }
  } catch (error: any) {
    console.error("Error calling OpenRouter API:", error)
    res.status(500).json({ error: error.message || "Error calling OpenRouter API" })
  }
}
