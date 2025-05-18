"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, Home, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const StudioNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-background border-b border-border fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold neon-text">Devil</span>
              <span className="text-sm text-muted-foreground ml-2">Studio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              لوحة التحكم
            </Link>
            <Link
              href="/studio"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              الاستوديو
            </Link>
            <Link
              href="/studio/projects"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              المشاريع
            </Link>
            <Link
              href="/studio/settings"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              الإعدادات
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-usizv.png" alt="صورة المستخدم" />
                    <AvatarFallback>م</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">محمد العلي</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">mohammed@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Home className="ml-2 h-4 w-4" />
                    لوحة التحكم
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/studio/settings">
                    <Settings className="ml-2 h-4 w-4" />
                    الإعدادات
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4 space-x-reverse">
            <ModeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-usizv.png" alt="صورة المستخدم" />
              <AvatarFallback>م</AvatarFallback>
            </Avatar>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-background/95 backdrop-blur-sm border-b border-border`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            لوحة التحكم
          </Link>
          <Link
            href="/studio"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            الاستوديو
          </Link>
          <Link
            href="/studio/projects"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            المشاريع
          </Link>
          <Link
            href="/studio/settings"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            الإعدادات
          </Link>
        </div>
      </div>
    </header>
  )
}

export default StudioNavbar
