import { NextResponse, type NextRequest } from "next/server"
import { getProjects, createProject, getUserById } from "@/lib/db"

export async function GET() {
  try {
    // التحقق من وجود اتصال قاعدة البيانات
    if (!process.env.NEON_NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    const projects = await getProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // التحقق من وجود اتصال قاعدة البيانات
    if (!process.env.NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    const { title, description, userId } = await request.json()

    if (!title || !description || !userId) {
      return NextResponse.json({ error: "Title, description, and userId are required" }, { status: 400 })
    }

    // التحقق من وجود المستخدم
    const user = await getUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const project = await createProject(title, description, userId)
    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
