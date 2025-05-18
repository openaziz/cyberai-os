import React, { useState, useEffect, useRef } from 'react';

const TerminalPage: React.FC = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [history, setHistory] = useState<{type: 'command' | 'output', content: string}[]>([
    {type: 'output', content: 'CyberAI OS Terminal v1.0.0'},
    {type: 'output', content: 'مرحباً بك في واجهة Terminal المتقدمة. اكتب "help" للحصول على المساعدة.'},
    {type: 'output', content: ''},
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // التركيز على حقل الإدخال عند تحميل الصفحة وعند النقر على الترمينال
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // التمرير إلى أسفل الترمينال عند إضافة محتوى جديد
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // معالجة الأوامر
  const handleCommand = () => {
    if (!currentCommand.trim()) return;
    
    // إضافة الأمر إلى التاريخ
    const newHistory = [...history, {type: 'command', content: `$ ${currentCommand}`}];
    
    // معالجة الأوامر المختلفة
    const cmd = currentCommand.trim().toLowerCase();
    const args = cmd.split(' ');
    
    // إضافة الأمر إلى قائمة الأوامر السابقة
    setCommands([currentCommand, ...commands]);
    setHistoryIndex(-1);
    
    // تنفيذ الأوامر
    switch(args[0]) {
      case 'help':
        newHistory.push({type: 'output', content: 'الأوامر المتاحة:'});
        newHistory.push({type: 'output', content: '  help      - عرض هذه المساعدة'});
        newHistory.push({type: 'output', content: '  clear     - مسح الشاشة'});
        newHistory.push({type: 'output', content: '  echo      - طباعة نص'});
        newHistory.push({type: 'output', content: '  ls        - عرض قائمة الملفات'});
        newHistory.push({type: 'output', content: '  cat       - عرض محتوى ملف'});
        newHistory.push({type: 'output', content: '  search    - البحث في الإنترنت'});
        newHistory.push({type: 'output', content: '  analyze   - تحليل ملف أو نص'});
        newHistory.push({type: 'output', content: '  train     - تدريب نموذج'});
        newHistory.push({type: 'output', content: '  exit      - الخروج من الترمينال'});
        break;
        
      case 'clear':
        setHistory([
          {type: 'output', content: 'CyberAI OS Terminal v1.0.0'},
          {type: 'output', content: ''},
        ]);
        setCurrentCommand('');
        return;
        
      case 'echo':
        const echoText = currentCommand.substring(5);
        newHistory.push({type: 'output', content: echoText || ''});
        break;
        
      case 'ls':
        newHistory.push({type: 'output', content: 'المجلدات:'});
        newHistory.push({type: 'output', content: '  📁 documents/'});
        newHistory.push({type: 'output', content: '  📁 downloads/'});
        newHistory.push({type: 'output', content: '  📁 models/'});
        newHistory.push({type: 'output', content: '  📁 data/'});
        newHistory.push({type: 'output', content: ''});
        newHistory.push({type: 'output', content: 'الملفات:'});
        newHistory.push({type: 'output', content: '  📄 README.md'});
        newHistory.push({type: 'output', content: '  📄 config.json'});
        newHistory.push({type: 'output', content: '  📄 example.py'});
        break;
        
      case 'cat':
        if (args.length < 2) {
          newHistory.push({type: 'output', content: 'خطأ: يجب تحديد اسم الملف'});
        } else if (args[1] === 'readme.md') {
          newHistory.push({type: 'output', content: '# CyberAI OS'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: 'منصة الذكاء الاصطناعي المفتوحة المصدر التي تمنحك القوة والخصوصية والتحكم الكامل.'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '## المميزات'});
          newHistory.push({type: 'output', content: '- تشغيل النماذج محلياً'});
          newHistory.push({type: 'output', content: '- دعم النماذج المتعددة'});
          newHistory.push({type: 'output', content: '- واجهة برمجة تطبيقات متقدمة'});
          newHistory.push({type: 'output', content: '- تخصيص كامل'});
        } else if (args[1] === 'config.json') {
          newHistory.push({type: 'output', content: '{'});
          newHistory.push({type: 'output', content: '  "version": "1.0.0",'});
          newHistory.push({type: 'output', content: '  "models": ['});
          newHistory.push({type: 'output', content: '    "llama-7b",'});
          newHistory.push({type: 'output', content: '    "tinyllama",'});
          newHistory.push({type: 'output', content: '    "mistral-7b",'});
          newHistory.push({type: 'output', content: '    "phi-2"'});
          newHistory.push({type: 'output', content: '  ],'});
          newHistory.push({type: 'output', content: '  "theme": "dark",'});
          newHistory.push({type: 'output', content: '  "language": "ar"'});
          newHistory.push({type: 'output', content: '}'});
        } else if (args[1] === 'example.py') {
          newHistory.push({type: 'output', content: 'import torch'});
          newHistory.push({type: 'output', content: 'from transformers import AutoModelForCausalLM, AutoTokenizer'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '# تحميل النموذج'});
          newHistory.push({type: 'output', content: 'model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"'});
          newHistory.push({type: 'output', content: 'tokenizer = AutoTokenizer.from_pretrained(model_name)'});
          newHistory.push({type: 'output', content: 'model = AutoModelForCausalLM.from_pretrained(model_name)'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '# توليد النص'});
          newHistory.push({type: 'output', content: 'prompt = "مرحباً، كيف حالك؟"'});
          newHistory.push({type: 'output', content: 'inputs = tokenizer(prompt, return_tensors="pt")'});
          newHistory.push({type: 'output', content: 'outputs = model.generate(**inputs, max_length=100)'});
          newHistory.push({type: 'output', content: 'print(tokenizer.decode(outputs[0]))'});
        } else {
          newHistory.push({type: 'output', content: `خطأ: الملف '${args[1]}' غير موجود`});
        }
        break;
        
      case 'search':
        if (args.length < 2) {
          newHistory.push({type: 'output', content: 'خطأ: يجب تحديد كلمات البحث'});
        } else {
          const searchQuery = currentCommand.substring(7);
          newHistory.push({type: 'output', content: `جاري البحث عن: "${searchQuery}"...`});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '--- نتائج البحث ---'});
          newHistory.push({type: 'output', content: '1. مقالة: مقدمة في الذكاء الاصطناعي وتطبيقاته'});
          newHistory.push({type: 'output', content: '   https://example.com/ai-introduction'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '2. كتاب: تعلم الآلة: المفاهيم والتطبيقات'});
          newHistory.push({type: 'output', content: '   https://example.com/machine-learning-book'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '3. فيديو: شرح نماذج اللغة الكبيرة'});
          newHistory.push({type: 'output', content: '   https://example.com/llm-explained'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: 'تم العثور على 42 نتيجة إضافية. اكتب "search --more" لعرض المزيد.'});
        }
        break;
        
      case 'analyze':
        if (args.length < 2) {
          newHistory.push({type: 'output', content: 'خطأ: يجب تحديد الملف أو النص للتحليل'});
        } else {
          newHistory.push({type: 'output', content: 'جاري تحليل البيانات...'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '--- نتائج التحليل ---'});
          newHistory.push({type: 'output', content: '• تم اكتشاف 3 موضوعات رئيسية:'});
          newHistory.push({type: 'output', content: '  1. التكنولوجيا (42%)'});
          newHistory.push({type: 'output', content: '  2. العلوم (28%)'});
          newHistory.push({type: 'output', content: '  3. الفنون (15%)'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '• المشاعر العامة: إيجابية (78%)'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: '• الكلمات الأكثر تكراراً:'});
          newHistory.push({type: 'output', content: '  - تكنولوجيا (15 مرة)'});
          newHistory.push({type: 'output', content: '  - ذكاء (12 مرة)'});
          newHistory.push({type: 'output', content: '  - تطوير (10 مرات)'});
          newHistory.push({type: 'output', content: ''});
          newHistory.push({type: 'output', content: 'اكتب "analyze --visualize" لعرض التصور البياني للتحليل.'});
        }
        break;
        
      case 'train':
        newHistory.push({type: 'output', content: 'جاري بدء عملية التدريب...'});
        newHistory.push({type: 'output', content: ''});
        newHistory.push({type: 'output', content: 'تم تهيئة بيئة التدريب.'});
        newHistory.push({type: 'output', content: 'جاري تحميل البيانات... 100%'});
        newHistory.push({type: 'output', content: 'جاري تحميل النموذج الأساسي (TinyLlama-1.1B)... 100%'});
        newHistory.push({type: 'output', content: ''});
        newHistory.push({type: 'output', content: 'بدء التدريب:'});
        newHistory.push({type: 'output', content: 'الدورة 1/3: الخسارة = 0.4521, الدقة = 67.82%'});
        newHistory.push({type: 'output', content: 'الدورة 2/3: الخسارة = 0.3245, الدقة = 78.45%'});
        newHistory.push({type: 'output', content: 'الدورة 3/3: الخسارة = 0.2876, الدقة = 85.23%'});
        newHistory.push({type: 'output', content: ''});
        newHistory.push({type: 'output', content: 'اكتمل التدريب بنجاح!'});
        newHistory.push({type: 'output', content: 'تم حفظ النموذج في: /models/tinyllama-finetuned.bin'});
        newHistory.push({type: 'output', content: ''});
        newHistory.push({type: 'output', content: 'اكتب "train --evaluate" لتقييم أداء النموذج.'});
        break;
        
      case 'exit':
        newHistory.push({type: 'output', content: 'الخروج من الترمينال...'});
        // في التطبيق الفعلي، يمكن هنا إعادة التوجيه إلى الصفحة الرئيسية
        break;
        
      default:
        newHistory.push({type: 'output', content: `الأمر '${args[0]}' غير معروف. اكتب "help" للحصول على قائمة الأوامر المتاحة.`});
    }
    
    // إضافة سطر فارغ بعد كل أمر
    newHistory.push({type: 'output', content: ''});
    
    // تحديث التاريخ ومسح الأمر الحالي
    setHistory(newHistory);
    setCurrentCommand('');
  };

  // معالجة مفاتيح الأسهم للتنقل في تاريخ الأوامر
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commands.length > 0 && historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commands[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commands[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="terminal-page py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="page-header mb-8">
          <h1 className="text-4xl font-bold mb-4 text-center">واجهة Terminal المتقدمة</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto text-center">
            تفاعل مع نظام CyberAI OS مباشرة من خلال واجهة سطر الأوامر المتقدمة
          </p>
        </div>
        
        <div className="terminal-container bg-background-darker rounded-lg overflow-hidden border border-background-lighter shadow-lg">
          <div className="terminal-header bg-background-light p-2 flex items-center justify-between border-b border-background-lighter">
            <div className="terminal-title font-mono">CyberAI OS Terminal</div>
            <div className="terminal-controls flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-500"></button>
              <button className="w-3 h-3 rounded-full bg-yellow-500"></button>
              <button className="w-3 h-3 rounded-full bg-green-500"></button>
            </div>
          </div>
          
          <div 
            className="terminal-body bg-background-darker p-4 font-mono text-sm h-[500px] overflow-y-auto"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => (
              <div 
                key={index} 
                className={`terminal-line ${item.type === 'command' ? 'text-primary' : 'text-foreground'}`}
              >
                {item.content}
              </div>
            ))}
            
            <div className="terminal-input-line flex">
              <span className="text-primary mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input bg-transparent border-none outline-none flex-1 text-foreground"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          </div>
        </div>
        
        <div className="terminal-help mt-8 bg-background-light p-6 rounded-lg border border-background-lighter">
          <h3 className="text-xl font-bold mb-4">استخدام Terminal</h3>
          <p className="mb-4">
            واجهة Terminal المتقدمة تتيح لك التفاعل مع نظام CyberAI OS مباشرة من خلال سطر الأوامر.
            يمكنك تنفيذ مجموعة متنوعة من الأوامر للتحكم في النظام وتنفيذ المهام المختلفة.
          </p>
          
          <div className="terminal-commands grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="command-group">
              <h4 className="font-bold mb-2">الأوامر الأساسية:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-background px-2 py-1 rounded">help</code> - عرض المساعدة</li>
                <li><code className="bg-background px-2 py-1 rounded">clear</code> - مسح الشاشة</li>
                <li><code className="bg-background px-2 py-1 rounded">echo [text]</code> - طباعة نص</li>
                <li><code className="bg-background px-2 py-1 rounded">ls</code> - عرض قائمة الملفات</li>
                <li><code className="bg-background px-2 py-1 rounded">cat [file]</code> - عرض محتوى ملف</li>
              </ul>
            </div>
            
            <div className="command-group">
              <h4 className="font-bold mb-2">أوامر الذكاء الاصطناعي:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-background px-2 py-1 rounded">search [query]</code> - البحث في الإنترنت</li>
                <li><code className="bg-background px-2 py-1 rounded">analyze [file/text]</code> - تحليل ملف أو نص</li>
                <li><code className="bg-background px-2 py-1 rounded">train</code> - تدريب نموذج</li>
                <li><code className="bg-background px-2 py-1 rounded">generate [prompt]</code> - توليد نص</li>
                <li><code className="bg-background px-2 py-1 rounded">visualize [data]</code> - إنشاء تصور بياني</li>
              </ul>
            </div>
          </div>
          
          <div className="terminal-tips mt-4 text-sm">
            <h4 className="font-bold mb-2">نصائح:</h4>
            <ul className="space-y-1">
              <li>استخدم مفاتيح الأسهم للتنقل في تاريخ الأوامر</li>
              <li>اضغط Tab للإكمال التلقائي (قريباً)</li>
              <li>يمكنك تشغيل سكربتات Python مباشرة باستخدام الأمر <code className="bg-background px-2 py-1 rounded">python [file.py]</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
