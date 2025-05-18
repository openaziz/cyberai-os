import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // حذف ملف تعريف الارتباط الخاص بالجلسة
  cookies().delete("session")

  return NextResponse.json({ success: true })
}
