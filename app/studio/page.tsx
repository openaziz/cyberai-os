"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ThumbsUp, ThumbsDown, Copy, Settings, Code, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import CodeEditor from "@/components/code-editor"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  liked?: boolean
  disliked?: boolean
  code?: string
}

export default function StudioPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "مرحباً! أنا Devil، مساعدك لإنشاء واجهات المستخدم. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
    {
      id: "2",
      role: "user",
      content: "أريد إنشاء صفحة تسجيل دخول بتصميم عصري",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "3",
      role: "assistant",
      content:
        "بالتأكيد! سأقوم بإنشاء صفحة تسجيل دخول بتصميم عصري لك. هل تريد أن تتضمن تسجيل الدخول باستخدام وسائل التواصل الاجتماعي أيضاً؟",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "4",
      role: "user",
      content: "نعم، أضف خيارات تسجيل الدخول باستخدام Google وGitHub",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "5",
      role: "assistant",
      content:
        "ممتاز! قمت بإنشاء صفحة تسجيل دخول عصرية مع خيارات تسجيل الدخول باستخدام Google وGitHub. يمكنك رؤية الكود والمعاينة أدناه.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      code: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة منطق تسجيل الدخول
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل بيانات تسجيل الدخول الخاصة بك أو استخدم إحدى الطرق البديلة أدناه
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="example@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Button variant="link" className="p-0 h-auto text-sm">
                  نسيت كلمة المرور؟
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">تذكرني</Label>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              تسجيل الدخول
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">أو</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-sm">
            ليس لديك حساب؟ إنشاء حساب جديد
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
    },
    {
      id: "6",
      role: "user",
      content: "رائع! هل يمكنك إضافة وضع مظلم/فاتح للصفحة؟",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
    },
    {
      id: "7",
      role: "assistant",
      content:
        "بالتأكيد! قمت بإضافة زر لتبديل الوضع المظلم/الفاتح في صفحة تسجيل الدخول. يمكنك رؤية الكود المحدث أدناه.",
      timestamp: new Date(),
      code: `"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Moon, Sun } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // تحقق من الوضع المفضل للمستخدم عند تحميل الصفحة
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (prefersDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  // تبديل الوضع المظلم/الفاتح
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة منطق تسجيل الدخول
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">تبديل الوضع المظلم</span>
        </Button>
      </div>
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل بيانات تسجيل الدخول الخاصة بك أو استخدم إحدى الطرق البديلة أدناه
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="example@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Button variant="link" className="p-0 h-auto text-sm">
                  نسيت كلمة المرور؟
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">تذكرني</Label>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              تسجيل الدخول
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">أو</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-sm">
            ليس لديك حساب؟ إنشاء حساب جديد
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // إعدادات النموذج
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState(2048)
  const [useTypeScript, setUseTypeScript] = useState(true)
  const [useTailwind, setUseTailwind] = useState(true)
  const [useReact, setUseReact] = useState(true)
  const [useNextjs, setUseNextjs] = useState(true)

  // التمرير إلى آخر رسالة عند إضافة رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "أنا أعمل على طلبك...",
        timestamp: new Date(),
        code: `// هذا مثال للكود الذي سيتم توليده بناءً على طلبك
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ExampleComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">مثال على المكون</h1>
      <p className="mb-4">العداد الحالي: {count}</p>
      <Button onClick={() => setCount(count + 1)}>زيادة العداد</Button>
    </div>
  )
}`,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLike = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return { ...msg, liked: !msg.liked, disliked: false }
        }
        return msg
      }),
    )
  }

  const handleDislike = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return { ...msg, disliked: !msg.disliked, liked: false }
        }
        return msg
      }),
    )
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* القسم الأيسر - المحادثة */}
      <div className="w-1/3 border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">المحادثة مع Devil</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex flex-col", message.role === "user" ? "items-start" : "items-start")}
              >
                <div className="flex items-start gap-3">
                  {message.role === "assistant" ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/devil-logo.png" alt="Devil" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-usizv.png" alt="المستخدم" />
                      <AvatarFallback>أ</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.role === "assistant" ? "Devil" : "أنت"}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 max-w-[85%]",
                        message.role === "assistant" ? "bg-green-500/10 text-foreground" : "bg-muted text-foreground",
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8",
                            message.liked ? "text-green-500 bg-green-500/10" : "text-muted-foreground",
                          )}
                          onClick={() => handleLike(message.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8",
                            message.disliked ? "text-red-500 bg-red-500/10" : "text-muted-foreground",
                          )}
                          onClick={() => handleDislike(message.id)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        {message.code && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => navigator.clipboard.writeText(message.code || "")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="اكتب رسالتك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="resize-none"
              rows={3}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="h-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* القسم الأوسط - الإعدادات */}
      <div className="w-1/4 border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">الإعدادات</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">إعدادات النموذج</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">درجة الإبداعية</Label>
                  <span className="text-sm text-muted-foreground">{temperature[0]}</span>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={temperature}
                  onValueChange={setTemperature}
                />
                <p className="text-xs text-muted-foreground">
                  القيم المنخفضة تنتج نتائج أكثر تحديدًا، والقيم العالية تنتج نتائج أكثر إبداعًا.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="max-tokens">الحد الأقصى للرموز</Label>
                  <span className="text-sm text-muted-foreground">{maxTokens}</span>
                </div>
                <Input
                  id="max-tokens"
                  type="number"
                  min={1}
                  max={4096}
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">الحد الأقصى لعدد الرموز في الاستجابة.</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">تقنيات الإخراج</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-500" />
                    <Label htmlFor="typescript">TypeScript</Label>
                  </div>
                  <Switch id="typescript" checked={useTypeScript} onCheckedChange={setUseTypeScript} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-sky-500" />
                    <Label htmlFor="tailwind">Tailwind CSS</Label>
                  </div>
                  <Switch id="tailwind" checked={useTailwind} onCheckedChange={setUseTailwind} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-cyan-500" />
                    <Label htmlFor="react">React</Label>
                  </div>
                  <Switch id="react" checked={useReact} onCheckedChange={setUseReact} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-white" />
                    <Label htmlFor="nextjs">Next.js</Label>
                  </div>
                  <Switch id="nextjs" checked={useNextjs} onCheckedChange={setUseNextjs} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">المكتبات المدعومة</h3>
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="justify-center py-1">
                  shadcn/ui
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  Radix UI
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  Framer Motion
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  Lucide Icons
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  React Hook Form
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  Zod
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">قواعد البيانات</h3>
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="justify-center py-1">
                  Supabase
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  Firebase
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  MongoDB
                </Badge>
                <Badge variant="outline" className="justify-center py-1">
                  PostgreSQL
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات متقدمة
          </Button>
        </div>
      </div>

      {/* القسم الأيمن - محرر الكود */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">الكود المولد</h2>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="preview" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code">الكود</TabsTrigger>
                <TabsTrigger value="preview">المعاينة</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <CodeEditor
            code={
              messages.findLast((msg) => msg.code)?.code ||
              `// سيظهر هنا الكود المولد من المحادثة
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ExampleComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">مثال على المكون</h1>
      <p className="mb-4">العداد الحالي: {count}</p>
      <Button onClick={() => setCount(count + 1)}>زيادة العداد</Button>
    </div>
  )
}`
            }
          />
        </div>
      </div>
    </div>
  )
}
