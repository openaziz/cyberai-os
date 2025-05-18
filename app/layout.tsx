import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "CyberAI OS - نظام الذكاء الاصطناعي المفتوح",
  description: "منصة ذكاء اصطناعي مفتوحة المصدر تمنحك القوة والخصوصية والتحكم الكامل",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
