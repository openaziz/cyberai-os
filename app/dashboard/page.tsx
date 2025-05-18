"use client"

import { useState } from "react"
import { Search, Plus, LayoutGrid, Code, FileText, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const projects = [
    {
      id: 1,
      title: "مشروع الواجهة الرئيسية",
      description: "واجهة مستخدم متكاملة مع تصميم عصري",
      image: "/modern-ui-design.png",
      category: "واجهات",
      date: "منذ 3 أيام",
    },
    {
      id: 2,
      title: "تطبيق المهام",
      description: "تطبيق لإدارة المهام والمشاريع",
      image: "/task-management-app-interface.png",
      category: "تطبيقات",
      date: "منذ أسبوع",
    },
    {
      id: 3,
      title: "لوحة تحكم التحليلات",
      description: "لوحة تحكم لعرض البيانات والإحصائيات",
      image: "/analytics-dashboard.png",
      category: "لوحات تحكم",
      date: "منذ أسبوعين",
    },
    {
      id: 4,
      title: "موقع المتجر الإلكتروني",
      description: "منصة تسوق إلكتروني متكاملة",
      image: "/ecommerce-website-homepage.png",
      category: "مواقع",
      date: "منذ شهر",
    },
  ]

  const filteredProjects = projects.filter(
    (project) =>
      project.title.includes(searchQuery) ||
      project.description.includes(searchQuery) ||
      project.category.includes(searchQuery),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="font-bold text-2xl">Devil</div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/user-profile-illustration.png" alt="صورة المستخدم" />
              <AvatarFallback>م</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="space-y-2">
              <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>مشروع جديد</span>
              </Button>
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <LayoutGrid className="h-4 w-4" />
                <span>لوحة التحكم</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                <Code className="h-4 w-4" />
                <span>المشاريع</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                <FileText className="h-4 w-4" />
                <span>المستندات</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white">
                <Settings className="h-4 w-4" />
                <span>الإعدادات</span>
              </Button>
            </nav>

            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">المشاريع الأخيرة</h3>
              <div className="space-y-2">
                {projects.slice(0, 3).map((project) => (
                  <Button
                    key={project.id}
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white"
                  >
                    {project.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
              <div className="relative">
                <Input
                  className="w-full bg-gray-800/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                  placeholder="البحث في المشاريع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="bg-gray-800/50 border border-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
                  الكل
                </TabsTrigger>
                <TabsTrigger value="websites" className="data-[state=active]:bg-blue-600">
                  مواقع
                </TabsTrigger>
                <TabsTrigger value="apps" className="data-[state=active]:bg-blue-600">
                  تطبيقات
                </TabsTrigger>
                <TabsTrigger value="dashboards" className="data-[state=active]:bg-blue-600">
                  لوحات تحكم
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-gray-500 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <Badge className="absolute top-2 right-2 bg-blue-600">{project.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{project.date}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            عرض المشروع
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="websites" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter((project) => project.category === "مواقع")
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-gray-500 transition-all"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <Badge className="absolute top-2 right-2 bg-blue-600">{project.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{project.date}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                            >
                              عرض المشروع
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="apps" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter((project) => project.category === "تطبيقات")
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-gray-500 transition-all"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <Badge className="absolute top-2 right-2 bg-blue-600">{project.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{project.date}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                            >
                              عرض المشروع
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="dashboards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter((project) => project.category === "لوحات تحكم")
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-gray-500 transition-all"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <Badge className="absolute top-2 right-2 bg-blue-600">{project.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{project.date}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                            >
                              عرض المشروع
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
