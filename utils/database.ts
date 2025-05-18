import { neon } from "@neondatabase/serverless"
import { ENV } from "@/config/env"

// إنشاء اتصال بقاعدة البيانات
const sql = neon(ENV.NEON_DATABASE_URL)

// تعريف أنواع البيانات
export interface Conversation {
  id: string
  title: string
  messages: Message[]
  modelId: string
  createdAt: Date
  updatedAt?: Date
}

export interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

// التحقق من وجود الجداول وإنشائها إذا لم تكن موجودة
export async function initDatabase() {
  try {
    // إنشاء جدول المحادثات
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        messages JSONB NOT NULL,
        model_id TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}

// الحصول على جميع المحادثات
export async function getConversations(): Promise<Conversation[]> {
  try {
    const conversations = await sql<Conversation[]>`
      SELECT * FROM conversations ORDER BY created_at DESC
    `

    return conversations.map((conversation) => ({
      ...conversation,
      messages: conversation.messages as unknown as Message[],
    }))
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return []
  }
}

// الحصول على محادثة معينة بواسطة المعرف
export async function getConversationById(id: string): Promise<Conversation | null> {
  try {
    const [conversation] = await sql<Conversation[]>`
      SELECT * FROM conversations WHERE id = ${id}
    `

    if (!conversation) return null

    return {
      ...conversation,
      messages: conversation.messages as unknown as Message[],
    }
  } catch (error) {
    console.error(`Error fetching conversation ${id}:`, error)
    return null
  }
}

// حفظ محادثة جديدة
export async function saveConversation(conversation: Omit<Conversation, "id">): Promise<Conversation | null> {
  try {
    const [newConversation] = await sql<Conversation[]>`
      INSERT INTO conversations (title, messages, model_id, created_at)
      VALUES (
        ${conversation.title},
        ${JSON.stringify(conversation.messages)},
        ${conversation.modelId},
        ${conversation.createdAt}
      )
      RETURNING *
    `

    return {
      ...newConversation,
      messages: newConversation.messages as unknown as Message[],
    }
  } catch (error) {
    console.error("Error saving conversation:", error)
    return null
  }
}

// تحديث محادثة موجودة
export async function updateConversation(
  id: string,
  updates: Partial<Omit<Conversation, "id">>,
): Promise<Conversation | null> {
  try {
    // بناء استعلام التحديث ديناميكيًا بناءً على الحقول المتوفرة
    const updateFields = []
    const values: any[] = []

    if (updates.title !== undefined) {
      updateFields.push("title = $1")
      values.push(updates.title)
    }

    if (updates.messages !== undefined) {
      updateFields.push("messages = $" + (values.length + 1))
      values.push(JSON.stringify(updates.messages))
    }

    if (updates.modelId !== undefined) {
      updateFields.push("model_id = $" + (values.length + 1))
      values.push(updates.modelId)
    }

    // دائمًا تحديث updated_at
    updateFields.push("updated_at = $" + (values.length + 1))
    values.push(updates.updatedAt || new Date())

    // إضافة معرف المحادثة
    values.push(id)

    const [updatedConversation] = await sql<Conversation[]>`
      UPDATE conversations
      SET ${sql.unsafe(updateFields.join(", "))}
      WHERE id = $${values.length}
      RETURNING *
    `

    if (!updatedConversation) return null

    return {
      ...updatedConversation,
      messages: updatedConversation.messages as unknown as Message[],
    }
  } catch (error) {
    console.error(`Error updating conversation ${id}:`, error)
    return null
  }
}

// حذف محادثة
export async function deleteConversation(id: string): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM conversations WHERE id = ${id}
    `

    return result.count > 0
  } catch (error) {
    console.error(`Error deleting conversation ${id}:`, error)
    return false
  }
}
