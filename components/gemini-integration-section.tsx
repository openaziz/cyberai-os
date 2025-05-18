"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2 } from "lucide-react"

const GeminiIntegrationSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/gemini", {
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

  return (
    <section id="gemini-integration" className="py-20 bg-background/50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">تكامل مع Google Gemini</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            جرب قوة الذكاء الاصطناعي من Google Gemini مباشرة من خلال Devil
          </p>
        </div>

        <div
          ref={ref}
          className="max-w-4xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-500">
                <Sparkles className="h-5 w-5" />
                جرب Gemini الآن
              </CardTitle>
              <CardDescription>اكتب سؤالاً أو طلباً وسيقوم Gemini بالرد عليك</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="اكتب سؤالك أو طلبك هنا..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="border-gold-500/30 focus:border-gold-500"
                    required
                  />
                </div>
                <Button type="submit" className="gold-gradient text-black" disabled={isLoading || !prompt.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "إرسال"
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-500">{error}</div>
              )}

              {result && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2 text-gold-500">الرد:</h3>
                  <div className="p-4 bg-gold-500/10 border border-gold-500/30 rounded-md">
                    <Textarea
                      value={result}
                      readOnly
                      className="min-h-[200px] border-none bg-transparent focus-visible:ring-0"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GeminiIntegrationSection
