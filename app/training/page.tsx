"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Bot, FileText, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TrainingPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [baseModel, setBaseModel] = useState("llama3-8b")
  const [trainingData, setTrainingData] = useState("")
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingError, setTrainingError] = useState<string | null>(null)
  const [trainingLogs, setTrainingLogs] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTrainingDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTrainingData(e.target.value)
  }

  const startTraining = async () => {
    // التحقق من وجود بيانات تدريب
    if (activeTab === "basic" && !trainingData.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال بيانات التدريب",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "advanced" && uploadedFiles.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى رفع ملف واحد على الأقل للتدريب",
        variant: "destructive",
      })
      return
    }

    setIsTraining(true)
    setTrainingProgress(0)
    setTrainingError(null)
    setTrainingLogs([])

    // محاكاة عملية التدريب
    try {
      // إضافة سجلات التدريب
      const addLog = (message: string) => {
        setTrainingLogs((prev) => [...prev, message])
      }

      addLog("بدء عملية التدريب...")
      addLog(`النموذج الأساسي: ${baseModel}`)

      if (activeTab === "basic") {
        addLog(`عدد أزواج التدريب: ${trainingData.split("\n").filter((line) => line.trim()).length}`)
      } else {
        addLog(`عدد الملفات المرفوعة: ${uploadedFiles.length}`)
        for (const file of uploadedFiles) {
          addLog(`ملف: ${file.name} (${(file.size / 1024).toFixed(2)} كيلوبايت)`)
        }
      }

      // محاكاة مراحل التدريب
      for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTrainingProgress(i * 10)

        switch (i) {
          case 2:
            addLog("تحضير البيانات للتدريب...")
            break
          case 3:
            addLog("تهيئة النموذج الأساسي...")
            break
          case 5:
            addLog("بدء التدريب - الدورة 1/3...")
            break
          case 7:
            addLog("بدء التدريب - الدورة 2/3...")
            break
          case 9:
            addLog("بدء التدريب - الدورة 3/3...")
            break
          case 10:
            addLog("اكتمال التدريب بنجاح!")
            addLog("حفظ النموذج المدرب...")
            break
        }
      }

      toast({
        title: "تم بنجاح",
        description: "اكتملت عملية تدريب النموذج بنجاح",
      })
    } catch (error: any) {
      console.error("خطأ في التدريب:", error)
      setTrainingError(error.message || "حدث خطأ أثناء التدريب")
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء عملية التدريب",
        variant: "destructive",
      })
    } finally {
      setIsTraining(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">تدريب النماذج</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="basic" className="gap-2">
            <Bot className="h-4 w-4" />
            تدريب أساسي
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <FileText className="h-4 w-4" />
            تدريب متقدم
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التدريب الأساسي</CardTitle>
              <CardDescription>قم بتدريب نموذج باستخدام أزواج من الأسئلة والإجابات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-model">النموذج الأساسي</Label>
                <Select value={baseModel} onValueChange={setBaseModel}>
                  <SelectTrigger id="base-model">
                    <SelectValue placeholder="اختر النموذج الأساسي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama3-8b">Llama 3 (8B)</SelectItem>
                    <SelectItem value="tinyllama">TinyLlama (1.1B)</SelectItem>
                    <SelectItem value="phi-2">Phi-2 (2.7B)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="training-data">بيانات التدريب</Label>
                <Textarea
                  id="training-data"
                  placeholder="أدخل أزواج التدريب بتنسيق: سؤال؟ ||| إجابة"
                  className="min-h-[200px]"
                  value={trainingData}
                  onChange={handleTrainingDataChange}
                />
                <p className="text-sm text-muted-foreground">
                  أدخل كل زوج تدريب في سطر منفصل. استخدم ||| للفصل بين السؤال والإجابة.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startTraining} disabled={isTraining} className="w-full">
                {isTraining ? "جاري التدريب..." : "بدء التدريب"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التدريب المتقدم</CardTitle>
              <CardDescription>قم بتدريب نموذج باستخدام ملفات بيانات مخصصة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-model-advanced">النموذج الأساسي</Label>
                <Select value={baseModel} onValueChange={setBaseModel}>
                  <SelectTrigger id="base-model-advanced">
                    <SelectValue placeholder="اختر النموذج الأساسي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama3-8b">Llama 3 (8B)</SelectItem>
                    <SelectItem value="tinyllama">TinyLlama (1.1B)</SelectItem>
                    <SelectItem value="phi-2">Phi-2 (2.7B)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">رفع ملفات التدريب</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    accept=".txt,.json,.jsonl,.csv"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                    <Upload className="h-4 w-4" />
                    اختر ملفات
                  </Button>
                  <p className="mt-2 text-sm text-muted-foreground">
                    يمكنك رفع ملفات بتنسيق TXT أو JSON أو JSONL أو CSV
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label>الملفات المرفوعة</Label>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(2)} كيلوبايت)
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-6 w-6">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startTraining} disabled={isTraining} className="w-full">
                {isTraining ? "جاري التدريب..." : "بدء التدريب"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {isTraining && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>تقدم التدريب</CardTitle>
            <CardDescription>حالة عملية التدريب الحالية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={trainingProgress} className="h-2" />
            <p className="text-center">{trainingProgress}%</p>

            <div className="bg-muted p-4 rounded-md h-60 overflow-y-auto">
              {trainingLogs.map((log, index) => (
                <div key={index} className="text-sm mb-1">
                  <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {trainingError && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ في التدريب</AlertTitle>
          <AlertDescription>{trainingError}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
