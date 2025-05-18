import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// تحميل الخطوط والأيقونات
const loadFontAwesome = () => {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  link.integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
  link.crossOrigin = "anonymous"
  link.referrerPolicy = "no-referrer"
  document.head.appendChild(link)
}

// تحميل الخطوط والأيقونات قبل تحميل التطبيق
loadFontAwesome()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
