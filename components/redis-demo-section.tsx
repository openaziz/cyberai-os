"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Database, Loader2, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"

const RedisDemoSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [name, setName] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recentFeedback, setRecentFeedback] = useState<any[]>([])
  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // زيادة عداد الزيارات عند تحميل المكون
  useEffect(() => {
    const incrementVisits = async () => {
      try {
        const response = await fetch("/api/redis/increment-counter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: "page:visits:redis-demo" }),
        })

        if (response.ok) {
          const data = await response.json()
          setVisitCount(data.count)
        }
      } catch (error) {
        console.error("Error incrementing visit counter:", error)
      }
    }

    incrementVisits()
  }, [])

  // جلب آخر التعليقات
  const fetchRecentFeedback = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/redis/recent-feedback")

      if (response.ok) {
        const data = await response.json()
        setRecentFeedback(data.feedback)
      }
    } catch (error) {
      console.error("Error fetching recent feedback:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // جلب التعليقات عند تحميل المكون
  useEffect(() => {
    fetchRecentFeedback()
  }, [])

  // إرسال تعليق جديد
  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/redis/store-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSuccess("تم إرسال تعليقك بنجاح!")
        setName("")
        setFeedback("")
        // إعادة تحميل التعليقات
        fetchRecentFeedback()
      } else {
        const data = await response.json()
        setError(data.error || "حدث خطأ أثناء إرسال التعليق")
      }
    } catch (error) {
      setError("حدث خطأ غير متوقع")
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="redis-demo" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,184,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">تكامل مع Upstash Redis</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            استخدام Redis للتخزين المؤقت وإدارة الحالة وتتبع الإحصائيات في الوقت الفعلي
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {/* نموذج التعليقات */}
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm overflow-hidden gold-box-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-500">
                <Database className="h-5 w-5" />
                أرسل تعليقك
              </CardTitle>
              <CardDescription>يتم تخزين التعليقات في Upstash Redis واسترجاعها في الوقت الفعلي</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    الاسم
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gold-500/30 focus:border-gold-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="feedback" className="text-sm font-medium">
                    التعليق
                  </label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px] border-gold-500/30 focus:border-gold-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="gold-gradient text-black w-full"
                  disabled={isSubmitting || !name.trim() || !feedback.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال التعليق"
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-500">{error}</div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-500">
                  {success}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gold-500/20 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Database className="h-4 w-4 text-gold-500 mr-2" />
                  <span>مدعوم بواسطة Upstash Redis</span>
                </div>
                {visitCount !== null && (
                  <Badge variant="outline" className="border-gold-500/30 text-gold-500">
                    عدد الزيارات: {visitCount}
                  </Badge>
                )}
              </div>
            </CardFooter>
          </Card>

          {/* عرض التعليقات الحديثة */}
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm overflow-hidden gold-box-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gold-500">
                  <Database className="h-5 w-5" />
                  آخر التعليقات
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10"
                  onClick={fetchRecentFeedback}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
              <CardDescription>التعليقات المخزنة في Redis يتم استرجاعها وعرضها هنا</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {recentFeedback.length > 0 ? (
                  recentFeedback.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background/50 border border-gold-500/10 rounded-lg hover:border-gold-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gold-500">{item.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString("ar-SA")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.feedback}</p>
                      <div className="flex items-center justify-end mt-2 space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:text-gold-500 hover:bg-gold-500/10"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:text-gold-500 hover:bg-gold-500/10"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {isLoading ? "جاري تحميل التعليقات..." : "لا توجد تعليقات حتى الآن"}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gold-500/20 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Database className="h-4 w-4 text-gold-500 mr-2" />
                <span>يتم استخدام Redis للتخزين المؤقت وإدارة الحالة، مما يوفر أداءً عاليًا وتجربة مستخدم سلسة</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default RedisDemoSection
