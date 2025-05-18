"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { MessageCircle, Cpu, Code, Eye, Edit } from "lucide-react"

const steps = [
  {
    icon: <MessageCircle className="h-8 w-8 text-black" />,
    title: "واجهة المحادثة",
    description: "يبدأ المستخدم بوصف ما يريد إنشاؤه باللغة الطبيعية.",
  },
  {
    icon: <Cpu className="h-8 w-8 text-black" />,
    title: "معالجة الطلب",
    description: "يحلل Devil الطلب ويفهم المتطلبات.",
  },
  {
    icon: <Code className="h-8 w-8 text-black" />,
    title: "توليد الكود",
    description: "ينشئ Devil كود React وTailwind CSS استناداً إلى الطلب.",
  },
  {
    icon: <Eye className="h-8 w-8 text-black" />,
    title: "عرض النتيجة",
    description: "يعرض المكون المولد في نافذة جديدة على يمين واجهة المحادثة.",
  },
  {
    icon: <Edit className="h-8 w-8 text-black" />,
    title: "التعديل والتحسين",
    description: "يمكن للمستخدم طلب تعديلات أو تحسينات على المكون المولد.",
  },
]

const HowItWorksSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="how-it-works" className="py-20 bg-background/50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">كيف يعمل Devil</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            عملية بسيطة وفعالة لتحويل أفكارك إلى واجهات مستخدم عالية الجودة
          </p>
        </div>

        <div
          ref={ref}
          className="max-w-4xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {steps.map((step, index) => (
            <div key={index} className="flex mb-8 last:mb-0">
              <div className="mr-6 flex flex-col items-center">
                <div className="gold-gradient rounded-full p-3 flex items-center justify-center z-10">{step.icon}</div>
                {index < steps.length - 1 && <div className="w-0.5 h-full bg-gold-500/30 mt-3"></div>}
              </div>
              <div className="pt-2 pb-8">
                <h3 className="text-xl font-semibold mb-2 text-gold-500">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
