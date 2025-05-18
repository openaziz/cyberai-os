"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Bot, User, Trash, Save, Download, Copy } from "lucide-react"
import { ENV } from "@/config/env"
import ModelSelector from "./ModelSelector"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface ChatComponentProps {
  initialMessages?: Message[]
  modelId?: string
}

export default function ChatComponent({
  initialMessages = [],
  modelId = "deepseek-r1-70b-online",
}: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // التمرير إلى أسفل عند إضافة رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // إرسال الطلب إلى واجهة API
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          modelId: selectedModel,
          options: {
            systemPrompt: "أنت مساعد ذكي ومفيد يقدم إجابات دقيقة ومفيدة.",
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      // إضافة رد المساعد
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      // إضافة رسالة خطأ
      const errorMessage: Message = {
        role: "assistant",
        content: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const saveChat = async () => {
    if (messages.length === 0) return

    try {
      const title = messages[0]?.content.slice(0, 50) + "..." || "محادثة جديدة"

      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          messages,
          modelId: selectedModel,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      alert("تم حفظ المحادثة بنجاح")
    } catch (error) {
      console.error("Error saving chat:", error)
      alert("حدث خطأ أثناء حفظ المحادثة")
    }
  }

  const downloadChat = () => {
    if (messages.length === 0) return

    const chatContent = messages.map((msg) => `${msg.role === "user" ? "أنت" : "المساعد"}: ${msg.content}`).join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chat-export.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyLastMessage = () => {
    if (messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    navigator.clipboard.writeText(lastMessage.content)
    alert("تم نسخ الرسالة الأخيرة إلى الحافظة")
  }

  return (
    <div className="chat-container flex flex-col h-[600px] bg-background-lighter rounded-lg overflow-hidden border border-background-lighter">
      <div className="chat-header bg-background p-4 border-b border-background-lighter flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-bold">الدردشة مع الذكاء الاصطناعي</h3>
        </div>
        <div className="w-64">
          <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        </div>
      </div>

      <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted">
            <Bot className="h-12 w-12 mb-4" />
            <p className="text-center">ابدأ محادثة جديدة مع الذكاء الاصطناعي</p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              النموذج الافتراضي هو DeepSeek R1 70B (بدون مفتاح API)
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="avatar flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div
                className={`message-content max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-background rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
              {message.role === "user" && (
                <div className="avatar flex-shrink-0 w-8 h-8 rounded-full bg-background-darker flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="message flex gap-3 justify-start">
            <div className="avatar flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="message-content max-w-[80%] p-3 rounded-lg bg-background rounded-tl-none">
              <div className="typing-indicator flex gap-1">
                <span className="dot animate-bounce">.</span>
                <span className="dot animate-bounce" style={{ animationDelay: "0.2s" }}>
                  .
                </span>
                <span className="dot animate-bounce" style={{ animationDelay: "0.4s" }}>
                  .
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-actions bg-background p-2 border-t border-background-lighter flex justify-between">
        <div className="flex gap-2">
          <button
            className="p-2 text-muted hover:text-foreground transition-colors"
            onClick={clearChat}
            title="مسح المحادثة"
          >
            <Trash className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-muted hover:text-foreground transition-colors"
            onClick={saveChat}
            title="حفظ المحادثة"
            disabled={messages.length === 0}
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-muted hover:text-foreground transition-colors"
            onClick={downloadChat}
            title="تنزيل المحادثة"
            disabled={messages.length === 0}
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-muted hover:text-foreground transition-colors"
            onClick={copyLastMessage}
            title="نسخ الرسالة الأخيرة"
            disabled={messages.length === 0}
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-input bg-background p-4 border-t border-background-lighter">
        <div className="flex gap-2">
          <button type="button" className="p-2 text-muted hover:text-foreground transition-colors" title="إرفاق ملف">
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            className="flex-1 bg-background-lighter border border-background-lighter rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="اكتب رسالتك هنا..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
