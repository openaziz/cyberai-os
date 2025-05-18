"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageSquare, Send, Smartphone, Github } from "lucide-react"

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">تواصل معنا</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نحن هنا للإجابة على أسئلتك ومساعدتك في استخدام Devil بأفضل طريقة ممكنة
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
          <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gold-500">أرسل لنا رسالة</CardTitle>
              <CardDescription>املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      الاسم
                    </label>
                    <Input id="name" placeholder="أدخل اسمك" className="border-gold-500/30 focus:border-gold-500" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      البريد الإلكتروني
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="border-gold-500/30 focus:border-gold-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    الموضوع
                  </label>
                  <Input
                    id="subject"
                    placeholder="أدخل موضوع الرسالة"
                    className="border-gold-500/30 focus:border-gold-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    الرسالة
                  </label>
                  <Textarea
                    id="message"
                    placeholder="أدخل رسالتك"
                    rows={5}
                    className="border-gold-500/30 focus:border-gold-500"
                  />
                </div>
                <Button type="submit" className="w-full gold-gradient text-black">
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-gold-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gold-500">معلومات التواصل</CardTitle>
                <CardDescription>يمكنك التواصل معنا مباشرة من خلال:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Mail className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">البريد الإلكتروني</p>
                    <a
                      href="mailto:sa6aa6116@gmail.com"
                      className="text-muted-foreground hover:text-gold-500 transition-colors"
                    >
                      sa6aa6116@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Phone className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">الهاتف</p>
                    <a href="tel:+96894165819" className="text-muted-foreground hover:text-gold-500 transition-colors">
                      +96894165819
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <MessageSquare className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">سناب شات</p>
                    <a
                      href="https://www.snapchat.com/add/bx90_9?share_id=15PLtb3NVfA&locale=ar-EG"
                      target="_blank"
                      className="text-muted-foreground hover:text-gold-500 transition-colors"
                      rel="noreferrer"
                    >
                      bx90_9
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Send className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">تلجرام</p>
                    <a
                      href="https://t.me/Dr6H9"
                      target="_blank"
                      className="text-muted-foreground hover:text-gold-500 transition-colors"
                      rel="noreferrer"
                    >
                      @Dr6H9
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Smartphone className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">واتساب</p>
                    <a
                      href="https://wa.me/qr/FWSUFHPPDQUNK1"
                      target="_blank"
                      className="text-muted-foreground hover:text-gold-500 transition-colors"
                      rel="noreferrer"
                    >
                      اضغط للتواصل عبر واتساب
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Github className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">جيت هب</p>
                    <a
                      href="https://github.com/openaziz/wolf.app.git"
                      target="_blank"
                      className="text-muted-foreground hover:text-gold-500 transition-colors"
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

export default ContactSection
