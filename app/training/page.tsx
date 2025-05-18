"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Upload, Database, Brain, Play, Save, HelpCircle } from "lucide-react"
import { ENV } from "@/config/env"

const ModelTrainingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedModel, setSelectedModel] = useState("tinyllama")
  const [datasetType, setDatasetType] = useState("text")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [isTraining, setIsTraining] = useState(false)

  const totalSteps = 4

  const baseModels = [
    { id: "tinyllama", name: "TinyLlama (1.1B)", size: "600 MB", requirements: "منخفضة", icon: "fas fa-feather-alt" },
    { id: "llama2-7b", name: "Llama 2 (7B)", size: "3.5 GB", requirements: "متوسطة", icon: "fas fa-fire" },
    { id: "mistral-7b", name: "Mistral (7B)", size: "3.8 GB", requirements: "متوسطة", icon: "fas fa-wind" },
    { id: "phi-2", name: "Phi-2 (2.7B)", size: "1.7 GB", requirements: "منخفضة-متوسطة", icon: "fas fa-atom" },
  ]

  const datasetTypes = [
    { id: "text", name: "نصوص عامة", description: "مجموعة بيانات نصية عامة لتحسين قدرات النموذج اللغوية" },
    { id: "code", name: "أكواد برمجية", description: "مجموعة بيانات تحتوي على أكواد برمجية لتحسين قدرات البرمجة" },
    { id: "qa", name: "أسئلة وأجوبة", description: "مجموعة بيانات تحتوي على أسئلة وأجوبة لتحسين قدرات الإجابة" },
    { id: "custom", name: "بيانات مخصصة", description: "رفع بيانات مخصصة لتدريب النموذج على مهام محددة" },
  ]

  const nextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1)

      // محاكاة تقدم الرفع في الخطوة الثانية
      if (activeStep === 2) {
        simulateUploadProgress()
      }

      // محاكاة تقدم التدريب في الخطوة الثالثة
      if (activeStep === 3) {
        simulateTrainingProgress()
      }
    }
  }

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const simulateUploadProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const simulateTrainingProgress = () => {
    setTrainingProgress(0)
    setIsTraining(true)
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 1
      })
    }, 500)
  }

  return (
    <div className="training-page py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="page-header mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
              alt="CyberAI OS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">تدريب نموذج مخصص</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            قم بتدريب نموذج ذكاء اصطناعي مخصص على بياناتك الخاصة للحصول على أداء مثالي لاحتياجاتك المحددة
          </p>
        </div>

        <div className="setup-progress mb-8">
          <div className="steps-progress flex items-center justify-between relative">
            <div
              className="progress-line absolute h-1 bg-background-lighter"
              style={{ width: "100%", top: "50%", transform: "translateY(-50%)", zIndex: 0 }}
            ></div>
            <div
              className="progress-line-active absolute h-1 bg-primary transition-all duration-500"
              style={{
                width: `${((activeStep - 1) / (totalSteps - 1)) * 100}%`,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            ></div>

            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`step-indicator relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index + 1 === activeStep
                    ? "bg-primary text-white"
                    : index + 1 < activeStep
                      ? "bg-primary text-white"
                      : "bg-background-light text-muted"
                }`}
              >
                {index + 1 < activeStep ? <i className="fas fa-check"></i> : <span>{index + 1}</span>}
              </div>
            ))}
          </div>

          <div className="steps-labels flex justify-between mt-2">
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 1 ? "text-primary" : "text-muted"}>اختيار النموذج</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 2 ? "text-primary" : "text-muted"}>البيانات</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 3 ? "text-primary" : "text-muted"}>التدريب</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 4 ? "text-primary" : "text-muted"}>النتائج</span>
            </div>
          </div>
        </div>

        <div className="training-content bg-background-light p-6 rounded-lg border border-background-lighter">
          {/* الخطوة 1: اختيار النموذج */}
          {activeStep === 1 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">اختر النموذج الأساسي</h2>
              <p className="text-muted mb-6">
                حدد النموذج الأساسي الذي ترغب في تدريبه على بياناتك الخاصة. سيتم تخصيص عملية التدريب وفقاً للنموذج
                المختار.
              </p>

              <div className="models-list space-y-4 mb-8">
                {baseModels.map((model) => (
                  <div
                    key={model.id}
                    className={`model-option p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedModel === model.id
                        ? "border-primary bg-background"
                        : "border-background-lighter hover:border-primary"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedModel === model.id ? "border-primary" : "border-muted"
                        }`}
                      >
                        {selectedModel === model.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                      </div>
                      <div className="model-icon text-xl mr-3">
                        <i className={model.icon}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-bold">{model.name}</h4>
                          <span className="text-sm text-muted">{model.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">متطلبات الأجهزة: {model.requirements}</span>
                          <span className="text-primary">تفاصيل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="model-info bg-background p-4 rounded-lg border border-background-lighter">
                <h3 className="font-bold mb-2 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  معلومات عن التدريب
                </h3>
                <p className="text-sm text-muted">
                  تدريب نموذج مخصص يتطلب موارد حاسوبية كبيرة. للحصول على أفضل النتائج، يوصى باستخدام وحدة معالجة رسومات
                  (GPU) قوية. يمكنك تدريب النموذج على بيانات محدودة لتحسين أدائه في مجال معين دون الحاجة لتدريبه
                  بالكامل.
                </p>
              </div>
            </div>
          )}

          {/* الخطوة 2: البيانات */}
          {activeStep === 2 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">اختر نوع البيانات</h2>
              <p className="text-muted mb-6">
                حدد نوع البيانات التي ترغب في استخدامها لتدريب النموذج. يمكنك اختيار من مجموعات البيانات الجاهزة أو رفع
                بياناتك الخاصة.
              </p>

              <div className="dataset-types grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {datasetTypes.map((dataset) => (
                  <div
                    key={dataset.id}
                    className={`dataset-option p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      datasetType === dataset.id
                        ? "border-primary bg-background"
                        : "border-background-lighter hover:border-primary"
                    }`}
                    onClick={() => setDatasetType(dataset.id)}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          datasetType === dataset.id ? "border-primary" : "border-muted"
                        }`}
                      >
                        {datasetType === dataset.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                      </div>
                      <h4 className="font-bold">{dataset.name}</h4>
                    </div>
                    <p className="text-sm text-muted pr-8">{dataset.description}</p>
                  </div>
                ))}
              </div>

              {datasetType === "custom" && (
                <div className="custom-dataset-upload mb-8">
                  <div className="upload-area border-2 border-dashed border-background-lighter rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted" />
                    <h4 className="font-bold mb-2">رفع ملفات البيانات</h4>
                    <p className="text-sm text-muted mb-4">
                      اسحب وأفلت ملفات البيانات هنا، أو انقر لاختيار الملفات. يدعم صيغ TXT، CSV، JSON، JSONL.
                    </p>
                    <button className="primary-btn mx-auto">
                      <i className="fas fa-upload mr-2"></i>
                      اختيار الملفات
                    </button>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="upload-progress mt-4">
                      <div className="flex justify-between mb-2">
                        <span>تقدم الرفع</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="dataset-info bg-background p-4 rounded-lg border border-background-lighter">
                <h3 className="font-bold mb-2 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  معلومات عن البيانات
                </h3>
                <p className="text-sm text-muted">
                  جودة البيانات المستخدمة في التدريب تؤثر بشكل كبير على أداء النموذج النهائي. يفضل استخدام بيانات متنوعة
                  وذات جودة عالية ومرتبطة بالمجال الذي ترغب في تحسين أداء النموذج فيه.
                </p>
              </div>
            </div>
          )}

          {/* الخطوة 3: التدريب */}
          {activeStep === 3 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">إعدادات التدريب</h2>
              <p className="text-muted mb-6">
                قم بتخصيص إعدادات التدريب وفقاً لاحتياجاتك. يمكنك ضبط معلمات التدريب للحصول على أفضل النتائج.
              </p>

              <div className="training-settings space-y-6 mb-8">
                <div className="setting-group">
                  <h3 className="font-bold mb-3">معلمات التدريب الأساسية</h3>
                  <div className="space-y-4">
                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>عدد الحقب (Epochs)</span>
                        <span className="text-primary">{ENV.TRAINING.MAX_EPOCHS}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={ENV.TRAINING.MAX_EPOCHS}
                        className="w-full bg-background h-2 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>معدل التعلم (Learning Rate)</span>
                        <span className="text-primary">{ENV.TRAINING.LEARNING_RATE}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={ENV.TRAINING.LEARNING_RATE * 1000000}
                        className="w-full bg-background h-2 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>حجم الدفعة (Batch Size)</span>
                        <span className="text-primary">{ENV.TRAINING.BATCH_SIZE}</span>
                      </label>
                      <select className="w-full bg-background border border-background-lighter rounded-md p-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4" selected={ENV.TRAINING.BATCH_SIZE === 4}>
                          4
                        </option>
                        <option value="8" selected={ENV.TRAINING.BATCH_SIZE === 8}>
                          8
                        </option>
                        <option value="16" selected={ENV.TRAINING.BATCH_SIZE === 16}>
                          16
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="setting-group">
                  <h3 className="font-bold mb-3">إعدادات متقدمة</h3>
                  <div className="space-y-4">
                    <div className="setting-item flex items-center justify-between">
                      <span>تمكين التحسين التلقائي للمعلمات</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="setting-item flex items-center justify-between">
                      <span>حفظ نقاط التفتيش (Checkpoints)</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="setting-item flex items-center justify-between">
                      <span>استخدام وحدة معالجة الرسومات (GPU)</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="training-progress mb-8">
                <h3 className="font-bold mb-3">تقدم التدريب</h3>
                <div className="flex justify-between mb-2">
                  <span>
                    {isTraining ? "جاري التدريب..." : trainingProgress === 100 ? "اكتمل التدريب" : "في انتظار البدء"}
                  </span>
                  <span>{trainingProgress}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full transition-all duration-300"
                    style={{ width: `${trainingProgress}%` }}
                  ></div>
                </div>

                {trainingProgress > 0 && trainingProgress < 100 && (
                  <div className="training-stats mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat bg-background p-3 rounded-md">
                      <div className="stat-label text-xs text-muted">الحقبة الحالية</div>
                      <div className="stat-value font-bold">{Math.ceil(trainingProgress / 33)}/3</div>
                    </div>
                    <div className="stat bg-background p-3 rounded-md">
                      <div className="stat-label text-xs text-muted">الخسارة</div>
                      <div className="stat-value font-bold">{(1.5 - trainingProgress / 100).toFixed(3)}</div>
                    </div>
                    <div className="stat bg-background p-3 rounded-md">
                      <div className="stat-label text-xs text-muted">الوقت المتبقي</div>
                      <div className="stat-value font-bold">{Math.ceil((100 - trainingProgress) / 10)} دقائق</div>
                    </div>
                    <div className="stat bg-background p-3 rounded-md">
                      <div className="stat-label text-xs text-muted">استخدام GPU</div>
                      <div className="stat-value font-bold">92%</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="training-actions flex gap-4">
                <button
                  className="primary-btn flex-1 justify-center"
                  onClick={simulateTrainingProgress}
                  disabled={isTraining || trainingProgress === 100}
                >
                  <Play className="h-5 w-5" />
                  {trainingProgress === 0 ? "بدء التدريب" : trainingProgress === 100 ? "تم التدريب" : "استئناف التدريب"}
                </button>
                <button className="secondary-btn" disabled={trainingProgress === 0 || isTraining}>
                  <i className="fas fa-pause"></i>
                  إيقاف مؤقت
                </button>
                <button className="secondary-btn" disabled={trainingProgress === 0 || isTraining}>
                  <i className="fas fa-stop"></i>
                  إلغاء
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 4: النتائج */}
          {activeStep === 4 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">نتائج التدريب</h2>
              <p className="text-muted mb-6">
                تم الانتهاء من تدريب النموذج بنجاح! يمكنك الآن استخدام النموذج المخصص في تطبيقاتك.
              </p>

              <div className="training-results mb-8">
                <div className="result-card bg-background p-6 rounded-lg border border-background-lighter mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">ملخص التدريب</h3>
                    <span className="bg-green-500 text-white text-xs py-1 px-2 rounded-full">ناجح</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">النموذج الأساسي</div>
                      <div className="stat-value font-bold">
                        {baseModels.find((m) => m.id === selectedModel)?.name || selectedModel}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">نوع البيانات</div>
                      <div className="stat-value font-bold">
                        {datasetTypes.find((d) => d.id === datasetType)?.name || datasetType}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">وقت التدريب</div>
                      <div className="stat-value font-bold">32 دقيقة</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">عدد الحقب</div>
                      <div className="stat-value font-bold">3</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">الخسارة النهائية</div>
                      <div className="stat-value font-bold">0.342</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label text-xs text-muted">حجم النموذج</div>
                      <div className="stat-value font-bold">1.2 GB</div>
                    </div>
                  </div>

                  <div className="performance-chart bg-background-lighter h-48 rounded-md flex items-center justify-center mb-6">
                    <div className="text-center text-muted">
                      <i className="fas fa-chart-line text-3xl mb-2"></i>
                      <p>رسم بياني لأداء التدريب</p>
                    </div>
                  </div>

                  <div className="model-actions flex flex-wrap gap-4">
                    <button className="primary-btn">
                      <Save className="h-5 w-5" />
                      تنزيل النموذج
                    </button>
                    <button className="secondary-btn">
                      <i className="fas fa-cloud-upload-alt"></i>
                      رفع إلى السحابة
                    </button>
                    <button className="secondary-btn">
                      <i className="fas fa-file-alt"></i>
                      تقرير التدريب
                    </button>
                  </div>
                </div>

                <div className="model-test bg-background p-6 rounded-lg border border-background-lighter">
                  <h3 className="font-bold mb-4">اختبار النموذج</h3>
                  <p className="text-sm text-muted mb-4">
                    جرب النموذج المدرب حديثاً عن طريق إدخال نص للحصول على استجابة.
                  </p>

                  <div className="test-input mb-4">
                    <textarea
                      className="w-full min-h-[100px] p-3 rounded-md bg-background-lighter border border-background-lighter text-foreground resize-none"
                      placeholder="اكتب نصاً هنا لاختبار النموذج المدرب..."
                    ></textarea>
                  </div>

                  <div className="test-actions flex gap-4 mb-4">
                    <button className="primary-btn flex-1 justify-center">
                      <i className="fas fa-play"></i>
                      اختبار النموذج
                    </button>
                    <button className="secondary-btn">
                      <i className="fas fa-redo"></i>
                      إعادة تعيين
                    </button>
                  </div>

                  <div className="test-output bg-background-lighter p-4 rounded-md">
                    <div className="text-center text-muted py-4">
                      <HelpCircle className="h-8 w-8 mx-auto mb-2" />
                      <p>ستظهر هنا نتيجة اختبار النموذج</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-steps bg-background p-4 rounded-lg border border-background-lighter">
                <h3 className="font-bold mb-2">الخطوات التالية</h3>
                <ul className="text-sm text-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>استخدم النموذج المدرب في واجهة الدردشة للتفاعل معه بشكل مباشر.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>قم بتصدير النموذج لاستخدامه في تطبيقاتك الخاصة.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>شارك النموذج مع المجتمع أو احتفظ به خاصاً بك.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="setup-navigation mt-8 flex justify-between">
            {activeStep > 1 && (
              <button className="secondary-btn" onClick={prevStep} disabled={isTraining}>
                <ArrowLeft className="h-5 w-5" />
                السابق
              </button>
            )}

            {activeStep === 1 && <div></div>}

            {activeStep < totalSteps ? (
              <button
                className="primary-btn"
                onClick={nextStep}
                disabled={(activeStep === 1 && !selectedModel) || (activeStep === 2 && !datasetType) || isTraining}
              >
                التالي
                <i className="fas fa-arrow-left mr-2"></i>
              </button>
            ) : (
              <button className="primary-btn" onClick={() => (window.location.href = `${ENV.BASE_URL}chat`)}>
                الانتقال إلى الدردشة
                <i className="fas fa-comments mr-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelTrainingPage
