"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Code } from "lucide-react"
import { motion } from "framer-motion"

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gold-glow"
          >
            <span className="gold-text">Devil</span>
            <br />
            <span className="text-3xl md:text-5xl">الذكاء الاصطناعي لإنشاء واجهات المستخدم</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10"
          >
            أداة متطورة للذكاء الاصطناعي التوليدي تتيح لك إنشاء واجهات مستخدم عالية الجودة بسرعة وكفاءة من خلال وصف بسيط
            بالنص الطبيعي.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button asChild size="lg" className="gold-gradient text-black text-lg px-8 py-6 h-auto">
              <Link href="#features">
                ابدأ الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10 text-lg px-8 py-6 h-auto"
            >
              <Link href="#how-it-works">
                <Code className="ml-2 h-5 w-5" />
                كيف يعمل
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="rounded-xl overflow-hidden border border-gold-500/30 gold-box-shadow animate-float">
              <img src="/ai-ui-generator.png" alt="واجهة Devil" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
