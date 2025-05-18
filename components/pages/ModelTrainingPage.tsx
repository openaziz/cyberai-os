"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ModelTrainingPage() {
  const [activeTraining, setActiveTraining] = useState(false)
  const [progress, setProgress] = useState(0)

  const startTraining = () => {
    setActiveTraining(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setActiveTraining(false)
          return 100
        }
        return prev + 1
      })
    }, 300)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">تدريب النماذج</h1>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">تدريب جديد</TabsTrigger>
          <TabsTrigger value="history">سجل التدريب</TabsTrigger>
          <TabsTrigger value="datasets">مجموعات البيانات</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تدريب نموذج جديد</CardTitle>
              <CardDescription>قم بإعداد وتشغيل عملية تدريب جديدة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">النموذج الأساسي</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option value="llama3">Llama 3 (7B)</option>
                      <option value="mistral">Mistral (7B)</option>
                      <option value="phi3">Phi-3 (3.8B)</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">مجموعة البيانات</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option value="custom">مجموعة بيانات مخصصة</option>
                      <option value="qa">أسئلة وأجوبة عامة</option>
                      <option value="code">بيانات برمجية</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">معلمات التدريب</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">معدل التعلم</label>
                        <input type="number" className="w-full p-2 border rounded-md" defaultValue="0.0001" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">عدد الدورات</label>
                        <input type="number" className="w-full p-2 border rounded-md" defaultValue="3" />
                      </div>
                    </div>
                  </div>
                </div>

                {activeTraining ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>تقدم التدريب</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <Button variant="outline" className="w-full" onClick={() => setActiveTraining(false)}>
                      إلغاء التدريب
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={startTraining}>
                    بدء التدريب
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {trainingHistory.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge
                      variant={item.status === "مكتمل" ? "success" : item.status === "جاري" ? "default" : "secondary"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>النموذج الأساسي:</span>
                      <span>{item.baseModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مجموعة البيانات:</span>
                      <span>{item.dataset}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الدورات:</span>
                      <span>{item.epochs}</span>
                    </div>
                    {item.status === "مكتمل" && (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        تحميل النموذج
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((dataset) => (
              <Card key={dataset.id}>
                <CardHeader>
                  <CardTitle>{dataset.name}</CardTitle>
                  <CardDescription>{dataset.records} سجل</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">{dataset.description}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      عرض
                    </Button>
                    <Button variant="outline" size="sm">
                      تحرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl mb-4">+</div>
              <p className="text-center mb-4">إضافة مجموعة بيانات جديدة</p>
              <Button>إنشاء</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const trainingHistory = [
  {
    id: 1,
    name: "نموذج المساعد العربي",
    status: "مكتمل",
    date: "2023-12-15",
    baseModel: "Llama 3 (7B)",
    dataset: "مجموعة بيانات مخصصة",
    epochs: 3,
  },
  {
    id: 2,
    name: "نموذج البرمجة",
    status: "جاري",
    date: "2023-12-20",
    baseModel: "Phi-3 (3.8B)",
    dataset: "بيانات برمجية",
    epochs: 2,
  },
  {
    id: 3,
    name: "نموذج الأسئلة والأجوبة",
    status: "فشل",
    date: "2023-12-10",
    baseModel: "Mistral (7B)",
    dataset: "أسئلة وأجوبة عامة",
    epochs: 1,
  },
]

const datasets = [
  {
    id: 1,
    name: "مجموعة بيانات مخصصة",
    records: 5000,
    description: "مجموعة بيانات مخصصة للتدريب على المحتوى العربي",
  },
  {
    id: 2,
    name: "بيانات برمجية",
    records: 10000,
    description: "مجموعة بيانات تحتوي على أمثلة برمجية بلغات متعددة",
  },
  {
    id: 3,
    name: "أسئلة وأجوبة عامة",
    records: 8000,
    description: "مجموعة من الأسئلة والأجوبة العامة في مجالات متنوعة",
  },
]
