"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User, ImageIcon, Paperclip, Trash, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// استخدام uuid لإنشاء معرفات فريدة
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

type Message = {
  id: string
  role: "user" | "assistant" | "system" | "error"
  content: string
  timestamp: number
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  model: string
  createdAt: number
  updatedAt: number
}

// استرجاع النماذج المتاحة من API
const initialModels = [
  { id: "groq-llama3", name: "Llama-3-70B (Groq)", provider: "groq", working: true },
  { id: "deepseek", name: "DeepSeek-R1", provider: "together", working: false },
  { id: "llama4", name: "Llama-4-Maverick-17B", provider: "together", working: false },
  { id: "gemma3", name: "Gemma-3-27B", provider: "together", working: false },
]

const ChatPage = () => {
  const { toast } = useToast()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [availableModels, setAvailableModels] = useState(initialModels)
  const [selectedModel, setSelectedModel] = useState("groq-llama3") // تعيين Groq كنموذج افتراضي
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // استرجاع النماذج من API عند تحميل الصفحة
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models")
        if (response.ok) {
          const data = await response.json()
          // تحديد النماذج العاملة
          const models = data.models.map((model: any) => ({
            id: model.id,
            name: model.name,
            provider: model.provider,
            working: model.provider === "groq" || model.type === "local",
            type: model.type,
          }))
          setAvailableModels(models)
        }
      } catch (error) {
        console.error("خطأ في جلب النماذج:", error)
      }
    }

    fetchModels()
  }, [])

  // إنشاء محادثة جديدة عند تحميل الصفحة إذا لم تكن هناك محادثات
  useEffect(() => {
    if (conversations.length === 0) {
      const newConversation: Conversation = {
        id: generateId(),
        title: "محادثة جديدة",
        messages: [],
        model: selectedModel,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setConversations([newConversation])
      setCurrentConversation(newConversation)
    }
  }, [conversations, selectedModel])

  // التمرير إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !currentConversation || isLoading) return

    setError(null)

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    const updatedMessages = [...currentConversation.messages, userMessage]
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: Date.now(),
    }

    setCurrentConversation(updatedConversation)
    setInput("")
    setIsLoading(true)

    // تحديد ما إذا كان النموذج محلياً أم لا
    const selectedModelInfo = availableModels.find((m) => m.id === selectedModel)
    const isLocalModel = selectedModelInfo?.type === "local"

    // تحديد عنوان API المناسب
    const apiEndpoint = isLocalModel ? "/api/chat/local" : "/api/chat"

    try {
      // إرسال الرسالة إلى API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((msg) => msg.role !== "error") // استبعاد رسائل الخطأ
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          model: selectedModel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `خطأ في الاستجابة: ${response.status}`)
      }

      // إضافة رسالة المساعد
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: Date.now(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: Date.now(),
      }

      setCurrentConversation(finalConversation)

      // تحديث قائمة المحادثات
      setConversations((prev) => prev.map((conv) => (conv.id === finalConversation.id ? finalConversation : conv)))

      // محاولة حفظ المحادثة في قاعدة البيانات
      try {
        await saveConversation(finalConversation)
      } catch (saveError) {
        console.error("خطأ في حفظ المحادثة:", saveError)
        // لا نريد إظهار خطأ للمستخدم هنا لأن المحادثة نجحت بالفعل
      }
    } catch (error: any) {
      console.error("خطأ في إرسال الرسالة:", error)

      // إضافة رسالة خطأ إلى المحادثة
      const errorMessage: Message = {
        id: generateId(),
        role: "error",
        content: `حدث خطأ أثناء معالجة الرسالة: ${error.message}`,
        timestamp: Date.now(),
      }

      const finalMessages = [...updatedMessages, errorMessage]
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: Date.now(),
      }

      setCurrentConversation(finalConversation)
      setConversations((prev) => prev.map((conv) => (conv.id === finalConversation.id ? finalConversation : conv)))

      setError(error.message)

      // إذا كان الخطأ متعلقاً بنموذج Together، نقترح استخدام Groq
      if (selectedModel !== "groq-llama3" && error.message.includes("API key")) {
        toast({
          title: "خطأ في النموذج المحدد",
          description: "يبدو أن هناك مشكلة مع النموذج المحدد. جرب استخدام نموذج Llama-3-70B (Groq) بدلاً من ذلك.",
          variant: "destructive",
          action: (
            <Button variant="outline" onClick={() => setSelectedModel("groq-llama3")}>
              تبديل إلى Groq
            </Button>
          ),
        })
      } else {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء معالجة الرسالة. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const saveConversation = async (conversation: Conversation) => {
    try {
      // محاكاة حفظ المحادثة - يمكن تفعيل هذا لاحقاً عند توفر API
      console.log("حفظ المحادثة:", conversation.id)
      // في الإصدار الحقيقي، سنقوم بإرسال طلب إلى API
      /*
      await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "anonymous", // يمكن تغييره لاحقاً عند إضافة نظام المستخدمين
          conversationId: conversation.id,
          data: conversation,
        }),
      })
      */
    } catch (error) {
      console.error("خطأ في حفظ المحادثة:", error)
      throw error
    }
  }

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "محادثة جديدة",
      messages: [],
      model: selectedModel,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setConversations([...conversations, newConversation])
    setCurrentConversation(newConversation)
    setError(null)
  }

  const handleClearConversation = () => {
    if (!currentConversation) return

    const clearedConversation = {
      ...currentConversation,
      messages: [],
      updatedAt: Date.now(),
    }

    setCurrentConversation(clearedConversation)
    setConversations((prev) => prev.map((conv) => (conv.id === clearedConversation.id ? clearedConversation : conv)))
    setError(null)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* الشريط الجانبي للمحادثات */}
      <div className="w-64 bg-card border-l border-border overflow-y-auto hidden md:block">
        <div className="p-4">
          <Button onClick={handleNewConversation} className="w-full mb-4">
            محادثة جديدة
          </Button>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Button
                key={conv.id}
                variant={currentConversation?.id === conv.id ? "secondary" : "ghost"}
                className="w-full justify-start text-right"
                onClick={() => setCurrentConversation(conv)}
              >
                <span className="truncate">{conv.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* منطقة المحادثة الرئيسية */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* رأس المحادثة */}
        <div className="bg-card border-b border-border p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر النموذج" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id} disabled={!model.working && model.id !== "groq-llama3"}>
                    <div className="flex items-center gap-2">
                      <span>{model.name}</span>
                      {!model.working && model.id !== "groq-llama3" && (
                        <span className="text-xs text-red-500">(غير متاح)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClearConversation} title="مسح المحادثة">
            <Trash className="h-5 w-5" />
          </Button>
        </div>

        {/* منطقة الرسائل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>خطأ</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {selectedModel !== "groq-llama3" && (
            <Alert variant="warning" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>تنبيه</AlertTitle>
              <AlertDescription>
                النماذج من Together AI غير متاحة حالياً بسبب مشكلة في مفتاح API. يرجى استخدام نموذج Llama-3-70B (Groq).
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedModel("groq-llama3")}>
                  تبديل إلى Groq
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {currentConversation?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Bot className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">مرحباً بك في CyberAI OS</h3>
              <p className="text-muted-foreground max-w-md">
                ابدأ محادثة مع نماذج الذكاء الاصطناعي المتقدمة. يمكنك طرح أسئلة، طلب معلومات، أو الحصول على مساعدة في
                مختلف المجالات.
              </p>
            </div>
          ) : (
            currentConversation?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start gap-3 max-w-3xl">
                  {message.role === "assistant" && (
                    <Avatar className="mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {message.role === "error" && (
                    <Avatar className="mt-1">
                      <AvatarFallback className="bg-destructive text-destructive-foreground">
                        <AlertCircle className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <Card
                    className={cn(
                      "mb-2",
                      message.role === "user"
                        ? "bg-primary/10 border-primary/20"
                        : message.role === "error"
                          ? "bg-destructive/10 border-destructive/20"
                          : "bg-card",
                    )}
                  >
                    <CardContent className="p-3 text-sm">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs text-muted-foreground mt-2 text-left">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </Card>
                  {message.role === "user" && (
                    <Avatar className="mt-1">
                      <AvatarFallback className="bg-secondary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* نموذج الإدخال */}
        <div className="p-4 border-t border-border bg-card">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button type="button" variant="ghost" size="icon" title="إرفاق صورة">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" title="إرفاق ملف">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
