"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TerminalIcon, X, Maximize2, Minimize2, Copy, Download } from "lucide-react"
import { ENV } from "../config/env"

interface CommandHistory {
  command: string
  output: string
  isError?: boolean
  timestamp: Date
}

const TerminalPage: React.FC = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: "مرحباً بك في واجهة Terminal لـ CyberAI OS!\nاكتب 'help' للحصول على قائمة الأوامر المتاحة.",
      timestamp: new Date(),
    },
  ])
  const [currentDirectory, setCurrentDirectory] = useState("/home/user")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  // التركيز على حقل الإدخال عند تحميل الصفحة
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // التمرير إلى أسفل عند إضافة أوامر جديدة
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // التنقل في تاريخ الأوامر باستخدام مفاتيح الأسهم
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Enter") {
      e.preventDefault()
      handleCommand()
    } else if (e.key === "Tab") {
      e.preventDefault()
      // محاكاة الإكمال التلقائي
      if (input.startsWith("cd ")) {
        const partial = input.substring(3)
        if ("documents".startsWith(partial)) {
          setInput("cd documents")
        } else if ("downloads".startsWith(partial)) {
          setInput("cd downloads")
        } else if ("desktop".startsWith(partial)) {
          setInput("cd desktop")
        }
      } else if (input.startsWith("ls ")) {
        const partial = input.substring(3)
        if ("-la".startsWith(partial)) {
          setInput("ls -la")
        } else if ("-l".startsWith(partial)) {
          setInput("ls -l")
        }
      }
    }
  }

  const handleCommand = () => {
    if (!input.trim()) return

    // إضافة الأمر إلى تاريخ الأوامر
    setCommandHistory((prev) => [...prev, input])
    setHistoryIndex(-1)

    const newHistoryItem: CommandHistory = {
      command: input,
      output: "",
      timestamp: new Date(),
    }

    // معالجة الأوامر المختلفة
    const command = input.trim()
    const commandParts = command.split(" ")
    const mainCommand = commandParts[0]

    switch (mainCommand) {
      case "help":
        newHistoryItem.output = `
الأوامر المتاحة:
  help                  - عرض هذه المساعدة
  ls [options] [path]   - عرض محتويات الدليل
  cd [path]             - تغيير الدليل الحالي
  pwd                   - عرض مسار الدليل الحالي
  echo [text]           - طباعة النص
  clear                 - مسح الشاشة
  date                  - عرض التاريخ والوقت الحاليين
  whoami                - عرض اسم المستخدم الحالي
  uname                 - عرض معلومات النظام
  cat [file]            - عرض محتويات الملف
  mkdir [dir]           - إنشاء دليل جديد
  touch [file]          - إنشاء ملف جديد
  rm [options] [file]   - حذف ملف أو دليل
  python [options]      - تشغيل بيئة Python
  node [options]        - تشغيل بيئة Node.js
  ai [prompt]           - استخدام الذكاء الاصطناعي للإجابة على سؤال
  exit                  - الخروج من Terminal
`
        break
      case "ls":
        if (currentDirectory === "/home/user") {
          newHistoryItem.output = `
documents/
downloads/
desktop/
models/
projects/
.config/
.bashrc
.profile
README.md
`
        } else if (currentDirectory === "/home/user/documents") {
          newHistoryItem.output = `
report.pdf
notes.txt
presentation.pptx
data.csv
`
        } else if (currentDirectory === "/home/user/models") {
          newHistoryItem.output = `
tinyllama/
llama2-7b/
mistral-7b/
phi-2/
custom-model-1/
`
        } else {
          newHistoryItem.output = "الدليل فارغ"
        }
        break
      case "cd":
        if (commandParts.length === 1 || commandParts[1] === "~") {
          setCurrentDirectory("/home/user")
          newHistoryItem.output = ""
        } else if (commandParts[1] === "..") {
          if (currentDirectory !== "/") {
            const newDir = currentDirectory.split("/").slice(0, -1).join("/") || "/"
            setCurrentDirectory(newDir)
            newHistoryItem.output = ""
          } else {
            newHistoryItem.output = "أنت بالفعل في الدليل الجذر"
          }
        } else if (commandParts[1] === "documents") {
          setCurrentDirectory("/home/user/documents")
          newHistoryItem.output = ""
        } else if (commandParts[1] === "downloads") {
          setCurrentDirectory("/home/user/downloads")
          newHistoryItem.output = ""
        } else if (commandParts[1] === "desktop") {
          setCurrentDirectory("/home/user/desktop")
          newHistoryItem.output = ""
        } else if (commandParts[1] === "models") {
          setCurrentDirectory("/home/user/models")
          newHistoryItem.output = ""
        } else {
          newHistoryItem.output = `bash: cd: ${commandParts[1]}: لا يوجد مثل هذا الملف أو الدليل`
          newHistoryItem.isError = true
        }
        break
      case "pwd":
        newHistoryItem.output = currentDirectory
        break
      case "echo":
        newHistoryItem.output = commandParts.slice(1).join(" ")
        break
      case "clear":
        setHistory([])
        setInput("")
        return
      case "date":
        newHistoryItem.output = new Date().toString()
        break
      case "whoami":
        newHistoryItem.output = "user"
        break
      case "uname":
        newHistoryItem.output = "CyberAI OS v1.0.0"
        break
      case "cat":
        if (commandParts.length === 1) {
          newHistoryItem.output = "الاستخدام: cat [file]"
          newHistoryItem.isError = true
        } else if (commandParts[1] === "README.md" && currentDirectory === "/home/user") {
          newHistoryItem.output = `
# CyberAI OS

مرحباً بك في CyberAI OS، منصة الذكاء الاصطناعي المفتوحة المصدر التي تمنحك القوة والخصوصية والتحكم الكامل.

## المميزات

- تشغيل النماذج محلياً على جهازك
- دعم لمجموعة واسعة من نماذج الذكاء الاصطناعي
- واجهة برمجة تطبيقات قوية
- تخصيص كامل

## البدء

راجع دليل الإعداد للبدء في استخدام CyberAI OS.

## المساهمة

نرحب بمساهماتك! راجع دليل المساهمة للمزيد من المعلومات.

## الترخيص

هذا المشروع مرخص بموجب رخصة MIT.
`
        } else if (commandParts[1] === "notes.txt" && currentDirectory === "/home/user/documents") {
          newHistoryItem.output = `
ملاحظات اجتماع المشروع:
- مناقشة متطلبات المشروع
- تحديد المهام والمسؤوليات
- وضع جدول زمني للتنفيذ
- تحديد موعد الاجتماع القادم
`
        } else {
          newHistoryItem.output = `cat: ${commandParts[1]}: لا يوجد مثل هذا الملف`
          newHistoryItem.isError = true
        }
        break
      case "mkdir":
        if (commandParts.length === 1) {
          newHistoryItem.output = "الاستخدام: mkdir [dir]"
          newHistoryItem.isError = true
        } else {
          newHistoryItem.output = `تم إنشاء الدليل '${commandParts[1]}'`
        }
        break
      case "touch":
        if (commandParts.length === 1) {
          newHistoryItem.output = "الاستخدام: touch [file]"
          newHistoryItem.isError = true
        } else {
          newHistoryItem.output = `تم إنشاء الملف '${commandParts[1]}'`
        }
        break
      case "rm":
        if (commandParts.length === 1) {
          newHistoryItem.output = "الاستخدام: rm [options] [file]"
          newHistoryItem.isError = true
        } else {
          newHistoryItem.output = `تم حذف '${commandParts[commandParts.length - 1]}'`
        }
        break
      case "python":
        newHistoryItem.output = `Python 3.9.0 (default, Oct 5 2020, 17:52:02) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> `
        break
      case "node":
        newHistoryItem.output = `Welcome to Node.js v16.13.0.
Type ".help" for more information.
> `
        break
      case "ai":
        if (commandParts.length === 1) {
          newHistoryItem.output = "الاستخدام: ai [prompt]"
          newHistoryItem.isError = true
        } else {
          const prompt = commandParts.slice(1).join(" ")
          newHistoryItem.output = `جاري معالجة السؤال: "${prompt}"...

${getAIResponse(prompt)}`
        }
        break
      case "exit":
        newHistoryItem.output = "الخروج من Terminal..."
        break
      default:
        newHistoryItem.output = `bash: ${mainCommand}: الأمر غير موجود`
        newHistoryItem.isError = true
    }

    setHistory((prev) => [...prev, newHistoryItem])
    setInput("")
  }

  // محاكاة استجابة الذكاء الاصطناعي
  const getAIResponse = (prompt: string): string => {
    if (prompt.includes("ما هو") || prompt.includes("what is")) {
      return "الذكاء الاصطناعي هو فرع من علوم الحاسوب يهتم بتطوير أنظمة قادرة على أداء مهام تتطلب عادةً ذكاءً بشرياً، مثل الإدراك البصري والتعرف على الكلام واتخاذ القرارات وترجمة اللغات."
    } else if (prompt.includes("كيف") || prompt.includes("how")) {
      return "لتثبيت نموذج محلي، انتقل إلى صفحة النماذج واختر النموذج المناسب ثم اتبع تعليمات التثبيت. تأكد من توفر المساحة الكافية على جهازك ومن تلبية متطلبات النظام."
    } else if (prompt.includes("متى") || prompt.includes("when")) {
      return "تم إطلاق الإصدار الأول من CyberAI OS في عام 2023، وهو يخضع للتطوير المستمر مع إضافة ميزات وتحسينات جديدة بانتظام."
    } else {
      return "أنا مساعد ذكاء اصطناعي مدمج في CyberAI OS. يمكنني مساعدتك في الإجابة على الأسئلة وتنفيذ المهام المختلفة. كيف يمكنني مساعدتك اليوم؟"
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const copyToClipboard = () => {
    const terminalText = history
      .map((item) => {
        return `${item.command ? `$ ${item.command}` : ""}\n${item.output}`
      })
      .join("\n\n")

    navigator.clipboard.writeText(terminalText).then(
      () => {
        alert("تم نسخ محتوى Terminal إلى الحافظة")
      },
      (err) => {
        console.error("فشل في نسخ النص: ", err)
      },
    )
  }

  const downloadTerminalOutput = () => {
    const terminalText = history
      .map((item) => {
        return `${item.command ? `$ ${item.command}` : ""}\n${item.output}`
      })
      .join("\n\n")

    const blob = new Blob([terminalText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "terminal-output.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`terminal-page py-8 px-4 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-0" : ""}`}>
      <div className={`container mx-auto ${isFullscreen ? "h-full max-w-none p-4" : "max-w-4xl"}`}>
        <div className="page-header mb-8 text-center">
          {!isFullscreen && (
            <>
              <div className="flex justify-center mb-4">
                <img
                  src={`${ENV.BASE_URL}assets/logo-wolf-cosmic.png`}
                  alt="CyberAI OS Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold mb-4">واجهة Terminal</h1>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                استخدم واجهة Terminal للتفاعل مع النظام وتنفيذ الأوامر المختلفة
              </p>
            </>
          )}
        </div>

        <div
          className={`terminal-container bg-background-darker rounded-lg overflow-hidden border border-background-lighter ${
            isFullscreen ? "h-full" : ""
          }`}
        >
          <div className="terminal-header bg-background-light p-2 flex items-center justify-between border-b border-background-lighter">
            <div className="terminal-title flex items-center gap-2">
              <TerminalIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Terminal - {currentDirectory}</span>
            </div>
            <div className="terminal-actions flex gap-2">
              <button
                className="terminal-action p-1 text-muted hover:text-foreground transition-colors"
                onClick={copyToClipboard}
                title="نسخ المحتوى"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                className="terminal-action p-1 text-muted hover:text-foreground transition-colors"
                onClick={downloadTerminalOutput}
                title="تنزيل المحتوى"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="terminal-action p-1 text-muted hover:text-foreground transition-colors"
                onClick={toggleFullscreen}
                title={isFullscreen ? "إنهاء وضع ملء الشاشة" : "وضع ملء الشاشة"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              {isFullscreen && (
                <button
                  className="terminal-action p-1 text-muted hover:text-foreground transition-colors"
                  onClick={() => setIsFullscreen(false)}
                  title="إغلاق"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div
            className={`terminal-output p-4 font-mono text-sm overflow-y-auto bg-background-darker ${
              isFullscreen ? "h-[calc(100%-80px)]" : "h-[400px]"
            }`}
            ref={terminalRef}
          >
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="terminal-command">
                    <span className="text-accent">user@cyberai-os</span>:
                    <span className="text-primary">{currentDirectory}</span>$ {item.command}
                  </div>
                )}
                <div className={`terminal-response whitespace-pre-wrap ${item.isError ? "text-primary" : ""}`}>
                  {item.output}
                </div>
              </div>
            ))}
            <div className="terminal-input-line flex">
              <span className="terminal-prompt">
                <span className="text-accent">user@cyberai-os</span>:
                <span className="text-primary">{currentDirectory}</span>$&nbsp;
              </span>
              <input
                type="text"
                className="terminal-input flex-1 bg-transparent border-none outline-none text-foreground font-mono"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                autoFocus
              />
            </div>
          </div>
        </div>

        {!isFullscreen && (
          <div className="terminal-help mt-8">
            <h3 className="font-bold mb-4">الأوامر الشائعة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="command-card bg-background-light p-4 rounded-lg">
                <h4 className="font-bold mb-2">التنقل في الملفات</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code className="bg-background-darker px-1 rounded">ls</code> - عرض محتويات الدليل
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">cd [path]</code> - تغيير الدليل الحالي
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">pwd</code> - عرض مسار الدليل الحالي
                  </li>
                </ul>
              </div>
              <div className="command-card bg-background-light p-4 rounded-lg">
                <h4 className="font-bold mb-2">إدارة الملفات</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code className="bg-background-darker px-1 rounded">mkdir [dir]</code> - إنشاء دليل جديد
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">touch [file]</code> - إنشاء ملف جديد
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">rm [file]</code> - حذف ملف
                  </li>
                </ul>
              </div>
              <div className="command-card bg-background-light p-4 rounded-lg">
                <h4 className="font-bold mb-2">أدوات النظام</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code className="bg-background-darker px-1 rounded">date</code> - عرض التاريخ والوقت
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">whoami</code> - عرض اسم المستخدم
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">uname</code> - عرض معلومات النظام
                  </li>
                </ul>
              </div>
              <div className="command-card bg-background-light p-4 rounded-lg">
                <h4 className="font-bold mb-2">أدوات الذكاء الاصطناعي</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code className="bg-background-darker px-1 rounded">ai [prompt]</code> - استخدام الذكاء الاصطناعي
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">python</code> - تشغيل بيئة Python
                  </li>
                  <li>
                    <code className="bg-background-darker px-1 rounded">node</code> - تشغيل بيئة Node.js
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TerminalPage
