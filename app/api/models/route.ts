import { NextResponse } from "next/server"
import { getAvailableModels } from "@/services/ai-service"

export async function GET() {
  try {
    const models = await getAvailableModels()
    return NextResponse.json({ models }, { status: 200 })
  } catch (error) {
    console.error("Error fetching models:", error)
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 })
  }
}
