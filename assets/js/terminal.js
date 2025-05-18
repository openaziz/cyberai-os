// CyberAI OS - Terminal Interface

document.addEventListener('DOMContentLoaded', () => {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input-field');
  const terminalSend = document.getElementById('terminal-send');
  const clearTerminalButton = document.getElementById('clear-terminal');
  
  let currentModel = 'deepseek-r1-70b-online'; // النموذج الافتراضي
  
  // قائمة النماذج المتاحة
  const availableModels = [
    { id: 'deepseek-r1-70b-online', name: 'DeepSeek R1 70B', provider: 'search1api', apiKey: false },
    { id: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free', name: 'DeepSeek R1 Distill', provider: 'together', apiKey: false },
    { id: 'llama3-70b-8192', name: 'Llama 3 70B', provider: 'groq', apiKey: true },
    { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'openrouter', apiKey: true }
  ];
  
  // إضافة مستمعي الأحداث
  terminalSend.addEventListener('click', processCommand);
  terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      processCommand();
    }
  });
  
  clearTerminalButton.addEventListener('click', () => {
    clearTerminal();
  });
  
  // معالجة الأوامر
  function processCommand() {
    const command = terminalInput.value.trim();
    if (!command) return;
    
    // إضافة الأمر إلى الطرفية
    addToTerminal('command', '> ' + command);
    
    // مسح حقل الإدخال
    terminalInput.value = '';
    
    // معالجة الأمر
    if (command === 'help') {
      showHelp();
    } else if (command === 'models') {
      showModels();
    } else if (command.startsWith('use ')) {
      const modelId = command.substring(4).trim();
      useModel(modelId);
    } else if (command.startsWith('ask ')) {
      const prompt = command.substring(4).trim();
      askModel(prompt);
    } else if (command === 'clear') {
      clearTerminal();
    } else {
      addToTerminal('response', 'أمر غير معروف. اكتب "help" لعرض قائمة الأوامر المتاحة.');
    }
  }
  
  // إضافة نص إلى الطرفية
  function addToTerminal(type, text) {
    const element = document.createElement('div');
    element.classList.add(type);
    element.textContent = text;
    terminalOutput.appendChild(element);
    
    // التمرير إلى أسفل
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  
  // عرض قائمة الأوامر المتاحة
  function showHelp() {
    const helpText = `
الأوامر المتاحة:

help - عرض قائمة الأوامر المتاحة
models - عرض قائمة النماذج المتاحة
use [model_id] - استخدام نموذج محدد
ask [prompt] - طرح سؤال على النموذج الحالي
clear - مسح الطرفية
    `;
    
    addToTerminal('response', helpText);
  }
  
  // عرض قائمة النماذج المتاحة
  function showModels() {
    let modelsText = 'النماذج المتاحة:\n\n';
    
    availableModels.forEach(model => {
      const currentIndicator = model.id === currentModel ? ' (النموذج الحالي)' : '';
      const apiKeyStatus = model.apiKey ? 'يتطلب مفتاح API' : 'لا يتطلب مفتاح API';
      modelsText += `${model.id} - ${model.name} (${model.provider}) - ${apiKeyStatus}${currentIndicator}\n`;
    });
    
    addToTerminal('response', modelsText);
  }
  
  // استخدام نموذج محدد
  function useModel(modelId) {
    const model = availableModels.find(m => m.id === modelId);
    
    if (model) {
      currentModel = modelId;
      addToTerminal('response', `تم تغيير النموذج إلى: ${model.name} (${model.provider})`);
    } else {
      addToTerminal('response', `النموذج "${modelId}" غير موجود. استخدم الأمر "models" لعرض قائمة النماذج المتاحة.`);
    }
  }
  
  // طرح سؤال على النموذج الحالي
  function askModel(prompt) {
    if (!prompt) {
      addToTerminal('response', 'يرجى تقديم سؤال أو طلب.');
      return;
    }
    
    const model = availableModels.find(m => m.id === currentModel);
    
    if (!model) {
      addToTerminal('response', 'لم يتم تحديد نموذج. استخدم الأمر "use [model_id]" لتحديد نموذج.');
      return;
    }
    
    addToTerminal('response', `جاري معالجة طلبك باستخدام ${model.name}...`);
    
    // محاكاة استجابة من النموذج (في الإصدار الحقيقي، سيتم استبدال هذا بطلب API حقيقي)
    setTimeout(() => {
      let response = '';
      
      if (prompt.includes('مرحبا') || prompt.includes('أهلا')) {
        response = 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟';
      } else if (prompt.includes('ما هو') || prompt.includes('ما هي')) {
        response = 'هذا سؤال مثير للاهتمام. بناءً على فهمي، يمكنني القول أن...';
      } else if (prompt.includes('كيف')) {
        response = 'هناك عدة طرق للقيام بذلك. أولاً، يمكنك...';
      } else {
        response = 'شكراً لمشاركتك هذه المعلومات. هل هناك أي شيء محدد تود معرفته أو مساعدة فيه؟';
      }
      
      addToTerminal('response', response);
    }, 1000);
  }
  
  // مسح الطرفية
  function clearTerminal() {
    terminalOutput.innerHTML = '';
    addToTerminal('response', 'مرحبًا بك في طرفية CyberAI OS! اكتب "help" لعرض قائمة الأوامر المتاحة.');
  }
});
