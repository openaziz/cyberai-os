"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, RefreshCw, Server, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type ConnectionStatus = {
  success: boolean
  message: string
}

type ConnectionsState = {
  together: ConnectionStatus
  groq: ConnectionStatus
  upstash: ConnectionStatus
}

export default function ConnectionsPage() {
  const { toast } = useToast()
  const [connections, setConnections] = useState<ConnectionsState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testConnections = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/test-connections", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`خطأ في الاستجابة: ${response.status} ${response.statusText}`)
      }

      const responseText = await response.text()

      try {
        // محاولة تحليل النص كـ JSON
        const data = JSON.parse(responseText)
        setConnections(data)
      } catch (parseError) {
        console.error("خطأ في تحليل JSON:", parseError)
        console.error("النص الخام للاستجابة:", responseText)
        setError(`فشل في تحليل استجابة الخادم: ${parseError.message}`)
        toast({
          title: "خطأ",
          description: "فشل في تحليل استجابة الخادم. يرجى التحقق من سجلات وحدة التحكم.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("خطأ في اختبار الاتصالات:", error)
      setError(error.message)
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء اختبار الاتصالات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testConnections()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">حالة الاتصالات</h1>
        <Button onClick={testConnections} disabled={isLoading} className="gap-2">
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          تحديث
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">خطأ</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConnectionCard
          title="Together AI"
          description="خدمة نماذج الذكاء الاصطناعي"
          status={connections?.together}
          icon={<Server className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <ConnectionCard
          title="Groq"
          description="خدمة نماذج الذكاء الاصطناعي عالية السرعة"
          status={connections?.groq}
          icon={<Server className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <ConnectionCard
          title="Upstash Redis"
          description="خدمة Redis للتخزين المؤقت"
          status={connections?.upstash}
          icon={<Database className="h-5 w-5" />}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

function ConnectionCard({
  title,
  description,
  status,
  icon,
  isLoading,
}: {
  title: string
  description: string
  status?: ConnectionStatus
  icon: React.ReactNode
  isLoading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center justify-center rounded-full p-1">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            جاري الاختبار...
          </div>
        ) : status === undefined ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="h-5 w-5" />
            <span>لم يتم الاختبار بعد</span>
          </div>
        ) : status.success ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            <span>متصل</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="h-5 w-5" />
            <span>غير متصل: {status.message}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
