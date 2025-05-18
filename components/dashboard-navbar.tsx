"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, Plus, Bell, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold neon-text">Devil</span>
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
              href="/dashboard/projects"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              مشاريعي
            </Link>
            <Link
              href="/dashboard/explore"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              استكشاف
            </Link>
            <Link
              href="/dashboard/community"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              المجتمع
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Button variant="outline" size="icon" className="border-green-500 hover:bg-green-500/10">
              <Bell className="h-5 w-5 text-green-500" />
            </Button>

            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10 flex items-center"
            >
              <Plus className="h-4 w-4 ml-1" />
              مشروع جديد
            </Button>

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
                  <Link href="/dashboard/profile">
                    <Avatar className="ml-2 h-4 w-4">
                      <AvatarImage src="/placeholder-usizv.png" alt="صورة المستخدم" />
                      <AvatarFallback>م</AvatarFallback>
                    </Avatar>
                    الملف الشخصي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
            </Button>
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
            href="/dashboard/projects"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            مشاريعي
          </Link>
          <Link
            href="/dashboard/explore"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            استكشاف
          </Link>
          <Link
            href="/dashboard/community"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
            onClick={() => setIsMenuOpen(false)}
          >
            المجتمع
          </Link>
          <div className="pt-4 pb-2">
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white">
              <Plus className="ml-2 h-4 w-4" />
              مشروع جديد
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar
