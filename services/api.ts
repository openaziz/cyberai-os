// دوال API للاتصال بنماذج الذكاء الاصطناعي

/**
 * استدعاء نموذج DeepSeek
 */
export async function callDeepSeekModel(
  prompt: string,
  options: {
    model: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
    stream?: boolean
    onChunk?: (chunk: any) => void
  },
) {
  const { model, systemPrompt = "", temperature = 0.7, maxTokens = 1024, stream = false, onChunk } = options

  const messages = [
    ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
    { role: "user", content: prompt },
  ]

  try {
    if (stream && onChunk) {
      // استدعاء API مع دعم المجرى
      const response = await fetch("https://api.search1api.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Cannot read response body")

      let partialLine = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = (partialLine + chunk).split("\n")
        partialLine = lines.pop() || ""

        for (const line of lines) {
          if (line.trim() === "") continue
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue
            try {
              const parsedData = JSON.parse(data)
              if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
                onChunk({ content: parsedData.choices[0].delta.content })
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e)
            }
          }
        }
      }

      return { choices: [{ message: { content: "Stream completed" } }] }
    } else {
      // استدعاء API بدون مجرى
      const response = await fetch("https://api.search1api.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    }
  } catch (error) {
    console.error("Error calling DeepSeek model:", error)
    throw error
  }
}

/**
 * استدعاء نموذج Together.ai
 */
export async function callTogetherModel(
  prompt: string,
  options: {
    model: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
    stream?: boolean
    onChunk?: (chunk: any) => void
  },
) {
  const { model, systemPrompt = "", temperature = 0.7, maxTokens = 1024, stream = false, onChunk } = options
  const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY

  if (!TOGETHER_API_KEY) {
    throw new Error("TOGETHER_API_KEY is not defined")
  }

  const messages = [
    ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
    { role: "user", content: prompt },
  ]

  try {
    if (stream && onChunk) {
      // استدعاء API مع دعم المجرى
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Cannot read response body")

      let partialLine = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = (partialLine + chunk).split("\n")
        partialLine = lines.pop() || ""

        for (const line of lines) {
          if (line.trim() === "") continue
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue
            try {
              const parsedData = JSON.parse(data)
              if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
                onChunk({ content: parsedData.choices[0].delta.content })
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e)
            }
          }
        }
      }

      return { choices: [{ message: { content: "Stream completed" } }] }
    } else {
      // استدعاء API بدون مجرى
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    }
  } catch (error) {
    console.error("Error calling Together model:", error)
    throw error
  }
}

/**
 * استدعاء نموذج OpenRouter
 */
export async function callOpenRouterModel(
  prompt: string,
  options: {
    model: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
    stream?: boolean
    onChunk?: (chunk: any) => void
  },
) {
  const { model, systemPrompt = "", temperature = 0.7, maxTokens = 1024, stream = false, onChunk } = options
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not defined")
  }

  const messages = [
    ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
    { role: "user", content: prompt },
  ]

  try {
    if (stream && onChunk) {
      // استدعاء API مع دعم المجرى
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://cyberai-os.vercel.app",
          "X-Title": "CyberAI OS",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Cannot read response body")

      let partialLine = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = (partialLine + chunk).split("\n")
        partialLine = lines.pop() || ""

        for (const line of lines) {
          if (line.trim() === "") continue
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue
            try {
              const parsedData = JSON.parse(data)
              if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
                onChunk({ content: parsedData.choices[0].delta.content })
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e)
            }
          }
        }
      }

      return { choices: [{ message: { content: "Stream completed" } }] }
    } else {
      // استدعاء API بدون مجرى
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://cyberai-os.vercel.app",
          "X-Title": "CyberAI OS",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    }
  } catch (error) {
    console.error("Error calling OpenRouter model:", error)
    throw error
  }
}
