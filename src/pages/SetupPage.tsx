import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SetupPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [installProgress, setInstallProgress] = useState(0);
  
  const totalSteps = 4;
  
  const platforms = [
    { id: 'windows', name: 'Windows', icon: 'fab fa-windows', color: '#0078d7' },
    { id: 'macos', name: 'macOS', icon: 'fab fa-apple', color: '#000000' },
    { id: 'linux', name: 'Linux', icon: 'fab fa-linux', color: '#333333' },
    { id: 'android', name: 'Android', icon: 'fab fa-android', color: '#a4c639' },
    { id: 'ios', name: 'iOS', icon: 'fab fa-app-store-ios', color: '#007aff' }
  ];
  
  const models = [
    { id: 'tinyllama', name: 'TinyLlama (1.1B)', size: '600 MB', requirements: 'منخفضة', icon: 'fas fa-feather-alt' },
    { id: 'llama2-7b', name: 'Llama 2 (7B)', size: '3.5 GB', requirements: 'متوسطة', icon: 'fas fa-fire' },
    { id: 'mistral-7b', name: 'Mistral (7B)', size: '3.8 GB', requirements: 'متوسطة', icon: 'fas fa-wind' },
    { id: 'phi-2', name: 'Phi-2 (2.7B)', size: '1.7 GB', requirements: 'منخفضة-متوسطة', icon: 'fas fa-atom' }
  ];
  
  const nextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
      
      // محاكاة تقدم التثبيت في الخطوة الأخيرة
      if (activeStep === 3) {
        const interval = setInterval(() => {
          setInstallProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 300);
      }
    }
  };
  
  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  return (
    <div className="setup-page py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="page-header mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">إعداد CyberAI OS</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            اتبع الخطوات التالية لتثبيت وإعداد CyberAI OS على جهازك
          </p>
        </div>
        
        <div className="setup-progress mb-8">
          <div className="steps-progress flex items-center justify-between relative">
            <div className="progress-line absolute h-1 bg-background-lighter" style={{ width: '100%', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}></div>
            <div className="progress-line-active absolute h-1 bg-primary transition-all duration-500" style={{ width: `${(activeStep - 1) / (totalSteps - 1) * 100}%`, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}></div>
            
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index}
                className={`step-indicator relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index + 1 === activeStep 
                    ? 'bg-primary text-white' 
                    : index + 1 < activeStep 
                      ? 'bg-primary text-white' 
                      : 'bg-background-light text-muted'
                }`}
              >
                {index + 1 < activeStep ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="steps-labels flex justify-between mt-2">
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 1 ? 'text-primary' : 'text-muted'}>اختيار المنصة</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 2 ? 'text-primary' : 'text-muted'}>اختيار النماذج</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 3 ? 'text-primary' : 'text-muted'}>الإعدادات</span>
            </div>
            <div className="step-label text-center text-sm font-medium">
              <span className={activeStep >= 4 ? 'text-primary' : 'text-muted'}>التثبيت</span>
            </div>
          </div>
        </div>
        
        <div className="setup-content bg-background-light p-6 rounded-lg border border-background-lighter">
          {/* الخطوة 1: اختيار المنصة */}
          {activeStep === 1 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">اختر منصة التشغيل</h2>
              <p className="text-muted mb-6">
                حدد نظام التشغيل الذي ترغب في تثبيت CyberAI OS عليه. سيتم تخصيص عملية التثبيت وفقاً للمنصة المختارة.
              </p>
              
              <div className="platforms-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {platforms.map(platform => (
                  <div 
                    key={platform.id}
                    className={`platform-card p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedPlatform === platform.id 
                        ? 'border-primary bg-background shadow-md' 
                        : 'border-background-lighter hover:border-primary'
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div 
                        className="platform-icon text-3xl mb-3"
                        style={{ color: platform.color }}
                      >
                        <i className={platform.icon}></i>
                      </div>
                      <div className="platform-name font-medium">{platform.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="platform-requirements mt-6">
                <h3 className="font-bold mb-2">متطلبات النظام:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  <li>معالج: Intel Core i5 أو ما يعادله (أو أفضل)</li>
                  <li>ذاكرة: 8 GB RAM (16 GB موصى به للنماذج الكبيرة)</li>
                  <li>مساحة تخزين: 10 GB على الأقل (يعتمد على النماذج المختارة)</li>
                  <li>اتصال إنترنت للتثبيت الأولي وتحميل النماذج</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* الخطوة 2: اختيار النماذج */}
          {activeStep === 2 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">اختر النماذج المحلية</h2>
              <p className="text-muted mb-6">
                حدد نماذج الذكاء الاصطناعي التي ترغب في تثبيتها محلياً على جهازك. يمكنك اختيار نموذج واحد أو أكثر.
              </p>
              
              <div className="models-list space-y-4 mb-8">
                {models.map(model => (
                  <div 
                    key={model.id}
                    className={`model-option p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedModel === model.id 
                        ? 'border-primary bg-background' 
                        : 'border-background-lighter hover:border-primary'
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedModel === model.id ? 'border-primary' : 'border-muted'
                      }`}>
                        {selectedModel === model.id && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
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
              
              <div className="cloud-models-note bg-background p-4 rounded-lg border border-background-lighter">
                <h3 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-cloud mr-2 text-primary"></i>
                  النماذج السحابية
                </h3>
                <p className="text-sm text-muted">
                  النماذج السحابية مثل DeepSeek-R1-70B وGPT-4o متاحة مباشرة من خلال واجهة الدردشة دون الحاجة للتثبيت المحلي.
                  يتطلب استخدامها اتصالاً بالإنترنت ومفاتيح API صالحة.
                </p>
              </div>
            </div>
          )}
          
          {/* الخطوة 3: الإعدادات */}
          {activeStep === 3 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">تخصيص الإعدادات</h2>
              <p className="text-muted mb-6">
                قم بتخصيص إعدادات CyberAI OS وفقاً لاحتياجاتك وتفضيلاتك.
              </p>
              
              <div className="settings-form space-y-6">
                <div className="setting-group">
                  <h3 className="font-bold mb-3">إعدادات عامة</h3>
                  <div className="space-y-4">
                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>اللغة</span>
                      </label>
                      <select className="w-full bg-background border border-background-lighter rounded-md p-2">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>السمة</span>
                      </label>
                      <select className="w-full bg-background border border-background-lighter rounded-md p-2">
                        <option value="dark">داكنة</option>
                        <option value="light">فاتحة</option>
                        <option value="system">حسب النظام</option>
                      </select>
                    </div>
                    
                    <div className="setting-item flex items-center justify-between">
                      <span>تشغيل تلقائي عند بدء النظام</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="setting-group">
                  <h3 className="font-bold mb-3">إعدادات الأداء</h3>
                  <div className="space-y-4">
                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>استخدام وحدة معالجة الرسومات (GPU)</span>
                      </label>
                      <select className="w-full bg-background border border-background-lighter rounded-md p-2">
                        <option value="auto">تلقائي (موصى به)</option>
                        <option value="enabled">تفعيل دائماً</option>
                        <option value="disabled">تعطيل</option>
                      </select>
                    </div>
                    
                    <div className="setting-item">
                      <label className="flex justify-between mb-1">
                        <span>عدد مؤشرات الترابط (Threads)</span>
                        <span className="text-primary">4</span>
                      </label>
                      <input 
                        type="range" 
                        min="1" 
                        max="12" 
                        value="4" 
                        className="w-full bg-background h-2 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="setting-item flex items-center justify-between">
                      <span>تحسين الأداء التلقائي</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="setting-group">
                  <h3 className="font-bold mb-3">إعدادات الخصوصية</h3>
                  <div className="space-y-4">
                    <div className="setting-item flex items-center justify-between">
                      <span>حفظ سجل المحادثات محلياً</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="setting-item flex items-center justify-between">
                      <span>إرسال بيانات تحليلية مجهولة</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="setting-item flex items-center justify-between">
                      <span>تشفير البيانات المحلية</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* الخطوة 4: التثبيت */}
          {activeStep === 4 && (
            <div className="step-content">
              <h2 className="text-2xl font-bold mb-6">تثبيت CyberAI OS</h2>
              
              {installProgress < 100 ? (
                <>
                  <p className="text-muted mb-6">
                    جاري تثبيت CyberAI OS وتحميل النماذج المحددة. قد تستغرق هذه العملية بضع دقائق حسب سرعة الاتصال وحجم النماذج.
                  </p>
                  
                  <div className="install-progress mb-8">
                    <div className="flex justify-between mb-2">
                      <span>تقدم التثبيت</span>
                      <span>{installProgress}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-4">
                      <div 
                        className="bg-primary h-4 rounded-full transition-all duration-300"
                        style={{ width: `${installProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="install-status mt-4 text-sm text-muted">
                      {installProgress < 25 && (
                        <p>جاري تثبيت الملفات الأساسية...</p>
                      )}
                      {installProgress >= 25 && installProgress < 50 && (
                        <p>جاري تحميل نموذج {selectedModel || 'TinyLlama'}...</p>
                      )}
                      {installProgress >= 50 && installProgress < 75 && (
                        <p>جاري تهيئة النموذج...</p>
                      )}
                      {installProgress >= 75 && installProgress < 100 && (
                        <p>جاري إكمال التثبيت...</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="install-tips bg-background p-4 rounded-lg">
                    <h3 className="font-bold mb-2">نصائح:</h3>
                    <ul className="text-sm text-muted space-y-2">
                      <li>لا تغلق النافذة أثناء عملية التثبيت.</li>
                      <li>يمكنك استخدام النماذج السحابية بينما يتم تحميل النماذج المحلية.</li>
                      <li>للحصول على أفضل أداء، تأكد من تفعيل دعم وحدة معالجة الرسومات (GPU).</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="install-complete text-center py-8">
                  <div className="complete-icon text-5xl text-green-500 mb-4">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">تم التثبيت بنجاح!</h3>
                  <p className="text-muted mb-8">
                    تم تثبيت CyberAI OS بنجاح على جهازك. يمكنك الآن البدء في استخدام النظام والتفاعل مع نماذج الذكاء الاصطناعي.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/chat" className="primary-btn large-btn">
                      <i className="fas fa-comments mr-2"></i>
                      بدء الدردشة
                    </Link>
                    <Link to="/models" className="secondary-btn large-btn">
                      <i className="fas fa-robot mr-2"></i>
                      استكشاف النماذج
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="setup-navigation mt-8 flex justify-between">
            {activeStep > 1 && (
              <button 
                className="secondary-btn"
                onClick={prevStep}
              >
                <i className="fas fa-arrow-right mr-2"></i>
                السابق
              </button>
            )}
            
            {activeStep === 1 && (
              <div></div>
            )}
            
            {activeStep < totalSteps ? (
              <button 
                className="primary-btn"
                onClick={nextStep}
                disabled={activeStep === 1 && !selectedPlatform || activeStep === 2 && !selectedModel}
              >
                التالي
                <i className="fas fa-arrow-left mr-2"></i>
              </button>
            ) : (
              installProgress === 100 && (
                <Link to="/" className="primary-btn">
                  إنهاء
                  <i className="fas fa-check mr-2"></i>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
