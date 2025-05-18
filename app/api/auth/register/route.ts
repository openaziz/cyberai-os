import { NextResponse, type NextRequest } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    // التحقق من وجود المستخدم
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 400 })
    }

    // إنشاء المستخدم الجديد
    const user = await createUser(name, email, password)

    // إرجاع بيانات المستخدم (بدون كلمة المرور)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Error during registration:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء الحساب" }, { status: 500 })
  }
}
