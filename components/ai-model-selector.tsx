"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronDown, Settings, AlertCircle } from "lucide-react"
import { AI_MODELS, type AIModel } from "@/lib/ai-service"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AIModelSelectorProps {
  onModelChange?: (modelId: string) => void
  apiKey?: string
}

export function AIModelSelector({ onModelChange, apiKey }: AIModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [error, setError] = useState<string | null>(null)

  // اختيار النموذج الافتراضي عند التحميل
  useEffect(() => {
    const defaultModel = AI_MODELS[0]
    setSelectedModel(defaultModel)
    if (onModelChange) {
      onModelChange(defaultModel.id)
    }
  }, [onModelChange])

  const handleSelectModel = (model: AIModel) => {
    // التحقق من وجود مفتاح API إذا تم توفيره
    if (apiKey) {
      // التحقق من تطابق مزود الخدمة مع بادئة المفتاح
      let isValidKey = false

      switch (model.provider) {
        case "openai":
          isValidKey = apiKey.startsWith("sk-")
          break
        case "anthropic":
          isValidKey = apiKey.startsWith("sk-ant-")
          break
        case "groq":
          isValidKey = apiKey.startsWith("gsk_")
          break
        default:
          isValidKey = true
      }

      if (!isValidKey) {
        setError(`مفتاح API غير صالح لمزود الخدمة ${model.provider}`)
        return
      }
    }

    setError(null)
    setSelectedModel(model)
    if (onModelChange) {
      onModelChange(model.id)
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-gray-700 bg-gray-800/50 text-white gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>{selectedModel?.name || "اختر نموذج"}</span>
            <Badge className="bg-blue-600 text-xs mr-2">{selectedModel?.provider}</Badge>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
          <DropdownMenuLabel>نماذج الذكاء الاصطناعي</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />

          {AI_MODELS.map((model) => (
            <DropdownMenuItem
              key={model.id}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-700"
              onClick={() => handleSelectModel(model)}
            >
              <div className="flex flex-col">
                <span>{model.name}</span>
                <span className="text-xs text-gray-400">{model.provider}</span>
              </div>
              <Badge className="bg-blue-600 text-xs">{model.contextLength.toLocaleString()}</Badge>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className="bg-gray-700" />
          <Link href="/settings/api-keys">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" />
              <span>إدارة مفاتيح API</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
