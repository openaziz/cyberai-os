"use client"

import { useState, useEffect } from "react"
import { getStackKey } from "../services/api"

export function useStackKey() {
  const [stackKey, setStackKey] = useState<string | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchStackKey() {
      try {
        setLoading(true)
        const data = await getStackKey()
        setStackKey(data.key)
        setProjectId(data.projectId)
        setError(null)
      } catch (err) {
        console.error("Error fetching Stack key:", err)
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchStackKey()
  }, [])

  return { stackKey, projectId, loading, error }
}
