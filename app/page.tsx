"use client"

import { useState } from "react"
import { Github, Figma, Link2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="font-bold text-2xl">Devil</div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center">
        {/* GitHub Integration Badge */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2 mb-16 inline-flex items-center gap-2 border border-gray-700">
          <Github className="h-5 w-5" />
          <span className="text-sm">تكامل مع GitHub!</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6">ماذا تريد أن تبني؟</h1>
          <p className="text-gray-400 text-xl">
            قم بإنشاء وتشغيل وتعديل ونشر تطبيقات <span className="text-white">الويب</span> و
            <span className="text-white"> الجوال</span> بسهولة.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-2xl mb-12">
          <div className="relative">
            <Input
              className="w-full bg-gray-800/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
              placeholder="كيف يمكننا مساعدتك اليوم؟"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                <Link2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div className="text-center mb-8">
          <p className="text-gray-500 mb-4">أو استيراد من</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-white gap-2">
              <Figma className="h-4 w-4" />
              <span>Figma</span>
            </Button>
            <Button variant="outline" className="bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-white gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full max-w-md space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-center py-6 text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            إنشاء تطبيق جوال باستخدام Expo
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center py-6 text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            إنشاء مدونة باستخدام Astro
          </Button>
        </div>
      </main>
    </div>
  )
}
