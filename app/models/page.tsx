"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// استيراد المكون بشكل ديناميكي
const ModelsPage = dynamic(() => import("@/components/pages/ModelsPage"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة النماذج...</div>,
})

export default function Models() {
  return (
    <Suspense
      fallback={<div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة النماذج...</div>}
    >
      <ModelsPage />
    </Suspense>
  )
}
