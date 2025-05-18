import { NextResponse } from "next/server"
import { initDatabase } from "@/utils/database"

export async function POST() {
  try {
    const success = await initDatabase()

    if (success) {
      return NextResponse.json({ message: "Database initialized successfully" }, { status: 200 })
    } else {
      return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
