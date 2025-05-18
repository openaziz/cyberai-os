import { type NextRequest, NextResponse } from "next/server"
import { getConversations, saveConversation } from "@/utils/database"

export async function GET() {
  try {
    const conversations = await getConversations()
    return NextResponse.json({ conversations }, { status: 200 })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, messages, modelId } = await request.json()

    if (!title || !messages || !modelId) {
      return NextResponse.json({ error: "Title, messages, and modelId are required" }, { status: 400 })
    }

    const conversation = await saveConversation({
      title,
      messages,
      modelId,
      createdAt: new Date(),
    })

    return NextResponse.json({ conversation }, { status: 201 })
  } catch (error) {
    console.error("Error saving conversation:", error)
    return NextResponse.json({ error: "Failed to save conversation" }, { status: 500 })
  }
}
