"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Key, User, Bell, Shield, CreditCard, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                لوحة التحكم
              </Button>
            </Link>
            <span className="text-gray-500">/</span>
            <span>الإعدادات</span>
          </div>
          <div className="font-bold text-2xl">Devil</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">إعدادات الحساب</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                      <User className="h-4 w-4" />
                      <span>الملف الشخصي</span>
                    </Button>
                    <Link href="/settings/api-keys" className="w-full">
                      <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                        <Key className="h-4 w-4" />
                        <span>مفاتيح API</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                      <Bell className="h-4 w-4" />
                      <span>الإشعارات</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                      <Shield className="h-4 w-4" />
                      <span>الأمان</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                      <CreditCard className="h-4 w-4" />
                      <span>الفواتير</span>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Settings */}
            <div className="md:col-span-3">
              <Card className="bg-gray-800/50 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    الملف الشخصي
                  </CardTitle>
                  <CardDescription className="text-gray-400">إدارة معلومات الملف الشخصي الخاص بك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" defaultValue="محمد أحمد" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" defaultValue="example@example.com" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">نبذة تعريفية</Label>
                    <textarea
                      id="bio"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      rows={4}
                      defaultValue="مطور ومصمم واجهات مستخدم"
                    />
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">حفظ التغييرات</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-400" />
                    مفاتيح API
                  </CardTitle>
                  <CardDescription className="text-gray-400">إدارة مفاتيح API للذكاء الاصطناعي</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400">
                    يمكنك إدارة مفاتيح API الخاصة بك لاستخدام نماذج الذكاء الاصطناعي المفضلة لديك.
                  </p>

                  <div className="flex justify-between items-center p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-blue-400" />
                      <span>مفاتيح API المضافة</span>
                    </div>
                    <Link href="/settings/api-keys">
                      <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                        إدارة المفاتيح
                        <ChevronRight className="h-4 w-4 mr-2" />
                      </Button>
                    </Link>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">إعدادات الذكاء الاصطناعي</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>استخدام مفاتيح API الخاصة</Label>
                        <p className="text-sm text-gray-500">
                          استخدام مفاتيح API الخاصة بك بدلاً من المفاتيح الافتراضية
                        </p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>حفظ سجل المحادثات</Label>
                        <p className="text-sm text-gray-500">حفظ سجل المحادثات مع نماذج الذكاء الاصطناعي</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>تحسين الأداء تلقائياً</Label>
                        <p className="text-sm text-gray-500">
                          السماح للنظام بتحسين أداء نماذج الذكاء الاصطناعي تلقائياً
                        </p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
