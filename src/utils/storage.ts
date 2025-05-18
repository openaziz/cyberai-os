// وظائف لإدارة التخزين المحلي مع دعم التشفير

import { ENV } from "../config/env"

// مفتاح التشفير الافتراضي (في التطبيق الحقيقي، يجب أن يكون هذا أكثر أمانًا)
const DEFAULT_ENCRYPTION_KEY = "cyberai_os_secure_key"

/**
 * تشفير البيانات قبل التخزين
 */
export function encryptData(data: any, key: string = DEFAULT_ENCRYPTION_KEY): string {
  if (!ENV.ENCRYPT_LOCAL_DATA) {
    return JSON.stringify(data)
  }

  try {
    // تنفيذ تشفير بسيط (في الإنتاج، استخدم مكتبات تشفير قوية)
    const jsonData = JSON.stringify(data)
    return btoa(jsonData + key)
  } catch (error) {
    console.error("Error encrypting data:", error)
    return JSON.stringify(data)
  }
}

/**
 * فك تشفير البيانات بعد استرجاعها
 */
export function decryptData(encryptedData: string, key: string = DEFAULT_ENCRYPTION_KEY): any {
  if (!ENV.ENCRYPT_LOCAL_DATA) {
    try {
      return JSON.parse(encryptedData)
    } catch (e) {
      return null
    }
  }

  try {
    const decoded = atob(encryptedData)
    if (decoded.endsWith(key)) {
      return JSON.parse(decoded.substring(0, decoded.length - key.length))
    }
    // محاولة قراءة البيانات غير المشفرة إذا فشل فك التشفير
    return JSON.parse(encryptedData)
  } catch (e) {
    console.error("Error decrypting data:", e)
    try {
      return JSON.parse(encryptedData)
    } catch {
      return null
    }
  }
}

/**
 * حفظ البيانات في التخزين المحلي
 */
export function saveToStorage(key: string, data: any): void {
  if (!ENV.ENABLE_LOCAL_STORAGE) return

  try {
    const encryptedData = encryptData(data)
    localStorage.setItem(key, encryptedData)
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error)
  }
}

/**
 * استرجاع البيانات من التخزين المحلي
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!ENV.ENABLE_LOCAL_STORAGE) return defaultValue

  try {
    const encryptedData = localStorage.getItem(key)
    if (!encryptedData) return defaultValue

    const decryptedData = decryptData(encryptedData)
    return decryptedData || defaultValue
  } catch (error) {
    console.error(`Error retrieving data from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * حذف البيانات من التخزين المحلي
 */
export function removeFromStorage(key: string): void {
  if (!ENV.ENABLE_LOCAL_STORAGE) return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing data from localStorage (${key}):`, error)
  }
}

/**
 * مسح جميع بيانات التطبيق من التخزين المحلي
 */
export function clearAppStorage(): void {
  if (!ENV.ENABLE_LOCAL_STORAGE) return

  try {
    // حذف فقط المفاتيح التي تبدأ بـ "cyberai_" للحفاظ على بيانات التطبيقات الأخرى
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("cyberai_")) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error("Error clearing app storage:", error)
  }
}
