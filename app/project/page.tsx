"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Play, Code, Settings, Share2, Download, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AIModelSelector } from "@/components/ai-model-selector"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function ProjectPage() {
  const [code, setCode] = useState(`// مرحباً بك في محرر الكود
import React from 'react';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">مرحباً بالعالم!</h1>
      <p className="text-xl">هذا هو مشروعك الأول مع Devil</p>
    </div>
  );
}`)

  const [selectedModelId, setSelectedModelId] = useState("gpt-4o")
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // استرجاع مفاتيح API المحفوظة
  const [apiKeys, setApiKeys] = useState<{
    openai: string
    anthropic: string
    groq: string
  }>({
    openai: "",
    anthropic: "",
    groq: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOpenaiKey = localStorage.getItem("devil_openai_key") || ""
      const savedAnthropicKey = localStorage.getItem("devil_anthropic_key") || ""
      const savedGroqKey = localStorage.getItem("devil_groq_key") || ""

      setApiKeys({
        openai: savedOpenaiKey,
        anthropic: savedAnthropicKey,
        groq: savedGroqKey,
      })
    }
  }, [])

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId)
  }

  const getApiKeyForModel = (modelId: string): string => {
    if (modelId.includes("gpt")) {
      return apiKeys.openai
    } else if (modelId.includes("claude")) {
      return apiKeys.anthropic
    } else if (modelId.includes("llama") || modelId.includes("mixtral")) {
      return apiKeys.groq
    }
    return ""
  }

  const handleGenerateResponse = async () => {
    if (!aiPrompt.trim()) return

    const apiKey = getApiKeyForModel(selectedModelId)
    if (!apiKey) {
      setError(`لم يتم العثور على مفتاح API لهذا النموذج. يرجى إضافة مفتاح API في صفحة الإعدادات.`)
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelId: selectedModelId,
          prompt: aiPrompt,
          apiKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء توليد الاستجابة")
      }

      setAiResponse(data.response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء توليد الاستجابة")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateCode = async () => {
    if (!aiPrompt.trim()) return

    const apiKey = getApiKeyForModel(selectedModelId)
    if (!apiKey) {
      setError(`لم يتم العثور على مفتاح API لهذا النموذج. يرجى إضافة مفتاح API في صفحة الإعدادات.`)
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/code/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelId: selectedModelId,
          prompt: aiPrompt,
          language: "javascript",
          apiKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء توليد الكود")
      }

      setCode(data.code)
      setAiResponse("تم توليد الكود بنجاح! يمكنك رؤيته في محرر الكود.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء توليد الكود")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="font-bold">مشروع جديد</div>
          </div>

          <div className="flex items-center gap-2">
            <AIModelSelector onModelChange={handleModelChange} />
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Save className="h-4 w-4 mr-2" />
              <span>حفظ</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              <span>تشغيل</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-l border-gray-800 bg-gray-900/50 p-4 hidden md:block">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">الملفات</h2>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md">
                <span>App.js</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                  <Code className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded-md">
                <span>styles.css</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                  <Code className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded-md">
                <span>index.html</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                  <Code className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start mt-2 text-gray-400 hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              <span>ملف جديد</span>
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">الإعدادات</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <Settings className="h-4 w-4 mr-2" />
                <span>إعدادات المشروع</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <Share2 className="h-4 w-4 mr-2" />
                <span>مشاركة</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                <span>تصدير</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="editor" className="flex-1 flex flex-col">
            <div className="border-b border-gray-800 bg-gray-900/50">
              <div className="container mx-auto">
                <TabsList className="bg-transparent border-b-0">
                  <TabsTrigger
                    value="editor"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:border-b-0"
                  >
                    محرر الكود
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:border-b-0"
                  >
                    معاينة
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-assistant"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:border-b-0"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    مساعد الذكاء الاصطناعي
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="editor" className="flex-1 p-0 m-0">
              <div className="h-full bg-gray-900 p-4">
                <textarea
                  className="w-full h-full bg-gray-900 text-white font-mono p-4 border border-gray-800 rounded-md focus:outline-none focus:border-blue-500"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 p-0 m-0">
              <div className="h-full bg-gray-900 p-4 flex items-center justify-center">
                <div className="bg-white text-black p-8 rounded-md max-w-xl">
                  <h1 className="text-4xl font-bold mb-4">مرحباً بالعالم!</h1>
                  <p className="text-xl">هذا هو مشروعك الأول مع Devil</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-assistant" className="flex-1 p-0 m-0">
              <div className="h-full bg-gray-900 p-4 flex flex-col">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex-1 overflow-y-auto border border-gray-800 rounded-md p-4 mb-4">
                  {aiResponse ? (
                    <div className="space-y-4">
                      <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 max-w-3xl ml-auto">
                        <p className="text-white">{aiPrompt}</p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4 max-w-3xl mr-auto">
                        <p className="text-gray-300 whitespace-pre-wrap">{aiResponse}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-4 max-w-3xl mr-auto">
                      <p className="text-gray-300">
                        مرحباً! أنا مساعد الذكاء الاصطناعي الخاص بك. كيف يمكنني مساعدتك في مشروعك؟
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="اكتب سؤالك أو طلبك هنا..."
                    className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                  />

                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 flex-1"
                      onClick={handleGenerateResponse}
                      disabled={isGenerating || !aiPrompt.trim()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isGenerating ? "جاري التوليد..." : "توليد استجابة"}
                    </Button>

                    <Button
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      onClick={handleGenerateCode}
                      disabled={isGenerating || !aiPrompt.trim()}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      {isGenerating ? "جاري التوليد..." : "توليد كود"}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
