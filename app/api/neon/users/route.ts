import { NextResponse, type NextRequest } from "next/server"
import { getUsers, createUser } from "@/lib/db"

export async function GET() {
  try {
    // التحقق من وجود اتصال قاعدة البيانات
    if (!process.env.NEON_NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    const users = await getUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // التحقق من وجود اتصال قاعدة البيانات
    if (!process.env.NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const user = await createUser(name, email)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
