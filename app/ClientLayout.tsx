"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // التأكد من أن الموضوع جاهز على جانب العميل
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <html lang="ar" dir="rtl">
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="loading-spinner w-12 h-12 border-4 border-background-lighter rounded-full border-t-red-600 animate-spin"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
