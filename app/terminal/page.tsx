"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// استيراد المكون بشكل ديناميكي
const TerminalPage = dynamic(() => import("@/components/pages/TerminalPage"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">جاري تحميل الطرفية...</div>,
})

export default function Terminal() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">جاري تحميل الطرفية...</div>}>
      <TerminalPage />
    </Suspense>
  )
}
