"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Cpu, Lightbulb, Sparkles, Zap } from "lucide-react"

const AITechnologySection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="ai-technology" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(0,255,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">الذكاء الاصطناعي المستخدم</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Devil يستخدم نماذج ذكاء اصطناعي متقدمة لفهم طلبات المستخدمين وتوليد كود واجهة المستخدم
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <Card className="border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 rounded-full bg-green-500/10 w-fit mb-4">
                <Brain className="h-10 w-10 text-green-500" />
              </div>
              <CardTitle className="text-xl text-green-500">معالجة اللغة الطبيعية</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                يستخدم Devil تقنيات معالجة اللغة الطبيعية (NLP) المتقدمة لفهم طلبات المستخدمين بدقة عالية. يمكنه تحليل
                النص وفهم المتطلبات والتصميم المطلوب، حتى من الوصف البسيط.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 rounded-full bg-blue-500/10 w-fit mb-4">
                <Cpu className="h-10 w-10 text-blue-500" />
              </div>
              <CardTitle className="text-xl text-blue-500">توليد الكود</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                بعد فهم الطلب، يقوم Devil بإنشاء كود React وTailwind CSS استناداً إلى المتطلبات. يطبق أفضل الممارسات في
                تطوير الواجهات الأمامية لضمان كود نظيف وفعال.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 rounded-full bg-purple-500/10 w-fit mb-4">
                <Lightbulb className="h-10 w-10 text-purple-500" />
              </div>
              <CardTitle className="text-xl text-purple-500">تحسين النتائج</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                يقوم Devil بتحسين الكود المولد لضمان أفضل أداء وتجربة مستخدم. يطبق تقنيات تحسين الأداء وإمكانية الوصول
                والتوافق مع مختلف المتصفحات.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 rounded-full bg-pink-500/10 w-fit mb-4">
                <Sparkles className="h-10 w-10 text-pink-500" />
              </div>
              <CardTitle className="text-xl text-pink-500">التعلم المستمر</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                يتحسن نموذج Devil باستمرار من خلال التفاعلات والتغذية الراجعة من المستخدمين. كلما زاد استخدام النظام،
                أصبح أكثر ذكاءً وقدرة على فهم وتنفيذ طلبات المستخدمين بدقة أكبر.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden neon-border">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-500/10 mr-4">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold neon-text">تقنيات الذكاء الاصطناعي المتقدمة</h3>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  يستخدم Devil مجموعة من تقنيات الذكاء الاصطناعي المتقدمة لتحقيق نتائج استثنائية:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-green-500">التعلم العميق</h4>
                    <p className="text-sm text-muted-foreground">
                      يستخدم Devil شبكات عصبية عميقة لفهم السياق والمعنى وراء طلبات المستخدمين، مما يمكنه من توليد كود
                      يلبي المتطلبات بدقة.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-blue-500">التعلم بالتعزيز</h4>
                    <p className="text-sm text-muted-foreground">
                      يتعلم النموذج من التغذية الراجعة للمستخدمين، مما يساعده على تحسين أدائه باستمرار وتقديم نتائج أفضل
                      مع مرور الوقت.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-purple-500">تحليل الصور</h4>
                    <p className="text-sm text-muted-foreground">
                      يمكن لـ Devil تحليل الصور والتصاميم المرفقة وتحويلها إلى كود، مما يتيح للمستخدمين إرفاق لقطات شاشة
                      أو مخططات تصميم.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-pink-500">التكامل مع نماذج أخرى</h4>
                    <p className="text-sm text-muted-foreground">
                      يتكامل Devil مع نماذج ذكاء اصطناعي أخرى مثل Google Gemini لتعزيز قدراته وتقديم تجربة أكثر تكاملاً
                      للمستخدمين.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default AITechnologySection
