import { type NextRequest, NextResponse } from "next/server"
import { getConversationById, updateConversation, deleteConversation } from "@/utils/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id
    const conversation = await getConversationById(conversationId)

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    return NextResponse.json({ conversation }, { status: 200 })
  } catch (error) {
    console.error(`Error fetching conversation ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id
    const { title, messages, modelId } = await request.json()

    const updatedConversation = await updateConversation(conversationId, {
      title,
      messages,
      modelId,
      updatedAt: new Date(),
    })

    if (!updatedConversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    return NextResponse.json({ conversation: updatedConversation }, { status: 200 })
  } catch (error) {
    console.error(`Error updating conversation ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update conversation" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id
    const success = await deleteConversation(conversationId)

    if (!success) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`Error deleting conversation ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 })
  }
}
