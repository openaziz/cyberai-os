// Client-side utility to get the Stack publishable key
export async function getStackPublishableKey(): Promise<string> {
  // For static sites, we need to handle this differently
  if (typeof window !== "undefined") {
    // First try to get from window.ENV if available (set in public/env.js)
    if ((window as any).ENV && (window as any).ENV.STACK_PUBLISHABLE_CLIENT_KEY) {
      return (window as any).ENV.STACK_PUBLISHABLE_CLIENT_KEY
    }

    // Otherwise, try to fetch it from our static JSON file
    try {
      const response = await fetch("/cyberai-os/config.json")
      if (response.ok) {
        const data = await response.json()
        return data.stackKey || ""
      }
    } catch (error) {
      console.error("Error fetching Stack key:", error)
    }
  }

  // Fallback to empty string if we can't get the key
  return ""
}
