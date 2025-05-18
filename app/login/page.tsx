"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import { ENV } from "@/config/env"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="login-page py-16 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">مرحباً بك في CyberAI OS</h1>
          <p className="text-muted-foreground">سجل دخولك للوصول إلى جميع الميزات</p>
        </div>

        <Card>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" className="pl-10" />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        كلمة المرور
                      </label>
                      <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-700 transition-colors">
                        نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        className="pl-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    تسجيل الدخول
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-background-lighter w-full"></div>
                    <span className="bg-background px-2 text-xs text-muted-foreground absolute">أو</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Github className="h-5 w-5 ml-2" />
                    تسجيل الدخول باستخدام GitHub
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      الاسم
                    </label>
                    <Input id="name" type="text" placeholder="أدخل اسمك الكامل" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="register-email" className="text-sm font-medium">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Input id="register-email" type="email" placeholder="أدخل بريدك الإلكتروني" className="pl-10" />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="register-password" className="text-sm font-medium">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        className="pl-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    إنشاء حساب
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-background-lighter w-full"></div>
                    <span className="bg-background px-2 text-xs text-muted-foreground absolute">أو</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Github className="h-5 w-5 ml-2" />
                    التسجيل باستخدام GitHub
                  </Button>
                </form>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                {activeTab === "login" ? (
                  <>
                    ليس لديك حساب؟{" "}
                    <button
                      onClick={() => setActiveTab("register")}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      إنشاء حساب
                    </button>
                  </>
                ) : (
                  <>
                    لديك حساب بالفعل؟{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                  </>
                )}
              </p>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
