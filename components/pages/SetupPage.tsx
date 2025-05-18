"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SetupPage() {
  const [apiKeys, setApiKeys] = useState({
    openrouter: "",
    groq: "",
    deepseek: "",
    together: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setApiKeys((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // حفظ مفاتيح API
    console.log("Saving API keys:", apiKeys)
    alert("تم حفظ الإعدادات بنجاح!")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">إعداد النظام</h1>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api">مفاتيح API</TabsTrigger>
          <TabsTrigger value="database">قاعدة البيانات</TabsTrigger>
          <TabsTrigger value="system">إعدادات النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>مفاتيح API</CardTitle>
              <CardDescription>قم بإعداد مفاتيح API للوصول إلى خدمات الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="openrouter">OpenRouter API Key</Label>
                  <Input
                    id="openrouter"
                    name="openrouter"
                    value={apiKeys.openrouter}
                    onChange={handleChange}
                    placeholder="sk-or-v1-..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="groq">Groq API Key</Label>
                  <Input id="groq" name="groq" value={apiKeys.groq} onChange={handleChange} placeholder="gsk_..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="deepseek">DeepSeek API Key</Label>
                  <Input
                    id="deepseek"
                    name="deepseek"
                    value={apiKeys.deepseek}
                    onChange={handleChange}
                    placeholder="..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="together">Together API Key</Label>
                  <Input
                    id="together"
                    name="together"
                    value={apiKeys.together}
                    onChange={handleChange}
                    placeholder="..."
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  حفظ الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات قاعدة البيانات</CardTitle>
              <CardDescription>قم بتكوين اتصال قاعدة البيانات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="db_url">Database URL</Label>
                  <Input id="db_url" placeholder="postgres://..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="redis_url">Redis URL</Label>
                  <Input id="redis_url" placeholder="redis://..." />
                </div>

                <Button className="w-full">اختبار الاتصال</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النظام</CardTitle>
              <CardDescription>قم بتخصيص إعدادات النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>وضع التطوير</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      تفعيل
                    </Button>
                    <Button variant="outline" size="sm">
                      تعطيل
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>تخزين المحادثات</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      تفعيل
                    </Button>
                    <Button variant="outline" size="sm">
                      تعطيل
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>تحليلات الاستخدام</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      تفعيل
                    </Button>
                    <Button variant="outline" size="sm">
                      تعطيل
                    </Button>
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
