"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

type Model = {
  id: string
  name: string
  description: string
  type: string
  provider: string
  icon: string
  color: string
  apiId: string
  multimodal: boolean
  imageGeneration?: boolean
  embeddings?: boolean
}

export default function ModelsPage() {
  const { toast } = useToast()
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [defaultModel, setDefaultModel] = useState("deepseek")
  const [enableMultimodal, setEnableMultimodal] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models")
        if (!response.ok) {
          throw new Error(`خطأ في الاستجابة: ${response.status}`)
        }
        const data = await response.json()
        setModels(data.models || [])
      } catch (error) {
        console.error("خطأ في جلب النماذج:", error)
        toast({
          title: "خطأ",
          description: "فشل في جلب قائمة النماذج",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchModels()
  }, [toast])

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // هنا يمكن إضافة كود لحفظ الإعدادات في قاعدة البيانات
      await new Promise((resolve) => setTimeout(resolve, 1000)) // محاكاة تأخير الشبكة

      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات النماذج بنجاح",
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
        <h1 className="text-3xl font-bold">إعدادات النماذج</h1>
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
            <CardTitle>الإعدادات العامة للنماذج</CardTitle>
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
                  {models
                    .filter((model) => !model.imageGeneration && !model.embeddings)
                    .map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multimodal">تمكين النماذج متعددة الوسائط</Label>
                <p className="text-sm text-muted-foreground">السماح باستخدام النماذج التي تدعم الصور والنصوص</p>
              </div>
              <Switch id="multimodal" checked={enableMultimodal} onCheckedChange={setEnableMultimodal} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>النماذج المتاحة</CardTitle>
            <CardDescription>قائمة بجميع نماذج الذكاء الاصطناعي المتاحة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <p>جاري تحميل النماذج...</p>
              ) : (
                models.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ borderLeftColor: model.color, borderLeftWidth: "4px" }}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold"
                      style={{ backgroundColor: model.color }}
                    >
                      {model.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100">
                          {model.provider}
                        </span>
                        {model.multimodal && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            متعدد الوسائط
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
