// تكامل مع XAI (Grok)

export const getXAI = () => {
  const apiKey = process.env.XAI_API_KEY

  if (!apiKey) {
    throw new Error("مفتاح API لـ XAI غير موجود")
  }

  return {
    apiKey,
    baseUrl: "https://api.xai.com/v1",
  }
}

export const xaiModels = {
  "grok-1": "grok-1",
  "grok-1-mini": "grok-1-mini",
}

export async function callXAI(messages: any[], model = "grok-1") {
  const { apiKey, baseUrl } = getXAI()

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
    throw new Error(`خطأ في استدعاء XAI: ${response.status}`)
  }

  return await response.json()
}
