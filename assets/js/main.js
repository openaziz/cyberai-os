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
