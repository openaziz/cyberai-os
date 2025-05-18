"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, AlertCircle } from "lucide-react"
import { ApiKeyManager } from "@/components/api-key-manager"
import Link from "next/link"

export default function ApiKeysPage() {
  const [openaiKey, setOpenaiKey] = useState<string>("")
  const [anthropicKey, setAnthropicKey] = useState<string>("")
  const [groqKey, setGroqKey] = useState<string>("")

  // استرجاع المفاتيح المحفوظة عند تحميل الصفحة
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOpenaiKey = localStorage.getItem("devil_openai_key")
      const savedAnthropicKey = localStorage.getItem("devil_anthropic_key")
      const savedGroqKey = localStorage.getItem("devil_groq_key")

      if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey)
      if (savedAnthropicKey) setAnthropicKey(savedAnthropicKey)
      if (savedGroqKey) setGroqKey(savedGroqKey)
    }
  }, [])

  // حفظ مفتاح OpenAI
  const handleSaveOpenaiKey = (key: string) => {
    localStorage.setItem("devil_openai_key", key)
    setOpenaiKey(key)
  }

  // حفظ مفتاح Anthropic
  const handleSaveAnthropicKey = (key: string) => {
    localStorage.setItem("devil_anthropic_key", key)
    setAnthropicKey(key)
  }

  // حفظ مفتاح Groq
  const handleSaveGroqKey = (key: string) => {
    localStorage.setItem("devil_groq_key", key)
    setGroqKey(key)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                لوحة التحكم
              </Button>
            </Link>
            <span className="text-gray-500">/</span>
            <span>إعدادات API</span>
          </div>
          <div className="font-bold text-2xl">Devil</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">إدارة مفاتيح API</h1>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-400" />
                مفاتيح API للذكاء الاصطناعي
              </CardTitle>
              <CardDescription className="text-gray-400">
                أضف مفاتيح API الخاصة بك لاستخدام نماذج الذكاء الاصطناعي المفضلة لديك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="openai" className="w-full">
                <TabsList className="bg-gray-900/50 border border-gray-700 mb-6">
                  <TabsTrigger value="openai" className="data-[state=active]:bg-blue-600">
                    OpenAI
                  </TabsTrigger>
                  <TabsTrigger value="anthropic" className="data-[state=active]:bg-blue-600">
                    Anthropic
                  </TabsTrigger>
                  <TabsTrigger value="groq" className="data-[state=active]:bg-blue-600">
                    Groq
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="openai" className="space-y-4">
                  <ApiKeyManager provider="OpenAI" onSave={handleSaveOpenaiKey} savedKey={openaiKey} />

                  <Alert className="bg-blue-900/20 border-blue-500">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-300">
                      يمكنك الحصول على مفتاح API من OpenAI من خلال زيارة{" "}
                      <a
                        href="https://platform.openai.com/api-keys"
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        لوحة تحكم OpenAI
                      </a>
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="anthropic" className="space-y-4">
                  <ApiKeyManager provider="Anthropic" onSave={handleSaveAnthropicKey} savedKey={anthropicKey} />

                  <Alert className="bg-blue-900/20 border-blue-500">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-300">
                      يمكنك الحصول على مفتاح API من Anthropic من خلال زيارة{" "}
                      <a
                        href="https://console.anthropic.com/"
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        لوحة تحكم Anthropic
                      </a>
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="groq" className="space-y-4">
                  <ApiKeyManager provider="Groq" onSave={handleSaveGroqKey} savedKey={groqKey} />

                  <Alert className="bg-blue-900/20 border-blue-500">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-300">
                      يمكنك الحصول على مفتاح API من Groq من خلال زيارة{" "}
                      <a
                        href="https://console.groq.com/"
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        لوحة تحكم Groq
                      </a>
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle>معلومات حول مفاتيح API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-900/20 border-blue-500">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-300">
                  مفاتيح API الخاصة بك تُخزن محليًا في متصفحك ولا يتم إرسالها إلى أي خادم خارجي باستثناء مزود الخدمة
                  المعني.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 text-gray-400">
                <h3 className="text-lg font-medium text-white">كيفية استخدام مفاتيح API</h3>
                <p>
                  بعد إضافة مفاتيح API، يمكنك استخدام نماذج الذكاء الاصطناعي المقابلة في المشاريع والاستوديو. سيتم
                  استخدام المفتاح المناسب تلقائيًا عند اختيار نموذج من مزود الخدمة المقابل.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium text-white">ملاحظات هامة</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>تأكد من حماية مفاتيح API الخاصة بك وعدم مشاركتها مع أي شخص.</li>
                    <li>قد تتحمل رسومًا من مزودي الخدمة عند استخدام مفاتيح API الخاصة بك.</li>
                    <li>يمكنك تعيين حدود استخدام في لوحات تحكم مزودي الخدمة لتجنب الرسوم غير المتوقعة.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
