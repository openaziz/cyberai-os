import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ModelTrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [zipContent, setZipContent] = useState<string[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [visualizationActive, setVisualizationActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-7b');
  
  const models = [
    { id: 'llama-7b', name: 'Llama 2 (7B)', desc: 'نموذج متوسط الحجم مناسب للتدريب السريع' },
    { id: 'tinyllama', name: 'TinyLlama (1.1B)', desc: 'نموذج خفيف للأجهزة محدودة الموارد' },
    { id: 'mistral-7b', name: 'Mistral (7B)', desc: 'نموذج مفتوح المصدر عالي الأداء' },
    { id: 'phi-2', name: 'Phi-2 (2.7B)', desc: 'نموذج صغير مع أداء ممتاز نسبة لحجمه' }
  ];
  
  const trainingParams = [
    { id: 'learning_rate', name: 'معدل التعلم', value: '0.0002', type: 'number', min: '0.00001', max: '0.01', step: '0.00001' },
    { id: 'epochs', name: 'عدد الدورات', value: '3', type: 'number', min: '1', max: '10', step: '1' },
    { id: 'batch_size', name: 'حجم الدفعة', value: '4', type: 'number', min: '1', max: '32', step: '1' },
    { id: 'lora_rank', name: 'رتبة LoRA', value: '8', type: 'number', min: '1', max: '64', step: '1' },
    { id: 'lora_alpha', name: 'معامل ألفا LoRA', value: '16', type: 'number', min: '1', max: '64', step: '1' }
  ];
  
  // محاكاة تحميل الملفات
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }
  };
  
  // محاكاة فك ضغط الملفات
  const handleExtractZip = () => {
    const zipFile = files.find(file => file.name.endsWith('.zip'));
    if (zipFile) {
      setTrainingLogs(prev => [...prev, `جاري فك ضغط الملف ${zipFile.name}...`]);
      
      // محاكاة عملية فك الضغط
      setTimeout(() => {
        const mockContent = [
          'document1.txt', 'document2.pdf', 'data.csv', 
          'images/image1.jpg', 'images/image2.png',
          'code/script.py', 'code/index.html', 'code/styles.css'
        ];
        setZipContent(mockContent);
        setTrainingLogs(prev => [...prev, `تم فك ضغط الملف بنجاح. تم استخراج ${mockContent.length} ملفات.`]);
      }, 1500);
    }
  };
  
  // محاكاة بدء التدريب
  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    setTrainingLogs([`بدء تدريب النموذج ${selectedModel}...`]);
    
    // محاكاة مراحل التدريب
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainingLogs(prevLogs => [...prevLogs, 'اكتمل التدريب بنجاح!']);
          return 100;
        }
        
        // إضافة سجلات التدريب
        if (prev % 10 === 0) {
          const epoch = Math.floor(prev / 20) + 1;
          const loss = (1 - prev / 100) * 0.5;
          setTrainingLogs(prevLogs => [
            ...prevLogs, 
            `الدورة ${epoch}/5: الخسارة = ${loss.toFixed(4)}, الدقة = ${(prev).toFixed(2)}%`
          ]);
          
          // تفعيل التصور البياني عند وصول التقدم إلى 50%
          if (prev === 50) {
            setVisualizationActive(true);
          }
        }
        
        return prev + 2;
      });
    }, 500);
  };
  
  return (
    <div className="model-training-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">تدريب النماذج المحلية</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            قم بتدريب نماذج الذكاء الاصطناعي على بياناتك الخاصة للحصول على أداء مخصص لاحتياجاتك
          </p>
        </div>
        
        <div className="training-tabs mb-8">
          <div className="tabs-header flex border-b border-background-lighter">
            <button 
              className={`tab-btn py-3 px-6 font-medium ${activeTab === 'upload' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('upload')}
            >
              <i className="fas fa-upload mr-2"></i>
              تحميل البيانات
            </button>
            <button 
              className={`tab-btn py-3 px-6 font-medium ${activeTab === 'params' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('params')}
            >
              <i className="fas fa-sliders-h mr-2"></i>
              معلمات التدريب
            </button>
            <button 
              className={`tab-btn py-3 px-6 font-medium ${activeTab === 'training' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('training')}
            >
              <i className="fas fa-brain mr-2"></i>
              التدريب والمراقبة
            </button>
            <button 
              className={`tab-btn py-3 px-6 font-medium ${activeTab === 'visualization' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('visualization')}
            >
              <i className="fas fa-chart-line mr-2"></i>
              التصور البياني
            </button>
          </div>
          
          <div className="tab-content mt-6">
            {/* تبويب تحميل البيانات */}
            {activeTab === 'upload' && (
              <div className="upload-tab">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="upload-section bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">تحميل الملفات</h3>
                    <p className="text-muted mb-6">
                      قم بتحميل ملفات النصوص، PDF، أو ملفات ZIP المضغوطة التي تحتوي على بياناتك للتدريب.
                    </p>
                    
                    <div className="upload-dropzone border-2 border-dashed border-background-lighter rounded-lg p-8 text-center mb-4 hover:border-primary transition-colors">
                      <i className="fas fa-cloud-upload-alt text-4xl text-muted mb-4"></i>
                      <p className="mb-4">اسحب الملفات هنا أو انقر للتحميل</p>
                      <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden" 
                        multiple 
                        onChange={handleFileUpload}
                      />
                      <label 
                        htmlFor="file-upload" 
                        className="primary-btn cursor-pointer inline-block"
                      >
                        اختيار الملفات
                      </label>
                    </div>
                    
                    <div className="text-sm text-muted">
                      <p>الأنواع المدعومة: TXT, PDF, CSV, JSON, ZIP (حتى 10GB)</p>
                    </div>
                  </div>
                  
                  <div className="files-section bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">الملفات المحملة</h3>
                    
                    {files.length > 0 ? (
                      <div className="files-list">
                        {files.map((file, index) => (
                          <div key={index} className="file-item flex items-center justify-between p-3 border-b border-background-lighter">
                            <div className="file-info flex items-center">
                              <i className={`mr-3 ${
                                file.name.endsWith('.zip') ? 'fas fa-file-archive text-amber-500' :
                                file.name.endsWith('.pdf') ? 'fas fa-file-pdf text-red-500' :
                                file.name.endsWith('.csv') ? 'fas fa-file-csv text-green-500' :
                                'fas fa-file-alt text-blue-500'
                              }`}></i>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button className="icon-btn text-red-500">
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                        
                        {files.some(file => file.name.endsWith('.zip')) && (
                          <button 
                            className="secondary-btn mt-4"
                            onClick={handleExtractZip}
                          >
                            <i className="fas fa-file-archive mr-2"></i>
                            فك ضغط الملفات
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state text-center py-8">
                        <i className="fas fa-file-upload text-3xl text-muted mb-2"></i>
                        <p className="text-muted">لم يتم تحميل أي ملفات بعد</p>
                      </div>
                    )}
                    
                    {zipContent.length > 0 && (
                      <div className="zip-content mt-4">
                        <h4 className="font-bold mb-2">محتويات الملف المضغوط:</h4>
                        <div className="zip-files max-h-40 overflow-y-auto bg-background p-2 rounded-md">
                          {zipContent.map((item, index) => (
                            <div key={index} className="zip-item text-sm py-1">
                              <i className={`mr-2 ${
                                item.includes('.') ? 
                                  item.endsWith('.jpg') || item.endsWith('.png') ? 'fas fa-file-image text-purple-500' :
                                  item.endsWith('.py') ? 'fas fa-file-code text-green-500' :
                                  item.endsWith('.html') ? 'fas fa-file-code text-orange-500' :
                                  item.endsWith('.css') ? 'fas fa-file-code text-blue-500' :
                                  'fas fa-file text-muted'
                                : 'fas fa-folder text-amber-500'
                              }`}></i>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="navigation-buttons mt-8 flex justify-between">
                  <button className="secondary-btn">
                    <i className="fas fa-arrow-right mr-2"></i>
                    العودة
                  </button>
                  <button 
                    className="primary-btn"
                    onClick={() => setActiveTab('params')}
                  >
                    التالي
                    <i className="fas fa-arrow-left mr-2"></i>
                  </button>
                </div>
              </div>
            )}
            
            {/* تبويب معلمات التدريب */}
            {activeTab === 'params' && (
              <div className="params-tab">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="model-selection bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">اختيار النموذج</h3>
                    <p className="text-muted mb-6">
                      اختر النموذج الأساسي الذي ترغب في تدريبه على بياناتك.
                    </p>
                    
                    <div className="models-list space-y-4">
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
                            <div>
                              <h4 className="font-bold">{model.name}</h4>
                              <p className="text-sm text-muted">{model.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="training-params bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">معلمات التدريب</h3>
                    <p className="text-muted mb-6">
                      ضبط معلمات التدريب للحصول على أفضل النتائج.
                    </p>
                    
                    <div className="params-list space-y-4">
                      {trainingParams.map(param => (
                        <div key={param.id} className="param-item">
                          <label className="flex justify-between mb-1">
                            <span>{param.name}</span>
                            <span className="text-primary">{param.value}</span>
                          </label>
                          <input 
                            type={param.type}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            value={param.value}
                            className="w-full bg-background h-2 rounded-full appearance-none cursor-pointer"
                            onChange={() => {}} // سيتم تنفيذ هذا في التطبيق الفعلي
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="advanced-options mt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">خيارات متقدمة</h4>
                        <button className="text-primary text-sm">
                          <i className="fas fa-chevron-down mr-1"></i>
                          عرض المزيد
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="navigation-buttons mt-8 flex justify-between">
                  <button 
                    className="secondary-btn"
                    onClick={() => setActiveTab('upload')}
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    السابق
                  </button>
                  <button 
                    className="primary-btn"
                    onClick={() => setActiveTab('training')}
                  >
                    التالي
                    <i className="fas fa-arrow-left mr-2"></i>
                  </button>
                </div>
              </div>
            )}
            
            {/* تبويب التدريب والمراقبة */}
            {activeTab === 'training' && (
              <div className="training-tab">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="training-control bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">التحكم في التدريب</h3>
                    
                    <div className="training-summary mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="summary-item p-3 bg-background rounded-lg">
                          <p className="text-sm text-muted">النموذج</p>
                          <p className="font-bold">{models.find(m => m.id === selectedModel)?.name}</p>
                        </div>
                        <div className="summary-item p-3 bg-background rounded-lg">
                          <p className="text-sm text-muted">حجم البيانات</p>
                          <p className="font-bold">{files.length > 0 ? `${files.length} ملفات` : 'لا توجد ملفات'}</p>
                        </div>
                        <div className="summary-item p-3 bg-background rounded-lg">
                          <p className="text-sm text-muted">وقت التدريب المقدر</p>
                          <p className="font-bold">~45 دقيقة</p>
                        </div>
                        <div className="summary-item p-3 bg-background rounded-lg">
                          <p className="text-sm text-muted">استخدام GPU</p>
                          <p className="font-bold">NVIDIA RTX 4090</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="training-actions">
                      {!isTraining ? (
                        <button 
                          className="primary-btn large-btn w-full justify-center"
                          onClick={startTraining}
                          disabled={files.length === 0}
                        >
                          <i className="fas fa-play mr-2"></i>
                          بدء التدريب
                        </button>
                      ) : (
                        <div className="training-progress">
                          <div className="flex justify-between mb-2">
                            <span>تقدم التدريب</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-4 mb-4">
                            <div 
                              className="bg-primary h-4 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="flex gap-2">
                            <button className="secondary-btn flex-1 justify-center">
                              <i className="fas fa-pause mr-2"></i>
                              إيقاف مؤقت
                            </button>
                            <button className="secondary-btn bg-red-500 hover:bg-red-600 text-white flex-1 justify-center">
                              <i className="fas fa-stop mr-2"></i>
                              إلغاء
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="training-logs bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">سجلات التدريب</h3>
                    
                    <div className="logs-container bg-background p-4 rounded-lg h-80 overflow-y-auto font-mono text-sm">
                      {trainingLogs.length > 0 ? (
                        trainingLogs.map((log, index) => (
                          <div key={index} className="log-entry py-1">
                            <span className="text-primary">[{new Date().toLocaleTimeString()}]</span> {log}
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">سجلات التدريب ستظهر هنا عند بدء التدريب...</p>
                      )}
                    </div>
                    
                    <div className="logs-actions mt-4 flex justify-between">
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-download mr-2"></i>
                        حفظ السجلات
                      </button>
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-trash mr-2"></i>
                        مسح السجلات
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="navigation-buttons mt-8 flex justify-between">
                  <button 
                    className="secondary-btn"
                    onClick={() => setActiveTab('params')}
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    السابق
                  </button>
                  <button 
                    className={`primary-btn ${!visualizationActive && 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => visualizationActive && setActiveTab('visualization')}
                    disabled={!visualizationActive}
                  >
                    التصور البياني
                    <i className="fas fa-arrow-left mr-2"></i>
                  </button>
                </div>
              </div>
            )}
            
            {/* تبويب التصور البياني */}
            {activeTab === 'visualization' && (
              <div className="visualization-tab">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="visualization-main lg:col-span-2 bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">التصور البياني للنموذج</h3>
                    
                    <div className="visualization-container bg-background p-4 rounded-lg aspect-video flex items-center justify-center">
                      {visualizationActive ? (
                        <img 
                          src="/assets/model-visualization.svg" 
                          alt="تصور بياني للنموذج" 
                          className="max-w-full max-h-full"
                        />
                      ) : (
                        <div className="text-center">
                          <i className="fas fa-chart-network text-4xl text-muted mb-4"></i>
                          <p className="text-muted">سيظهر التصور البياني أثناء التدريب</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="visualization-controls mt-4 flex flex-wrap gap-2">
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-search-plus mr-2"></i>
                        تكبير
                      </button>
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-search-minus mr-2"></i>
                        تصغير
                      </button>
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-expand-arrows-alt mr-2"></i>
                        ملء الشاشة
                      </button>
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-download mr-2"></i>
                        تحميل الصورة
                      </button>
                      <button className="secondary-btn text-sm">
                        <i className="fas fa-sync-alt mr-2"></i>
                        تحديث
                      </button>
                    </div>
                  </div>
                  
                  <div className="visualization-sidebar bg-background-light p-6 rounded-lg border border-background-lighter">
                    <h3 className="text-xl font-bold mb-4">تحليل النموذج</h3>
                    
                    <div className="analysis-metrics space-y-4">
                      <div className="metric-item">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">دقة النموذج</span>
                          <span className="text-primary font-bold">87.5%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '87.5%' }}></div>
                        </div>
                      </div>
                      
                      <div className="metric-item">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">خسارة التدريب</span>
                          <span className="text-accent font-bold">0.0342</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="metric-item">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">خسارة التحقق</span>
                          <span className="text-gold font-bold">0.0512</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-gold h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      
                      <div className="metric-item">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">سرعة التدريب</span>
                          <span className="text-green-500 font-bold">3.2 عينة/ثانية</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="key-insights mt-6">
                      <h4 className="font-bold mb-2">رؤى رئيسية</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 ml-2"></i>
                          <span>النموذج يتعلم بشكل جيد مع انخفاض مستمر في الخسارة</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 ml-2"></i>
                          <span>لا توجد مشكلة في الإفراط في التدريب حتى الآن</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-exclamation-circle text-amber-500 mt-1 ml-2"></i>
                          <span>يمكن زيادة حجم الدفعة لتحسين سرعة التدريب</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-info-circle text-blue-500 mt-1 ml-2"></i>
                          <span>تم اكتشاف 3 مجموعات رئيسية من المفاهيم في البيانات</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="export-model mt-6">
                      <button className="primary-btn w-full justify-center">
                        <i className="fas fa-file-export mr-2"></i>
                        تصدير النموذج المدرب
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="navigation-buttons mt-8 flex justify-between">
                  <button 
                    className="secondary-btn"
                    onClick={() => setActiveTab('training')}
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    العودة للتدريب
                  </button>
                  <Link to="/chat" className="primary-btn">
                    تجربة النموذج في الدردشة
                    <i className="fas fa-arrow-left mr-2"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTrainingPage;
