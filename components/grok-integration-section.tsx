"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sparkles, Loader2, Zap, Code, MessageSquare, Lightbulb } from "lucide-react"

const examplePrompts = [
  {
    title: "شرح مفهوم",
    prompt: "اشرح مفهوم الذكاء الاصطناعي التوليدي بطريقة مبسطة",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    title: "كتابة كود",
    prompt: "اكتب كود React لإنشاء زر متحرك باستخدام Framer Motion",
    icon: <Code className="h-4 w-4" />,
  },
  {
    title: "إجابة سؤال",
    prompt: "ما هي أفضل الممارسات لتحسين أداء تطبيقات Next.js؟",
    icon: <MessageSquare className="h-4 w-4" />,
  },
]

const GrokIntegrationSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"chat" | "code">("chat")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/grok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء معالجة طلبك")
      }

      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "حدث خطأ غير متوقع")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt)
  }

  const formatResponse = (text: string) => {
    // تحويل نص Markdown إلى HTML بسيط
    // هذا مجرد مثال بسيط، يمكن استخدام مكتبة مثل marked.js للتحويل الكامل
    const formattedText = text
      .replace(/```([a-z]*)([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />")

    return formattedText
  }

  return (
    <section id="grok-integration" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,184,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">تكامل مع Grok AI</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            استفد من قوة Grok AI من xAI لتوليد محتوى إبداعي وحل المشكلات المعقدة
          </p>
        </div>

        <div
          ref={ref}
          className="max-w-5xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm overflow-hidden gold-box-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-500">
                <Zap className="h-5 w-5" />
                جرب Grok AI الآن
              </CardTitle>
              <CardDescription>
                Grok هو نموذج لغوي متقدم من xAI يمكنه الإجابة على الأسئلة، وكتابة الكود، وتوليد المحتوى الإبداعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" onValueChange={(value) => setActiveTab(value as "chat" | "code")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    محادثة
                  </TabsTrigger>
                  <TabsTrigger value="code" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    <Code className="h-4 w-4 mr-2" />
                    كود
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                    {examplePrompts.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 justify-start"
                        onClick={() => handleExampleClick(example.prompt)}
                      >
                        {example.icon}
                        <span className="ml-2 truncate">{example.title}</span>
                      </Button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Textarea
                          placeholder="اكتب سؤالك أو طلبك هنا..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="min-h-[100px] border-gold-500/30 focus:border-gold-500 pr-12"
                          required
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="absolute bottom-3 right-3 gold-gradient text-black h-8 w-8"
                          disabled={isLoading || !prompt.trim()}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                    <Button
                      variant="outline"
                      className="border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 justify-start"
                      onClick={() => handleExampleClick("اكتب كود React لإنشاء زر متحرك باستخدام Framer Motion")}
                    >
                      <Code className="h-4 w-4" />
                      <span className="ml-2 truncate">React + Framer Motion</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 justify-start"
                      onClick={() => handleExampleClick("اكتب كود Next.js لإنشاء API route يتصل بقاعدة بيانات")}
                    >
                      <Code className="h-4 w-4" />
                      <span className="ml-2 truncate">Next.js API Route</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 justify-start"
                      onClick={() => handleExampleClick("اكتب كود Tailwind CSS لإنشاء بطاقة منتج متجاوبة")}
                    >
                      <Code className="h-4 w-4" />
                      <span className="ml-2 truncate">Tailwind CSS</span>
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Textarea
                          placeholder="اكتب طلب الكود هنا..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="min-h-[100px] border-gold-500/30 focus:border-gold-500 pr-12 font-mono"
                          required
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="absolute bottom-3 right-3 gold-gradient text-black h-8 w-8"
                          disabled={isLoading || !prompt.trim()}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Code className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-500">{error}</div>
              )}

              {result && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2 text-gold-500">الرد من Grok:</h3>
                  <div className="p-4 bg-gold-500/10 border border-gold-500/30 rounded-md">
                    {activeTab === "code" ? (
                      <Textarea
                        value={result}
                        readOnly
                        className="min-h-[300px] border-none bg-transparent focus-visible:ring-0 font-mono"
                      />
                    ) : (
                      <div
                        className="min-h-[200px] max-h-[500px] overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: formatResponse(result) }}
                      />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gold-500/20 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-gold-500 mr-2" />
                <span>Grok AI يمكنه الإجابة على الأسئلة المعقدة وتوليد محتوى إبداعي وكتابة الكود بكفاءة عالية</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GrokIntegrationSection
