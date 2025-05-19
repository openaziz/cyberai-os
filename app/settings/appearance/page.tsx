"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Globe, Moon, Save, Sun } from "lucide-react"

export default function AppearancePage() {
  const { toast } = useToast()
  const [theme, setTheme] = useState("dark")
  const [fontSize, setFontSize] = useState("medium")
  const [primaryColor, setPrimaryColor] = useState("blue")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // هنا يمكن إضافة كود لحفظ الإعدادات في قاعدة البيانات
      await new Promise((resolve) => setTimeout(resolve, 1000)) // محاكاة تأخير الشبكة

      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات المظهر بنجاح",
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
        <h1 className="text-3xl font-bold">إعدادات المظهر</h1>
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

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>السمة</CardTitle>
            <CardDescription>اختر سمة التطبيق</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>حجم الخط</CardTitle>
            <CardDescription>اختر حجم الخط المناسب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">حجم الخط</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="font-size" className="w-full">
                  <SelectValue placeholder="اختر حجم الخط" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغير</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="large">كبير</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اللون الأساسي</CardTitle>
            <CardDescription>اختر اللون الأساسي للتطبيق</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {["blue", "green", "purple", "red", "orange", "pink", "teal", "indigo"].map((color) => (
                <div
                  key={color}
                  className={`h-12 rounded-md cursor-pointer border-2 ${
                    primaryColor === color ? "border-black dark:border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setPrimaryColor(color)}
                  aria-label={`اللون ${color}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
