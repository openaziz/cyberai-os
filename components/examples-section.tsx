"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const examples = [
  {
    title: "تطبيق التقويم",
    description: "واجهة مستخدم متكاملة لتطبيق تقويم مع إمكانية إضافة وتعديل الأحداث.",
    image: "/green-accented-calendar.png",
    category: "تطبيقات",
  },
  {
    title: "بداية Supabase",
    description: "مشروع يدمج Devil مع Supabase لإنشاء تطبيق مع قاعدة بيانات.",
    image: "/supabase-starter-ui.png",
    category: "قواعد بيانات",
  },
  {
    title: "مدير الملفات",
    description: "واجهة مستخدم لإدارة الملفات مع إمكانية الرفع والتنزيل والتصنيف.",
    image: "/dark-gold-file-manager.png",
    category: "أدوات",
  },
  {
    title: "لوحة تحكم تحليلات",
    description: "لوحة تحكم لعرض البيانات والإحصائيات بشكل مرئي.",
    image: "/dark-gold-analytics-dashboard.png",
    category: "لوحات تحكم",
  },
]

const ExamplesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="examples" className="py-20 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">أمثلة عملية</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            بعض الأمثلة على ما يمكن إنشاؤه باستخدام Devil
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {examples.map((example, index) => (
            <Card
              key={index}
              className="border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:gold-box-shadow bg-card/50 backdrop-blur-sm overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-2 right-2 bg-gold-500 text-black hover:bg-gold-600">
                  {example.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gold-500">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExamplesSection
