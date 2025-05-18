// نوع بيانات مفتاح API
export interface ApiKey {
  id: number
  name: string
  key: string
  provider: string
  active: boolean
  createdAt: Date
  lastUsed?: Date
}

// استرجاع مفاتيح API من التخزين المحلي
export function getApiKeys(): ApiKey[] {
  if (typeof window === "undefined") return []

  const storedKeys = localStorage.getItem("devil_api_keys")
  if (!storedKeys) return []

  try {
    return JSON.parse(storedKeys)
  } catch (error) {
    console.error("Error parsing stored API keys:", error)
    return []
  }
}

// حفظ مفاتيح API في التخزين المحلي
export function saveApiKeys(keys: ApiKey[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("devil_api_keys", JSON.stringify(keys))
  } catch (error) {
    console.error("Error saving API keys:", error)
  }
}

// إضافة مفتاح API جديد
export function addApiKey(key: Omit<ApiKey, "id" | "createdAt">): ApiKey {
  const keys = getApiKeys()

  const newKey: ApiKey = {
    ...key,
    id: Date.now(),
    createdAt: new Date(),
  }

  const updatedKeys = [...keys, newKey]
  saveApiKeys(updatedKeys)

  return newKey
}

// تحديث مفتاح API
export function updateApiKey(id: number, updates: Partial<ApiKey>): ApiKey | null {
  const keys = getApiKeys()
  const keyIndex = keys.findIndex((key) => key.id === id)

  if (keyIndex === -1) return null

  const updatedKey = { ...keys[keyIndex], ...updates }
  const updatedKeys = [...keys]
  updatedKeys[keyIndex] = updatedKey

  saveApiKeys(updatedKeys)

  return updatedKey
}

// حذف مفتاح API
export function deleteApiKey(id: number): boolean {
  const keys = getApiKeys()
  const updatedKeys = keys.filter((key) => key.id !== id)

  if (updatedKeys.length === keys.length) return false

  saveApiKeys(updatedKeys)

  return true
}

// الحصول على مفتاح API نشط لمزود خدمة معين
export function getActiveApiKeyForProvider(provider: string): ApiKey | null {
  const keys = getApiKeys()
  return keys.find((key) => key.provider === provider && key.active) || null
}

// تحديث وقت آخر استخدام لمفتاح API
export function updateApiKeyLastUsed(id: number): void {
  updateApiKey(id, { lastUsed: new Date() })
}

// التحقق من صلاحية مفتاح API (تنفيذ بسيط)
export function validateApiKey(key: string): boolean {
  // هذه مجرد تحققات بسيطة، في التطبيق الحقيقي ستحتاج إلى تحققات أكثر تعقيدًا
  if (!key) return false
  if (key.length < 10) return false

  // التحقق من بادئة المفتاح حسب مزود الخدمة
  if (key.startsWith("sk-") || key.startsWith("sk-ant-") || key.startsWith("gsk_")) {
    return true
  }

  return false
}

// الحصول على قائمة مزودي خدمات الذكاء الاصطناعي المدعومين
export function getSupportedProviders(): { id: string; name: string }[] {
  return [
    { id: "openai", name: "OpenAI" },
    { id: "anthropic", name: "Anthropic" },
    { id: "google", name: "Google AI" },
    { id: "mistral", name: "Mistral AI" },
    { id: "cohere", name: "Cohere" },
    { id: "groq", name: "Groq" },
    { id: "meta", name: "Meta AI" },
    { id: "other", name: "أخرى" },
  ]
}
