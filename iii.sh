#!/bin/bash

# سكريبت لإصلاح ملف app/page.tsx
echo "بدء إصلاح ملف app/page.tsx..."

# التأكد من وجود الملف
if [ ! -f "app/page.tsx" ]; then
    echo "خطأ: ملف app/page.tsx غير موجود!"
    exit 1
fi

# نسخ الملف الأصلي للاحتياط
cp app/page.tsx app/page.tsx.backup

# إصلاح استيراد Link
echo "إصلاح استيراد Link..."
sed -i 's|import { Link } from "react-router-dom"|import Link from "next/link"|g' app/page.tsx

# إصلاح استخدام Link
echo "إصلاح استخدام Link..."
sed -i 's|<Link to="|<Link href="|g' app/page.tsx

# إصلاح استيراد Rocket من lucide-react إذا لم يكن موجودًا
if ! grep -q "import { Rocket } from" app/page.tsx; then
    echo "إضافة استيراد Rocket من lucide-react..."
    sed -i '1s/^/import { Rocket } from 'lucide-react'\n/' app/page.tsx
fi

echo "تم إصلاح ملف app/page.tsx بنجاح!"
echo "تم حفظ نسخة احتياطية من الملف الأصلي في app/page.tsx.backup"
