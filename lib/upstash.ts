// تكامل مع Upstash Redis
import { Redis } from "@upstash/redis"

export const getRedis = () => {
  // استخدام متغيرات البيئة المتاحة
  const url = process.env.KV_REST_API_URL || process.env.KV_URL || process.env.REDIS_URL
  const token = process.env.KV_REST_API_TOKEN

  if (!url || !token) {
    throw new Error("بيانات اتصال Redis غير موجودة")
  }

  return new Redis({
    url,
    token,
  })
}

// مثال على استخدام Redis لتخزين المحادثات
export async function saveConversation(userId: string, conversationId: string, data: any) {
  try {
    const redis = getRedis()
    const key = `user:${userId}:conversation:${conversationId}`
    await redis.set(key, JSON.stringify(data))
    // إضافة المحادثة إلى قائمة محادثات المستخدم
    await redis.sadd(`user:${userId}:conversations`, conversationId)
    return true
  } catch (error) {
    console.error("خطأ في حفظ المحادثة:", error)
    throw error
  }
}

export async function getConversation(userId: string, conversationId: string) {
  try {
    const redis = getRedis()
    const key = `user:${userId}:conversation:${conversationId}`
    const data = await redis.get(key)
    return data ? JSON.parse(data as string) : null
  } catch (error) {
    console.error("خطأ في استرجاع المحادثة:", error)
    throw error
  }
}

export async function getUserConversations(userId: string) {
  try {
    const redis = getRedis()
    const conversationIds = await redis.smembers(`user:${userId}:conversations`)

    if (!conversationIds.length) return []

    const conversations = []
    for (const id of conversationIds) {
      try {
        const conversation = await getConversation(userId, id)
        if (conversation) {
          conversations.push(conversation)
        }
      } catch (error) {
        console.error(`خطأ في استرجاع المحادثة ${id}:`, error)
        // استمر في الحلقة حتى مع وجود خطأ في محادثة واحدة
      }
    }

    return conversations
  } catch (error) {
    console.error("خطأ في استرجاع المحادثات:", error)
    throw error
  }
}

export async function deleteConversation(userId: string, conversationId: string) {
  try {
    const redis = getRedis()
    const key = `user:${userId}:conversation:${conversationId}`
    await redis.del(key)
    await redis.srem(`user:${userId}:conversations`, conversationId)
    return true
  } catch (error) {
    console.error("خطأ في حذف المحادثة:", error)
    throw error
  }
}
