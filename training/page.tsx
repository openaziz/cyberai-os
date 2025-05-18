"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// استيراد المكون بشكل ديناميكي
const TrainingPage = dynamic(() => import("@/components/pages/ModelTrainingPage"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة التدريب...</div>,
})

export default function Training() {
  return (
    <Suspense
      fallback={<div className="flex items-center justify-center min-h-screen">جاري تحميل صفحة التدريب...</div>}
    >
      <TrainingPage />
    </Suspense>
  )
}
