import type React from "react"
import StudioNavbar from "@/components/studio-navbar"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <StudioNavbar />
      <main className="pt-16">{children}</main>
    </div>
  )
}
