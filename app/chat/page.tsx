"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Plus, MessageSquare, History, Trash2 } from "lucide-react"
import { ENV } from "@/config/env"
import ChatComponent from "@/components/ChatComponent"

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("new-chat")
  const [selectedModel, setSelectedModel] = useState("deepseek-r1-70b")

  return (
    <div className="chat-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">الدردشة الذكية</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            تفاعل مع نماذج الذكاء الاصطناعي المختلفة واحصل على إجابات لأسئلتك
          </p>
        </div>

        <div className="chat-interface flex flex-col lg:flex-row gap-6">
          <div className="chat-sidebar w-full lg:w-64 flex-shrink-0">
            <Card className="h-full">
              <div className="p-4 border-b border-background-lighter">
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors w-full flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  محادثة جديدة
                </button>
              </div>

              <div className="p-4 border-b border-background-lighter">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  إعدادات النموذج
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">النموذج</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النموذج" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deepseek-r1-70b">DeepSeek-R1-70B</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="mistral-7b">Mistral 7B (محلي)</SelectItem>
                        <SelectItem value="llama2-7b">Llama 2 7B (محلي)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">درجة الحرارة</label>
                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>دقيق</span>
                      <span>متوازن</span>
                      <span>إبداعي</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  المحادثات السابقة
                </h3>
                <div className="space-y-2">
                  <ChatHistoryItem title="استفسار عن النماذج المحلية" date="منذ 3 ساعات" active={false} />
                  <ChatHistoryItem title="مساعدة في تثبيت النظام" date="منذ يومين" active={false} />
                  <ChatHistoryItem title="أسئلة عن التدريب المخصص" date="منذ 5 أيام" active={false} />
                </div>
              </div>
            </Card>
          </div>

          <div className="chat-main flex-1">
            <Card className="h-full">
              <Tabs
                defaultValue="new-chat"
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <div className="border-b border-background-lighter p-2">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="new-chat" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>محادثة جديدة</span>
                    </TabsTrigger>
                    <TabsTrigger value="chat-history" className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <span>سجل المحادثات</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="new-chat" className="flex-1 flex flex-col">
                  <div className="model-info p-3 bg-background-lighter text-sm flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">النموذج الحالي:</span>
                      <span className="text-red-600 dark:text-red-500">
                        {selectedModel === "deepseek-r1-70b" && "DeepSeek-R1-70B"}
                        {selectedModel === "gpt-4o" && "GPT-4o"}
                        {selectedModel === "mistral-7b" && "Mistral 7B (محلي)"}
                        {selectedModel === "llama2-7b" && "Llama 2 7B (محلي)"}
                      </span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <ChatComponent />
                  </div>
                </TabsContent>

                <TabsContent value="chat-history" className="p-4">
                  <h3 className="text-xl font-bold mb-4">سجل المحادثات</h3>
                  <div className="space-y-4">
                    <ChatHistoryCard
                      title="استفسار عن النماذج المحلية"
                      date="2023-05-18 14:30"
                      model="DeepSeek-R1-70B"
                      preview="ما هي النماذج المحلية المدعومة في CyberAI OS؟"
                    />
                    <ChatHistoryCard
                      title="مساعدة في تثبيت النظام"
                      date="2023-05-16 09:15"
                      model="GPT-4o"
                      preview="كيف يمكنني تثبيت CyberAI OS على نظام Linux؟"
                    />
                    <ChatHistoryCard
                      title="أسئلة عن التدريب المخصص"
                      date="2023-05-13 16:45"
                      model="Mistral 7B"
                      preview="هل يمكنني تدريب نموذج مخصص باستخدام بياناتي الخاصة؟"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatHistoryItem({ title, date, active }: { title: string; date: string; active: boolean }) {
  return (
    <div
      className={`chat-history-item p-2 rounded-md cursor-pointer transition-colors ${
        active ? "bg-red-600 text-white" : "hover:bg-background-lighter"
      }`}
    >
      <div className="font-medium truncate">{title}</div>
      <div className={`text-xs ${active ? "text-red-200" : "text-muted-foreground"}`}>{date}</div>
    </div>
  )
}

function ChatHistoryCard({
  title,
  date,
  model,
  preview,
}: { title: string; date: string; model: string; preview: string }) {
  return (
    <Card className="p-4 hover:bg-background-lighter transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{title}</h4>
        <div className="text-xs text-muted-foreground">{date}</div>
      </div>
      <p className="text-sm text-muted-foreground mb-2 truncate">{preview}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs bg-background-lighter px-2 py-1 rounded-full">{model}</span>
        <div className="flex gap-2">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="h-4 w-4" />
          </button>
          <button className="text-muted-foreground hover:text-red-600 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  )
}
