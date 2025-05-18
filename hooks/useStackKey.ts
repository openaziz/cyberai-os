"use client"

import { useState, useEffect } from "react"
import { getStackPublishableKey } from "@/lib/stack-key"

export function useStackKey() {
  const [key, setKey] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchKey() {
      try {
        setLoading(true)
        const stackKey = await getStackPublishableKey()
        setKey(stackKey)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
        console.error("Error fetching stack key:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchKey()
  }, [])

  return { key, loading, error }
}
