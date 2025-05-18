// استخدام نهج أكثر أمانًا للتعامل مع قاعدة البيانات
// سنستخدم نمط مستودع البيانات بدلاً من الاتصال المباشر بقاعدة البيانات

// نماذج البيانات
export interface User {
  id: number
  name: string
  email: string
  password?: string
  createdAt: Date
}

export interface Project {
  id: number
  title: string
  description: string
  userId: number
  createdAt: Date
  updatedAt: Date
}

// بيانات تجريبية للمستخدمين
const users: User[] = [
  {
    id: 1,
    name: "محمد العلي",
    email: "mohammed@example.com",
    password: "password123",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "أحمد خالد",
    email: "ahmed@example.com",
    password: "password123",
    createdAt: new Date("2023-01-15"),
  },
]

// بيانات تجريبية للمشاريع
const projects: Project[] = [
  {
    id: 1,
    title: "مشروع الواجهة الرئيسية",
    description: "واجهة مستخدم متكاملة مع تصميم عصري",
    userId: 1,
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: 2,
    title: "تطبيق المهام",
    description: "تطبيق لإدارة المهام والمشاريع",
    userId: 1,
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-15"),
  },
  {
    id: 3,
    title: "لوحة تحكم التحليلات",
    description: "لوحة تحكم لعرض البيانات والإحصائيات",
    userId: 2,
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-04-10"),
  },
]

// وظائف المستخدمين
export async function getUsers(): Promise<User[]> {
  return [...users]
}

export async function getUserById(id: number): Promise<User | null> {
  const user = users.find((u) => u.id === id)
  return user ? { ...user } : null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find((u) => u.email === email)
  return user ? { ...user } : null
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password,
    createdAt: new Date(),
  }

  users.push(newUser)
  return { ...newUser }
}

// وظائف المشاريع
export async function getProjects(): Promise<Project[]> {
  return [...projects]
}

export async function getProjectById(id: number): Promise<Project | null> {
  const project = projects.find((p) => p.id === id)
  return project ? { ...project } : null
}

export async function getProjectsByUserId(userId: number): Promise<Project[]> {
  return projects.filter((p) => p.userId === userId).map((p) => ({ ...p }))
}

export async function createProject(title: string, description: string, userId: number): Promise<Project> {
  const newProject: Project = {
    id: projects.length + 1,
    title,
    description,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  projects.push(newProject)
  return { ...newProject }
}

export async function updateProject(id: number, title: string, description: string): Promise<Project | null> {
  const projectIndex = projects.findIndex((p) => p.id === id)
  if (projectIndex === -1) return null

  projects[projectIndex] = {
    ...projects[projectIndex],
    title,
    description,
    updatedAt: new Date(),
  }

  return { ...projects[projectIndex] }
}

export async function deleteProject(id: number): Promise<boolean> {
  const projectIndex = projects.findIndex((p) => p.id === id)
  if (projectIndex === -1) return false

  projects.splice(projectIndex, 1)
  return true
}
