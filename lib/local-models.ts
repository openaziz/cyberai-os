// التعامل مع النماذج المحلية
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

// التحقق من وجود النموذج المحلي
export function checkLocalModelExists(modelPath: string): boolean {
  try {
    return fs.existsSync(modelPath)
  } catch (error) {
    console.error("خطأ في التحقق من وجود النموذج المحلي:", error)
    return false
  }
}

// تشغيل النموذج المحلي كعملية منفصلة
export function startLocalModel(modelPath: string, port = 8080): Promise<{ process: any; url: string }> {
  return new Promise((resolve, reject) => {
    try {
      // التحقق من وجود النموذج
      if (!checkLocalModelExists(modelPath)) {
        reject(new Error(`النموذج غير موجود في المسار: ${modelPath}`))
        return
      }

      // تحديد نوع النموذج (GGUF أو نموذج Hugging Face)
      const isGGUF = modelPath.endsWith(".gguf")

      let modelProcess

      if (isGGUF) {
        // تشغيل النموذج باستخدام llama.cpp
        const llamaCppPath = path.join(process.env.LOCAL_MODELS_PATH || "", "../llama.cpp")
        modelProcess = spawn(`${llamaCppPath}/server`, [
          "--model",
          modelPath,
          "--port",
          port.toString(),
          "--ctx-size",
          "2048",
          "--threads",
          "4",
        ])
      } else {
        // تشغيل النموذج باستخدام text-generation-server
        modelProcess = spawn("python3", [
          "-m",
          "text_generation_server.cli",
          "--model-id",
          modelPath,
          "--port",
          port.toString(),
        ])
      }

      // معالجة الخرج
      modelProcess.stdout.on("data", (data) => {
        console.log(`خرج النموذج المحلي: ${data}`)
        // إذا بدأ الخادم بنجاح
        if (data.toString().includes("Server started")) {
          resolve({
            process: modelProcess,
            url: `http://localhost:${port}/v1`,
          })
        }
      })

      // معالجة الأخطاء
      modelProcess.stderr.on("data", (data) => {
        console.error(`خطأ في النموذج المحلي: ${data}`)
      })

      // معالجة إنهاء العملية
      modelProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`فشل تشغيل النموذج المحلي مع رمز الخروج ${code}`))
        }
      })

      // تعيين مهلة للتحقق من بدء الخادم
      setTimeout(() => {
        resolve({
          process: modelProcess,
          url: `http://localhost:${port}/v1`,
        })
      }, 10000)
    } catch (error) {
      reject(error)
    }
  })
}

// إيقاف النموذج المحلي
export function stopLocalModel(modelProcess: any): Promise<void> {
  return new Promise((resolve) => {
    if (modelProcess && !modelProcess.killed) {
      modelProcess.kill()
      modelProcess.on("close", () => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}

// إرسال طلب إلى النموذج المحلي
export async function queryLocalModel(url: string, messages: any[]): Promise<any> {
  try {
    const response = await fetch(`${url}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`خطأ في الاستجابة: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("خطأ في الاستعلام من النموذج المحلي:", error)
    throw error
  }
}
