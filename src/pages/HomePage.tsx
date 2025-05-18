"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Rocket, BotIcon as Robot, Shield, Code, Repeat, Sliders } from "lucide-react"

const HomePage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "الخصوصية والاستقلالية",
      description:
        "تشغيل النماذج محلياً على جهازك دون الحاجة للاتصال بالإنترنت، مما يضمن خصوصية بياناتك وحمايتها من التسرب.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "تكامل النماذج المتعددة",
      description: "دعم لمجموعة واسعة من نماذج الذكاء الاصطناعي المحلية والسحابية، مع إمكانية التبديل بينها بسهولة.",
      icon: <Repeat className="h-6 w-6" />,
    },
    {
      title: "واجهة متقدمة للمطورين",
      description: "واجهة برمجة تطبيقات قوية تتيح للمطورين دمج قدرات الذكاء الاصطناعي في تطبيقاتهم بسهولة.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "تخصيص كامل",
      description: "إمكانية تخصيص كل جانب من جوانب النظام، من واجهة المستخدم إلى سلوك النماذج وإعدادات الأمان.",
      icon: <Sliders className="h-6 w-6" />,
    },
  ]

  return (
    <div className="home-page">
      {/* Background Pattern */}
      <div className="background-overlay"></div>

      {/* Hero Section */}
      <section className="hero-section min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]">
            <img
              src="/assets/logo-wolf-cosmic.png"
              alt="Background Wolf"
              className="w-full h-full object-contain opacity-30"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CyberAI OS
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-muted">
          منصة الذكاء الاصطناعي المفتوحة المصدر التي تمنحك القوة والخصوصية والتحكم الكامل
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/setup" className="primary-btn large-btn pulse-btn">
            <Rocket className="h-5 w-5" />
            ابدأ الآن
          </Link>
          <Link to="/models" className="secondary-btn large-btn">
            <Robot className="h-5 w-5" />
            استكشف النماذج
          </Link>
        </div>

        <div className="mt-16 w-full max-w-4xl">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25"></div>
            <div className="relative bg-background-light rounded-lg overflow-hidden border border-background-lighter">
              <img src="/assets/chat-preview.png" alt="واجهة الدردشة" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-16 px-4 bg-background-darker">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="border-b-4 border-primary pb-2">مميزات فريدة</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card p-6 rounded-lg border transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  activeFeature === index
                    ? "bg-background-light border-primary shadow-lg"
                    : "bg-background border-background-lighter"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`feature-icon w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      activeFeature === index ? "bg-primary text-white" : "bg-background-light text-muted"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="models-section py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="border-b-4 border-accent pb-2">نماذج متنوعة</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-3xl mx-auto">
            اختر من بين مجموعة واسعة من نماذج الذكاء الاصطناعي المحلية والسحابية، من النماذج الخفيفة إلى النماذج
            المتقدمة
          </p>

          <div className="models-carousel-container relative">
            <div className="models-carousel flex gap-6 overflow-x-auto pb-6 snap-x">
              {/* Model Card 1 */}
              <div className="model-card min-w-[300px] max-w-[300px] bg-background-light rounded-lg overflow-hidden border border-background-lighter flex flex-col snap-center">
                <div className="model-header p-4 bg-primary text-white">
                  <h3 className="text-xl font-bold">DeepSeek-R1-70B</h3>
                  <p className="text-sm opacity-80">نموذج متقدم للمهام المعقدة</p>
                </div>
                <div className="model-body p-4 flex-grow">
                  <div className="model-stats flex justify-between mb-4">
                    <div className="stat">
                      <div className="stat-value font-bold">70B</div>
                      <div className="stat-label text-xs text-muted">المعلمات</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">سحابي</div>
                      <div className="stat-label text-xs text-muted">النوع</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">عالية</div>
                      <div className="stat-label text-xs text-muted">الدقة</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    نموذج لغوي كبير متعدد الاستخدامات مع قدرات متقدمة في البرمجة والاستدلال والإبداع.
                  </p>
                </div>
                <div className="model-footer p-4 border-t border-background-lighter">
                  <Link to="/models/deepseek" className="primary-btn w-full justify-center">
                    استخدم النموذج
                  </Link>
                </div>
              </div>

              {/* Model Card 2 */}
              <div className="model-card min-w-[300px] max-w-[300px] bg-background-light rounded-lg overflow-hidden border border-background-lighter flex flex-col snap-center">
                <div className="model-header p-4 bg-accent text-white">
                  <h3 className="text-xl font-bold">GPT-4o</h3>
                  <p className="text-sm opacity-80">نموذج متعدد الوسائط</p>
                </div>
                <div className="model-body p-4 flex-grow">
                  <div className="model-stats flex justify-between mb-4">
                    <div className="stat">
                      <div className="stat-value font-bold">?B</div>
                      <div className="stat-label text-xs text-muted">المعلمات</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">سحابي</div>
                      <div className="stat-label text-xs text-muted">النوع</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">ممتازة</div>
                      <div className="stat-label text-xs text-muted">الدقة</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    نموذج متطور من OpenAI يدعم النصوص والصور والصوت، مع قدرات فائقة في فهم المحتوى المتعدد.
                  </p>
                </div>
                <div className="model-footer p-4 border-t border-background-lighter">
                  <Link to="/models/gpt4o" className="primary-btn w-full justify-center">
                    استخدم النموذج
                  </Link>
                </div>
              </div>

              {/* Model Card 3 */}
              <div className="model-card min-w-[300px] max-w-[300px] bg-background-light rounded-lg overflow-hidden border border-background-lighter flex flex-col snap-center">
                <div className="model-header p-4 bg-gold text-dark-text">
                  <h3 className="text-xl font-bold">Llama 2</h3>
                  <p className="text-sm opacity-80">نموذج محلي متوسط الحجم</p>
                </div>
                <div className="model-body p-4 flex-grow">
                  <div className="model-stats flex justify-between mb-4">
                    <div className="stat">
                      <div className="stat-value font-bold">7B</div>
                      <div className="stat-label text-xs text-muted">المعلمات</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">محلي</div>
                      <div className="stat-label text-xs text-muted">النوع</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">جيدة</div>
                      <div className="stat-label text-xs text-muted">الدقة</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    نموذج مفتوح المصدر من Meta يعمل محلياً على جهازك، مناسب للمهام العامة مع توازن جيد بين الأداء
                    والموارد.
                  </p>
                </div>
                <div className="model-footer p-4 border-t border-background-lighter">
                  <Link to="/models/llama2" className="primary-btn w-full justify-center">
                    استخدم النموذج
                  </Link>
                </div>
              </div>

              {/* Model Card 4 */}
              <div className="model-card min-w-[300px] max-w-[300px] bg-background-light rounded-lg overflow-hidden border border-background-lighter flex flex-col snap-center">
                <div className="model-header p-4" style={{ backgroundColor: "#9c27b0", color: "white" }}>
                  <h3 className="text-xl font-bold">TinyLlama</h3>
                  <p className="text-sm opacity-80">نموذج محلي خفيف</p>
                </div>
                <div className="model-body p-4 flex-grow">
                  <div className="model-stats flex justify-between mb-4">
                    <div className="stat">
                      <div className="stat-value font-bold">1.1B</div>
                      <div className="stat-label text-xs text-muted">المعلمات</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">محلي</div>
                      <div className="stat-label text-xs text-muted">النوع</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value font-bold">مقبولة</div>
                      <div className="stat-label text-xs text-muted">الدقة</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    نموذج خفيف للغاية يعمل على الأجهزة محدودة الموارد، مثالي للمهام البسيطة والاستخدام السريع.
                  </p>
                </div>
                <div className="model-footer p-4 border-t border-background-lighter">
                  <Link to="/models/tinyllama" className="primary-btn w-full justify-center">
                    استخدم النموذج
                  </Link>
                </div>
              </div>
            </div>

            <div className="carousel-controls flex justify-center mt-6 gap-2">
              <button className="carousel-control prev w-10 h-10 rounded-full bg-background-light flex items-center justify-center hover:bg-background-lighter transition-colors">
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="carousel-indicators flex gap-2">
                <button className="indicator w-3 h-3 rounded-full bg-primary"></button>
                <button className="indicator w-3 h-3 rounded-full bg-background-lighter"></button>
                <button className="indicator w-3 h-3 rounded-full bg-background-lighter"></button>
                <button className="indicator w-3 h-3 rounded-full bg-background-lighter"></button>
              </div>
              <button className="carousel-control next w-10 h-10 rounded-full bg-background-light flex items-center justify-center hover:bg-background-lighter transition-colors">
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-16 px-4 bg-background-darker relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
            <img
              src="/assets/logo-wolf.png"
              alt="Background Wolf"
              className="w-full h-full object-contain opacity-20"
            />
          </div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز للبدء مع CyberAI OS؟</h2>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            انضم إلى مجتمع المطورين والمستخدمين واستمتع بقوة الذكاء الاصطناعي مع الحفاظ على خصوصيتك
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/setup" className="primary-btn large-btn">
              <i className="fas fa-download mr-2"></i>
              تثبيت النظام
            </Link>
            <Link to="/chat" className="secondary-btn large-btn">
              <i className="fas fa-comments mr-2"></i>
              جرب الدردشة
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
