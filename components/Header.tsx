"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { ENV } from "@/config/env"

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // التحقق من التمرير لتغيير مظهر الرأس
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // التأكد من أن الموضوع جاهز على جانب العميل
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "الدردشة", path: "/chat" },
    { name: "النماذج", path: "/models" },
    { name: "التدريب", path: "/training" },
    { name: "المساعدة", path: "/help" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-red-600">CyberAI OS</span>
            </Link>
          </div>

          {/* القائمة للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-red-600"
                    : "text-foreground/80 hover:text-foreground hover:bg-background-lighter"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-background-lighter transition-colors"
                aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              تسجيل الدخول
            </Link>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-background-lighter transition-colors"
              aria-label="فتح القائمة"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* القائمة المتنقلة للشاشات الصغيرة */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-background-lighter">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.path
                      ? "text-red-600 bg-background-lighter"
                      : "text-foreground/80 hover:text-foreground hover:bg-background-lighter"
                  }`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="mt-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                onClick={closeMenu}
              >
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
