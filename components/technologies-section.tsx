"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const technologies = [
  {
    category: "الأدوات الأساسية",
    items: [
      { name: "React", description: "إطار عمل JavaScript لبناء واجهات المستخدم التفاعلية." },
      { name: "Next.js", description: "إطار عمل React يوفر ميزات مثل التوجيه والتحميل المسبق وتحسين الأداء." },
      { name: "Tailwind CSS", description: "إطار CSS يركز على الفئات المساعدة لتسريع عملية التصميم." },
      { name: "shadcn/ui", description: "مكتبة مكونات قابلة للتخصيص مبنية على Radix UI." },
      { name: "Radix Primitives", description: "مكتبة مكونات أساسية تركز على إمكانية الوصول والتخصيص." },
    ],
  },
  {
    category: "المكتبات المدعومة",
    items: [
      { name: "react-three-fiber", description: "لرسومات ثلاثية الأبعاد." },
      { name: "مكتبات Next.js", description: "مثل Next.js Link وNext.js Image وNext.js Font." },
      { name: "مكتبات الاختبار", description: "لضمان جودة الكود المولد." },
      { name: "Framer Motion", description: "لإضافة حركات وانتقالات سلسة." },
      { name: "Lucide Icons", description: "مكتبة أيقونات متكاملة مع React." },
    ],
  },
  {
    category: "الذكاء الاصطناعي المستخدم",
    items: [
      { name: "معالجة اللغة الطبيعية", description: "لفهم طلبات المستخدمين وتحويلها إلى مكونات." },
      { name: "توليد الكود", description: "إنشاء كود React وTailwind CSS استناداً إلى الطلب." },
      { name: "تحسين النتائج", description: "تطبيق أفضل الممارسات في تطوير الواجهات الأمامية." },
      { name: "التعلم المستمر", description: "تحسين النموذج باستمرار من خلال التفاعلات والتغذية الراجعة." },
      { name: "تكامل مع Google Gemini", description: "لتعزيز قدرات الذكاء الاصطناعي وتحسين النتائج." },
    ],
  },
]

const TechnologiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="technologies" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">الأدوات والتقنيات المستخدمة</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Devil يعتمد على مجموعة من الأدوات والتقنيات المتطورة
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-500 neon-text">{tech.category}</h3>
                <ul className="space-y-4">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologiesSection
