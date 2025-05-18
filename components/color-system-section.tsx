"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const colorSchemes = [
  {
    name: "أخضر",
    description: "مجموعة ألوان خضراء مع لمسات من الأحمر والبرتقالي والوردي.",
    colors: [
      { name: "أخضر", hex: "#10B981", className: "bg-green-500" },
      { name: "أحمر", hex: "#EF4444", className: "bg-red-500" },
      { name: "برتقالي", hex: "#F97316", className: "bg-orange-500" },
      { name: "وردي", hex: "#EC4899", className: "bg-pink-500" },
    ],
  },
  {
    name: "نيون",
    description: "مجموعة ألوان نيون مشرقة تتضمن الوردي والأزرق والأخضر والخشبي.",
    colors: [
      { name: "وردي نيون", hex: "#F0ABFC", className: "bg-pink-400" },
      { name: "أزرق نيون", hex: "#38BDF8", className: "bg-sky-400" },
      { name: "أخضر نيون", hex: "#4ADE80", className: "bg-green-400" },
      { name: "خشبي", hex: "#D8B4FE", className: "bg-purple-300" },
    ],
  },
  {
    name: "زاهية",
    description: "مجموعة ألوان زاهية تتضمن الأحمر والأزرق والأصفر والأخضر.",
    colors: [
      { name: "أحمر زاهي", hex: "#EF4444", className: "bg-red-500" },
      { name: "أزرق زاهي", hex: "#3B82F6", className: "bg-blue-500" },
      { name: "أصفر زاهي", hex: "#FACC15", className: "bg-yellow-400" },
      { name: "أخضر زاهي", hex: "#22C55E", className: "bg-green-500" },
    ],
  },
  {
    name: "أصفر",
    description: "مجموعة ألوان صفراء مع درجات البشرة والأخضر.",
    colors: [
      { name: "أصفر", hex: "#FACC15", className: "bg-yellow-400" },
      { name: "بشرة فاتح", hex: "#FED7AA", className: "bg-orange-200" },
      { name: "بشرة غامق", hex: "#FDBA74", className: "bg-orange-300" },
      { name: "أخضر", hex: "#22C55E", className: "bg-green-500" },
    ],
  },
  {
    name: "مستقبلية",
    description: "مجموعة ألوان مستقبلية تتضمن الفضي والأبيض والأزرق.",
    colors: [
      { name: "فضي", hex: "#E2E8F0", className: "bg-slate-200" },
      { name: "أبيض", hex: "#F8FAFC", className: "bg-slate-50" },
      { name: "أزرق فاتح", hex: "#BAE6FD", className: "bg-sky-200" },
      { name: "أزرق غامق", hex: "#0EA5E9", className: "bg-sky-500" },
    ],
  },
]

const ColorSystemSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="color-system" className="py-20 bg-background/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">نظام الألوان والتصميم</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Devil يعتمد على Tailwind CSS لنظام الألوان والتصميم، مما يوفر مرونة كبيرة في تخصيص المظهر
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
          <Card className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden neon-border">
            <CardContent className="p-6">
              <Tabs defaultValue={colorSchemes[0].name} className="w-full">
                <TabsList className="w-full flex flex-wrap mb-6">
                  {colorSchemes.map((scheme) => (
                    <TabsTrigger
                      key={scheme.name}
                      value={scheme.name}
                      className="flex-1 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      {scheme.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {colorSchemes.map((scheme) => (
                  <TabsContent key={scheme.name} value={scheme.name} className="space-y-6">
                    <p className="text-muted-foreground">{scheme.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {scheme.colors.map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div
                            className={`h-20 rounded-lg ${color.className} shadow-md`}
                            style={{ boxShadow: `0 4px 6px -1px ${color.hex}20, 0 2px 4px -1px ${color.hex}30` }}
                          ></div>
                          <div className="text-center">
                            <p className="font-medium">{color.name}</p>
                            <p className="text-xs text-muted-foreground">{color.hex}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-medium mb-2 text-green-500">استخدام نظام الألوان</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكن تخصيص نظام الألوان بسهولة من خلال تحديث ملف تكوين Tailwind. يضمن Devil اتساق الألوان عبر
                        التطبيق بأكمله، مما يوفر تجربة مستخدم متناسقة ومتماسكة.
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-semibold text-green-500">التصميم والتخطيط</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-green-500">نظام شبكة مرن</h4>
                    <p className="text-sm text-muted-foreground">
                      يستخدم Devil نظام شبكة مرن يسهل إنشاء تخطيطات متجاوبة تعمل على جميع أحجام الشاشات.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-green-500">مكونات قابلة للتخصيص</h4>
                    <p className="text-sm text-muted-foreground">
                      يوفر Devil مكونات قابلة للتخصيص بالكامل من خلال shadcn/ui وRadix Primitives، مما يتيح تخصيص كل
                      جانب من جوانب التصميم.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <h4 className="font-medium mb-2 text-green-500">تصميم متجاوب</h4>
                    <p className="text-sm text-muted-foreground">
                      جميع المكونات التي يولدها Devil متجاوبة بشكل كامل وتعمل على جميع أحجام الشاشات والأجهزة.
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

export default ColorSystemSection
