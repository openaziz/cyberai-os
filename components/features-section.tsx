"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { MessageSquare, Code2, Layers, Terminal, Play, Zap, Palette, Database, Shield, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-gold-500" />,
    title: "واجهة محادثة سهلة الاستخدام",
    description: "تتيح للمستخدمين التفاعل مع الأداة بشكل طبيعي وبسيط.",
  },
  {
    icon: <Code2 className="h-10 w-10 text-gold-500" />,
    title: "توليد كود قابل للاستخدام",
    description: "ينتج Devil كود React وTailwind CSS جاهز للاستخدام مباشرة في المشاريع.",
  },
  {
    icon: <Layers className="h-10 w-10 text-gold-500" />,
    title: "دعم متعدد الإطارات",
    description: "يدعم توليد مكونات لـ React وVue وSvelte وHTML مع CSS.",
  },
  {
    icon: <Terminal className="h-10 w-10 text-gold-500" />,
    title: "تكامل مع أدوات التطوير",
    description: "يمكن تثبيت المكونات المولدة مباشرة في قاعدة الكود الخاصة بك.",
  },
  {
    icon: <Play className="h-10 w-10 text-gold-500" />,
    title: "إمكانية تنفيذ الكود",
    description: "يمكن لـ Devil كتابة وتنفيذ كود JavaScript بسيط، مما يساعد في اختبار الوظائف.",
  },
  {
    icon: <Zap className="h-10 w-10 text-gold-500" />,
    title: "أداء عالي",
    description: "مكونات سريعة ومحسنة تعمل بكفاءة على جميع الأجهزة.",
  },
  {
    icon: <Palette className="h-10 w-10 text-gold-500" />,
    title: "تصميم قابل للتخصيص",
    description: "سهولة تخصيص الألوان والأنماط لتناسب هوية علامتك التجارية.",
  },
  {
    icon: <Database className="h-10 w-10 text-gold-500" />,
    title: "تكامل مع قواعد البيانات",
    description: "دعم التكامل مع مصادر البيانات المختلفة من خلال ميزة المشاريع.",
  },
  {
    icon: <Shield className="h-10 w-10 text-gold-500" />,
    title: "أمان وموثوقية",
    description: "كود آمن وموثوق يتبع أفضل ممارسات الأمان في تطوير الويب.",
  },
  {
    icon: <Globe className="h-10 w-10 text-gold-500" />,
    title: "دعم متعدد اللغات",
    description: "يدعم Devil العديد من اللغات بما فيها العربية والإنجليزية وغيرها.",
  },
]

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,184,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">الميزات الرئيسية</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Devil يقدم مجموعة من الميزات المتقدمة التي تجعله أداة قوية لتطوير واجهات المستخدم
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:gold-box-shadow bg-card/50 backdrop-blur-sm group"
            >
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-gold-500/10 w-fit mb-4 group-hover:bg-gold-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gold-500">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
