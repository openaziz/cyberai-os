"use client"

import { useState, useEffect } from "react"

export function useStackKey() {
  const [key, setKey] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchKey() {
      try {
        setLoading(true)
        const response = await fetch("/api/stack-key")

        if (!response.ok) {
          throw new Error("Failed to fetch stack key")
        }

        const data = await response.json()
        setKey(data.key)
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
