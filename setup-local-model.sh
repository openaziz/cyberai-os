#!/bin/bash

# سكربت لتحميل وتدريب نموذج محلي لـ CyberAI OS
# المؤلف: OpenAziz
# البريد الإلكتروني: sa6aa6116@gmail.com
# GitHub: https://github.com/openaziz/cyberai-os

set -e

# الألوان للطباعة
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# المسار الافتراضي للنماذج المحلية
DEFAULT_MODELS_PATH="$HOME/cyberai-models"
MODELS_PATH=${LOCAL_MODELS_PATH:-$DEFAULT_MODELS_PATH}

# إنشاء المجلد إذا لم يكن موجوداً
mkdir -p "$MODELS_PATH"

# تحقق من وجود الأدوات المطلوبة
check_dependencies() {
    echo -e "${BLUE}التحقق من وجود الأدوات المطلوبة...${NC}"
    
    # قائمة بالأدوات المطلوبة
    DEPS=("git" "python3" "pip3" "wget" "curl")
    
    for dep in "${DEPS[@]}"; do
        if ! command -v $dep &> /dev/null; then
            echo -e "${RED}الأداة $dep غير موجودة. يرجى تثبيتها أولاً.${NC}"
            exit 1
        fi
    done
    
    echo -e "${GREEN}جميع الأدوات المطلوبة موجودة.${NC}"
}

# تثبيت المكتبات المطلوبة
install_python_deps() {
    echo -e "${BLUE}تثبيت المكتبات المطلوبة...${NC}"
    pip3 install --upgrade pip
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
    pip3 install transformers datasets accelerate bitsandbytes sentencepiece protobuf
    pip3 install huggingface_hub
    echo -e "${GREEN}تم تثبيت المكتبات بنجاح.${NC}"
}

# استنساخ مستودع Judini Cookbook
clone_judini_cookbook() {
    echo -e "${BLUE}استنساخ مستودع Judini Cookbook...${NC}"
    if [ -d "cookbook" ]; then
        echo "مستودع Cookbook موجود بالفعل، جاري التحديث..."
        cd cookbook
        git pull
        cd ..
    else
        git clone https://github.com/JudiniLabs/cookbook.git
        echo -e "${GREEN}تم استنساخ المستودع بنجاح.${NC}"
    fi
}

# تحميل نموذج Llama 3 8B
download_llama3_8b() {
    echo -e "${BLUE}تحميل نموذج Llama 3 8B...${NC}"
    MODEL_DIR="$MODELS_PATH/llama3-8b"
    
    if [ -d "$MODEL_DIR" ]; then
        echo -e "${YELLOW}النموذج موجود بالفعل في $MODEL_DIR${NC}"
        read -p "هل تريد إعادة تحميله؟ (y/n): " REDOWNLOAD
        if [ "$REDOWNLOAD" != "y" ]; then
            echo "تخطي التحميل."
            return
        fi
    fi
    
    mkdir -p "$MODEL_DIR"
    
    # استخدام huggingface-cli لتحميل النموذج
    echo "جاري تحميل نموذج Llama 3 8B من Hugging Face..."
    python3 -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='meta-llama/Meta-Llama-3-8B', local_dir='$MODEL_DIR')"
    
    echo -e "${GREEN}تم تحميل النموذج بنجاح إلى $MODEL_DIR${NC}"
}

# تحويل النموذج إلى صيغة GGUF للاستخدام المحلي
convert_to_gguf() {
    echo -e "${BLUE}تحويل النموذج إلى صيغة GGUF...${NC}"
    
    # تحقق من وجود llama.cpp
    if [ ! -d "llama.cpp" ]; then
        echo "استنساخ مستودع llama.cpp..."
        git clone https://github.com/ggerganov/llama.cpp.git
        cd llama.cpp
        make
        cd ..
    else
        echo "مستودع llama.cpp موجود بالفعل."
        cd llama.cpp
        git pull
        make
        cd ..
    fi
    
    MODEL_DIR="$MODELS_PATH/llama3-8b"
    GGUF_DIR="$MODELS_PATH/llama3-8b-gguf"
    mkdir -p "$GGUF_DIR"
    
    echo "تحويل النموذج إلى صيغة GGUF..."
    python3 llama.cpp/convert.py "$MODEL_DIR" --outfile "$GGUF_DIR/llama3-8b-q4_0.gguf" --outtype q4_0
    
    echo -e "${GREEN}تم تحويل النموذج بنجاح إلى $GGUF_DIR/llama3-8b-q4_0.gguf${NC}"
}

# تدريب النموذج باستخدام Judini Cookbook
train_model() {
    echo -e "${BLUE}تدريب النموذج باستخدام Judini Cookbook...${NC}"
    
    cd cookbook
    
    # إنشاء ملف بيانات التدريب
    echo "إنشاء ملف بيانات التدريب..."
    mkdir -p data
    
    cat > data/training_data.jsonl << EOL
{"instruction": "ما هو CyberAI OS؟", "output": "CyberAI OS هو نظام ذكاء اصطناعي محلي يتيح للمستخدمين تشغيل نماذج الذكاء الاصطناعي على أجهزتهم الخاصة مع الحفاظ على الخصوصية والأمان."}
{"instruction": "ما هي ميزات CyberAI OS؟", "output": "يتميز CyberAI OS بالخصوصية الكاملة حيث تبقى البيانات على جهازك، والاستقلالية التامة دون الحاجة لاشتراكات، والأداء السريع، والقدرة على التخصيص حسب احتياجاتك."}
{"instruction": "كيف يمكنني تثبيت CyberAI OS؟", "output": "يمكنك تثبيت CyberAI OS عن طريق استنساخ المستودع من GitHub، ثم تشغيل سكربت التثبيت، وتحميل النماذج المطلوبة، وأخيراً تشغيل التطبيق باستخدام أمر npm run dev."}
{"instruction": "ما هي النماذج المدعومة في CyberAI OS؟", "output": "يدعم CyberAI OS مجموعة متنوعة من النماذج المحلية مثل Llama 3 و TinyLlama، بالإضافة إلى النماذج السحابية من مزودين مثل Groq و Together AI."}
{"instruction": "كيف يمكنني تدريب نموذج خاص بي؟", "output": "يمكنك تدريب نموذج خاص بك باستخدام سكربت setup-local-model.sh الذي يقوم بتحميل نموذج Llama 3 وتحويله إلى صيغة GGUF ثم تدريبه باستخدام مكتبة Judini Cookbook."}
EOL
    
    # تشغيل سكربت التدريب
    echo "بدء عملية التدريب..."
    python3 -c "
import os
import sys
sys.path.append('.')
from finetune.finetune import train_model

train_model(
    model_name='meta-llama/Meta-Llama-3-8B',
    dataset_path='data/training_data.jsonl',
    output_dir='$MODELS_PATH/llama3-8b-finetuned',
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=2,
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_steps=100,
    max_grad_norm=1.0,
    logging_steps=10,
    save_steps=100,
    save_total_limit=3
)
"
    
    cd ..
    
    echo -e "${GREEN}تم تدريب النموذج بنجاح. النموذج المدرب متاح في $MODELS_PATH/llama3-8b-finetuned${NC}"
}

# إضافة النموذج المحلي إلى متغيرات البيئة
update_env_file() {
    echo -e "${BLUE}تحديث ملف متغيرات البيئة...${NC}"
    
    # التحقق من وجود ملف .env.local
    if [ ! -f ".env.local" ]; then
        echo "إنشاء ملف .env.local جديد..."
        cp .env.example .env.local 2>/dev/null || touch .env.local
    fi
    
    # إضافة أو تحديث متغير LOCAL_MODELS_PATH
    if grep -q "LOCAL_MODELS_PATH" .env.local; then
        sed -i "s|LOCAL_MODELS_PATH=.*|LOCAL_MODELS_PATH=$MODELS_PATH|g" .env.local
    else
        echo "# Local Models" >> .env.local
        echo "LOCAL_MODELS_PATH=$MODELS_PATH" >> .env.local
    fi
    
    # إضافة متغيرات للنموذج المدرب
    echo "LLAMA3_8B_PATH=$MODELS_PATH/llama3-8b-finetuned" >> .env.local
    echo "LLAMA3_8B_GGUF_PATH=$MODELS_PATH/llama3-8b-gguf/llama3-8b-q4_0.gguf" >> .env.local
    
    echo -e "${GREEN}تم تحديث ملف .env.local بنجاح.${NC}"
}

# إضافة النموذج المحلي إلى التطبيق
add_model_to_app() {
    echo -e "${BLUE}إضافة النموذج المحلي إلى التطبيق...${NC}"
    
    # إنشاء ملف للتعامل مع النماذج المحلية
    mkdir -p lib
    
    cat > lib/local-models.ts << EOL
// التعامل مع النماذج المحلية
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// التحقق من وجود النموذج المحلي
export function checkLocalModelExists(modelPath: string): boolean {
  try {
    return fs.existsSync(modelPath);
  } catch (error) {
    console.error('خطأ في التحقق من وجود النموذج المحلي:', error);
    return false;
  }
}

// تشغيل النموذج المحلي كعملية منفصلة
export function startLocalModel(modelPath: string, port: number = 8080): Promise<{ process: any; url: string }> {
  return new Promise((resolve, reject) => {
    try {
      // التحقق من وجود النموذج
      if (!checkLocalModelExists(modelPath)) {
        reject(new Error(\`النموذج غير موجود في المسار: \${modelPath}\`));
        return;
      }

      // تحديد نوع النموذج (GGUF أو نموذج Hugging Face)
      const isGGUF = modelPath.endsWith('.gguf');
      
      let modelProcess;
      
      if (isGGUF) {
        // تشغيل النموذج باستخدام llama.cpp
        const llamaCppPath = path.join(process.env.LOCAL_MODELS_PATH || '', '../llama.cpp');
        modelProcess = spawn(\`\${llamaCppPath}/server\`, [
          '--model', modelPath,
          '--port', port.toString(),
          '--ctx-size', '2048',
          '--threads', '4'
        ]);
      } else {
        // تشغيل النموذج باستخدام text-generation-server
        modelProcess = spawn('python3', [
          '-m', 'text_generation_server.cli', 
          '--model-id', modelPath,
          '--port', port.toString()
        ]);
      }

      // معالجة الخرج
      modelProcess.stdout.on('data', (data) => {
        console.log(\`خرج النموذج المحلي: \${data}\`);
        // إذا بدأ الخادم بنجاح
        if (data.toString().includes('Server started')) {
          resolve({ 
            process: modelProcess, 
            url: \`http://localhost:\${port}/v1\` 
          });
        }
      });

      // معالجة الأخطاء
      modelProcess.stderr.on('data', (data) => {
        console.error(\`خطأ في النموذج المحلي: \${data}\`);
      });

      // معالجة إنهاء العملية
      modelProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(\`فشل تشغيل النموذج المحلي مع رمز الخروج \${code}\`));
        }
      });

      // تعيين مهلة للتحقق من بدء الخادم
      setTimeout(() => {
        resolve({ 
          process: modelProcess, 
          url: \`http://localhost:\${port}/v1\` 
        });
      }, 10000);
    } catch (error) {
      reject(error);
    }
  });
}

// إيقاف النموذج المحلي
export function stopLocalModel(modelProcess: any): Promise<void> {
  return new Promise((resolve) => {
    if (modelProcess && !modelProcess.killed) {
      modelProcess.kill();
      modelProcess.on('close', () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// إرسال طلب إلى النموذج المحلي
export async function queryLocalModel(url: string, messages: any[]): Promise<any> {
  try {
    const response = await fetch(\`\${url}/chat/completions\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(\`خطأ في الاستجابة: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في الاستعلام من النموذج المحلي:', error);
    throw error;
  }
}
EOL
    
    echo -e "${GREEN}تم إنشاء ملف lib/local-models.ts بنجاح.${NC}"
    
    # تحديث ملف API للدردشة لدعم النماذج المحلية
    cat > app/api/chat/local/route.ts << EOL
import { type NextRequest, NextResponse } from "next/server"
import { startLocalModel, queryLocalModel, stopLocalModel } from "@/lib/local-models"

// قائمة النماذج المحلية المدعومة
const LOCAL_MODELS = {
  "llama3-8b": {
    path: process.env.LLAMA3_8B_GGUF_PATH || "",
    type: "gguf",
  },
  "llama3-8b-hf": {
    path: process.env.LLAMA3_8B_PATH || "",
    type: "huggingface",
  },
}

// متغير عالمي لتخزين عمليات النماذج المحلية
let localModelProcesses: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const { messages, model } = await request.json()

    // التحقق من البيانات المدخلة
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "يجب توفير رسائل صالحة" }, { status: 400 })
    }

    // التحقق من وجود النموذج المحلي
    if (!model || !(model in LOCAL_MODELS)) {
      return NextResponse.json({ error: "النموذج المحلي غير مدعوم" }, { status: 400 })
    }

    const modelConfig = LOCAL_MODELS[model as keyof typeof LOCAL_MODELS]
    
    if (!modelConfig.path) {
      return NextResponse.json({ error: "مسار النموذج المحلي غير محدد" }, { status: 500 })
    }

    // بدء تشغيل النموذج المحلي إذا لم يكن قيد التشغيل بالفعل
    if (!localModelProcesses[model]) {
      try {
        const port = 8080 + Object.keys(localModelProcesses).length
        const { process, url } = await startLocalModel(modelConfig.path, port)
        localModelProcesses[model] = { process, url }
      } catch (error: any) {
        console.error(\`خطأ في بدء تشغيل النموذج المحلي \${model}:\`, error)
        return NextResponse.json({ error: \`فشل في بدء تشغيل النموذج المحلي: \${error.message}\` }, { status: 500 })
      }
    }

    // إرسال الطلب إلى النموذج المحلي
    try {
      const response = await queryLocalModel(localModelProcesses[model].url, messages)
      return NextResponse.json(response, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error: any) {
      console.error("خطأ في الاستعلام من النموذج المحلي:", error)
      
      // محاولة إعادة تشغيل النموذج وإعادة المحاولة مرة واحدة
      try {
        await stopLocalModel(localModelProcesses[model].process)
        delete localModelProcesses[model]
        
        const port = 8080 + Object.keys(localModelProcesses).length
        const { process, url } = await startLocalModel(modelConfig.path, port)
        localModelProcesses[model] = { process, url }
        
        const response = await queryLocalModel(localModelProcesses[model].url, messages)
        return NextResponse.json(response, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (retryError: any) {
        return NextResponse.json(
          { error: \`فشل في الاستعلام من النموذج المحلي: \${error.message}\` },
          { status: 500 }
        )
      }
    }
  } catch (error: any) {
    console.error("خطأ في واجهة برمجة التطبيقات للدردشة المحلية:", error)
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    )
  }
}

// تنظيف عمليات النماذج المحلية عند إيقاف الخادم
process.on('SIGTERM', async () => {
  for (const model in localModelProcesses) {
    await stopLocalModel(localModelProcesses[model].process)
  }
  process.exit(0)
})

process.on('SIGINT', async () => {
  for (const model in localModelProcesses) {
    await stopLocalModel(localModelProcesses[model].process)
  }
  process.exit(0)
})
EOL
    
    echo -e "${GREEN}تم إنشاء ملف app/api/chat/local/route.ts بنجاح.${NC}"
    
    # تحديث ملف API للنماذج لإضافة النماذج المحلية
    cat > app/api/models/local/route.ts << EOL
import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { checkLocalModelExists } from "@/lib/local-models"

export async function GET(request: NextRequest) {
  try {
    // التحقق من وجود النماذج المحلية
    const llama3_8b_gguf = process.env.LLAMA3_8B_GGUF_PATH || ""
    const llama3_8b_hf = process.env.LLAMA3_8B_PATH || ""
    
    const localModels = [
      {
        id: "llama3-8b",
        name: "Llama 3 (8B) - GGUF",
        description: "نموذج Llama 3 المحلي بحجم 8 مليار معلمة (صيغة GGUF)",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_gguf,
        available: checkLocalModelExists(llama3_8b_gguf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      },
      {
        id: "llama3-8b-hf",
        name: "Llama 3 (8B) - Finetuned",
        description: "نموذج Llama 3 المدرب محلياً بحجم 8 مليار معلمة",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_hf,
        available: checkLocalModelExists(llama3_8b_hf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      }
    ]

    return NextResponse.json(
      { models: localModels },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error: any) {
    console.error("خطأ في استرجاع النماذج المحلية:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء استرجاع النماذج المحلية" }, { status: 500 })
  }
}
EOL
    
    echo -e "${GREEN}تم إنشاء ملف app/api/models/local/route.ts بنجاح.${NC}"
    
    # تحديث صفحة النماذج لعرض النماذج المحلية
    echo -e "${BLUE}تم إضافة دعم النماذج المحلية إلى التطبيق بنجاح.${NC}"
}

# إنشاء ملف README.md
create_readme() {
    echo -e "${BLUE}إنشاء ملف README.md...${NC}"
    
    cat > README.md << EOL
# CyberAI OS

نظام ذكاء اصطناعي محلي يتيح للمستخدمين تشغيل نماذج الذكاء الاصطناعي على أجهزتهم الخاصة مع الحفاظ على الخصوصية والأمان.

## المميزات

- **خصوصية كاملة**: بياناتك تبقى على جهازك ولا نرسل إلى أي خوادم خارجية
- **استقلالية تامة**: لا حاجة للاشتراكات أو المعايير المفتوحة
- **أداء سريع**: استجابة فورية دون تأخير بفضل المعالجة المحلية
- **تخصيص متقدم**: إمكانية تعديل النماذج وتدريبها حسب احتياجاتك الخاصة

## النماذج المدعومة

### النماذج المحلية
- Llama 3 (8B) - GGUF
- Llama 3 (8B) - Finetuned
- TinyLlama (1.1B)
- Phi-2 (2.7B)
- Mistral (7B)

### النماذج السحابية
- DeepSeek-R1 (Together AI)
- Llama-4-Maverick-17B (Together AI)
- Gemma-3-27B (Together AI)
- Llama-3-70B (Groq)
- Mixtral-8x7B (Groq)
- Gemma-7B (Groq)

## متطلبات النظام

- Node.js v18 أو أحدث
- npm v9 أو أحدث
- Python 3.10 أو أحدث
- ذاكرة وصول عشوائي 8GB على الأقل (16GB موصى بها للنماذج الأكبر)
- مساحة تخزين 10GB على الأقل

## التثبيت

### 1. استنساخ المستودع

\`\`\`bash
git clone https://github.com/openaziz/cyberai-os.git
cd cyberai-os
\`\`\`

### 2. تثبيت التبعيات

\`\`\`bash
npm install
\`\`\`

### 3. إعداد متغيرات البيئة

\`\`\`bash
cp .env.example .env.local
\`\`\`

قم بتعديل ملف \`.env.local\` وإضافة مفاتيح API الخاصة بك.

### 4. تحميل وتدريب نموذج محلي

\`\`\`bash
chmod +x setup-local-model.sh
./setup-local-model.sh
\`\`\`

### 5. تشغيل التطبيق

\`\`\`bash
npm run dev
\`\`\`

## الاستخدام

1. افتح المتصفح وانتقل إلى \`http://localhost:3000\`
2. اختر النموذج الذي تريد استخدامه من القائمة المنسدلة
3. ابدأ المحادثة مع النموذج

## تدريب نموذج خاص

يمكنك تدريب نموذج خاص باستخدام سكربت \`setup-local-model.sh\` الذي يقوم بتحميل نموذج Llama 3 وتحويله إلى صيغة GGUF ثم تدريبه باستخدام مكتبة Judini Cookbook.

## المساهمة

نرحب بمساهماتكم! يرجى إرسال طلبات السحب أو فتح مشكلة لمناقشة التغييرات المقترحة.

## الترخيص

هذا المشروع مرخص بموجب رخصة MIT.

## التواصل

- البريد الإلكتروني: sa6aa6116@gmail.com
- GitHub: https://github.com/openaziz/cyberai-os
- الموقع: https://openaziz.github.io/cyberai-os/
EOL
    
    echo -e "${GREEN}تم إنشاء ملف README.md بنجاح.${NC}"
}

# الوظيفة الرئيسية
main() {
    echo -e "${BLUE}=== بدء إعداد نموذج CyberAI OS المحلي ===${NC}"
    
    check_dependencies
    install_python_deps
    clone_judini_cookbook
    download_llama3_8b
    convert_to_gguf
    train_model
    update_env_file
    add_model_to_app
    create_readme
    
    echo -e "${GREEN}=== تم الانتهاء من الإعداد بنجاح! ===${NC}"
    echo -e "يمكنك الآن استخدام النموذج المحلي في تطبيق CyberAI OS."
    echo -e "مسار النموذج: ${YELLOW}$MODELS_PATH/llama3-8b-gguf/llama3-8b-q4_0.gguf${NC}"
    echo -e "مسار النموذج المدرب: ${YELLOW}$MODELS_PATH/llama3-8b-finetuned${NC}"
    echo -e "لتشغيل التطبيق، استخدم الأمر: ${YELLOW}npm run dev${NC}"
}

# تنفيذ الوظيفة الرئيسية
main
