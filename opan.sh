#!/bin/bash

# سكريبت شامل لإصلاح استخدامات react-router في المشروع
echo "بدء إصلاح استخدامات react-router في المشروع..."

# إنشاء مجلد للنسخ الاحتياطية
mkdir -p backups

# 1. إصلاح ملف app/page.tsx
if [ -f "app/page.tsx" ]; then
    echo "إصلاح ملف app/page.tsx..."
    cp app/page.tsx backups/page.tsx.backup
    
    # إصلاح استيراد Link
    sed -i 's|import { Link } from "react-router-dom"|import Link from "next/link"|g' app/page.tsx
    sed -i 's|import { Link, useLocation } from "react-router-dom"|import Link from "next/link"\nimport { usePathname } from "next/navigation"|g' app/page.tsx
    
    # إصلاح استخدام Link
    sed -i 's|<Link to="|<Link href="|g' app/page.tsx
    
    # إصلاح استخدام useLocation
    sed -i 's|const location = useLocation()|const pathname = usePathname()|g' app/page.tsx
    sed -i 's|location.pathname|pathname|g' app/page.tsx
    
    echo "تم إصلاح ملف app/page.tsx"
fi

# 2. البحث عن جميع الملفات التي تستخدم react-router وإصلاحها
echo "البحث عن جميع الملفات التي تستخدم react-router وإصلاحها..."

find app components -type f $$ -name "*.tsx" -o -name "*.jsx" $$ | while read -r file; do
    if grep -q "react-router" "$file" || grep -q "<Link to=" "$file"; then
        echo "إصلاح ملف $file..."
        cp "$file" "backups/$(basename "$file").backup"
        
        # إصلاح استيراد Link
        sed -i 's|import { Link } from "react-router-dom"|import Link from "next/link"|g' "$file"
        sed -i 's|import { Link, useLocation } from "react-router-dom"|import Link from "next/link"\nimport { usePathname } from "next/navigation"|g' "$file"
        
        # إصلاح استخدام Link
        sed -i 's|<Link to="|<Link href="|g' "$file"
        
        # إصلاح استخدام useLocation
        sed -i 's|const location = useLocation()|const pathname = usePathname()|g' "$file"
        sed -i 's|location.pathname|pathname|g' "$file"
        
        echo "تم إصلاح ملف $file"
    fi
done

# 3. إزالة react-router من package.json إذا كان موجودًا
if grep -q "react-router" package.json; then
    echo "إزالة react-router من package.json..."
    cp package.json backups/package.json.backup
    
    # إزالة react-router و react-router-dom
    sed -i '/"react-router"/d' package.json
    sed -i '/"react-router-dom"/d' package.json
    
    echo "تم إزالة react-router من package.json"
fi

# 4. إصلاح ملف HomePage.tsx إذا كان موجودًا
if [ -f "HomePage.tsx" ]; then
    echo "إصلاح ملف HomePage.tsx..."
    cp HomePage.tsx backups/HomePage.tsx.backup
    
    # إصلاح استيراد Link
    sed -i 's|import { Link } from "react-router-dom"|import Link from "next/link"|g' HomePage.tsx
    sed -i 's|import { Link, useLocation } from "react-router-dom"|import Link from "next/link"\nimport { usePathname } from "next/navigation"|g' HomePage.tsx
    
    # إصلاح استخدام Link
    sed -i 's|<Link to="|<Link href="|g' HomePage.tsx
    
    # إصلاح استخدام useLocation
    sed -i 's|const location = useLocation()|const pathname = usePathname()|g' HomePage.tsx
    sed -i 's|location.pathname|pathname|g' HomePage.tsx
    
    echo "تم إصلاح ملف HomePage.tsx"
fi

# 5. إصلاح ملف app/ClientLayout.tsx إذا كان موجودًا
if [ -f "app/ClientLayout.tsx" ]; then
    echo "إصلاح ملف app/ClientLayout.tsx..."
    cp app/ClientLayout.tsx backups/ClientLayout.tsx.backup
    
    # إزالة BrowserRouter إذا كان موجودًا
    sed -i 's|import { BrowserRouter } from "react-router-dom"||g' app/ClientLayout.tsx
    sed -i 's|<BrowserRouter>||g' app/ClientLayout.tsx
    sed -i 's|</BrowserRouter>||g' app/ClientLayout.tsx
    
    echo "تم إصلاح ملف app/ClientLayout.tsx"
fi

echo "تم إصلاح استخدامات react-router في المشروع بنجاح!"
echo "تم حفظ نسخ احتياطية من الملفات الأصلية في مجلد backups"
echo "يرجى إعادة تشغيل التطبيق باستخدام: pnpm dev"
