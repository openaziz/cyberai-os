// تكامل مع قاعدة البيانات PostgreSQL
import { neon } from "@neondatabase/serverless"

export const getDatabase = () => {
  // استخدام متغيرات البيئة المتاحة
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL

  if (!connectionString) {
    throw new Error("بيانات اتصال قاعدة البيانات غير موجودة")
  }

  return neon(connectionString)
}

// مثال على استخدام قاعدة البيانات لتخزين المستخدمين
export async function getUserById(userId: string) {
  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM users WHERE id = ${userId}`
    return result[0] || null
  } catch (error) {
    console.error("خطأ في استرجاع المستخدم:", error)
    throw error
  }
}

export async function createUser(userData: { name: string; email: string; password: string }) {
  try {
    const sql = getDatabase()
    const result = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${userData.name}, ${userData.email}, ${userData.password})
      RETURNING id, name, email, created_at
    `
    return result[0]
  } catch (error) {
    console.error("خطأ في إنشاء المستخدم:", error)
    throw error
  }
}

export async function updateUser(userId: string, userData: { name?: string; email?: string }) {
  try {
    const sql = getDatabase()
    const updates = []
    const values = []

    if (userData.name) {
      updates.push("name = $1")
      values.push(userData.name)
    }

    if (userData.email) {
      updates.push(`email = $${values.length + 1}`)
      values.push(userData.email)
    }

    if (updates.length === 0) {
      return null
    }

    values.push(userId)

    const query = `
      UPDATE users 
      SET ${updates.join(", ")} 
      WHERE id = $${values.length} 
      RETURNING id, name, email, created_at
    `

    const result = await sql.query(query, values)
    return result.rows[0]
  } catch (error) {
    console.error("خطأ في تحديث المستخدم:", error)
    throw error
  }
}
