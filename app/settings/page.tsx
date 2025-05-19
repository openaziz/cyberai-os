"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Bot, Globe, Moon, Save, Server, SettingsIcon, Sun } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("ar")
  const [defaultModel, setDefaultModel] = useState("deepseek")
  const [enableHistory, setEnableHistory] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // هنا يمكن إضافة كود لحفظ الإعدادات في قاعدة البيانات
      await new Promise((resolve) => setTimeout(resolve, 1000)) // محاكاة تأخير الشبكة

      toast({
        title: "تم الحفظ",
        description: "تم حفظ الإعدادات بنجاح",
      })
    } catch (error) {
      console.error("خطأ في حفظ الإعدادات:", error)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">الإعدادات</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Sun className="h-4 w-4" />
            المظهر
          </TabsTrigger>
          <TabsTrigger value="models" className="gap-2">
            <Bot className="h-4 w-4" />
            النماذج
          </TabsTrigger>
          <TabsTrigger value="connections" className="gap-2">
            <Server className="h-4 w-4" />
            الاتصالات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات عامة للتطبيق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="history">حفظ سجل المحادثات</Label>
                  <p className="text-sm text-muted-foreground">تخزين المحادثات السابقة لاستخدامها لاحقاً</p>
                </div>
                <Switch id="history" checked={enableHistory} onCheckedChange={setEnableHistory} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="language">اللغة</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المظهر</CardTitle>
              <CardDescription>تخصيص مظهر التطبيق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center gap-2 h-auto p-4"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-6 w-6" />
                  <span>فاتح</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center gap-2 h-auto p-4"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span>داكن</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center gap-2 h-auto p-4"
                  onClick={() => setTheme("system")}
                >
                  <Globe className="h-6 w-6" />
                  <span>النظام</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النماذج</CardTitle>
              <CardDescription>تخصيص إعدادات نماذج الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-model">النموذج الافتراضي</Label>
                <Select value={defaultModel} onValueChange={setDefaultModel}>
                  <SelectTrigger id="default-model" className="w-full">
                    <SelectValue placeholder="اختر النموذج الافتراضي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepseek">DeepSeek-R1</SelectItem>
                    <SelectItem value="llama4">Llama-4-Maverick-17B</SelectItem>
                    <SelectItem value="gemma3">Gemma-3-27B</SelectItem>
                    <SelectItem value="groq-llama3">Llama-3-70B (Groq)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الاتصالات</CardTitle>
              <CardDescription>إدارة اتصالات الخدمات الخارجية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="together-api-key">مفتاح Together AI API</Label>
                <Input id="together-api-key" type="password" placeholder="أدخل مفتاح API" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groq-api-key">مفتاح Groq API</Label>
                <Input id="groq-api-key" type="password" placeholder="أدخل مفتاح API" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="upstash-url">رابط Upstash Redis</Label>
                <Input id="upstash-url" type="text" placeholder="أدخل رابط Upstash" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="upstash-token">رمز Upstash Redis</Label>
                <Input id="upstash-token" type="password" placeholder="أدخل رمز Upstash" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
          {isSaving ? (
            "جاري الحفظ..."
          ) : (
            <>
              <Save className="h-4 w-4" />
              حفظ الإعدادات
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
