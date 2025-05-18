/**
 * سكريبت لاستيراد ملفات المصدر (HTML/CSS/JS) إلى مشروع Next.js
 */
const fs = require('fs');
const path = require('path');

// قراءة ملفات HTML
const htmlDir = path.join(__dirname, '../src/html');
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

// قراءة ملفات CSS
const cssDir = path.join(__dirname, '../src/css');
const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));

// قراءة ملفات JavaScript
const jsDir = path.join(__dirname, '../src/js');
const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));

console.log('ملفات HTML:');
htmlFiles.forEach(file => console.log(`- ${file}`));

console.log('\nملفات CSS:');
cssFiles.forEach(file => console.log(`- ${file}`));

console.log('\nملفات JavaScript:');
jsFiles.forEach(file => console.log(`- ${file}`));

console.log('\nيمكنك استيراد هذه الملفات إلى مشروع Next.js يدويًا أو كتابة سكريبت للقيام بذلك تلقائيًا.');
