"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Server, Globe, Code } from "lucide-react"

const DatabaseIntegrationSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="databases" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(0,255,0,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">التكامل مع قواعد البيانات</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Devil يدعم التكامل مع مصادر البيانات المختلفة من خلال ميزة المشاريع
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-500/10 mr-4">
                      <Database className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold neon-text">المشاريع في Devil</h3>
                  </div>

                  <p className="text-muted-foreground">
                    المشاريع تتيح للمستخدمين تنظيم محادثاتهم في مجموعات، كما يمكنهم إضافة مصادر بياناتهم الخاصة إلى
                    Devil. يمكن للمستخدمين تحميل "المصادر" (Sources) إلى مشروعهم، والتي يمكن استرجاعها بواسطة Devil في
                    أي محادثات تم إنشاؤها ضمن هذا المشروع.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-medium mb-2 text-green-500">تنظيم المحادثات</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكن للمستخدمين تنظيم محادثاتهم في مشاريع منفصلة، مما يسهل إدارة المشاريع المختلفة.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-medium mb-2 text-green-500">إضافة المصادر</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكن للمستخدمين تحميل ملفات البيانات والمستندات والصور كمصادر للمشروع.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-500/10 mr-4">
                      <Server className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-500">التكامل مع قواعد البيانات</h3>
                  </div>

                  <p className="text-muted-foreground">
                    المكونات التي يولدها Devil يمكن أن تتضمن أي JavaScript جانب العميل، بما في ذلك استدعاء واجهات برمجة
                    التطبيقات في المتصفح والجلب من مصادر البيانات الخارجية. يمكن للمكونات المولدة التفاعل مع:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium text-green-500">واجهات برمجة التطبيقات</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">للحصول على البيانات أو إرسالها.</p>
                    </div>

                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="flex items-center mb-2">
                        <Server className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium text-green-500">خدمات الويب</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">للتكامل مع خدمات الطرف الثالث.</p>
                    </div>

                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="flex items-center mb-2">
                        <Database className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium text-green-500">قواعد البيانات</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">المحلية أو السحابية عبر واجهات برمجة التطبيقات.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-500/10 mr-4">
                      <Code className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-500">أمثلة على التكامل</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-medium mb-2 text-green-500">تكامل مع Supabase</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكن لـ Devil توليد كود للتكامل مع Supabase لإدارة المستخدمين والبيانات والتخزين.
                      </p>
                      <div className="mt-2 p-2 bg-background/80 rounded text-xs text-muted-foreground overflow-x-auto">
                        <pre>{`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// استرجاع البيانات
const { data, error } = await supabase
  .from('table')
  .select('*')`}</pre>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-medium mb-2 text-green-500">تكامل مع REST API</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكن لـ Devil توليد كود للتفاعل مع أي واجهة برمجة تطبيقات REST.
                      </p>
                      <div className="mt-2 p-2 bg-background/80 rounded text-xs text-muted-foreground overflow-x-auto">
                        <pre>{`// استرجاع البيانات من API
async function fetchData() {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()
  return data
}

// استخدام البيانات في المكون
const data = await fetchData()`}</pre>
                      </div>
                    </div>
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

export default DatabaseIntegrationSection
