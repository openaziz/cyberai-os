// ملف لتعطيل التقديم المسبق للصفحات التي تحتوي على مكونات عميل فقط
export const disablePrerender = {
  unstable_skipValidation: true,
  unstable_allowDynamic: [
    "**/node_modules/lodash/**/*.js",
    "**/node_modules/lucide-react/**/*.js",
    "**/node_modules/@radix-ui/**/*.js",
  ],
}

// دالة لتعطيل التقديم المسبق لصفحة معينة
export function disablePrerenderForPage() {
  return {
    notFound: false,
    props: {},
  }
}
