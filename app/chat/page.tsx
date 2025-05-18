"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// استيراد المكون بشكل ديناميكي
const ChatPage = dynamic(() => import("@/components/pages/ChatPage"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">جاري تحميل المحادثة...</div>,
})

export default function Chat() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">جاري تحميل المحادثة...</div>}>
      <ChatPage />
    </Suspense>
  )
}
