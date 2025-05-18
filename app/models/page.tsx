"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Cloud, Download, HardDrive, Info, Server, Settings, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ENV, isOpenRouterAvailable, isTogetherAvailable } from "@/config/env"

interface Model {
  id: string
  name: string
  provider: string
  type: "cloud" | "local"
  size: string
  parameters: string
  status: "available" | "downloading" | "not-downloaded" | "error"
  progress?: number
  description: string
  capabilities: string[]
  contextLength: number
}

const ModelsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cloud")
  const [cloudModels, setCloudModels] = useState<Model[]>([])
  const [localModels, setLocalModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل البيانات من API
    const fetchModels = async () => {
      setIsLoading(true)
      try {
        // في التطبيق الحقيقي، هذه البيانات ستأتي من API
        const cloud: Model[] = [
          {
            id: "deepseek-r1-70b",
            name: "DeepSeek-R1-70B",
            provider: "Search1API",
            type: "cloud",
            size: "70B",
            parameters: "70 مليار",
            status: "available", // نفترض أنه متاح دائمًا لأنه لا يتطلب مفتاح API
            description: "نموذج DeepSeek-R1 بحجم 70 مليار معلمة، قوي جداً ومناسب للمهام المعقدة.",
            capabilities: ["محادثة", "إنشاء نصوص", "إجابة أسئلة", "تلخيص", "برمجة", "تحليل بيانات"],
            contextLength: 8192,
          },
          {
            id: "deepseek-r1-distill-llama-70b",
            name: "DeepSeek-R1-Distill-Llama-70B",
            provider: "Together.xyz",
            type: "cloud",
            size: "70B",
            parameters: "70 مليار",
            status: isTogetherAvailable() ? "available" : "error",
            description: "نسخة مقطرة من نموذج DeepSeek-R1 بحجم 70 مليار معلمة، يوفر توازنًا بين الأداء والسرعة.",
            capabilities: ["محادثة", "إنشاء نصوص", "إجابة أسئلة", "تلخيص", "برمجة"],
            contextLength: 8192,
          },
          {
            id: "openrouter-gpt-4o",
            name: "GPT-4o",
            provider: "OpenRouter",
            type: "cloud",
            size: "~1.8T",
            parameters: "~1.8 تريليون",
            status: isOpenRouterAvailable() ? "available" : "error",
            description: "أحدث نموذج من OpenAI، متفوق في جميع المهام تقريباً.",
            capabilities: [
              "محادثة",
              "إنشاء نصوص",
              "إجابة أسئلة",
              "تلخيص",
              "برمجة",
              "تحليل بيانات",
              "استدلال منطقي",
              "فهم الصور",
            ],
            contextLength: 128000,
          },
        ]

        const local: Model[] = [
          {
            id: "tinyllama",
            name: "TinyLlama",
            provider: "Local",
            type: "local",
            size: "1.1B",
            parameters: "1.1 مليار",
            status: "not-downloaded",
            description: "نموذج صغير الحجم مناسب للأجهزة محدودة الموارد.",
            capabilities: ["محادثة بسيطة", "إنشاء نصوص قصيرة", "إجابة أسئلة بسيطة"],
            contextLength: 2048,
          },
          {
            id: "phi-2",
            name: "Phi-2",
            provider: "Local",
            type: "local",
            size: "2.7B",
            parameters: "2.7 مليار",
            status: "not-downloaded",
            description: "نموذج من Microsoft يتميز بأداء جيد رغم حجمه الصغير.",
            capabilities: ["محادثة", "إنشاء نصوص", "إجابة أسئلة", "برمجة بسيطة"],
            contextLength: 2048,
          },
          {
            id: "mistral-7b",
            name: "Mistral 7B",
            provider: "Local",
            type: "local",
            size: "7B",
            parameters: "7 مليار",
            status: "not-downloaded",
            description: "نموذج قوي من Mistral AI يتفوق على نماذج أكبر حجماً.",
            capabilities: ["محادثة", "إنشاء نصوص", "إجابة أسئلة", "تلخيص", "برمجة"],
            contextLength: 8192,
          },
          {
            id: "llama2-7b",
            name: "Llama 2 7B",
            provider: "Local",
            type: "local",
            size: "7B",
            parameters: "7 مليار",
            status: "not-downloaded",
            description: "نموذج من Meta مناسب للتشغيل المحلي على أجهزة متوسطة القوة.",
            capabilities: ["محادثة", "إنشاء نصوص", "إجابة أسئلة", "تلخيص"],
            contextLength: 4096,
          },
        ]

        setCloudModels(cloud)
        setLocalModels(local)
      } catch (error) {
        console.error("Error fetching models:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchModels()
  }, [])

  const handleDownloadModel = (modelId: string) => {
    setLocalModels((prev) =>
      prev.map((model) => {
        if (model.id === modelId) {
          return { ...model, status: "downloading", progress: 0 }
        }
        return model
      }),
    )

    // محاكاة عملية التنزيل
    const interval = setInterval(() => {
      setLocalModels((prev) =>
        prev.map((model) => {
          if (model.id === modelId && model.status === "downloading") {
            const newProgress = (model.progress || 0) + 10
            if (newProgress >= 100) {
              clearInterval(interval)
              return { ...model, status: "available", progress: 100 }
            }
            return { ...model, progress: newProgress }
          }
          return model
        }),
      )
    }, 1000)
  }

  const renderModelCard = (model: Model) => {
    return (
      <Card key={model.id} className="model-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{model.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                {model.type === "cloud" ? (
                  <Cloud className="h-4 w-4 mr-1 text-primary" />
                ) : (
                  <HardDrive className="h-4 w-4 mr-1 text-primary" />
                )}
                {model.provider} · {model.size} · {model.parameters} معلمة
              </CardDescription>
            </div>
            <Badge
              variant={
                model.status === "available"
                  ? "success"
                  : model.status === "downloading"
                    ? "outline"
                    : model.status === "error"
                      ? "destructive"
                      : "secondary"
              }
              className="ml-2"
            >
              {model.status === "available"
                ? "متاح"
                : model.status === "downloading"
                  ? "جاري التنزيل"
                  : model.status === "error"
                    ? "غير متاح"
                    : "غير منزل"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground mb-2">{model.description}</p>

          {model.status === "downloading" && (
            <div className="mb-2">
              <Progress value={model.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-center">{model.progress}%</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mt-3">
            {model.capabilities.map((capability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {capability}
              </Badge>
            ))}
          </div>

          <div className="flex items-center mt-3 text-xs text-muted-foreground">
            <Info className="h-3 w-3 mr-1" />
            <span>طول السياق: {model.contextLength.toLocaleString()} توكن</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          {model.type === "local" ? (
            model.status === "available" ? (
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                إدارة النموذج
              </Button>
            ) : model.status === "downloading" ? (
              <Button variant="outline" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2 animate-pulse" />
                جاري التنزيل...
              </Button>
            ) : (
              <Button variant="default" className="w-full" onClick={() => handleDownloadModel(model.id)}>
                <Download className="h-4 w-4 mr-2" />
                تنزيل النموذج
              </Button>
            )
          ) : (
            <Button
              variant={model.status === "available" ? "default" : "outline"}
              className="w-full"
              disabled={model.status !== "available"}
            >
              {model.status === "available" ? (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  استخدام النموذج
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  غير متاح
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="models-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">نماذج الذكاء الاصطناعي</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            استكشف واستخدم مجموعة متنوعة من نماذج الذكاء الاصطناعي، سواء كانت سحابية أو محلية
          </p>
        </div>

        {(!isOpenRouterAvailable() || !isTogetherAvailable()) && (
          <Alert variant="warning" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>تنبيه</AlertTitle>
            <AlertDescription>
              {!isOpenRouterAvailable() && !isTogetherAvailable()
                ? "مفاتيح API لـ OpenRouter و Together.xyz غير متوفرة. بعض النماذج السحابية لن تكون متاحة."
                : !isOpenRouterAvailable()
                  ? "مفتاح API لـ OpenRouter غير متوفر. نموذج GPT-4o لن يكون متاحًا."
                  : "مفتاح API لـ Together.xyz غير متوفر. نموذج DeepSeek-R1-Distill-Llama-70B لن يكون متاحًا."}
            </AlertDescription>
          </Alert>
        )}

        <div className="model-visualization mb-8">
          <img
            src={`${ENV.BASE_URL}assets/model-visualization.png`}
            alt="Model Visualization"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <Tabs defaultValue="cloud" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                <span>نماذج سحابية</span>
                <Badge variant="outline" className="ml-2">
                  {cloudModels.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="local" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span>نماذج محلية</span>
                <Badge variant="outline" className="ml-2">
                  {localModels.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cloud" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{cloudModels.map(renderModelCard)}</div>

            <Alert className="mt-8">
              <Server className="h-4 w-4" />
              <AlertTitle>معلومات عن النماذج السحابية</AlertTitle>
              <AlertDescription>
                النماذج السحابية تعمل على خوادم بعيدة وتتطلب اتصالاً بالإنترنت. نموذج DeepSeek-R1-70B متاح دائمًا عبر
                Search1API، بينما تتطلب النماذج الأخرى مفاتيح API خاصة.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="local" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{localModels.map(renderModelCard)}</div>

            <Alert className="mt-8">
              <HardDrive className="h-4 w-4" />
              <AlertTitle>معلومات عن النماذج المحلية</AlertTitle>
              <AlertDescription>
                النماذج المحلية تعمل على جهازك مباشرة وتوفر خصوصية أكبر. تأكد من توفر مساحة كافية على جهازك قبل تنزيل
                هذه النماذج.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-background-light p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Check className="h-5 w-5 mr-2 text-primary" />
            مقارنة بين النماذج
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-right">النموذج</th>
                  <th className="py-3 px-4 text-center">الحجم</th>
                  <th className="py-3 px-4 text-center">طول السياق</th>
                  <th className="py-3 px-4 text-center">السرعة</th>
                  <th className="py-3 px-4 text-center">الدقة</th>
                  <th className="py-3 px-4 text-center">النوع</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">TinyLlama</td>
                  <td className="py-3 px-4 text-center">1.1B</td>
                  <td className="py-3 px-4 text-center">2,048</td>
                  <td className="py-3 px-4 text-center">عالية جداً</td>
                  <td className="py-3 px-4 text-center">منخفضة</td>
                  <td className="py-3 px-4 text-center">محلي</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">Phi-2</td>
                  <td className="py-3 px-4 text-center">2.7B</td>
                  <td className="py-3 px-4 text-center">2,048</td>
                  <td className="py-3 px-4 text-center">عالية</td>
                  <td className="py-3 px-4 text-center">متوسطة</td>
                  <td className="py-3 px-4 text-center">محلي</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">Mistral 7B</td>
                  <td className="py-3 px-4 text-center">7B</td>
                  <td className="py-3 px-4 text-center">8,192</td>
                  <td className="py-3 px-4 text-center">متوسطة</td>
                  <td className="py-3 px-4 text-center">عالية</td>
                  <td className="py-3 px-4 text-center">محلي</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">DeepSeek-R1-70B</td>
                  <td className="py-3 px-4 text-center">70B</td>
                  <td className="py-3 px-4 text-center">8,192</td>
                  <td className="py-3 px-4 text-center">عالية</td>
                  <td className="py-3 px-4 text-center">عالية جداً</td>
                  <td className="py-3 px-4 text-center">سحابي</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">DeepSeek-R1-Distill-Llama-70B</td>
                  <td className="py-3 px-4 text-center">70B</td>
                  <td className="py-3 px-4 text-center">8,192</td>
                  <td className="py-3 px-4 text-center">عالية جداً</td>
                  <td className="py-3 px-4 text-center">عالية</td>
                  <td className="py-3 px-4 text-center">سحابي</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">GPT-4o</td>
                  <td className="py-3 px-4 text-center">~1.8T</td>
                  <td className="py-3 px-4 text-center">128,000</td>
                  <td className="py-3 px-4 text-center">عالية</td>
                  <td className="py-3 px-4 text-center">ممتازة</td>
                  <td className="py-3 px-4 text-center">سحابي</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelsPage
