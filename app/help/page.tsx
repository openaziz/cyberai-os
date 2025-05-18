"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Book, HelpCircle, MessageSquare, FileText, Github, ExternalLink, Cpu } from "lucide-react"
import { ENV } from "@/config/env"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="help-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">مركز المساعدة</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            احصل على إجابات لأسئلتك ومساعدة في استخدام CyberAI OS
          </p>

          <div className="search-container max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن سؤال أو موضوع..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="faq" className="mb-12">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="faq" className="flex flex-col items-center gap-1 py-3">
                <HelpCircle className="h-5 w-5" />
                <span>الأسئلة الشائعة</span>
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex flex-col items-center gap-1 py-3">
                <Book className="h-5 w-5" />
                <span>أدلة الاستخدام</span>
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex flex-col items-center gap-1 py-3">
                <FileText className="h-5 w-5" />
                <span>التوثيق</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex flex-col items-center gap-1 py-3">
                <MessageSquare className="h-5 w-5" />
                <span>المجتمع</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
                <CardDescription>إجابات للأسئلة الأكثر شيوعاً حول CyberAI OS</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>ما هو CyberAI OS؟</AccordionTrigger>
                    <AccordionContent>
                      CyberAI OS هو منصة ذكاء اصطناعي مفتوحة المصدر تتيح لك تشغيل نماذج الذكاء الاصطناعي محلياً على جهازك
                      بخصوصية كاملة ودون الحاجة للاتصال بالإنترنت أو مفاتيح API خارجية. يوفر النظام واجهة سهلة الاستخدام
                      للتفاعل مع مختلف نماذج الذكاء الاصطناعي سواء كانت محلية أو سحابية.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>ما هي متطلبات النظام لتشغيل CyberAI OS؟</AccordionTrigger>
                    <AccordionContent>
                      <p>تختلف متطلبات النظام حسب النماذج التي ترغب في تشغيلها:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>للنماذج الصغيرة (1-3B): 8GB RAM، معالج متوسط، 10GB مساحة تخزين</li>
                        <li>للنماذج المتوسطة (7B): 16GB RAM، معالج جيد، 20GB مساحة تخزين</li>
                        <li>للنماذج الكبيرة (13B+): 32GB RAM، معالج قوي أو GPU، 40GB+ مساحة تخزين</li>
                      </ul>
                      <p className="mt-2">يعمل النظام على Windows و macOS و Linux.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>هل يمكنني استخدام CyberAI OS بدون اتصال بالإنترنت؟</AccordionTrigger>
                    <AccordionContent>
                      نعم، يمكنك استخدام النماذج المحلية بدون اتصال بالإنترنت بعد تنزيلها. ومع ذلك، ستحتاج إلى اتصال
                      بالإنترنت للوصول إلى النماذج السحابية مثل GPT-4o أو DeepSeek-R1، وكذلك لتنزيل النماذج المحلية في
                      المرة الأولى.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>كيف يمكنني تدريب نموذج مخصص؟</AccordionTrigger>
                    <AccordionContent>
                      يمكنك تدريب نموذج مخصص باستخدام صفحة التدريب في CyberAI OS. ستحتاج إلى تحضير بياناتك في تنسيق
                      مناسب (عادةً JSONL)، ثم اختيار نموذج أساسي للتدريب عليه، وتحديد معلمات التدريب مثل معدل التعلم وحجم
                      الدفعة وعدد الحقب. يوفر النظام واجهة سهلة الاستخدام لإدارة عملية التدريب ومراقبة التقدم.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>هل بياناتي آمنة عند استخدام CyberAI OS؟</AccordionTrigger>
                    <AccordionContent>
                      نعم، عند استخدام النماذج المحلية، تبقى جميع بياناتك على جهازك ولا تغادره أبداً. لا يتم إرسال أي
                      بيانات إلى خوادم خارجية. عند استخدام النماذج السحابية، يتم إرسال استفساراتك إلى الخدمة المعنية
                      وفقاً لسياسات الخصوصية الخاصة بها. يوفر CyberAI OS أيضاً خيار تشفير البيانات المخزنة محلياً لمزيد من
                      الأمان.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                title="دليل البدء السريع"
                description="خطوات سريعة لبدء استخدام CyberAI OS"
                icon={<Book className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/setup"
              />
              <GuideCard
                title="تثبيت النماذج المحلية"
                description="كيفية تنزيل وتثبيت النماذج المحلية"
                icon={<HardDrive className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/models"
              />
              <GuideCard
                title="استخدام واجهة الدردشة"
                description="دليل شامل لاستخدام واجهة الدردشة"
                icon={<MessageSquare className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/chat"
              />
              <GuideCard
                title="تدريب نموذج مخصص"
                description="خطوات تدريب نموذج على بياناتك الخاصة"
                icon={<Cpu className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/training"
              />
              <GuideCard
                title="استخدام واجهة Terminal"
                description="دليل استخدام واجهة Terminal المتقدمة"
                icon={<Terminal className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/terminal"
              />
              <GuideCard
                title="تكامل API"
                description="كيفية استخدام واجهة برمجة التطبيقات"
                icon={<Code className="h-8 w-8 text-red-600 dark:text-red-500" />}
                link="/docs/api"
              />
            </div>
          </TabsContent>

          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>التوثيق الفني</CardTitle>
                <CardDescription>توثيق شامل لجميع ميزات وواجهات CyberAI OS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link to="/docs/installation" className="block">
                    <Card className="h-full hover:bg-background-lighter transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-600 dark:text-red-500" />
                          دليل التثبيت
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          تعليمات تفصيلية لتثبيت CyberAI OS على مختلف أنظمة التشغيل
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/docs/api-reference" className="block">
                    <Card className="h-full hover:bg-background-lighter transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-600 dark:text-red-500" />
                          مرجع API
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          توثيق كامل لواجهة برمجة التطبيقات وكيفية استخدامها
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/docs/models" className="block">
                    <Card className="h-full hover:bg-background-lighter transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-600 dark:text-red-500" />
                          النماذج المدعومة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">قائمة شاملة بجميع النماذج المدعومة ومواصفاتها</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/docs/training" className="block">
                    <Card className="h-full hover:bg-background-lighter transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-600 dark:text-red-500" />
                          دليل التدريب
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">شرح مفصل لعملية تدريب النماذج المخصصة</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    عرض التوثيق الكامل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>مجتمع CyberAI OS</CardTitle>
                <CardDescription>انضم إلى مجتمعنا للحصول على المساعدة والمشاركة في تطوير المشروع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:bg-background-lighter transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Github className="h-5 w-5 text-red-600 dark:text-red-500" />
                        GitHub
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        تصفح الشفرة المصدرية، أبلغ عن المشكلات، وساهم في تطوير المشروع
                      </p>
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" />
                        زيارة GitHub
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:bg-background-lighter transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-red-600 dark:text-red-500" />
                        منتدى المناقشة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        شارك في المناقشات، اطرح الأسئلة، وتبادل الخبرات مع المستخدمين الآخرين
                      </p>
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" />
                        زيارة المنتدى
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">تواصل معنا مباشرة</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              الاسم
                            </label>
                            <Input id="name" placeholder="أدخل اسمك" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              البريد الإلكتروني
                            </label>
                            <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            الموضوع
                          </label>
                          <Input id="subject" placeholder="أدخل موضوع الرسالة" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            الرسالة
                          </label>
                          <textarea
                            id="message"
                            className="w-full min-h-[120px] p-3 rounded-md border border-background-lighter bg-background resize-y"
                            placeholder="اكتب رسالتك هنا..."
                          ></textarea>
                        </div>
                        <Button type="submit" className="bg-red-600 hover:bg-red-700">
                          إرسال الرسالة
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function GuideCard({
  title,
  description,
  icon,
  link,
}: { title: string; description: string; icon: React.ReactNode; link: string }) {
  return (
    <Link to={link} className="block">
      <Card className="h-full hover:bg-background-lighter transition-colors">
        <CardContent className="pt-6">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function HardDrive(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="12" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" x2="6.01" y1="16" y2="16" />
      <line x1="10" x2="10.01" y1="16" y2="16" />
    </svg>
  )
}

function Terminal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}

function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
