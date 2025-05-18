"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      </div>

      <div
        ref={ref}
        className="container relative z-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(50px)",
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            ابدأ في إنشاء واجهات مستخدم مذهلة مع Devil اليوم
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            انضم إلى آلاف المطورين والمصممين الذين يستخدمون Devil لتسريع عملية التطوير وتحسين جودة مشاريعهم.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white text-lg px-8 py-6 h-auto"
            >
              <Link href="#contact">
                ابدأ الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-500 text-green-500 hover:bg-green-500/10 text-lg px-8 py-6 h-auto"
            >
              <Link href="#examples">استكشف الأمثلة</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
