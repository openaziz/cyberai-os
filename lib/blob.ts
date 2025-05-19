// تكامل مع Vercel Blob
import { put, list, del } from "@vercel/blob"

export const uploadFile = async (file: File, folder = "uploads") => {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("رمز Blob غير موجود")
    }

    const filename = `${folder}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size,
    }
  } catch (error) {
    console.error("خطأ في رفع الملف:", error)
    throw error
  }
}

export const listFiles = async (prefix = "uploads") => {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("رمز Blob غير موجود")
    }

    const blobs = await list({ prefix })
    return blobs
  } catch (error) {
    console.error("خطأ في استرجاع قائمة الملفات:", error)
    throw error
  }
}

export const deleteFile = async (url: string) => {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("رمز Blob غير موجود")
    }

    await del(url)
    return true
  } catch (error) {
    console.error("خطأ في حذف الملف:", error)
    throw error
  }
}
