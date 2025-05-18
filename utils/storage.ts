import { ENV } from "@/config/env"

// التحقق من توفر localStorage
const isLocalStorageAvailable = (): boolean => {
  if (!ENV.ENABLE_LOCAL_STORAGE) return false

  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// تشفير البيانات (تنفيذ بسيط)
const encryptData = (data: string): string => {
  if (!ENV.ENCRYPT_LOCAL_DATA) return data

  // في التطبيق الحقيقي، يمكن استخدام مكتبة تشفير حقيقية
  // هذا مجرد مثال بسيط للتوضيح
  return btoa(data)
}

// فك تشفير البيانات
const decryptData = (data: string): string => {
  if (!ENV.ENCRYPT_LOCAL_DATA) return data

  try {
    return atob(data)
  } catch (e) {
    // إذا فشل فك التشفير، أعد البيانات كما هي
    return data
  }
}

// حفظ البيانات في التخزين المحلي
export function saveToStorage<T>(key: string, data: T): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    const serializedData = JSON.stringify(data)
    const encryptedData = encryptData(serializedData)
    localStorage.setItem(key, encryptedData)
    return true
  } catch (e) {
    console.error("Error saving to localStorage:", e)
    return false
  }
}

// استرجاع البيانات من التخزين المحلي
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const encryptedData = localStorage.getItem(key)
    if (!encryptedData) return defaultValue

    const decryptedData = decryptData(encryptedData)
    return JSON.parse(decryptedData) as T
  } catch (e) {
    console.error("Error getting from localStorage:", e)
    return defaultValue
  }
}

// حذف البيانات من التخزين المحلي
export function removeFromStorage(key: string): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error("Error removing from localStorage:", e)
    return false
  }
}

// مسح جميع البيانات من التخزين المحلي
export function clearStorage(): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.clear()
    return true
  } catch (e) {
    console.error("Error clearing localStorage:", e)
    return false
  }
}
