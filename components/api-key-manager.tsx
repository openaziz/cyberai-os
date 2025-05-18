"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Save, X, AlertCircle, Check } from "lucide-react"

interface ApiKeyManagerProps {
  provider: string
  onSave: (key: string) => void
  savedKey?: string
}

export function ApiKeyManager({ provider, onSave, savedKey }: ApiKeyManagerProps) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasSavedKey, setHasSavedKey] = useState(false)

  useEffect(() => {
    if (savedKey) {
      setApiKey(savedKey)
      setHasSavedKey(true)
    }
  }, [savedKey])

  const validateKey = (key: string): boolean => {
    if (!key) return false

    // التحقق من بادئة المفتاح حسب مزود الخدمة
    switch (provider.toLowerCase()) {
      case "openai":
        return key.startsWith("sk-")
      case "anthropic":
        return key.startsWith("sk-ant-")
      case "groq":
        return key.startsWith("gsk_")
      default:
        return key.length > 10
    }
  }

  const handleSave = () => {
    setError(null)
    setSuccess(null)

    if (!validateKey(apiKey)) {
      setError(`مفتاح API غير صالح لمزود الخدمة ${provider}`)
      return
    }

    try {
      onSave(apiKey)
      setSuccess("تم حفظ مفتاح API بنجاح")
      setHasSavedKey(true)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("حدث خطأ أثناء حفظ مفتاح API")
    }
  }

  const getKeyPlaceholder = (): string => {
    switch (provider.toLowerCase()) {
      case "openai":
        return "sk-..."
      case "anthropic":
        return "sk-ant-..."
      case "groq":
        return "gsk_..."
      default:
        return "أدخل مفتاح API"
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">مفتاح API لـ {provider}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-900/20 border-green-500 text-green-500">
            <Check className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {hasSavedKey && !showKey && (
          <Alert className="bg-blue-900/20 border-blue-500 text-blue-500">
            <AlertDescription>تم حفظ مفتاح API لـ {provider}. انقر على زر العين لعرض المفتاح.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor={`${provider}-api-key`}>مفتاح API</Label>
          <div className="flex">
            <Input
              id={`${provider}-api-key`}
              type={showKey ? "text" : "password"}
              placeholder={getKeyPlaceholder()}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-gray-900 border-gray-700 font-mono"
            />
            <Button type="button" variant="ghost" className="ml-2" onClick={() => setShowKey(!showKey)}>
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:text-white"
            onClick={() => {
              setApiKey("")
              setHasSavedKey(false)
            }}
          >
            <X className="h-4 w-4 mr-2" />
            مسح
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={!apiKey}>
            <Save className="h-4 w-4 mr-2" />
            حفظ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
