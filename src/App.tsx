"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/layout/Header"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import ModelsPage from "./pages/ModelsPage"
import SetupPage from "./pages/SetupPage"
import ModelTrainingPage from "./pages/ModelTrainingPage"
import TerminalPage from "./pages/TerminalPage"
import { useTheme } from "./hooks/useTheme"
import { ENV } from "./config/env"

const App: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل التطبيق
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen flex items-center justify-center h-screen bg-background">
        <div className="loading-content text-center">
          <img
            src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
            alt="CyberAI OS Logo"
            className="w-32 h-32 mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-3xl font-bold text-primary mb-4">CyberAI OS</h1>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router basename={ENV.BASE_URL}>
      <div className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <Header darkMode={isDarkMode} toggleDarkMode={toggleTheme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/training" element={<ModelTrainingPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            {/* إعادة توجيه المسارات غير الموجودة إلى الصفحة الرئيسية */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer bg-background-darker text-center p-6 border-t border-background-lighter">
          <div className="container mx-auto">
            <p className="mb-2">معلومات عن مشروع CyberAI OS والمطور عبدالعزيز.</p>
            <p className="mb-2">
              تابعنا على سناب:{" "}
              <a
                href="https://www.snapchat.com/add/bx90_9?share_id=TrrHZq1-nMo&locale=ar-EG"
                target="_blank"
                className="text-primary hover:underline"
                rel="noreferrer"
              >
                @bx90_9
              </a>
            </p>
            <p>
              راسلنا على:{" "}
              <a href="mailto:sa55aau6@gmail.com" className="text-primary hover:underline">
                sa55aau6@gmail.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
