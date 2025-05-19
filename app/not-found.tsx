import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">الصفحة غير موجودة</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
      </p>
      <Button asChild size="lg" className="gap-2">
        <Link href="/">
          <Home className="h-5 w-5" />
          العودة إلى الصفحة الرئيسية
        </Link>
      </Button>
    </div>
  )
}
