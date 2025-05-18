import { kv } from "@vercel/kv"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 })
    }

    const count = await kv.incr(key)

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error incrementing counter:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
