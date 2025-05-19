---
layout: default
title: CyberAI OS - نظام ذكاء اصطناعي محلي
---

# CyberAI OS

<div align="center">
  <img src="assets/cyberai-logo.png" alt="CyberAI OS Logo" width="200" />
  <h3>نظام ذكاء اصطناعي محلي مع الحفاظ على الخصوصية</h3>
</div>

## مرحباً بك في CyberAI OS

CyberAI OS هو منصة متكاملة للذكاء الاصطناعي المحلي تتيح للمستخدمين تشغيل نماذج الذكاء الاصطناعي على أجهزتهم الخاصة مع الحفاظ على الخصوصية والأمان. يدعم النظام مجموعة متنوعة من النماذج المحلية والسحابية، ويوفر واجهة سهلة الاستخدام للتفاعل مع هذه النماذج.

## المميزات الرئيسية

- **خصوصية كاملة**: بياناتك تبقى على جهازك ولا نرسل إلى أي خوادم خارجية
- **استقلالية تامة**: لا حاجة للاشتراكات أو المعايير المفتوحة
- **أداء سريع**: استجابة فورية دون تأخير بفضل المعالجة المحلية
- **تخصيص متقدم**: إمكانية تعديل النماذج وتدريبها حسب احتياجاتك الخاصة
- **دعم متعدد النماذج**: يدعم مجموعة متنوعة من النماذج المحلية والسحابية
- **واجهة عربية**: واجهة مستخدم كاملة باللغة العربية

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

## البدء السريع

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

### 4. تحميل وتدريب نموذج محلي

\`\`\`bash
chmod +x setup-local-model.sh
./setup-local-model.sh
\`\`\`

### 5. تشغيل التطبيق

\`\`\`bash
npm run dev
\`\`\`

## الوثائق

- [دليل التثبيت](installation.html)
- [دليل المستخدم](user-guide.html)
- [تدريب النماذج](training.html)
- [واجهة برمجة التطبيقات](api.html)
- [الأسئلة الشائعة](faq.html)

## التواصل

- البريد الإلكتروني: sa6aa6116@gmail.com
- GitHub: [https://github.com/openaziz/cyberai-os](https://github.com/openaziz/cyberai-os)
\`\`\`

## 5. تحديث ملف API النماذج لإضافة النماذج المحلية
