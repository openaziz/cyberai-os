"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Server, Cpu, Info, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  size?: string
  ram?: string
}

export default function ModelsPage() {
  const { toast } = useToast()
  const [models, setModels] = useState<Model[]>([])
  const [localModels, setLocalModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setError(null)
        const response = await fetch("/api/models")
        if (!response.ok) {
          throw new Error(`خطأ في الاستجابة: ${response.status}`)
        }
        const data = await response.json()
        setModels(data.models?.filter((m: Model) => m.type === "cloud") || [])
        setLocalModels(data.models?.filter((m: Model) => m.type === "local") || [])
      } catch (error: any) {
        console.error("خطأ في جلب النماذج:", error)
        setError(error.message || "فشل في جلب قائمة النماذج")
        toast({
          title: "خطأ",
          description: "فشل في جلب قائمة النماذج. يرجى التحقق من اتصالك بالإنترنت.",
          variant: "destructive",
        })

        // تعيين نماذج محلية وهمية للعرض في حالة الخطأ
        setLocalModels([
          {
            id: "llama2-7b",
            name: "Llama 2 (7B)",
            description: "نموذج متوسط الحجم مع أداء متوازن للحواسيب الشخصية",
            type: "local",
            provider: "meta",
            icon: "LL",
            color: "#4a55a7",
            apiId: "llama-2-7b-chat",
            multimodal: false,
            size: "4GB",
            ram: "8GB",
          },
          {
            id: "tinyllama",
            name: "TinyLlama (1.1B)",
            description: "نموذج خفيف مثالي للهواتف والأجهزة محدودة الموارد",
            type: "local",
            provider: "tiny",
            icon: "TL",
            color: "#7e57c2",
            apiId: "tinyllama-1.1b-chat",
            multimodal: false,
            size: "600MB",
            ram: "2GB",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchModels()
  }, [toast])

  const handleDownloadModel = (modelId: string) => {
    toast({
      title: "جاري التنزيل",
      description: `بدأ تنزيل النموذج ${modelId}. سيتم إعلامك عند الانتهاء.`,
    })
  }

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    // إعادة محاولة جلب النماذج
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models")
        if (!response.ok) {
          throw new Error(`خطأ في الاستجابة: ${response.status}`)
        }
        const data = await response.json()
        setModels(data.models?.filter((m: Model) => m.type === "cloud") || [])
        setLocalModels(data.models?.filter((m: Model) => m.type === "local") || [])
      } catch (error: any) {
        console.error("خطأ في جلب النماذج:", error)
        setError(error.message || "فشل في جلب قائمة النماذج")
      } finally {
        setIsLoading(false)
      }
    }

    fetchModels()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">نماذج الذكاء الاصطناعي</h1>
        {error && (
          <Button onClick={handleRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ في جلب النماذج</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={handleRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                إعادة المحاولة
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="local" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="local" className="gap-2">
            <Cpu className="h-4 w-4" />
            النماذج المحلية
          </TabsTrigger>
          <TabsTrigger value="cloud" className="gap-2">
            <Server className="h-4 w-4" />
            النماذج السحابية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="opacity-50">
                      <CardHeader className="space-y-2">
                        <div className="h-6 w-1/2 bg-muted rounded"></div>
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-20 bg-muted rounded"></div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </CardFooter>
                    </Card>
                  ))
              : localModels.map((model) => (
                  <Card key={model.id} className="overflow-hidden border border-border">
                    <div className="h-2" style={{ backgroundColor: model.color }}></div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: model.color }}
                          >
                            {model.icon}
                          </div>
                          {model.name}
                        </CardTitle>
                        <span className="px-2 py-1 bg-secondary text-xs rounded-full">محلي</span>
                      </div>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">الحجم:</span>
                          <span className="text-muted-foreground">{model.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">الذاكرة:</span>
                          <span className="text-muted-foreground">{model.ram}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">المزود:</span>
                          <span className="text-muted-foreground">{model.provider}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">متعدد الوسائط:</span>
                          <span className="text-muted-foreground">{model.multimodal ? "نعم" : "لا"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Info className="h-4 w-4" />
                        التفاصيل
                      </Button>
                      <Button size="sm" className="gap-1" onClick={() => handleDownloadModel(model.id)}>
                        <Download className="h-4 w-4" />
                        تنزيل
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </TabsContent>

        <TabsContent value="cloud" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="opacity-50">
                      <CardHeader className="space-y-2">
                        <div className="h-6 w-1/2 bg-muted rounded"></div>
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-20 bg-muted rounded"></div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </CardFooter>
                    </Card>
                  ))
              : models.map((model) => (
                  <Card key={model.id} className="overflow-hidden border border-border">
                    <div className="h-2" style={{ backgroundColor: model.color }}></div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: model.color }}
                          >
                            {model.icon}
                          </div>
                          {model.name}
                        </CardTitle>
                        <span className="px-2 py-1 bg-secondary text-xs rounded-full">{model.provider}</span>
                      </div>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">النوع:</span>
                          <span className="text-muted-foreground">{model.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">متعدد الوسائط:</span>
                          <span className="text-muted-foreground">{model.multimodal ? "نعم" : "لا"}</span>
                        </div>
                        {model.imageGeneration && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">توليد الصور:</span>
                            <span className="text-muted-foreground">نعم</span>
                          </div>
                        )}
                        {model.embeddings && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">التضمينات:</span>
                            <span className="text-muted-foreground">نعم</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button size="sm" className="gap-1">
                        استخدام
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
