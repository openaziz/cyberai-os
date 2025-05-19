// تكامل مع OpenRouter API

export const getOpenRouter = () => {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error("مفتاح API لـ OpenRouter غير موجود")
  }

  return {
    apiKey,
    baseUrl: "https://openrouter.ai/api/v1",
  }
}

export const openRouterModels = {
  "llama3-70b": "meta-llama/llama-3-70b-instruct",
  "claude-3-opus": "anthropic/claude-3-opus",
  "claude-3-sonnet": "anthropic/claude-3-sonnet",
  "mixtral-8x7b": "mistralai/mixtral-8x7b-instruct",
  "gemma-7b": "google/gemma-7b-it",
}

export async function callOpenRouter(messages: any[], model: string) {
  const { apiKey, baseUrl } = getOpenRouter()

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    throw new Error(`خطأ في استدعاء OpenRouter: ${response.status}`)
  }

  return await response.json()
}
