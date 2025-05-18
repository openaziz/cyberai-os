"use client"

import { useEffect, useState } from "react"
import { useStackKey } from "../hooks/useStackKey"

export function NeonStackProvider({ children }) {
  const { key, loading, error } = useStackKey()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (loading) return

    if (error) {
      console.error("Error loading Neon Stack:", error)
      return
    }

    if (!key) {
      console.warn("No Neon Stack key available")
      return
    }

    // استخدم المفتاح هنا لتهيئة Neon Stack
    // مثال:
    // initializeNeonStack(key)

    setIsInitialized(true)
  }, [key, loading, error])

  return <div className={`neon-stack-provider ${isInitialized ? "initialized" : "not-initialized"}`}>{children}</div>
}
