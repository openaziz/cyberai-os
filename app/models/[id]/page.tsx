import type { Metadata } from "next"
import { ArrowLeft, Brain, Cloud, Download, ExternalLink, Server, Star } from "lucide-react"
import Link from "next/link"

interface ModelPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: ModelPageProps): Metadata {
  return {
    title: `${params.id} - CyberAI OS`,
    description: `تفاصيل نموذج ${params.id} في CyberAI OS`,
  }
}

export default function ModelPage({ params }: ModelPageProps) {
  // في التطبيق الحقيقي، سيتم جلب بيانات النموذج من قاعدة البيانات
  // هنا نستخدم بيانات ثابتة للعرض التوضيحي
  const modelData = {
    id: params.id,
    name: params.id === "tinyllama" ? "TinyLlama" : params.id === "gpt-4o" ? "GPT-4o" : params.id,
    description:
      params.id === "tinyllama"
        ? "نموذج لغوي خفيف الوزن مثالي للأجهزة ذات الموارد المحدودة"
        : "نموذج ذكاء اصطناعي متقدم",
    type:
      params.id === "tinyllama" || params.id === "phi-2" || params.id === "mistral-7b" || params.id === "llama2-7b"
        ? "local"
        : "cloud",
    size: params.id === "tinyllama" ? "600 MB" : params.id === "phi-2" ? "1.7 GB" : "N/A",
    parameters: params.id === "tinyllama" ? "1.1B" : params.id === "gpt-4o" ? "1.8T (تقديري)" : "N/A",
    requirements: params.id === "tinyllama" ? "منخفضة" : "اتصال إنترنت + مفتاح API",
    tags: ["لغة", "نص", "سريع"],
    rating: 4.5,
    isPopular: true,
    creator: params.id === "tinyllama" ? "Chinese Academy of Sciences" : params.id === "gpt-4o" ? "OpenAI" : "Unknown",
    license: params.id === "tinyllama" ? "Apache 2.0" : "Proprietary",
    releaseDate: "2023-12-15",
    lastUpdate: "2024-03-20",
    supportedLanguages: ["العربية", "الإنجليزية", "الفرنسية", "الألمانية", "الإسبانية", "الصينية"],
    benchmarks: [
      { name: "MMLU", score: "42.3%" },
      { name: "HumanEval", score: "18.7%" },
      { name: "GSM8K", score: "12.5%" },
    ],
    contextWindow: params.id === "tinyllama" ? "2048 tokens" : params.id === "gpt-4o" ? "128K tokens" : "N/A",
  }

  return (
    <main className="flex min-h-screen flex-col py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/models"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            العودة إلى النماذج
          </Link>
        </div>

        <div className="model-header bg-background-lighter rounded-lg p-6 border border-background-lighter mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="model-icon w-20 h-20 rounded-lg bg-background flex items-center justify-center">
              {modelData.type === "local" ? (
                <Server className="h-10 w-10 text-red-600" />
              ) : (
                <Cloud className="h-10 w-10 text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{modelData.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        modelData.type === "local"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                      }`}
                    >
                      {modelData.type === "local" ? "محلي" : "سحابي"}
                    </span>
                    {modelData.isPopular && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                        <Star className="h-3 w-3 ml-1" />
                        شائع
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background text-muted-foreground">
                      {modelData.parameters}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{modelData.description}</p>
                </div>
                <div className="model-actions flex gap-2">
                  {modelData.type === "local" ? (
                    <button className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-4 font-medium transition-colors">
                      <Download className="h-5 w-5" />
                      تنزيل النموذج
                    </button>
                  ) : (
                    <button className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-4 font-medium transition-colors">
                      <Cloud className="h-5 w-5" />
                      إعداد API
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-1 bg-background hover:bg-background-lighter border border-background-lighter rounded-md py-2 px-4 font-medium transition-colors">
                    <Brain className="h-5 w-5" />
                    تجربة النموذج
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="bg-background-lighter rounded-lg p-6 border border-background-lighter mb-8">
              <h2 className="text-xl font-bold mb-4">نظرة عامة</h2>
              <p className="text-muted-foreground mb-4">
                {modelData.name} هو نموذج لغوي {modelData.type === "local" ? "محلي" : "سحابي"} يتميز بـ{" "}
                {modelData.parameters} من المعلمات. تم تطويره بواسطة {modelData.creator} وهو مناسب للاستخدام في مجموعة
                متنوعة من المهام اللغوية.
              </p>
              <p className="text-muted-foreground mb-4">
                يتميز النموذج بنافذة سياق تبلغ {modelData.contextWindow}، مما يتيح له معالجة نصوص طويلة نسبياً في عملية
                واحدة. يدعم النموذج العديد من اللغات بما في ذلك {modelData.supportedLanguages.slice(0, 3).join("، ")}{" "}
                وغيرها.
              </p>
              <p className="text-muted-foreground">
                {modelData.type === "local"
                  ? "يمكن تشغيل هذا النموذج محلياً على جهازك دون الحاجة إلى اتصال بالإنترنت، مما يوفر خصوصية كاملة لبياناتك."
                  : "يتطلب هذا النموذج اتصالاً بالإنترنت ومفتاح API للوصول إلى الخدمة السحابية."}
              </p>
            </div>

            <div className="bg-background-lighter rounded-lg p-6 border border-background-lighter mb-8">
              <h2 className="text-xl font-bold mb-4">الأداء والمقاييس</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {modelData.benchmarks.map((benchmark) => (
                  <div key={benchmark.name} className="benchmark-card bg-background p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{benchmark.name}</div>
                    <div className="text-xl font-bold">{benchmark.score}</div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                تم تقييم أداء النموذج على مجموعة متنوعة من المقاييس القياسية. يظهر النموذج أداءً{" "}
                {modelData.type === "local" ? "جيداً نسبياً مقارنة بحجمه" : "ممتازاً مقارنة بالنماذج المماثلة"}.
              </p>
              <div className="mt-4">
                <Link href="#" className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors">
                  عرض تقرير الأداء الكامل
                  <ExternalLink className="h-4 w-4 mr-1" />
                </Link>
              </div>
            </div>

            <div className="bg-background-lighter rounded-lg p-6 border border-background-lighter">
              <h2 className="text-xl font-bold mb-4">متطلبات النظام</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">الحد الأدنى</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {modelData.type === "local" ? (
                      <>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>وحدة المعالجة المركزية: Intel Core i5 أو ما يعادلها</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>ذاكرة الوصول العشوائي: 8 GB</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>مساحة التخزين: 2 GB</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>نظام التشغيل: Windows 10/11، macOS 10.15+، Linux</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>اتصال إنترنت مستقر</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>مفتاح API صالح</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>متصفح حديث</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">الموصى به</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {modelData.type === "local" ? (
                      <>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>وحدة المعالجة المركزية: Intel Core i7/AMD Ryzen 7 أو أعلى</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>ذاكرة الوصول العشوائي: 16 GB أو أكثر</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>وحدة معالجة الرسومات: NVIDIA/AMD مع 4GB VRAM أو أكثر</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>مساحة تخزين SSD: 10 GB أو أكثر</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>اتصال إنترنت عالي السرعة</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>خطة API مع حصة كافية</span>
                        </li>
                        <li className="flex items-start">
                          <span className="ml-2">•</span>
                          <span>متصفح حديث مع دعم WebSocket</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-background-lighter rounded-lg p-6 border border-background-lighter mb-8 sticky top-4">
              <h2 className="text-xl font-bold mb-4">معلومات النموذج</h2>
              <div className="space-y-4">
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">المطور</div>
                  <div className="font-medium">{modelData.creator}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">الترخيص</div>
                  <div className="font-medium">{modelData.license}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">تاريخ الإصدار</div>
                  <div className="font-medium">{modelData.releaseDate}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">آخر تحديث</div>
                  <div className="font-medium">{modelData.lastUpdate}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">الحجم</div>
                  <div className="font-medium">{modelData.size}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">المعلمات</div>
                  <div className="font-medium">{modelData.parameters}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">نافذة السياق</div>
                  <div className="font-medium">{modelData.contextWindow}</div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">اللغات المدعومة</div>
                  <div className="font-medium">
                    {modelData.supportedLanguages.slice(0, 3).join("، ")}
                    {modelData.supportedLanguages.length > 3 && (
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        و{modelData.supportedLanguages.length - 3} أخرى
                      </span>
                    )}
                  </div>
                </div>
                <div className="info-item">
                  <div className="text-sm text-muted-foreground">التقييم</div>
                  <div className="font-medium flex items-center">
                    {modelData.rating}
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${
                            i < Math.floor(modelData.rating) ? "text-amber-500" : "text-muted-foreground"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-background-lighter">
                <h3 className="font-bold mb-3">روابط مفيدة</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      الموقع الرسمي
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      مستودع GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      توثيق API
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      دليل المستخدم
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="related-models bg-background-lighter rounded-lg p-6 border border-background-lighter">
          <h2 className="text-xl font-bold mb-4">نماذج مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["phi-2", "mistral-7b", "llama2-7b", "gpt-4o"]
              .filter((id) => id !== params.id)
              .slice(0, 4)
              .map((modelId) => (
                <Link
                  key={modelId}
                  href={`/models/${modelId}`}
                  className="related-model-card bg-background p-4 rounded-lg hover:border-red-500 border border-background transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="model-icon w-10 h-10 rounded-md bg-background-lighter flex items-center justify-center">
                      {modelId.includes("gpt") || modelId.includes("claude") ? (
                        <Cloud className="h-5 w-5 text-red-600" />
                      ) : (
                        <Server className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {modelId === "phi-2"
                          ? "Phi-2"
                          : modelId === "mistral-7b"
                            ? "Mistral 7B"
                            : modelId === "llama2-7b"
                              ? "Llama 2 (7B)"
                              : modelId === "gpt-4o"
                                ? "GPT-4o"
                                : modelId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {modelId === "phi-2"
                          ? "2.7B"
                          : modelId === "mistral-7b" || modelId === "llama2-7b"
                            ? "7B"
                            : modelId === "gpt-4o"
                              ? "1.8T"
                              : "N/A"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
