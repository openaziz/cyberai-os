"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الميزات", href: "#features" },
    { name: "كيف يعمل", href: "#how-it-works" },
    { name: "أمثلة", href: "#examples" },
    { name: "تكامل Gemini", href: "#gemini-integration" },
    { name: "تكامل Grok", href: "#grok-integration" },
    { name: "تكامل Groq", href: "#groq-integration" },
    { name: "تكامل Redis", href: "#redis-demo" },
    { name: "تكامل Neon", href: "#neon-database" },
    { name: "التواصل", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gold-text">Devil</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <ModeToggle />
            <Button asChild className="gold-gradient text-black">
              <Link href="#contact">تواصل معنا</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4 space-x-reverse">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
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
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-background/95 backdrop-blur-sm border-b border-border`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-background/50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2">
            <Button asChild className="w-full gold-gradient text-black">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                تواصل معنا
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
