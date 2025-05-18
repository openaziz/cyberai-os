import { NextResponse } from "next/server"
import { ENV } from "@/config/env"

export async function GET() {
  try {
    // التحقق من توفر المتغيرات البيئية الأساسية
    const requiredEnvVars = ["NEON_DATABASE_URL", "GROQ_API_KEY", "TOGETHER_API_KEY", "OPENROUTER_API_KEY"]

    const missingEnvVars = requiredEnvVars.filter((varName) => !ENV[varName as keyof typeof ENV])

    // التحقق من الاتصال بقاعدة البيانات
    let databaseStatus = "unknown"
    try {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/api/database/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      databaseStatus = response.ok ? "connected" : "error"
    } catch (error) {
      databaseStatus = "error"
      console.error("Error checking database connection:", error)
    }

    return NextResponse.json(
      {
        status: "ok",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        environment: {
          missingEnvVars: missingEnvVars.length > 0 ? missingEnvVars : null,
          database: databaseStatus,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in health check:", error)
    return NextResponse.json(
      {
        status: "error",
        error: "Failed to perform health check",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
