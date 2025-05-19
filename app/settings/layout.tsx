import type React from "react"
import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"

export const metadata: Metadata = {
  title: "الإعدادات - CyberAI OS",
  description: "إدارة إعدادات التطبيق والحساب",
}

const sidebarNavItems = [
  {
    title: "عام",
    href: "/settings",
  },
  {
    title: "المظهر",
    href: "/settings/appearance",
  },
  {
    title: "النماذج",
    href: "/settings/models",
  },
  {
    title: "الاتصالات",
    href: "/settings/connections",
  },
  {
    title: "الحساب",
    href: "/settings/account",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">الإعدادات</h2>
          <p className="text-muted-foreground">إدارة إعدادات التطبيق والحساب وتفضيلات المستخدم.</p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-x-reverse lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
