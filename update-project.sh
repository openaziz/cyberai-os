#!/bin/bash

# تعيين الرابط الجديد للمشروع
NEW_PROJECT_URL="https://openaziz.github.io/cyberai-os/"

echo "=== بدء تحديث مشروع CyberAI OS ==="

# تحديث ملف README.md
update_readme() {
  echo "تحديث ملف README.md..."
  
  if [ -f "README-2iKg6b6FT1nYjlrgkv26kEVc7YQiE0.md" ]; then
    # نسخ الملف الجديد
    cp README-2iKg6b6FT1nYjlrgkv26kEVc7YQiE0.md README.md
    
    # تغيير الروابط واسم المشروع
    sed -i 's/https:\/\/github\.com\/openaziz\/cyberai-os/https:\/\/openaziz.github.io\/cyberai-os\//g' README.md
    sed -i 's/GangsterGPT/CyberAI OS/g' README.md
    
    echo "✅ تم تحديث ملف README.md بنجاح"
  else
    echo "⚠️ ملف README-2iKg6b6FT1nYjlrgkv26kEVc7YQiE0.md غير موجود"
  fi
}

# تحديث خدمة AI
update_ai_service() {
  echo "تحديث خدمة AI..."
  
  if [ -f "services/ai-service.ts" ]; then
    # تحديث التعليقات والروابط
    sed -i 's/\/\/ Search1API Models (No API key required)/\/\/ Search1API Models (No API key required - Works directly without authentication)/g' services/ai-service.ts
    sed -i 's/const apiUrl = "https:\/\/api\.search1api\.com\/v1\/chat\/completions"/const apiUrl = "https:\/\/api.search1api.com\/v1\/chat\/completions" \/\/ No API key needed/g' services/ai-service.ts
    sed -i 's/\/\/ Together Models/\/\/ Together Models (DeepSeek-R1-Distill-Llama-70B-free)/g' services/ai-service.ts
    
    echo "✅ تم تحديث خدمة AI بنجاح"
  else
    echo "⚠️ ملف خدمة AI غير موجود في المسار المتوقع"
  fi
}

# تحديث الروابط في جميع الملفات
update_links() {
  echo "تحديث الروابط في جميع ملفات المشروع..."
  
  # تحديث الروابط في ملفات .ts و .tsx و .js و .jsx و .html و .css
  find . -type f $$ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.html" -o -name "*.css" $$ -not -path "*/node_modules/*" -not -path "*/.git/*" | while read file; do
    # تحديث الروابط المطلقة
    sed -i 's/http:\/\/localhost:3000/https:\/\/openaziz.github.io\/cyberai-os\//g' "$file"
    sed -i 's/https:\/\/cyberai-os\.vercel\.app/https:\/\/openaziz.github.io\/cyberai-os\//g' "$file"
    sed -i 's/https:\/\/cyberai-os\.com/https:\/\/openaziz.github.io\/cyberai-os\//g' "$file"
    
    # تحديث متغيرات الروابط
    sed -i 's/BASE_URL\s*=\s*['"'"'"]$$.*$$['"'"'"]/BASE_URL = '"'"'https:\/\/openaziz.github.io\/cyberai-os\/'"'"'/g' "$file"
    sed -i 's/APP_URL\s*=\s*['"'"'"]$$.*$$['"'"'"]/APP_URL = '"'"'https:\/\/openaziz.github.io\/cyberai-os\/'"'"'/g' "$file"
    sed -i 's/NEXT_PUBLIC_APP_URL\s*=\s*['"'"'"]$$.*$$['"'"'"]/NEXT_PUBLIC_APP_URL = '"'"'https:\/\/openaziz.github.io\/cyberai-os\/'"'"'/g' "$file"
  done
  
  echo "✅ تم تحديث الروابط في جميع الملفات"
}

# إنشاء هيكل المجلدات
create_folder_structure() {
  echo "إنشاء هيكل المجلدات..."
  
  # إنشاء المجلدات الرئيسية
  mkdir -p assets/css
  mkdir -p assets/js
  mkdir -p assets/images
  
  echo "✅ تم إنشاء هيكل المجلدات"
}

# نقل ملفات HTML/CSS/JS إلى المجلد الرئيسي
move_files_to_root() {
  echo "نقل ملفات HTML/CSS/JS إلى المجلد الرئيسي..."
  
  # نقل ملفات HTML
  find src -name "*.html" -exec cp {} . \;
  find public -name "*.html" -exec cp {} . \;
  find app -name "*.html" -exec cp {} . \;
  
  # نقل ملفات CSS
  find src -name "*.css" -exec cp {} assets/css/ \;
  find public -name "*.css" -exec cp {} assets/css/ \;
  find styles -name "*.css" -exec cp {} assets/css/ \;
  
  # نقل ملفات JS
  find src -name "*.js" -exec cp {} assets/js/ \;
  find public -name "*.js" -exec cp {} assets/js/ \;
  
  # نقل ملفات الصور
  find src -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.gif" -o -name "*.ico" -exec cp {} assets/images/ \;
  find public -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.gif" -o -name "*.ico" -exec cp {} assets/images/ \;
  
  echo "✅ تم نقل الملفات إلى المجلد الرئيسي"
}

# إنشاء ملف index.html
create_index_html() {
  echo "إنشاء ملف index.html..."
  
  cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberAI OS - منصة ذكاء اصطناعي محلية بدون قيود</title>
  <meta name="description" content="شغل نماذج الذكاء الاصطناعي على جهازك بخصوصية كاملة ودون الحاجة لمفاتيح API خارجية">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="icon" href="assets/images/favicon.ico">
</head>
<body class="dark-theme">
  <header>
    <div class="container">
      <div class="logo">
        <a href="https://openaziz.github.io/cyberai-os/">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="#features">المميزات</a></li>
          <li><a href="#models">النماذج</a></li>
          <li><a href="terminal.html">الطرفية</a></li>
          <li><a href="help.html">المساعدة</a></li>
          <li><a href="chat.html" class="btn-primary">جرب المحادثة</a></li>
        </ul>
      </nav>
      <button class="theme-toggle">🌙</button>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>تجربة ذكاء اصطناعي محلية بدون قيود</h1>
          <p>شغل نماذج الذكاء الاصطناعي على جهازك بخصوصية كاملة ودون الحاجة لمفاتيح API خارجية</p>
          <div class="cta-buttons">
            <a href="chat.html" class="btn-primary">جرب المحادثة الآن</a>
            <a href="#features" class="btn-secondary">تعرف على المزيد</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="assets/images/hero-image.svg" alt="CyberAI OS Interface">
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="container">
        <h2>المميزات الرئيسية</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>خصوصية كاملة</h3>
            <p>تشغيل النماذج محلياً على جهازك دون إرسال بياناتك إلى خوادم خارجية</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h3>تشغيل بدون إنترنت</h3>
            <p>استخدام الذكاء الاصطناعي حتى بدون اتصال بالإنترنت</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>نماذج متنوعة</h3>
            <p>دعم لمجموعة واسعة من نماذج الذكاء الاصطناعي المحلية والسحابية</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>أداء متميز</h3>
            <p>تحسين الأداء باستخدام وحدة معالجة الرسومات (GPU) وتقنيات التسريع المتقدمة</p>
          </div>
        </div>
      </div>
    </section>

    <section id="models" class="models">
      <div class="container">
        <h2>النماذج المدعومة</h2>
        <div class="models-tabs">
          <button class="tab-btn active" data-tab="local">نماذج محلية</button>
          <button class="tab-btn" data-tab="cloud">نماذج سحابية</button>
        </div>
        <div class="tab-content active" id="local">
          <div class="models-grid">
            <div class="model-card">
              <h3>TinyLlama (1.1B)</h3>
              <p>نموذج خفيف مثالي للأجهزة منخفضة الموارد</p>
              <span class="tag">CPU</span>
            </div>
            <div class="model-card">
              <h3>Phi-2 (2.7B)</h3>
              <p>نموذج صغير بأداء ممتاز من Microsoft</p>
              <span class="tag">CPU/GPU</span>
            </div>
            <div class="model-card">
              <h3>Mistral 7B</h3>
              <p>نموذج متوسط الحجم بأداء متميز</p>
              <span class="tag">GPU</span>
            </div>
            <div class="model-card">
              <h3>Llama 2 (7B)</h3>
              <p>نموذج متعدد الاستخدامات من Meta</p>
              <span class="tag">GPU</span>
            </div>
          </div>
        </div>
        <div class="tab-content" id="cloud">
          <div class="models-grid">
            <div class="model-card">
              <h3>DeepSeek R1 70B</h3>
              <p>نموذج متقدم بدون الحاجة لمفتاح API</p>
              <span class="tag">No API Key</span>
            </div>
            <div class="model-card">
              <h3>GPT-4o</h3>
              <p>أحدث نموذج من OpenAI</p>
              <span class="tag">API Key</span>
            </div>
            <div class="model-card">
              <h3>Claude 3</h3>
              <p>نموذج متقدم من Anthropic</p>
              <span class="tag">API Key</span>
            </div>
            <div class="model-card">
              <h3>Gemini Pro</h3>
              <p>نموذج متطور من Google</p>
              <span class="tag">API Key</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>المنتج</h4>
            <ul>
              <li><a href="#features">المميزات</a></li>
              <li><a href="#models">النماذج</a></li>
              <li><a href="chat.html">المحادثة</a></li>
              <li><a href="terminal.html">الطرفية</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>الدعم</h4>
            <ul>
              <li><a href="help.html">المساعدة</a></li>
              <li><a href="setup.html">الإعداد</a></li>
              <li><a href="https://github.com/openaziz/cyberai-os/issues">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>المجتمع</h4>
            <ul>
              <li><a href="https://github.com/openaziz/cyberai-os">GitHub</a></li>
              <li><a href="https://twitter.com/openaziz">Twitter</a></li>
              <li><a href="https://discord.gg/cyberai">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 CyberAI OS. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
EOL

  echo "✅ تم إنشاء ملف index.html"
}

# إنشاء ملف chat.html
create_chat_html() {
  echo "إنشاء ملف chat.html..."
  
  cat > chat.html << 'EOL'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>المحادثة - CyberAI OS</title>
  <meta name="description" content="تحدث مع نماذج الذكاء الاصطناعي المتقدمة بدون الحاجة لمفاتيح API">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="icon" href="assets/images/favicon.ico">
</head>
<body class="dark-theme">
  <header>
    <div class="container">
      <div class="logo">
        <a href="https://openaziz.github.io/cyberai-os/">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="index.html#features">المميزات</a></li>
          <li><a href="index.html#models">النماذج</a></li>
          <li><a href="terminal.html">الطرفية</a></li>
          <li><a href="help.html">المساعدة</a></li>
        </ul>
      </nav>
      <button class="theme-toggle">🌙</button>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="chat-container">
        <div class="chat-header">
          <div class="model-selector">
            <select id="model-selector">
              <option value="deepseek-r1-70b-online">DeepSeek R1 70B (No API Key)</option>
              <option value="deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free">DeepSeek R1 Distill (No API Key)</option>
              <option value="llama3-70b-8192">Llama 3 70B (Groq API)</option>
              <option value="openai/gpt-4o">GPT-4o (OpenRouter API)</option>
            </select>
          </div>
          <div class="chat-actions">
            <button id="clear-chat">مسح المحادثة</button>
          </div>
        </div>
        <div class="chat-messages">
          <!-- سيتم إضافة الرسائل هنا ديناميكيًا -->
        </div>
        <div class="chat-input">
          <input type="text" placeholder="اكتب رسالتك هنا..." />
          <button>إرسال</button>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>المنتج</h4>
            <ul>
              <li><a href="index.html#features">المميزات</a></li>
              <li><a href="index.html#models">النماذج</a></li>
              <li><a href="chat.html">المحادثة</a></li>
              <li><a href="terminal.html">الطرفية</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>الدعم</h4>
            <ul>
              <li><a href="help.html">المساعدة</a></li>
              <li><a href="setup.html">الإعداد</a></li>
              <li><a href="https://github.com/openaziz/cyberai-os/issues">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>المجتمع</h4>
            <ul>
              <li><a href="https://github.com/openaziz/cyberai-os">GitHub</a></li>
              <li><a href="https://twitter.com/openaziz">Twitter</a></li>
              <li><a href="https://discord.gg/cyberai">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 CyberAI OS. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
  <script src="assets/js/chat.js"></script>
</body>
</html>
EOL

  echo "✅ تم إنشاء ملف chat.html"
}

# إنشاء ملف terminal.html
create_terminal_html() {
  echo "إنشاء ملف terminal.html..."
  
  cat > terminal.html << 'EOL'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الطرفية - CyberAI OS</title>
  <meta name="description" content="واجهة طرفية للتفاعل المباشر مع نماذج الذكاء الاصطناعي">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="icon" href="assets/images/favicon.ico">
  <style>
    .terminal-container {
      max-width: 1000px;
      margin: 100px auto 40px;
      background-color: var(--card-background);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background-color: var(--secondary-color);
      border-bottom: 1px solid var(--border-color);
    }
    
    .terminal-output {
      height: 500px;
      overflow-y: auto;
      padding: 20px;
      font-family: monospace;
      background-color: #1a1a1a;
    }
    
    .terminal-input {
      display: flex;
      padding: 15px;
      border-top: 1px solid var(--border-color);
    }
    
    .terminal-input input {
      flex: 1;
      padding: 12px 15px;
      border: none;
      border-radius: 4px;
      background-color: var(--secondary-color);
      color: var(--text-color);
      font-family: monospace;
    }
    
    .terminal-input button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0 20px;
      margin-right: 10px;
    }
    
    .command {
      color: var(--primary-color);
      margin-bottom: 5px;
    }
    
    .response {
      color: #ddd;
      margin-bottom: 15px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body class="dark-theme">
  <header>
    <div class="container">
      <div class="logo">
        <a href="https://openaziz.github.io/cyberai-os/">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="index.html#features">المميزات</a></li>
          <li><a href="index.html#models">النماذج</a></li>
          <li><a href="chat.html">المحادثة</a></li>
          <li><a href="help.html">المساعدة</a></li>
        </ul>
      </nav>
      <button class="theme-toggle">🌙</button>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="terminal-container">
        <div class="terminal-header">
          <div class="terminal-title">CyberAI OS Terminal</div>
          <div class="terminal-actions">
            <button id="clear-terminal">مسح الطرفية</button>
          </div>
        </div>
        <div class="terminal-output" id="terminal-output">
          <div class="response">
مرحبًا بك في طرفية CyberAI OS!
استخدم الأوامر التالية للتفاعل مع النظام:

help - عرض قائمة الأوامر المتاحة
models - عرض قائمة النماذج المتاحة
use [model_id] - استخدام نموذج محدد
ask [prompt] - طرح سؤال على النموذج الحالي
clear - مسح الطرفية
          </div>
        </div>
        <div class="terminal-input">
          <input type="text" id="terminal-input-field" placeholder="أدخل الأمر هنا..." />
          <button id="terminal-send">تنفيذ</button>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>المنتج</h4>
            <ul>
              <li><a href="index.html#features">المميزات</a></li>
              <li><a href="index.html#models">النماذج</a></li>
              <li><a href="chat.html">المحادثة</a></li>
              <li><a href="terminal.html">الطرفية</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>الدعم</h4>
            <ul>
              <li><a href="help.html">المساعدة</a></li>
              <li><a href="setup.html">الإعداد</a></li>
              <li><a href="https://github.com/openaziz/cyberai-os/issues">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>المجتمع</h4>
            <ul>
              <li><a href="https://github.com/openaziz/cyberai-os">GitHub</a></li>
              <li><a href="https://twitter.com/openaziz">Twitter</a></li>
              <li><a href="https://discord.gg/cyberai">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 CyberAI OS. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
  <script src="assets/js/terminal.js"></script>
</body>
</html>
EOL

  echo "✅ تم إنشاء ملف terminal.html"
}

# إنشاء ملف help.html
create_help_html() {
  echo "إنشاء ملف help.html..."
  
  cat > help.html << 'EOL'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>المساعدة - CyberAI OS</title>
  <meta name="description" content="دليل المساعدة والأسئلة الشائعة حول CyberAI OS">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="icon" href="assets/images/favicon.ico">
  <style>
    .help-container {
      max-width: 1000px;
      margin: 100px auto 40px;
      background-color: var(--card-background);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      padding: 30px;
    }
    
    .help-section {
      margin-bottom: 40px;
    }
    
    .help-section h2 {
      margin-bottom: 20px;
      color: var(--primary-color);
    }
    
    .faq-item {
      margin-bottom: 20px;
    }
    
    .faq-question {
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;
    }

    .faq-answer {
      padding-right: 20px;
      border-right: 2px solid var(--primary-color);
      margin-right: 10px;
    }

    .code-block {
      background-color: #1a1a1a;
      padding: 15px;
      border-radius: 5px;
      font-family: monospace;
      overflow-x: auto;
      margin: 15px 0;
    }
  </style>
</head>
<body class="dark-theme">
  <header>
    <div class="container">
      <div class="logo">
        <a href="https://openaziz.github.io/cyberai-os/">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="index.html#features">المميزات</a></li>
          <li><a href="index.html#models">النماذج</a></li>
          <li><a href="chat.html">المحادثة</a></li>
          <li><a href="terminal.html">الطرفية</a></li>
        </ul>
      </nav>
      <button class="theme-toggle">🌙</button>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="help-container">
        <h1>دليل المساعدة</h1>
        
        <div class="help-section">
          <h2>البدء السريع</h2>
          <p>مرحبًا بك في CyberAI OS! هذا الدليل سيساعدك على البدء باستخدام المنصة بسرعة وسهولة.</p>
          
          <h3>المتطلبات الأساسية</h3>
          <ul>
            <li>متصفح ويب حديث (Chrome، Firefox، Safari، Edge)</li>
            <li>اتصال إنترنت للنماذج السحابية (اختياري للنماذج المحلية)</li>
          </ul>
          
          <h3>الخطوات الأولى</h3>
          <ol>
            <li>استكشف <a href="chat.html">واجهة المحادثة</a> للتفاعل مع نماذج الذكاء الاصطناعي</li>
            <li>جرب <a href="terminal.html">الطرفية</a> للتفاعل المباشر مع النماذج باستخدام الأوامر</li>
            <li>استعرض <a href="index.html#models">النماذج المتاحة</a> واختر النموذج المناسب لاحتياجاتك</li>
          </ol>
        </div>
        
        <div class="help-section">
          <h2>الأسئلة الشائعة</h2>
          
          <div class="faq-item">
            <div class="faq-question">ما هو CyberAI OS؟</div>
            <div class="faq-answer">
              CyberAI OS هي منصة ذكاء اصطناعي مفتوحة المصدر تتيح لك تشغيل نماذج الذكاء الاصطناعي محلياً على جهازك بخصوصية كاملة، أو استخدام نماذج سحابية متقدمة عند الحاجة.
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">هل أحتاج إلى مفاتيح API لاستخدام النماذج؟</div>
            <div class="faq-answer">
              لا، يمكنك استخدام بعض النماذج مثل DeepSeek R1 70B و DeepSeek R1 Distill بدون الحاجة إلى مفاتيح API. ومع ذلك، للوصول إلى نماذج أخرى مثل GPT-4o أو Claude 3، ستحتاج إلى مفاتيح API الخاصة بها.
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">كيف يمكنني استخدام نموذج DeepSeek R1 70B بدون مفتاح API؟</div>
            <div class="faq-answer">
              يمكنك استخدام نموذج DeepSeek R1 70B مباشرة من خلال واجهة المحادثة أو الطرفية. هذا النموذج متاح عبر Search1API ولا يتطلب مفتاح API. يمكنك أيضًا استخدامه مباشرة عبر طلب API:
              
              <div class="code-block">
curl -X POST 'https://api.search1api.com/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
  "model": "deepseek-r1-70b-online",
  "messages": [
    {
      "role": "user",
      "content": "اشرح الحوسبة الكمية بلغة بسيطة"
    }
  ],
  "stream": true
}'
              </div>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">كيف يمكنني استخدام نموذج DeepSeek R1 Distill بدون مفتاح API؟</div>
            <div class="faq-answer">
              يمكنك استخدام نموذج DeepSeek R1 Distill مباشرة من خلال واجهة المحادثة أو الطرفية. هذا النموذج متاح عبر Together API ولا يتطلب مفتاح API. يمكنك أيضًا استخدامه مباشرة عبر طلب API:
              
              <div class="code-block">
curl -X POST "https://api.together.xyz/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
    "messages": [{"role": "user", "content": "ما هي بعض الأشياء الممتعة للقيام بها في نيويورك؟"}]
  }'
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>المنتج</h4>
            <ul>
              <li><a href="index.html#features">المميزات</a></li>
              <li><a href="index.html#models">النماذج</a></li>
              <li><a href="chat.html">المحادثة</a></li>
              <li><a href="terminal.html">الطرفية</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>الدعم</h4>
            <ul>
              <li><a href="help.html">المساعدة</a></li>
              <li><a href="setup.html">الإعداد</a></li>
              <li><a href="https://github.com/openaziz/cyberai-os/issues">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>المجتمع</h4>
            <ul>
              <li><a href="https://github.com/openaziz/cyberai-os">GitHub</a></li>
              <li><a href="https://twitter.com/openaziz">Twitter</a></li>
              <li><a href="https://discord.gg/cyberai">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 CyberAI OS. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
EOL

  echo "✅ تم إنشاء ملف help.html"
}

# إنشاء ملف setup.html
create_setup_html() {
  echo "إنشاء ملف setup.html..."
  
  cat > setup.html << 'EOL'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الإعداد - CyberAI OS</title>
  <meta name="description" content="دليل إعداد وتكوين CyberAI OS">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="icon" href="assets/images/favicon.ico">
  <style>
    .setup-container {
      max-width: 1000px;
      margin: 100px auto 40px;
      background-color: var(--card-background);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      padding: 30px;
    }
    
    .setup-section {
      margin-bottom: 40px;
    }
    
    .setup-section h2 {
      margin-bottom: 20px;
      color: var(--primary-color);
    }
    
    .code-block {
      background-color: #1a1a1a;
      padding: 15px;
      border-radius: 5px;
      font-family: monospace;
      overflow-x: auto;
      margin: 15px 0;
    }
    
    .step {
      margin-bottom: 20px;
      padding-right: 20px;
      border-right: 2px solid var(--primary-color);
    }
    
    .step-number {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-left: 10px;
    }
  </style>
</head>
<body class="dark-theme">
  <header>
    <div class="container">
      <div class="logo">
        <a href="https://openaziz.github.io/cyberai-os/">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="index.html#features">المميزات</a></li>
          <li><a href="index.html#models">النماذج</a></li>
          <li><a href="chat.html">المحادثة</a></li>
          <li><a href="terminal.html">الطرفية</a></li>
        </ul>
      </nav>
      <button class="theme-toggle">🌙</button>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="setup-container">
        <h1>دليل الإعداد</h1>
        
        <div class="setup-section">
          <h2>متطلبات النظام</h2>
          
          <p>قبل البدء في إعداد CyberAI OS، تأكد من أن نظامك يلبي المتطلبات التالية:</p>
          
          <h3>الحد الأدنى من المتطلبات:</h3>
          <ul>
            <li>نظام التشغيل: Windows 10/11، macOS 10.15+، أو Linux (Ubuntu 20.04+)</li>
            <li>المعالج: Intel Core i5 أو ما يعادله</li>
            <li>الذاكرة: 8GB RAM</li>
            <li>مساحة التخزين: 10GB مساحة حرة</li>
            <li>اتصال إنترنت للنماذج السحابية</li>
          </ul>
          
          <h3>المتطلبات الموصى بها للنماذج المحلية:</h3>
          <ul>
            <li>المعالج: Intel Core i7/i9 أو AMD Ryzen 7/9</li>
            <li>الذاكرة: 16GB RAM أو أكثر</li>
            <li>بطاقة الرسومات: NVIDIA RTX 3060 أو أفضل (8GB VRAM أو أكثر)</li>
            <li>مساحة التخزين: 50GB SSD</li>
          </ul>
        </div>
        
        <div class="setup-section">
          <h2>استخدام النماذج بدون مفتاح API</h2>
          
          <p>يمكنك استخدام النماذج التالية بدون الحاجة إلى مفتاح API:</p>
          
          <h3>1. DeepSeek R1 70B (عبر Search1API)</h3>
          <div class="code-block">
curl -X POST 'https://api.search1api.com/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
  "model": "deepseek-r1-70b-online",
  "messages": [
    {
      "role": "user",
      "content": "اشرح الحوسبة الكمية بلغة بسيطة"
    }
  ],
  "stream": true
}'
          </div>
          
          <h3>2. DeepSeek R1 Distill (عبر Together API)</h3>
          <div class="code-block">
curl -X POST "https://api.together.xyz/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
    "messages": [{"role": "user", "content": "ما هي بعض الأشياء الممتعة للقيام بها في نيويورك؟"}]
  }'
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/images/logo.svg" alt="CyberAI OS Logo">
          <span>CyberAI OS</span>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>المنتج</h4>
            <ul>
              <li><a href="index.html#features">المميزات</a></li>
              <li><a href="index.html#models">النماذج</a></li>
              <li><a href="chat.html">المحادثة</a></li>
              <li><a href="terminal.html">الطرفية</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>الدعم</h4>
            <ul>
              <li><a href="help.html">المساعدة</a></li>
              <li><a href="setup.html">الإعداد</a></li>
              <li><a href="https://github.com/openaziz/cyberai-os/issues">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>المجتمع</h4>
            <ul>
              <li><a href="https://github.com/openaziz/cyberai-os">GitHub</a></li>
              <li><a href="https://twitter.com/openaziz">Twitter</a></li>
              <li><a href="https://discord.gg/cyberai">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 CyberAI OS. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
EOL

  echo "✅ تم إنشاء ملف setup.html"
}

# إنشاء ملفات CSS
create_css_files() {
  echo "إنشاء ملفات CSS..."
  
  cat > assets/css/styles.css << 'EOL'
/* CyberAI OS - Main Stylesheet */

:root {
  --primary-color: #ff0033;
  --secondary-color: #1a1a1a;
  --text-color: #f5f5f5;
  --background-color: #121212;
  --card-background: #1e1e1e;
  --border-color: #333;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --error-color: #f44336;
  --font-family: 'Cairo', 'Tajawal', sans-serif;
}

/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  direction: rtl;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  opacity: 0.8;
}

button {
  cursor: pointer;
  font-family: var(--font-family);
}

/* Header Styles */
header {
  background-color: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  color: var(--text-color);
}

.logo img {
  height: 30px;
  margin-left: 10px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 20px;
}

nav ul li a {
  color: var(--text-color);
  font-weight: 500;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
}

/* Hero Section */
.hero {
  padding: 120px 0 80px;
  background: linear-gradient(to bottom, var(--secondary-color), var(--background-color));
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 15px;
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-color);
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  font-weight: 600;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Features Section */
.features {
  padding: 80px 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

/* Models Section */
.models {
  padding: 80px 0;
  background-color: var(--secondary-color);
}

.models h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
}

.models-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.tab-btn {
  background-color: transparent;
  border: none;
  color: var(--text-color);
  padding: 10px 20px;
  font-size: 1.1rem;
  opacity: 0.7;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  opacity: 1;
  border-bottom: 2px solid var(--primary-color);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.model-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.model-card h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.model-card p {
  margin-bottom: 15px;
  opacity: 0.8;
}

.tag {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Footer */
footer {
  background-color: var(--secondary-color);
  padding: 60px 0 20px;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo img {
  height: 30px;
  margin-left: 10px;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.footer-column h4 {
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: var(--text-color);
  opacity: 0.8;
}

.footer-column ul li a:hover {
  opacity: 1;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  opacity: 0.7;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
  }
  
  .hero-content {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .cta-buttons {
    justify-content: center;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 30px;
  }
}

/* Chat Interface */
.chat-container {
  max-width: 1000px;
  margin: 100px auto 40px;
  background-color: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
}

.chat-messages {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 20px;
  max-width: 80%;
}

.message.user {
  margin-left: auto;
  background-color: var(--primary-color);
  color: white;
  border-radius: 18px 18px 4px 18px;
  padding: 12px 16px;
}

.message.bot {
  margin-right: auto;
  background-color: var(--secondary-color);
  border-radius: 18px 18px 18px 4px;
  padding: 12px 16px;
}

.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid var(--border-color);
}

.chat-input input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  font-family: var(--font-family);
}

.chat-input button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  margin-right: 10px;
}

/* Dark/Light Theme Toggle */
body.light-theme {
  --text-color: #333;
  --background-color: #f5f5f5;
  --card-background: #fff;
  --secondary-color: #fff;
  --border-color: #ddd;
}
EOL

  echo "✅ تم إنشاء ملف styles.css"
}

# إنشاء ملفات JavaScript
create_js_files() {
  echo "إنشاء ملفات JavaScript..."
  
  # إنشاء ملف main.js
  cat > assets/js/main.js << 'EOL'
// CyberAI OS - Main JavaScript File

// تبديل الوضع المظلم/الفاتح
document.addEventListener('DOMContentLoaded', () => {
  // تهيئة الوضع المظلم/الفاتح
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  // التحقق من وجود تفضيل مخزن
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.toggle('light-theme', savedTheme === 'light');
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  }
  
  // تبديل الوضع عند النقر على الزر
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  });
  
  // تبديل علامات التبويب في قسم النماذج
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // إزالة الفئة النشطة من جميع الأزرار
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // إضافة الفئة النشطة للزر المنقور
      button.classList.add('active');
      
      // إخفاء جميع محتويات علامات التبويب
      tabContents.forEach(content => content.classList.remove('active'));
      // إظهار محتوى علامة التبويب المحددة
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
EOL

  # إنشاء ملف chat.js
  cat > assets/js/chat.js << 'EOL'
// CyberAI OS - Chat Interface

class ChatInterface {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'https://openaziz.github.io/cyberai-os/api/chat';
    this.modelId = options.modelId || 'deepseek-r1-70b-online'; // استخدام نموذج بدون مفتاح API كافتراضي
    this.container = options.container || document.querySelector('.chat-container');
    this.messagesContainer = this.container?.querySelector('.chat-messages');
    this.inputField = this.container?.querySelector('.chat-input input');
    this.sendButton = this.container?.querySelector('.chat-input button');
    this.history = [];
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    // إضافة مستمعي الأحداث
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // إضافة رسالة ترحيب
    this.addMessage({
      role: 'assistant',
      content: 'مرحبًا بك في CyberAI OS! كيف يمكنني مساعدتك اليوم؟'
    });
  }
  
  async sendMessage() {
    const message = this.inputField.value.trim();
    if (!message) return;
    
    // إضافة رسالة المستخدم إلى واجهة الدردشة
    this.addMessage({
      role: 'user',
      content: message
    });
    
    // مسح حقل الإدخال
    this.inputField.value = '';
    
    // إضافة مؤشر التحميل
    const loadingIndicator = this.addLoadingIndicator();
    
    try {
      // محاكاة إرسال الرسالة إلى API (في الإصدار الحقيقي، سيتم استبدال هذا بطلب API حقيقي)
      setTimeout(() => {
        // إزالة مؤشر التحميل
        this.removeLoadingIndicator(loadingIndicator);
        
        // محاكاة رد من النموذج
        let response = '';
        
        if (message.includes('مرحبا') || message.includes('أهلا')) {
          response = 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟';
        } else if (message.includes('ما هو') || message.includes('ما هي')) {
          response = 'هذا سؤال مثير للاهتمام. بناءً على فهمي، يمكنني القول أن...';
        } else if (message.includes('كيف')) {
          response = 'هناك عدة طرق للقيام بذلك. أولاً، يمكنك...';
        } else {
          response = 'شكراً لمشاركتك هذه المعلومات. هل هناك أي شيء محدد تود معرفته أو مساعدة فيه؟';
        }
        
        // إضافة رد المساعد إلى واجهة الدردشة
        this.addMessage({
          role: 'assistant',
          content: response
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // إزالة مؤشر التحميل
      this.removeLoadingIndicator(loadingIndicator);
      
      // إضافة رسالة خطأ
      this.addMessage({
        role: 'assistant',
        content: 'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
      });
    }
  }
  
  addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.role === 'user' ? 'user' : 'bot');
    messageElement.textContent = message.content;
    this.messagesContainer.appendChild(messageElement);
    
    // التمرير إلى أسفل لعرض الرسالة الجديدة
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    
    // إضافة الرسالة إلى التاريخ
    this.history.push(message);
  }
  
  addLoadingIndicator() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('message', 'bot', 'loading');
    loadingElement.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    this.messagesContainer.appendChild(loadingElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return loadingElement;
  }
  
  removeLoadingIndicator(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
  setModel(modelId) {
    this.modelId = modelId;
    console.log(`تم تغيير النموذج إلى: ${modelId}`);
  }
  
  clearChat() {
    this.history = [];
    this.messagesContainer.innerHTML = '';
    this.addMessage({
      role: 'assistant',
      content: 'تم مسح المحادثة. كيف يمكنني مساعدتك؟'
    });
  }
}

// تهيئة واجهة الدردشة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const chatInterface = new ChatInterface();
  
  // إضافة إلى window للوصول من وحدات JavaScript أخرى
  window.chatInterface = chatInterface;
  
  // تغيير النموذج عند تغيير القائمة المنسدلة
  const modelSelector = document.getElementById('model-selector');
  if (modelSelector) {
    modelSelector.addEventListener('change', () => {
      if (window.chatInterface) {
        window.chatInterface.setModel(modelSelector.value);
      }
    });
  }
  
  // مسح المحادثة عند النقر على زر المسح
  const clearChatButton = document.getElementById('clear-chat');
  if (clearChatButton) {
    clearChatButton.addEventListener('click', () => {
      if (window.chatInterface) {
        window.chatInterface.clearChat();
      }
    });
  }
});
EOL

  # إنشاء ملف terminal.js
  cat > assets/js/terminal.js << 'EOL'
// CyberAI OS - Terminal Interface

document.addEventListener('DOMContentLoaded', () => {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input-field');
  const terminalSend = document.getElementById('terminal-send');
  const clearTerminalButton = document.getElementById('clear-terminal');
  
  let currentModel = 'deepseek-r1-70b-online'; // النموذج الافتراضي
  
  // قائمة النماذج المتاحة
  const availableModels = [
    { id: 'deepseek-r1-70b-online', name: 'DeepSeek R1 70B', provider: 'search1api', apiKey: false },
    { id: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free', name: 'DeepSeek R1 Distill', provider: 'together', apiKey: false },
    { id: 'llama3-70b-8192', name: 'Llama 3 70B', provider: 'groq', apiKey: true },
    { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'openrouter', apiKey: true }
  ];
  
  // إضافة مستمعي الأحداث
  terminalSend.addEventListener('click', processCommand);
  terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      processCommand();
    }
  });
  
  clearTerminalButton.addEventListener('click', () => {
    clearTerminal();
  });
  
  // معالجة الأوامر
  function processCommand() {
    const command = terminalInput.value.trim();
    if (!command) return;
    
    // إضافة الأمر إلى الطرفية
    addToTerminal('command', '> ' + command);
    
    // مسح حقل الإدخال
    terminalInput.value = '';
    
    // معالجة الأمر
    if (command === 'help') {
      showHelp();
    } else if (command === 'models') {
      showModels();
    } else if (command.startsWith('use ')) {
      const modelId = command.substring(4).trim();
      useModel(modelId);
    } else if (command.startsWith('ask ')) {
      const prompt = command.substring(4).trim();
      askModel(prompt);
    } else if (command === 'clear') {
      clearTerminal();
    } else {
      addToTerminal('response', 'أمر غير معروف. اكتب "help" لعرض قائمة الأوامر المتاحة.');
    }
  }
  
  // إضافة نص إلى الطرفية
  function addToTerminal(type, text) {
    const element = document.createElement('div');
    element.classList.add(type);
    element.textContent = text;
    terminalOutput.appendChild(element);
    
    // التمرير إلى أسفل
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  
  // عرض قائمة الأوامر المتاحة
  function showHelp() {
    const helpText = `
الأوامر المتاحة:

help - عرض قائمة الأوامر المتاحة
models - عرض قائمة النماذج المتاحة
use [model_id] - استخدام نموذج محدد
ask [prompt] - طرح سؤال على النموذج الحالي
clear - مسح الطرفية
    `;
    
    addToTerminal('response', helpText);
  }
  
  // عرض قائمة النماذج المتاحة
  function showModels() {
    let modelsText = 'النماذج المتاحة:\n\n';
    
    availableModels.forEach(model => {
      const currentIndicator = model.id === currentModel ? ' (النموذج الحالي)' : '';
      const apiKeyStatus = model.apiKey ? 'يتطلب مفتاح API' : 'لا يتطلب مفتاح API';
      modelsText += `${model.id} - ${model.name} (${model.provider}) - ${apiKeyStatus}${currentIndicator}\n`;
    });
    
    addToTerminal('response', modelsText);
  }
  
  // استخدام نموذج محدد
  function useModel(modelId) {
    const model = availableModels.find(m => m.id === modelId);
    
    if (model) {
      currentModel = modelId;
      addToTerminal('response', `تم تغيير النموذج إلى: ${model.name} (${model.provider})`);
    } else {
      addToTerminal('response', `النموذج "${modelId}" غير موجود. استخدم الأمر "models" لعرض قائمة النماذج المتاحة.`);
    }
  }
  
  // طرح سؤال على النموذج الحالي
  function askModel(prompt) {
    if (!prompt) {
      addToTerminal('response', 'يرجى تقديم سؤال أو طلب.');
      return;
    }
    
    const model = availableModels.find(m => m.id === currentModel);
    
    if (!model) {
      addToTerminal('response', 'لم يتم تحديد نموذج. استخدم الأمر "use [model_id]" لتحديد نموذج.');
      return;
    }
    
    addToTerminal('response', `جاري معالجة طلبك باستخدام ${model.name}...`);
    
    // محاكاة استجابة من النموذج (في الإصدار الحقيقي، سيتم استبدال هذا بطلب API حقيقي)
    setTimeout(() => {
      let response = '';
      
      if (prompt.includes('مرحبا') || prompt.includes('أهلا')) {
        response = 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟';
      } else if (prompt.includes('ما هو') || prompt.includes('ما هي')) {
        response = 'هذا سؤال مثير للاهتمام. بناءً على فهمي، يمكنني القول أن...';
      } else if (prompt.includes('كيف')) {
        response = 'هناك عدة طرق للقيام بذلك. أولاً، يمكنك...';
      } else {
        response = 'شكراً لمشاركتك هذه المعلومات. هل هناك أي شيء محدد تود معرفته أو مساعدة فيه؟';
      }
      
      addToTerminal('response', response);
    }, 1000);
  }
  
  // مسح الطرفية
  function clearTerminal() {
    terminalOutput.innerHTML = '';
    addToTerminal('response', 'مرحبًا بك في طرفية CyberAI OS! اكتب "help" لعرض قائمة الأوامر المتاحة.');
  }
});
EOL

  echo "✅ تم إنشاء ملفات JavaScript"
}

# إنشاء ملفات الصور
create_image_files() {
  echo "إنشاء ملفات الصور..."
  
  # إنشاء ملف logo.svg
  cat > assets/images/logo.svg << 'EOL'
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#1A1A1A"/>
  <path d="M50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20Z" stroke="#FF0033" stroke-width="4"/>
  <path d="M40 40L60 60" stroke="#FF0033" stroke-width="4" stroke-linecap="round"/>
  <path d="M60 40L40 60" stroke="#FF0033" stroke-width="4" stroke-linecap="round"/>
  <path d="M50 30V70" stroke="#FF0033" stroke-width="4" stroke-linecap="round"/>
  <path d="M30 50H70" stroke="#FF0033" stroke-width="4" stroke-linecap="round"/>
</svg>
EOL

  # إنشاء ملف hero-image.svg
  cat > assets/images/hero-image.svg << 'EOL'
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" rx="20" fill="#1A1A1A"/>
  <rect x="50" y="50" width="500" height="300" rx="10" fill="#2A2A2A"/>
  <circle cx="300" cy="200" r="100" fill="#FF0033" fill-opacity="0.2"/>
  <circle cx="300" cy="200" r="80" fill="#FF0033" fill-opacity="0.3"/>
  <circle cx="300" cy="200" r="60" fill="#FF0033" fill-opacity="0.4"/>
  <circle cx="300" cy="200" r="40" fill="#FF0033" fill-opacity="0.5"/>
  <circle cx="300" cy="200" r="20" fill="#FF0033"/>
  <rect x="100" y="100" width="400" height="30" rx="5" fill="#333333"/>
  <rect x="100" y="150" width="300" height="20" rx="5" fill="#333333"/>
  <rect x="100" y="190" width="200" height="20" rx="5" fill="#333333"/>
  <rect x="100" y="230" width="150" height="20" rx="5" fill="#333333"/>
  <rect x="100" y="270" width="100" height="30" rx="5" fill="#FF0033"/>
</svg>
EOL

  # إنشاء ملف favicon.ico (ملف فارغ)
  touch assets/images/favicon.ico
  
  echo "✅ تم إنشاء ملفات الصور"
}

# تنفيذ جميع الوظائف
main() {
  echo "=== بدء تحديث مشروع CyberAI OS ==="
  
  # إنشاء هيكل المجلدات
  create_folder_structure
  
  # تحديث ملف README.md
  update_readme
  
  # تحديث خدمة AI
  update_ai_service
  
  # تحديث الروابط في جميع الملفات
  update_links
  
  # نقل ملفات HTML/CSS/JS إلى المجلد الرئيسي
  move_files_to_root
  
  # إنشاء ملف index.html
  create_index_html
  
  # إنشاء ملف chat.html
  create_chat_html
  
  # إنشاء ملف terminal.html
  create_terminal_html
  
  # إنشاء ملف help.html
  create_help_html
  
  # إنشاء ملف setup.html
  create_setup_html
  
  # إنشاء ملفات CSS
  create_css_files
  
  # إنشاء ملفات JavaScript
  create_js_files
  
  # إنشاء ملفات الصور
  create_image_files
  
  echo "=== تم تحديث المشروع بنجاح! ==="
  echo "يمكنك الآن نشر المشروع على GitHub Pages باستخدام الأوامر التالية:"
  echo "git add ."
  echo "git commit -m \"تحديث المشروع للعمل على GitHub Pages\""
  echo "git push origin main"
}

# تنفيذ السكريبت
main
