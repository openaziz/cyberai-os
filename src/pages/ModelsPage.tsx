import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ModelsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'جميع النماذج' },
    { id: 'local', name: 'نماذج محلية' },
    { id: 'cloud', name: 'نماذج سحابية' },
    { id: 'custom', name: 'نماذج مخصصة' }
  ];
  
  const models = [
    {
      id: 'deepseek-r1-70b',
      name: 'DeepSeek-R1-70B',
      description: 'نموذج متقدم للمهام المعقدة مع قدرات متقدمة في البرمجة والاستدلال والإبداع.',
      category: 'cloud',
      parameters: '70B',
      type: 'سحابي',
      accuracy: 'عالية',
      color: '#2196f3'
    },
    {
      id: 'gpt4o',
      name: 'GPT-4o',
      description: 'نموذج متعدد الوسائط من OpenAI يدعم النصوص والصور والصوت، مع قدرات فائقة في فهم المحتوى المتعدد.',
      category: 'cloud',
      parameters: '?B',
      type: 'سحابي',
      accuracy: 'ممتازة',
      color: '#4caf50'
    },
    {
      id: 'llama2-7b',
      name: 'Llama 2 (7B)',
      description: 'نموذج مفتوح المصدر من Meta يعمل محلياً على جهازك، مناسب للمهام العامة مع توازن جيد بين الأداء والموارد.',
      category: 'local',
      parameters: '7B',
      type: 'محلي',
      accuracy: 'جيدة',
      color: '#ff9800'
    },
    {
      id: 'tinyllama',
      name: 'TinyLlama (1.1B)',
      description: 'نموذج خفيف للغاية يعمل على الأجهزة محدودة الموارد، مثالي للمهام البسيطة والاستخدام السريع.',
      category: 'local',
      parameters: '1.1B',
      type: 'محلي',
      accuracy: 'مقبولة',
      color: '#9c27b0'
    },
    {
      id: 'mistral-7b',
      name: 'Mistral (7B)',
      description: 'نموذج مفتوح المصدر عالي الأداء مع قدرات متميزة في فهم اللغة الطبيعية والاستدلال.',
      category: 'local',
      parameters: '7B',
      type: 'محلي',
      accuracy: 'جيدة جداً',
      color: '#e91e63'
    },
    {
      id: 'phi-2',
      name: 'Phi-2 (2.7B)',
      description: 'نموذج صغير من Microsoft مع أداء ممتاز نسبة لحجمه، مثالي للأجهزة متوسطة الموارد.',
      category: 'local',
      parameters: '2.7B',
      type: 'محلي',
      accuracy: 'جيدة',
      color: '#3f51b5'
    },
    {
      id: 'custom-model-1',
      name: 'نموذج مخصص (TinyLlama)',
      description: 'نموذج TinyLlama مدرب على بياناتك الخاصة، مع تحسينات في أداء مهام محددة.',
      category: 'custom',
      parameters: '1.1B',
      type: 'محلي مخصص',
      accuracy: 'عالية للمهام المخصصة',
      color: '#607d8b'
    }
  ];
  
  const filteredModels = activeCategory === 'all' 
    ? models 
    : models.filter(model => model.category === activeCategory);
  
  return (
    <div className="models-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">نماذج الذكاء الاصطناعي</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            اختر من بين مجموعة واسعة من نماذج الذكاء الاصطناعي المحلية والسحابية، من النماذج الخفيفة إلى النماذج المتقدمة
          </p>
        </div>
        
        <div className="models-filter mb-8">
          <div className="filter-tabs flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab py-2 px-4 rounded-full transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-background-light text-muted hover:bg-background-lighter'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="models-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <div 
              key={model.id}
              className="model-card bg-background-light rounded-lg overflow-hidden border border-background-lighter flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div 
                className="model-header p-4 text-white"
                style={{ backgroundColor: model.color }}
              >
                <h3 className="text-xl font-bold">{model.name}</h3>
                <p className="text-sm opacity-80">
                  {model.category === 'cloud' ? 'نموذج سحابي' : model.category === 'local' ? 'نموذج محلي' : 'نموذج مخصص'}
                </p>
              </div>
              
              <div className="model-body p-4 flex-grow">
                <div className="model-stats flex justify-between mb-4">
                  <div className="stat">
                    <div className="stat-value font-bold">{model.parameters}</div>
                    <div className="stat-label text-xs text-muted">المعلمات</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value font-bold">{model.type}</div>
                    <div className="stat-label text-xs text-muted">النوع</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value font-bold">{model.accuracy}</div>
                    <div className="stat-label text-xs text-muted">الدقة</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted mb-4">
                  {model.description}
                </p>
              </div>
              
              <div className="model-footer p-4 border-t border-background-lighter flex gap-2">
                <Link 
                  to={`/chat?model=${model.id}`} 
                  className="primary-btn flex-1 justify-center"
                >
                  استخدام النموذج
                </Link>
                <Link 
                  to={`/models/${model.id}`} 
                  className="secondary-btn"
                >
                  <i className="fas fa-info-circle"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="models-cta mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">لم تجد النموذج المناسب؟</h3>
          <p className="text-muted mb-6 max-w-2xl mx-auto">
            يمكنك تدريب نموذج مخصص على بياناتك الخاصة للحصول على أداء مثالي لاحتياجاتك المحددة.
          </p>
          <Link to="/training" className="primary-btn large-btn">
            <i className="fas fa-brain mr-2"></i>
            تدريب نموذج مخصص
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
