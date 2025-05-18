"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Brain, Terminal, Settings, Menu, X, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { name: "الرئيسية", path: "/home", icon: <Home className="h-5 w-5" /> },
    { name: "المحادثة", path: "/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "النماذج", path: "/models", icon: <Database className="h-5 w-5" /> },
    { name: "التدريب", path: "/training", icon: <Brain className="h-5 w-5" /> },
    { name: "Terminal", path: "/terminal", icon: <Terminal className="h-5 w-5" /> },
    { name: "الإعداد", path: "/setup", icon: <Settings className="h-5 w-5" /> },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center gap-2">
              <img src="/cyberai-os/assets/logo-wolf.png" alt="CyberAI OS Logo" className="h-8 w-8" />
              <span className="font-bold text-lg hidden md:inline-block">CyberAI OS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {routes.map((route) => (
              <Link key={route.path} href={route.path} passHref>
                <Button variant={isActive(route.path) ? "default" : "ghost"} className="flex items-center gap-2">
                  {route.icon}
                  <span>{route.name}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img src="/cyberai-os/assets/logo-wolf.png" alt="CyberAI OS Logo" className="h-8 w-8" />
                      <span className="font-bold text-lg">CyberAI OS</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {routes.map((route) => (
                      <Link key={route.path} href={route.path} passHref onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive(route.path) ? "default" : "ghost"}
                          className="w-full justify-start gap-2"
                        >
                          {route.icon}
                          <span>{route.name}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
