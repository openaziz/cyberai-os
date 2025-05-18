"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ENV } from "@/config/env"

interface Model {
  id: string
  name: string
  provider: string
  size: string
  requirements: string
}

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedModelName, setSelectedModelName] = useState("جاري التحميل...")

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/api/models`)
        if (response.ok) {
          const data = await response.json()
          setModels(data.models)

          // تحديث اسم النموذج المحدد
          const model = data.models.find((m: Model) => m.id === selectedModel)
          if (model) {
            setSelectedModelName(model.name)
          }
        }
      } catch (error) {
        console.error("Error fetching models:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [selectedModel])

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId)
    const model = models.find((m) => m.id === modelId)
    if (model) {
      setSelectedModelName(model.name)
    }
  }

  // تجميع النماذج حسب المزود
  const groupedModels: Record<string, Model[]> = {}
  models.forEach((model) => {
    if (!groupedModels[model.provider]) {
      groupedModels[model.provider] = []
    }
    groupedModels[model.provider].push(model)
  })

  // ترجمة أسماء المزودين
  const providerNames: Record<string, string> = {
    groq: "Groq",
    openrouter: "OpenRouter",
    together: "Together.ai",
    search1api: "Search1API (بدون مفتاح)",
    local: "نماذج محلية",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate">{loading ? "جاري التحميل..." : selectedModelName}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>اختر نموذجاً</DropdownMenuLabel>
        {Object.keys(groupedModels).map((provider) => (
          <div key={provider}>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {providerNames[provider] || provider}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {groupedModels[provider].map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className="flex justify-between"
                >
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.size}</span>
                  </div>
                  {selectedModel === model.id && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
