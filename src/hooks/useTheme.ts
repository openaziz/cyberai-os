"use client"

import { useState, useEffect } from "react"
import { saveToStorage, getFromStorage } from "../utils/storage"
import { ENV } from "../config/env"

type Theme = "dark" | "light"

export function useTheme() {
  // استرجاع السمة المحفوظة أو استخدام السمة الافتراضية
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = getFromStorage<Theme>("cyberai_theme", ENV.DEFAULT_THEME as Theme)
    return savedTheme
  })

  // تطبيق السمة عند تغييرها
  useEffect(() => {
    // تحديث الكلاس على عنصر الـ HTML
    document.documentElement.classList.toggle("dark-mode", theme === "dark")
    document.documentElement.classList.toggle("light-mode", theme === "light")

    // حفظ السمة في التخزين المحلي
    saveToStorage("cyberai_theme", theme)
  }, [theme])

  // وظيفة لتبديل السمة
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  // وظيفة لتعيين سمة محددة
  const setThemeExplicitly = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return {
    theme,
    isDarkMode: theme === "dark",
    isLightMode: theme === "light",
    toggleTheme,
    setTheme: setThemeExplicitly,
  }
}
