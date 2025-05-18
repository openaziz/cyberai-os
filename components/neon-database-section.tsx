"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Database, Loader2, RefreshCw, Plus, User, FolderKanban } from "lucide-react"

const NeonDatabaseSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [activeTab, setActiveTab] = useState<"users" | "projects">("users")
  const [users, setUsers] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingProjects, setIsLoadingProjects] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmittingUser, setIsSubmittingUser] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState("")
  const [isSubmittingProject, setIsSubmittingProject] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // جلب المستخدمين
  const fetchUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const response = await fetch("/api/neon/users")

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  // جلب المشاريع
  const fetchProjects = async () => {
    setIsLoadingProjects(true)
    try {
      const response = await fetch("/api/neon/projects")

      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoadingProjects(false)
    }
  }

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchUsers()
    fetchProjects()
  }, [])

  // إضافة مستخدم جديد
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingUser(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/neon/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })

      if (response.ok) {
        setSuccess("تم إضافة المستخدم بنجاح!")
        setName("")
        setEmail("")
        // إعادة تحميل المستخدمين
        fetchUsers()
      } else {
        const data = await response.json()
        setError(data.error || "حدث خطأ أثناء إضافة المستخدم")
      }
    } catch (error) {
      setError("حدث خطأ غير متوقع")
      console.error("Error adding user:", error)
    } finally {
      setIsSubmittingUser(false)
    }
  }

  // إضافة مشروع جديد
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingProject(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/neon/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userId: Number.parseInt(userId),
        }),
      })

      if (response.ok) {
        setSuccess("تم إضافة المشروع بنجاح!")
        setTitle("")
        setDescription("")
        setUserId("")
        // إعادة تحميل المشاريع
        fetchProjects()
      } else {
        const data = await response.json()
        setError(data.error || "حدث خطأ أثناء إضافة المشروع")
      }
    } catch (error) {
      setError("حدث خطأ غير متوقع")
      console.error("Error adding project:", error)
    } finally {
      setIsSubmittingProject(false)
    }
  }

  return (
    <section id="neon-database" className="py-20 bg-background/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,184,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">تكامل مع Neon PostgreSQL</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            استخدام قاعدة بيانات Neon PostgreSQL لتخزين واسترجاع البيانات بكفاءة عالية
          </p>
        </div>

        <div
          ref={ref}
          className="max-w-6xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm overflow-hidden gold-box-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-500">
                <Database className="h-5 w-5" />
                إدارة البيانات مع Neon PostgreSQL
              </CardTitle>
              <CardDescription>استعرض وأضف المستخدمين والمشاريع باستخدام قاعدة بيانات Neon PostgreSQL</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" onValueChange={(value) => setActiveTab(value as "users" | "projects")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="users" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    <User className="h-4 w-4 mr-2" />
                    المستخدمون
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                  >
                    <FolderKanban className="h-4 w-4 mr-2" />
                    المشاريع
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-6">
                  {/* جدول المستخدمين */}
                  <div className="rounded-md border border-gold-500/20">
                    <div className="flex items-center justify-between p-4">
                      <h3 className="text-lg font-medium">قائمة المستخدمين</h3>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10"
                        onClick={fetchUsers}
                        disabled={isLoadingUsers}
                      >
                        {isLoadingUsers ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المعرف</TableHead>
                          <TableHead>الاسم</TableHead>
                          <TableHead>البريد الإلكتروني</TableHead>
                          <TableHead>تاريخ الإنشاء</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length > 0 ? (
                          users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{new Date(user.created_at).toLocaleString("ar-SA")}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                              {isLoadingUsers ? "جاري تحميل البيانات..." : "لا يوجد مستخدمين حتى الآن"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* نموذج إضافة مستخدم */}
                  <div className="p-4 border border-gold-500/20 rounded-md">
                    <h3 className="text-lg font-medium mb-4">إضافة مستخدم جديد</h3>
                    <form onSubmit={handleAddUser} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            الاسم
                          </label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-gold-500/30 focus:border-gold-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            البريد الإلكتروني
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-gold-500/30 focus:border-gold-500"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="gold-gradient text-black"
                        disabled={isSubmittingUser || !name.trim() || !email.trim()}
                      >
                        {isSubmittingUser ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            جاري الإضافة...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            إضافة مستخدم
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  {/* جدول المشاريع */}
                  <div className="rounded-md border border-gold-500/20">
                    <div className="flex items-center justify-between p-4">
                      <h3 className="text-lg font-medium">قائمة المشاريع</h3>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10"
                        onClick={fetchProjects}
                        disabled={isLoadingProjects}
                      >
                        {isLoadingProjects ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المعرف</TableHead>
                          <TableHead>العنوان</TableHead>
                          <TableHead>الوصف</TableHead>
                          <TableHead>المستخدم</TableHead>
                          <TableHead>تاريخ الإنشاء</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.length > 0 ? (
                          projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>{project.id}</TableCell>
                              <TableCell>{project.title}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{project.description}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-gold-500/30 text-gold-500">
                                  {project.user_name}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(project.created_at).toLocaleString("ar-SA")}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              {isLoadingProjects ? "جاري تحميل البيانات..." : "لا يوجد مشاريع حتى الآن"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* نموذج إضافة مشروع */}
                  <div className="p-4 border border-gold-500/20 rounded-md">
                    <h3 className="text-lg font-medium mb-4">إضافة مشروع جديد</h3>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm font-medium">
                            العنوان
                          </label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-gold-500/30 focus:border-gold-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="userId" className="text-sm font-medium">
                            معرف المستخدم
                          </label>
                          <Input
                            id="userId"
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="border-gold-500/30 focus:border-gold-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          الوصف
                        </label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] border-gold-500/30 focus:border-gold-500"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="gold-gradient text-black"
                        disabled={isSubmittingProject || !title.trim() || !description.trim() || !userId.trim()}
                      >
                        {isSubmittingProject ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            جاري الإضافة...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            إضافة مشروع
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-500">{error}</div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-500">
                  {success}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gold-500/20 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Database className="h-4 w-4 text-gold-500 mr-2" />
                <span>Neon PostgreSQL هي قاعدة بيانات سحابية متوافقة مع PostgreSQL توفر أداءً عاليًا وقابلية للتوسع</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default NeonDatabaseSection
