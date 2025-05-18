#!/bin/bash

# هذا السكريبت يقوم بنشر الموقع الثابت على GitHub Pages

# التأكد من وجود مجلد out
if [ ! -d "out" ]; then
  echo "مجلد out غير موجود. يرجى تشغيل npm run build أولاً."
  exit 1
fi

# الانتقال إلى مجلد out
cd out

# إنشاء مستودع git إذا لم يكن موجودًا
if [ ! -d ".git" ]; then
  git init
  git checkout -b main
fi

# إضافة جميع الملفات
git add .

# عمل commit
git commit -m "تحديث الموقع الثابت $(date)"

# دفع التغييرات إلى GitHub
echo "جاري دفع التغييرات إلى GitHub..."
git push -f git@github.com:openaziz/cyberai-os.git main:gh-pages

echo "تم نشر الموقع بنجاح على GitHub Pages!"
echo "يمكنك الوصول إلى الموقع على: https://openaziz.github.io/cyberai-os/"
