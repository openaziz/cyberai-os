"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar } from "../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { Separator } from "../components/ui/separator"
import { AlertCircle, Bot, ChevronDown, ChevronUp, Copy, Download, Send, Settings, User, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { ENV, isOpenRouterAvailable, isTogetherAvailable } from "../config/env"
import { callDeepSeekModel, callOpenRouterModel, callTogetherModel } from "../services/api"
import { saveToStorage, getFromStorage } from "../utils/storage"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  model: string
  createdAt: Date
  updatedAt: Date
}

const ChatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat")
  const [input, setInput] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("deepseek-r1-70b")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [showSettings, setShowSettings] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState("أنت مساعد ذكي ومفيد تقدم إجابات دقيقة وواضحة.")
  const [streamResponses, setStreamResponses] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [responseText, setResponseText] = useState("")

  // تحميل المحادثات المحفوظة
  useEffect(() => {
    const savedConversations = getFromStorage<Conversation[]>("cyberai_conversations", [])
    setConversations(savedConversations)

    // إنشاء محادثة جديدة إذا لم تكن هناك محادثات
    if (savedConversations.length === 0) {
      createNewConversation()
    } else {
      // تحميل آخر محادثة
      setCurrentConversation(savedConversations[0])
    }

    // تحميل الإعدادات المحفوظة
    const savedModel = getFromStorage<string>("cyberai_selected_model", "deepseek-r1-70b")
    const savedTemperature = getFromStorage<number>("cyberai_temperature", 0.7)
    const savedMaxTokens = getFromStorage<number>("cyberai_max_tokens", 1024)
    const savedSystemPrompt = getFromStorage<string>(
      "cyberai_system_prompt",
      "أنت مساعد ذكي ومفيد تقدم إجابات دقيقة وواضحة.",
    )
    const savedStreamResponses = getFromStorage<boolean>("cyberai_stream_responses", true)

    setSelectedModel(savedModel)
    setTemperature(savedTemperature)
    setMaxTokens(savedMaxTokens)
    setSystemPrompt(savedSystemPrompt)
    setStreamResponses(savedStreamResponses)
  }, [])

  // حفظ المحادثات والإعدادات عند تغييرها
  useEffect(() => {
    if (conversations.length > 0) {
      saveToStorage("cyberai_conversations", conversations)
    }
  }, [conversations])

  useEffect(() => {
    saveToStorage("cyberai_selected_model", selectedModel)
    saveToStorage("cyberai_temperature", temperature)
    saveToStorage("cyberai_max_tokens", maxTokens)
    saveToStorage("cyberai_system_prompt", systemPrompt)
    saveToStorage("cyberai_stream_responses", streamResponses)
  }, [selectedModel, temperature, maxTokens, systemPrompt, streamResponses])

  // التمرير إلى أسفل عند إضافة رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: `محادثة جديدة ${conversations.length + 1}`,
      messages: [],
      model: selectedModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setConversations([newConversation, ...conversations])
    setCurrentConversation(newConversation)
    setInput("")
    setActiveTab("chat")
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !currentConversation || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    // تحديث المحادثة الحالية
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      updatedAt: new Date(),
    }

    setCurrentConversation(updatedConversation)
    setConversations(conversations.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv)))

    setInput("")
    setIsLoading(true)
    setResponseText("")

    try {
      // إضافة رسالة المساعد الفارغة للبدء في الكتابة
      if (streamResponses) {
        const emptyAssistantMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        }

        const streamingConversation = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, emptyAssistantMessage],
          updatedAt: new Date(),
        }

        setCurrentConversation(streamingConversation)
        setConversations(
          conversations.map((conv) => (conv.id === streamingConversation.id ? streamingConversation : conv)),
        )
      }

      // إرسال الرسالة إلى النموذج المناسب
      let response
      if (selectedModel === "deepseek-r1-70b") {
        response = await callDeepSeekModel(input, {
          model: "deepseek-r1-70b-online",
          systemPrompt,
          temperature,
          maxTokens,
          stream: streamResponses,
          onChunk: handleStreamChunk,
        })
      } else if (selectedModel === "deepseek-r1-distill-llama-70b") {
        response = await callTogetherModel(input, {
          model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
          systemPrompt,
          temperature,
          maxTokens,
          stream: streamResponses,
          onChunk: handleStreamChunk,
        })
      } else if (selectedModel === "openrouter-gpt-4o") {
        response = await callOpenRouterModel(input, {
          model: "openai/gpt-4o",
          systemPrompt,
          temperature,
          maxTokens,
          stream: streamResponses,
          onChunk: handleStreamChunk,
        })
      } else {
        throw new Error("النموذج غير مدعوم")
      }

      // إذا لم نكن نستخدم المجرى، نضيف الرسالة كاملة
      if (!streamResponses) {
        const assistantMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          role: "assistant",
          content: response.choices[0].message.content,
          timestamp: new Date(),
        }

        const finalConversation = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, assistantMessage],
          updatedAt: new Date(),
        }

        setCurrentConversation(finalConversation)
        setConversations(conversations.map((conv) => (conv.id === finalConversation.id ? finalConversation : conv)))
      }

      // تحديث عنوان المحادثة إذا كانت أول رسالة
      if (updatedConversation.messages.length === 1) {
        const title = input.length > 30 ? `${input.substring(0, 30)}...` : input
        const titledConversation = {
          ...currentConversation,
          title,
        }
        setCurrentConversation(titledConversation)
        setConversations(conversations.map((conv) => (conv.id === titledConversation.id ? titledConversation : conv)))
      }
    } catch (error) {
      console.error("Error sending message:", error)

      // إضافة رسالة خطأ
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: "عذراً، حدث خطأ أثناء معالجة رسالتك. يرجى المحاولة مرة أخرى لاحقاً.",
        timestamp: new Date(),
      }

      const errorConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, errorMessage],
        updatedAt: new Date(),
      }

      setCurrentConversation(errorConversation)
      setConversations(conversations.map((conv) => (conv.id === errorConversation.id ? errorConversation : conv)))
    } finally {
      setIsLoading(false)
      // التركيز على حقل الإدخال بعد الإرسال
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleStreamChunk = (chunk: any) => {
    if (chunk.content) {
      setResponseText((prev) => prev + chunk.content)

      // تحديث آخر رسالة في المحادثة الحالية
      if (currentConversation) {
        const updatedMessages = [...currentConversation.messages]
        const lastMessageIndex = updatedMessages.length - 1

        if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].role === "assistant") {
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            content: responseText + chunk.content,
          }

          const updatedConversation = {
            ...currentConversation,
            messages: updatedMessages,
            updatedAt: new Date(),
          }

          setCurrentConversation(updatedConversation)
          setConversations(
            conversations.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv)),
          )
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleDeleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter((conv) => conv.id !== conversationId)
    setConversations(updatedConversations)

    if (currentConversation?.id === conversationId) {
      if (updatedConversations.length > 0) {
        setCurrentConversation(updatedConversations[0])
      } else {
        createNewConversation()
      }
    }
  }

  const copyConversation = () => {
    if (!currentConversation) return

    const conversationText = currentConversation.messages
      .map((msg) => {
        const role = msg.role === "user" ? "أنت" : msg.role === "assistant" ? "المساعد" : "النظام"
        return `${role}: ${msg.content}`
      })
      .join("\n\n")

    navigator.clipboard.writeText(conversationText).then(
      () => {
        alert("تم نسخ المحادثة إلى الحافظة")
      },
      (err) => {
        console.error("فشل في نسخ النص: ", err)
      },
    )
  }

  const downloadConversation = () => {
    if (!currentConversation) return

    const conversationText = currentConversation.messages
      .map((msg) => {
        const role = msg.role === "user" ? "أنت" : msg.role === "assistant" ? "المساعد" : "النظام"
        return `${role}: ${msg.content}`
      })
      .join("\n\n")

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentConversation.title.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="chat-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">المحادثة الذكية</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            تحدث مع نماذج الذكاء الاصطناعي المختلفة واحصل على إجابات لأسئلتك
          </p>
        </div>

        {!isOpenRouterAvailable() && !isTogetherAvailable() && (
          <Alert variant="warning" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>تنبيه</AlertTitle>
            <AlertDescription>بعض مفاتيح API غير متوفرة. قد لا تتمكن من استخدام بعض النماذج السحابية.</AlertDescription>
          </Alert>
        )}

        <div className="chat-container grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="conversations-sidebar md:col-span-1">
            <Card className="h-full">
              <div className="p-4">
                <Button variant="default" className="w-full mb-4" onClick={createNewConversation}>
                  <Zap className="h-4 w-4 mr-2" />
                  محادثة جديدة
                </Button>

                <div className="conversations-list space-y-2 max-h-[500px] overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`conversation-item p-3 rounded-md cursor-pointer transition-colors ${
                        currentConversation?.id === conversation.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-background-light"
                      }`}
                      onClick={() => {
                        setCurrentConversation(conversation)
                        setActiveTab("chat")
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="conversation-title font-medium truncate">{conversation.title}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm("هل أنت متأكد من حذف هذه المحادثة؟")) {
                              handleDeleteConversation(conversation.id)
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </Button>
                      </div>
                      <div className="conversation-meta flex items-center text-xs text-muted-foreground mt-1">
                        <Badge variant="outline" className="text-xs font-normal">
                          {conversation.model.includes("deepseek")
                            ? "DeepSeek"
                            : conversation.model.includes("openrouter")
                              ? "OpenRouter"
                              : "Local"}
                        </Badge>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(conversation.updatedAt).toLocaleDateString("ar-SA", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="chat-main md:col-span-3">
            <Card className="h-full flex flex-col">
              <div className="chat-header border-b border-border p-4">
                <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="chat" className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <span>المحادثة</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>الإعدادات</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={copyConversation}
                        title="نسخ المحادثة"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={downloadConversation}
                        title="تنزيل المحادثة"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </div>

              <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation?.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <img
                        src={`${ENV.BASE_URL}assets/chat-preview.png`}
                        alt="Chat Preview"
                        className="w-64 h-auto mb-6"
                      />
                      <h3 className="text-xl font-bold mb-2">ابدأ محادثة جديدة</h3>
                      <p className="text-muted-foreground max-w-md">
                        اطرح سؤالاً أو اطلب مساعدة في أي موضوع. يمكنك التحدث بحرية مع النموذج المختار.
                      </p>
                    </div>
                  ) : (
                    currentConversation?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message-container flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`message max-w-[80%] p-4 rounded-lg ${
                            message.role === "user"
                              ? "bg-primary/10 text-foreground"
                              : "bg-background-light text-foreground"
                          }`}
                        >
                          <div className="message-header flex items-center mb-2">
                            <div
                              className={`avatar-container flex items-center ${
                                message.role === "user" ? "text-primary" : "text-accent"
                              }`}
                            >
                              <Avatar className="h-6 w-6 mr-2">
                                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                              </Avatar>
                              <span className="font-medium">{message.role === "user" ? "أنت" : "المساعد"}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mr-auto">
                              {new Date(message.timestamp).toLocaleTimeString("ar-SA", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="message-content whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input border-t border-border p-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        ref={inputRef}
                        placeholder="اكتب رسالتك هنا..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-[80px] pr-12"
                        disabled={isLoading}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-2 right-2"
                        onClick={() => setShowSettings(!showSettings)}
                      >
                        {showSettings ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="h-10 px-4">
                      {isLoading ? (
                        <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {showSettings && (
                    <div className="chat-settings mt-4 p-4 bg-background-light rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="model-selector">
                          <Label htmlFor="model-select" className="block mb-2">
                            النموذج
                          </Label>
                          <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isLoading}>
                            <SelectTrigger id="model-select">
                              <SelectValue placeholder="اختر النموذج" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="deepseek-r1-70b">DeepSeek-R1-70B (Search1API)</SelectItem>
                              <SelectItem value="deepseek-r1-distill-llama-70b" disabled={!isTogetherAvailable()}>
                                DeepSeek-R1-Distill-Llama-70B (Together)
                              </SelectItem>
                              <SelectItem value="openrouter-gpt-4o" disabled={!isOpenRouterAvailable()}>
                                GPT-4o (OpenRouter)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="temperature-selector">
                          <Label htmlFor="temperature-slider" className="block mb-2">
                            درجة الإبداعية: {temperature}
                          </Label>
                          <Slider
                            id="temperature-slider"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[temperature]}
                            onValueChange={(value) => setTemperature(value[0])}
                            disabled={isLoading}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>دقيق</span>
                            <span>متوازن</span>
                            <span>إبداعي</span>
                          </div>
                        </div>

                        <div className="max-tokens-selector">
                          <Label htmlFor="max-tokens-slider" className="block mb-2">
                            الحد الأقصى للكلمات: {maxTokens}
                          </Label>
                          <Slider
                            id="max-tokens-slider"
                            min={256}
                            max={4096}
                            step={256}
                            value={[maxTokens]}
                            onValueChange={(value) => setMaxTokens(value[0])}
                            disabled={isLoading}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>قصير</span>
                            <span>متوسط</span>
                            <span>طويل</span>
                          </div>
                        </div>

                        <div className="stream-toggle">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="stream-toggle" className="cursor-pointer">
                              عرض الإجابة تدريجياً
                            </Label>
                            <Switch
                              id="stream-toggle"
                              checked={streamResponses}
                              onCheckedChange={setStreamResponses}
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="system-prompt">
                        <Label htmlFor="system-prompt" className="block mb-2">
                          توجيهات النظام
                        </Label>
                        <Textarea
                          id="system-prompt"
                          placeholder="أدخل توجيهات للنموذج..."
                          value={systemPrompt}
                          onChange={(e) => setSystemPrompt(e.target.value)}
                          className="min-h-[80px]"
                          disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          هذه التوجيهات تحدد سلوك النموذج وطريقة استجابته.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-4 m-0">
                <div className="settings-container space-y-6">
                  <div className="model-settings">
                    <h3 className="text-lg font-bold mb-4">إعدادات النموذج</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="model-selector">
                        <Label htmlFor="settings-model-select" className="block mb-2">
                          النموذج الافتراضي
                        </Label>
                        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isLoading}>
                          <SelectTrigger id="settings-model-select">
                            <SelectValue placeholder="اختر النموذج" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deepseek-r1-70b">DeepSeek-R1-70B (Search1API)</SelectItem>
                            <SelectItem value="deepseek-r1-distill-llama-70b" disabled={!isTogetherAvailable()}>
                              DeepSeek-R1-Distill-Llama-70B (Together)
                            </SelectItem>
                            <SelectItem value="openrouter-gpt-4o" disabled={!isOpenRouterAvailable()}>
                              GPT-4o (OpenRouter)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="temperature-selector">
                        <Label htmlFor="settings-temperature-slider" className="block mb-2">
                          درجة الإبداعية الافتراضية: {temperature}
                        </Label>
                        <Slider
                          id="settings-temperature-slider"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[temperature]}
                          onValueChange={(value) => setTemperature(value[0])}
                          disabled={isLoading}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>دقيق</span>
                          <span>متوازن</span>
                          <span>إبداعي</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="system-prompt-settings">
                    <h3 className="text-lg font-bold mb-4">توجيهات النظام الافتراضية</h3>
                    <Textarea
                      placeholder="أدخل توجيهات افتراضية للنموذج..."
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="min-h-[120px]"
                      disabled={isLoading}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      هذه التوجيهات ستستخدم لجميع المحادثات الجديدة. يمكنك تخصيص التوجيهات لكل محادثة على حدة.
                    </p>
                  </div>

                  <Separator />

                  <div className="api-settings">
                    <h3 className="text-lg font-bold mb-4">إعدادات API</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="openrouter-api-key" className="block mb-2">
                          مفتاح OpenRouter API
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1">
                          {isOpenRouterAvailable()
                            ? "مفتاح API متوفر. يمكنك استخدام نموذج GPT-4o."
                            : "مفتاح API غير متوفر. أضف المفتاح في ملف .env."}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="together-api-key" className="block mb-2">
                          مفتاح Together.xyz API
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1">
                          {isTogetherAvailable()
                            ? "مفتاح API متوفر. يمكنك استخدام نموذج DeepSeek-R1-Distill-Llama-70B."
                            : "مفتاح API غير متوفر. أضف المفتاح في ملف .env."}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="conversation-settings">
                    <h3 className="text-lg font-bold mb-4">إعدادات المحادثة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="max-tokens-setting" className="block mb-2">
                          الحد الأقصى للكلمات الافتراضي
                        </Label>
                        <Select value={maxTokens.toString()} onValueChange={(value) => setMaxTokens(Number(value))}>
                          <SelectTrigger id="max-tokens-setting">
                            <SelectValue placeholder="اختر الحد الأقصى للكلمات" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="256">256 (قصير)</SelectItem>
                            <SelectItem value="512">512</SelectItem>
                            <SelectItem value="1024">1024 (متوسط)</SelectItem>
                            <SelectItem value="2048">2048</SelectItem>
                            <SelectItem value="4096">4096 (طويل)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="stream-setting" className="cursor-pointer">
                            عرض الإجابة تدريجياً
                          </Label>
                          <Switch id="stream-setting" checked={streamResponses} onCheckedChange={setStreamResponses} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          عند تفعيل هذا الخيار، ستظهر إجابات النموذج تدريجياً أثناء إنشائها.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
