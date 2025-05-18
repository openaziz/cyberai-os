import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail, Phone, MessageSquare, Send, Smartphone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gold-500/20 relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gold-text">Devil</h3>
            <p className="text-muted-foreground">
              أداة متطورة للذكاء الاصطناعي التوليدي لإنشاء واجهات المستخدم بسرعة وكفاءة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="https://github.com/openaziz/wolf.app.git" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-gold-500 hover:bg-gold-500/10">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.snapchat.com/add/bx90_9?share_id=15PLtb3NVfA&locale=ar-EG" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-gold-500 hover:bg-gold-500/10">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://t.me/Dr6H9" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-gold-500 hover:bg-gold-500/10">
                  <Send className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://wa.me/qr/FWSUFHPPDQUNK1" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-gold-500 hover:bg-gold-500/10">
                  <Smartphone className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  الميزات
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  كيف يعمل
                </Link>
              </li>
              <li>
                <Link href="#examples" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  أمثلة
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  التواصل
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 space-x-reverse">
                <Mail className="h-5 w-5 text-gold-500" />
                <a
                  href="mailto:sa6aa6116@gmail.com"
                  className="text-muted-foreground hover:text-gold-500 transition-colors"
                >
                  sa6aa6116@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <Phone className="h-5 w-5 text-gold-500" />
                <a href="tel:+96894165819" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  +96894165819
                </a>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <MessageSquare className="h-5 w-5 text-gold-500" />
                <a
                  href="https://www.snapchat.com/add/bx90_9?share_id=15PLtb3NVfA&locale=ar-EG"
                  target="_blank"
                  className="text-muted-foreground hover:text-gold-500 transition-colors"
                  rel="noreferrer"
                >
                  bx90_9
                </a>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <Send className="h-5 w-5 text-gold-500" />
                <a
                  href="https://t.me/Dr6H9"
                  target="_blank"
                  className="text-muted-foreground hover:text-gold-500 transition-colors"
                  rel="noreferrer"
                >
                  @Dr6H9
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Devil. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
