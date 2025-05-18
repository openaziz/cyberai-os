import { NextResponse, type NextRequest } from "next/server"
import { getProjectsByUserId, getUserById } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // التحقق من وجود اتصال قاعدة البيانات
    if (!process.env.NEON_NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    // التحقق من وجود المستخدم
    const user = await getUserById(Number.parseInt(userId))
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const projects = await getProjectsByUserId(Number.parseInt(userId))
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching user projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
