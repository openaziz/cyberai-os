"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModelsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">نماذج الذكاء الاصطناعي</h1>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">النماذج المتاحة</TabsTrigger>
          <TabsTrigger value="custom">النماذج المخصصة</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableModels.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>{model.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{model.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{model.status}</span>
                    <button className="text-sm text-blue-600 hover:underline">استخدام</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <div className="text-center p-8">
            <h3 className="text-xl font-medium mb-2">لا توجد نماذج مخصصة حتى الآن</h3>
            <p className="text-gray-500 mb-4">قم بإنشاء نموذج مخصص جديد لبدء الاستخدام</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">إنشاء نموذج جديد</button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النماذج</CardTitle>
              <CardDescription>قم بتعديل إعدادات النماذج والمزودين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">مزودو النماذج</h4>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span>OpenRouter</span>
                      <button className="text-sm text-blue-600 hover:underline">تكوين</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Groq</span>
                      <button className="text-sm text-blue-600 hover:underline">تكوين</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>DeepSeek</span>
                      <button className="text-sm text-blue-600 hover:underline">تكوين</button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const availableModels = [
  {
    id: 1,
    name: "GPT-4o",
    provider: "OpenRouter",
    description: "أحدث نموذج من OpenAI مع قدرات متقدمة في فهم اللغة والصور",
    status: "متاح",
  },
  {
    id: 2,
    name: "DeepSeek-R1-70B",
    provider: "DeepSeek",
    description: "نموذج قوي للمهام المعقدة والبرمجة",
    status: "متاح",
  },
  {
    id: 3,
    name: "Llama-3-70B",
    provider: "Together",
    description: "نموذج مفتوح المصدر من Meta مع أداء ممتاز",
    status: "متاح",
  },
  {
    id: 4,
    name: "Mixtral-8x7B",
    provider: "Groq",
    description: "نموذج سريع مع قدرات متعددة اللغات",
    status: "متاح",
  },
  {
    id: 5,
    name: "Claude-3-Opus",
    provider: "OpenRouter",
    description: "نموذج متقدم من Anthropic مع فهم عميق للسياق",
    status: "متاح",
  },
  {
    id: 6,
    name: "Gemini-Pro",
    provider: "OpenRouter",
    description: "نموذج متعدد الوسائط من Google",
    status: "متاح",
  },
]
