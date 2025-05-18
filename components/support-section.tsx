"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageSquare, Send, Smartphone, Github } from "lucide-react"

const SupportSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="support" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">الدعم والمساعدة</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نحن هنا لمساعدتك في استخدام Devil بأفضل طريقة ممكنة
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>الأسئلة الشائعة</CardTitle>
              <CardDescription>ابحث عن إجابات للأسئلة الأكثر شيوعاً.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>سيتم إضافة الأسئلة الشائعة قريباً...</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>معلومات التواصل</CardTitle>
                <CardDescription>يمكنك التواصل معنا مباشرة من خلال:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Mail className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">البريد الإلكتروني</p>
                    <a
                      href="mailto:sa6aa6116@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sa6aa6116@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Phone className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">الهاتف</p>
                    <a href="tel:+96894165819" className="text-muted-foreground hover:text-primary transition-colors">
                      +96894165819
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <MessageSquare className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">سناب شات</p>
                    <a
                      href="https://www.snapchat.com/add/bx90_9?share_id=15PLtb3NVfA&locale=ar-EG"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      rel="noreferrer"
                    >
                      bx90_9
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Send className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">تلجرام</p>
                    <a
                      href="https://t.me/Dr6H9"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      rel="noreferrer"
                    >
                      @Dr6H9
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Smartphone className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">واتساب</p>
                    <a
                      href="https://wa.me/qr/FWSUFHPPDQUNK1"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      rel="noreferrer"
                    >
                      اضغط للتواصل عبر واتساب
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Github className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">جيت هب</p>
                    <a
                      href="https://github.com/openaziz/wolf.app.git"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      rel="noreferrer"
                    >
                      openaziz/wolf.app
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportSection
