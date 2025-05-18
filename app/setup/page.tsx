"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// استيراد المكون بشكل ديناميكي
const SetupPage = dynamic(() => import("@/components/pages/SetupPage"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة الإعداد...</div>,
})

export default function Setup() {
  return (
    <Suspense
      fallback={<div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة الإعداد...</div>}
    >
      <SetupPage />
    </Suspense>
  )
}
