import { type NextRequest, NextResponse } from "next/server"
import Together from "together-ai"
import { getGroqAI } from "@/lib/groq-ai"
import { getRedis } from "@/lib/upstash"

export async function GET(request: NextRequest) {
  try {
    const results = {
      together: { success: false, message: "" },
      groq: { success: false, message: "" },
      upstash: { success: false, message: "" },
    }

    // اختبار Together AI
    try {
      if (!process.env.TOGETHER_API_KEY) {
        results.together = { success: false, message: "مفتاح API غير متوفر" }
      } else {
        const together = new Together({
          apiKey: process.env.TOGETHER_API_KEY,
        })

        const models = await together.models.list()
        results.together = {
          success: true,
          message: `تم الاتصال بنجاح. عدد النماذج المتاحة: ${models.data.length}`,
        }
      }
    } catch (error: any) {
      console.error("خطأ في اختبار Together AI:", error)
      results.together = {
        success: false,
        message: error.message || "فشل الاتصال",
      }
    }

    // اختبار Groq
    try {
      if (!process.env.GROQ_API_KEY) {
        results.groq = { success: false, message: "مفتاح API غير متوفر" }
      } else {
        const groq = getGroqAI()
        const models = await groq.models.list()
        results.groq = {
          success: true,
          message: `تم الاتصال بنجاح. عدد النماذج المتاحة: ${models.data.length}`,
        }
      }
    } catch (error: any) {
      console.error("خطأ في اختبار Groq:", error)
      results.groq = {
        success: false,
        message: error.message || "فشل الاتصال",
      }
    }

    // اختبار Upstash Redis
    try {
      if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        results.upstash = { success: false, message: "بيانات الاتصال غير متوفرة" }
      } else {
        const redis = getRedis()
        await redis.ping()
        results.upstash = { success: true, message: "تم الاتصال بنجاح" }
      }
    } catch (error: any) {
      console.error("خطأ في اختبار Upstash Redis:", error)
      results.upstash = {
        success: false,
        message: error.message || "فشل الاتصال",
      }
    }

    // إرجاع النتائج كـ JSON صالح
    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    console.error("خطأ عام في اختبار الاتصالات:", error)
    return new NextResponse(
      JSON.stringify({
        error: error.message || "حدث خطأ أثناء اختبار الاتصالات",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
