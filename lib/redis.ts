import { kv } from "@vercel/kv"

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>, ttl = 3600): Promise<T> {
  try {
    // محاولة الحصول على البيانات من التخزين المؤقت
    const cachedData = await kv.get<T>(key)

    if (cachedData) {
      console.log(`Cache hit for key: ${key}`)
      return cachedData
    }

    // إذا لم تكن البيانات موجودة في التخزين المؤقت، قم بجلبها
    console.log(`Cache miss for key: ${key}, fetching data...`)
    const freshData = await fetchFn()

    // تخزين البيانات في التخزين المؤقت مع وقت انتهاء الصلاحية
    await kv.set(key, freshData, { ex: ttl })

    return freshData
  } catch (error) {
    console.error(`Error with Redis cache for key ${key}:`, error)
    // في حالة حدوث خطأ، قم بجلب البيانات مباشرة
    return fetchFn()
  }
}

export async function incrementCounter(key: string): Promise<number> {
  try {
    const newValue = await kv.incr(key)
    return newValue
  } catch (error) {
    console.error(`Error incrementing counter ${key}:`, error)
    return 0
  }
}

export async function storeUserFeedback(id: string, feedback: any): Promise<void> {
  try {
    await kv.hset(`feedback:${id}`, feedback)
  } catch (error) {
    console.error(`Error storing user feedback:`, error)
  }
}

export async function getRecentFeedback(limit = 10): Promise<any[]> {
  try {
    // هذا مثال بسيط، في الواقع قد تحتاج إلى استخدام مجموعة مختلفة من أوامر Redis
    const keys = await kv.keys("feedback:*")
    const limitedKeys = keys.slice(0, limit)

    const feedback = await Promise.all(
      limitedKeys.map(async (key) => {
        const data = await kv.hgetall(key)
        return { id: key.replace("feedback:", ""), ...data }
      }),
    )

    return feedback
  } catch (error) {
    console.error(`Error getting recent feedback:`, error)
    return []
  }
}
