import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Download, Lock, Zap, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* قسم الهيرو */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                تجربة <span className="text-primary">ذكاء اصطناعي</span> محلية
                <br />
                <span className="text-primary">بدون قيود</span>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                شغّل نماذج الذكاء الاصطناعي على جهازك بخصوصية كاملة ودون الحاجة لمفاتيح API خارجية
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/chat">
                    جرب المحادثة الآن <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/docs">
                    <Download className="h-4 w-4" /> دليل البدء السريع
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-center text-sm font-medium">CyberAI Chat</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-center">مرحباً بك في CyberAI OS. كيف يمكنني مساعدتك اليوم؟</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-right">ما هي ميزات نماذج الذكاء الاصطناعي محلية؟</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p>
                        تتميز نماذج الذكاء الاصطناعي المحلية بالخصوصية التامة حيث تعمل بدون اتصال بالإنترنت،
                        والاستقلالية الكاملة دون الحاجة لاشتراكات، والأداء السريع، والقدرة على التخصيص حسب احتياجاتك.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 -right-4 h-20 bg-gradient-to-t from-background to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم لماذا CyberAI OS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              لماذا <span className="text-primary">CyberAI OS</span>؟
            </h2>
            <p className="text-xl text-muted-foreground">
              منصة متكاملة تمنحك القوة والخصوصية والتحكم الكامل في تجربة الذكاء الاصطناعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card bg-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">خصوصية كاملة</h3>
              <p className="text-muted-foreground">
                بياناتك تبقى على جهازك ولا نرسل إلى أي خوادم خارجية مما يضمن أمان معلوماتك الحساسة
              </p>
            </div>

            <div className="feature-card bg-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">استقلالية تامة</h3>
              <p className="text-muted-foreground">
                لا حاجة للاشتراكات أو المعايير المفتوحة، استخدم النماذج بحرية دون قيود أو تكاليف إضافية
              </p>
            </div>

            <div className="feature-card bg-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">أداء سريع</h3>
              <p className="text-muted-foreground">
                استجابة فورية دون تأخير بفضل المعالجة المحلية حتى بدون اتصال بالإنترنت
              </p>
            </div>

            <div className="feature-card bg-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">تخصيص متقدم</h3>
              <p className="text-muted-foreground">
                إمكانية تعديل النماذج وتدريبها حسب احتياجاتك الخاصة لتحسين الأداء في مجالات محددة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم النماذج المدعومة */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              النماذج <span className="text-primary">الموصى بها</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              مجموعة متنوعة من النماذج المحلية والسحابية لتلبية احتياجاتك المختلفة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="model-card bg-card rounded-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                {/* استخدام placeholder بدلاً من الصورة */}
                <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Llama 2 (7B)</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Llama 2 (7B)</h3>
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-sm">محلي</span>
                </div>
                <p className="text-muted-foreground mb-4">نموذج متوسط الحجم مع أداء متوازن للحواسيب الشخصية</p>
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div className="bg-muted p-2 rounded text-center">GGUF</div>
                  <div className="bg-muted p-2 rounded text-center">CPU/GPU</div>
                  <div className="bg-muted p-2 rounded text-center">4GB</div>
                </div>
              </div>
            </div>

            <div className="model-card bg-card rounded-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-900 to-pink-900 flex items-center justify-center">
                {/* استخدام placeholder بدلاً من الصورة */}
                <div className="w-full h-full bg-gradient-to-r from-purple-900 to-pink-900 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">TinyLlama (1.1B)</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">TinyLlama (1.1B)</h3>
                  <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">خفيف</span>
                </div>
                <p className="text-muted-foreground mb-4">نموذج خفيف مثالي للهواتف والأجهزة محدودة الموارد</p>
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div className="bg-muted p-2 rounded text-center">GGUF</div>
                  <div className="bg-muted p-2 rounded text-center">CPU</div>
                  <div className="bg-muted p-2 rounded text-center">600MB-1GB</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/models">
                عرض جميع النماذج <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك مع الذكاء الاصطناعي اليوم</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            انضم إلى الآلاف من المستخدمين الذين يستفيدون من قوة الذكاء الاصطناعي المحلي مع الحفاظ على خصوصيتهم
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/chat">
                جرب المحادثة الآن <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">استكشف الوثائق</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
