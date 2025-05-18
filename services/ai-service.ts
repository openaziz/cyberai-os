/**
 * AI Service - Handles interactions with various AI models
 */
import { ENV } from "../config/env"
import { getCache, setCache } from "../utils/redis"

// Types for AI service
export type ModelProvider = "groq" | "openrouter" | "together" | "search1api" | "local"

export interface ModelOptions {
  model?: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  onChunk?: (chunk: any) => void
  cacheKey?: string
  cacheTtl?: number // Time to live in seconds
}

export interface ModelResponse {
  content: string
  model: string
  provider: ModelProvider
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
  metadata?: any
}

/**
 * Call Groq API with the provided prompt
 */
export async function callGroqModel(prompt: string, options: ModelOptions = {}): Promise<ModelResponse> {
  try {
    // Check cache if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      const cachedResponse = await getCache<ModelResponse>(options.cacheKey)
      if (cachedResponse) return cachedResponse
    }

    const apiUrl = "https://api.groq.com/openai/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.GROQ_API_KEY}`,
    }

    const body = {
      model: options.model || "llama3-70b-8192",
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
      throw new Error(error || `Error calling Groq API: ${response.status}`)
    }

    // Handle streaming response
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk, "groq", options.model || "llama3-70b-8192")
    }

    const data = await response.json()
    const result: ModelResponse = {
      content: data.choices[0].message.content,
      model: options.model || "llama3-70b-8192",
      provider: "groq",
      usage: data.usage,
    }

    // Cache the result if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      await setCache(options.cacheKey, result, options.cacheTtl)
    }

    return result
  } catch (error) {
    console.error("Error calling Groq model:", error)
    throw error
  }
}

/**
 * Call OpenRouter API with the provided prompt
 */
export async function callOpenRouterModel(prompt: string, options: ModelOptions = {}): Promise<ModelResponse> {
  try {
    // Check cache if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      const cachedResponse = await getCache<ModelResponse>(options.cacheKey)
      if (cachedResponse) return cachedResponse
    }

    const apiUrl = "https://openrouter.ai/api/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.OPENROUTER_API_KEY}`,
      "HTTP-Referer": ENV.BASE_URL,
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
      throw new Error(error || `Error calling OpenRouter: ${response.status}`)
    }

    // Handle streaming response
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk, "openrouter", options.model || "openai/gpt-4o")
    }

    const data = await response.json()
    const result: ModelResponse = {
      content: data.choices[0].message.content,
      model: data.model || options.model || "openai/gpt-4o",
      provider: "openrouter",
      usage: data.usage,
    }

    // Cache the result if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      await setCache(options.cacheKey, result, options.cacheTtl)
    }

    return result
  } catch (error) {
    console.error("Error calling OpenRouter model:", error)
    throw error
  }
}

/**
 * Call Together.xyz API with the provided prompt
 */
export async function callTogetherModel(prompt: string, options: ModelOptions = {}): Promise<ModelResponse> {
  try {
    // Check cache if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      const cachedResponse = await getCache<ModelResponse>(options.cacheKey)
      if (cachedResponse) return cachedResponse
    }

    const apiUrl = "https://api.together.xyz/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.TOGETHER_API_KEY}`,
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
      throw new Error(error || `Error calling Together API: ${response.status}`)
    }

    // Handle streaming response
    if (options.stream) {
      return handleStreamResponse(
        response,
        options.onChunk,
        "together",
        options.model || "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      )
    }

    const data = await response.json()
    const result: ModelResponse = {
      content: data.choices[0].message.content,
      model: options.model || "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      provider: "together",
      usage: data.usage,
    }

    // Cache the result if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      await setCache(options.cacheKey, result, options.cacheTtl)
    }

    return result
  } catch (error) {
    console.error("Error calling Together model:", error)
    throw error
  }
}

/**
 * Call Search1API with the provided prompt (No API key required)
 */
export async function callSearch1ApiModel(prompt: string, options: ModelOptions = {}): Promise<ModelResponse> {
  try {
    // Check cache if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      const cachedResponse = await getCache<ModelResponse>(options.cacheKey)
      if (cachedResponse) return cachedResponse
    }

    const apiUrl = "https://api.search1api.com/v1/chat/completions" // No API key needed
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
      throw new Error(error || `Error calling Search1API: ${response.status}`)
    }

    // Handle streaming response
    if (options.stream) {
      return handleStreamResponse(response, options.onChunk, "search1api", options.model || "deepseek-r1-70b-online")
    }

    const data = await response.json()
    const result: ModelResponse = {
      content: data.choices[0].message.content,
      model: options.model || "deepseek-r1-70b-online",
      provider: "search1api",
      usage: data.usage,
    }

    // Cache the result if cacheKey is provided
    if (options.cacheKey && ENV.HAS_REDIS) {
      await setCache(options.cacheKey, result, options.cacheTtl)
    }

    return result
  } catch (error) {
    console.error("Error calling Search1API model:", error)
    throw error
  }
}

/**
 * Helper function to handle streaming responses
 */
async function handleStreamResponse(
  response: Response,
  onChunk?: (chunk: any) => void,
  provider: ModelProvider = "groq",
  modelName = "unknown",
): Promise<ModelResponse> {
  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error("Cannot read stream response")
  }

  const decoder = new TextDecoder()
  let buffer = ""
  const result: ModelResponse = {
    content: "",
    model: modelName,
    provider: provider,
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      // Decode the received data
      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      // Process each line in the stream
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (line.trim() === "") continue
        if (line.trim() === "data: [DONE]") continue

        try {
          // Extract data from the line
          const dataMatch = line.match(/^data: (.*)$/i)
          if (!dataMatch) continue

          const data = JSON.parse(dataMatch[1])

          // Extract message content
          const content = data.choices?.[0]?.delta?.content || data.choices?.[0]?.message?.content || ""

          if (content) {
            // Update the final result
            result.content += content

            // Call the chunk handler if provided
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
 * Get available AI models
 */
export async function getAvailableModels() {
  // This could be fetched from a database or API
  return [
    // Groq Models
    { id: "llama3-70b-8192", name: "Llama 3 (70B)", provider: "groq", size: "70B", requirements: "Cloud" },
    { id: "llama3-8b-8192", name: "Llama 3 (8B)", provider: "groq", size: "8B", requirements: "Cloud" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", provider: "groq", size: "8x7B", requirements: "Cloud" },

    // OpenRouter Models
    { id: "openai/gpt-4o", name: "GPT-4o", provider: "openrouter", size: "~1.8T", requirements: "Cloud" },
    {
      id: "anthropic/claude-3-opus",
      name: "Claude 3 Opus",
      provider: "openrouter",
      size: "~2T",
      requirements: "Cloud",
    },
    {
      id: "meta-llama/llama-3-70b-instruct",
      name: "Llama 3 70B Instruct",
      provider: "openrouter",
      size: "70B",
      requirements: "Cloud",
    },

    // Together Models (DeepSeek-R1-Distill-Llama-70B-free)
    {
      id: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      name: "DeepSeek R1 Distill",
      provider: "together",
      size: "70B",
      requirements: "Cloud",
    },

    // Search1API Models (No API key required - Works directly without authentication)
    {
      id: "deepseek-r1-70b-online",
      name: "DeepSeek R1 70B (No API Key)",
      provider: "search1api",
      size: "70B",
      requirements: "None",
    },

    // Local Models
    { id: "tinyllama", name: "TinyLlama (1.1B)", provider: "local", size: "1.1B", requirements: "Low" },
    { id: "phi-2", name: "Phi-2 (2.7B)", provider: "local", size: "2.7B", requirements: "Low-Medium" },
  ]
}
