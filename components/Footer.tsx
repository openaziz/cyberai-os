import Link from "next/link"
import { Github, Twitter, Mail, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background-lighter py-12 border-t border-background-lighter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-600">CyberAI OS</span>
            </Link>
            <p className="mt-3 text-muted-foreground">
              منصة ذكاء اصطناعي مفتوحة المصدر تمنحك القوة والخصوصية والتحكم الكامل.
            </p>
            <div className="mt-4 flex space-x-4 space-x-reverse">
              <a
                href="https://github.com/openaziz/cyberai-os"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/cyberai_os"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@cyberai-os.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="البريد الإلكتروني"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">المنتج</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/models" className="text-muted-foreground hover:text-foreground transition-colors">
                    النماذج المدعومة
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                    الميزات
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    الأسعار
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                    خارطة الطريق
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                    سجل التغييرات
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="/setup" className="text-muted-foreground hover:text-foreground transition-colors">
                    دليل الإعداد
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                    المجتمع
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">الشركة</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    المدونة
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                    الوظائف
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    شروط الاستخدام
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background-lighter text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} CyberAI OS. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-sm text-muted-foreground flex items-center justify-center">
            صنع بـ <Heart className="h-4 w-4 mx-1 text-red-600" /> في العالم العربي
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
