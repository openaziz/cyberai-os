import { NextResponse, type NextRequest } from "next/server"
import { getUserByEmail } from "@/lib/db"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 })
    }

    const user = await getUserByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // إنشاء جلسة بسيطة (في تطبيق حقيقي، يجب استخدام JWT أو طريقة أكثر أمانًا)
    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // تنتهي بعد أسبوع
    }

    // حفظ الجلسة في ملف تعريف الارتباط
    cookies().set("session", JSON.stringify(session), {
      expires: session.expires,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    })

    // إرجاع بيانات المستخدم (بدون كلمة المرور)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تسجيل الدخول" }, { status: 500 })
  }
}
