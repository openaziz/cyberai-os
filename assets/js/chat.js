// CyberAI OS - Chat Interface

class ChatInterface {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'https://openaziz.github.io/cyberai-os/api/chat';
    this.modelId = options.modelId || 'deepseek-r1-70b-online'; // استخدام نموذج بدون مفتاح API كافتراضي
    this.container = options.container || document.querySelector('.chat-container');
    this.messagesContainer = this.container?.querySelector('.chat-messages');
    this.inputField = this.container?.querySelector('.chat-input input');
    this.sendButton = this.container?.querySelector('.chat-input button');
    this.history = [];
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    // إضافة مستمعي الأحداث
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // إضافة رسالة ترحيب
    this.addMessage({
      role: 'assistant',
      content: 'مرحبًا بك في CyberAI OS! كيف يمكنني مساعدتك اليوم؟'
    });
  }
  
  async sendMessage() {
    const message = this.inputField.value.trim();
    if (!message) return;
    
    // إضافة رسالة المستخدم إلى واجهة الدردشة
    this.addMessage({
      role: 'user',
      content: message
    });
    
    // مسح حقل الإدخال
    this.inputField.value = '';
    
    // إضافة مؤشر التحميل
    const loadingIndicator = this.addLoadingIndicator();
    
    try {
      // محاكاة إرسال الرسالة إلى API (في الإصدار الحقيقي، سيتم استبدال هذا بطلب API حقيقي)
      setTimeout(() => {
        // إزالة مؤشر التحميل
        this.removeLoadingIndicator(loadingIndicator);
        
        // محاكاة رد من النموذج
        let response = '';
        
        if (message.includes('مرحبا') || message.includes('أهلا')) {
          response = 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟';
        } else if (message.includes('ما هو') || message.includes('ما هي')) {
          response = 'هذا سؤال مثير للاهتمام. بناءً على فهمي، يمكنني القول أن...';
        } else if (message.includes('كيف')) {
          response = 'هناك عدة طرق للقيام بذلك. أولاً، يمكنك...';
        } else {
          response = 'شكراً لمشاركتك هذه المعلومات. هل هناك أي شيء محدد تود معرفته أو مساعدة فيه؟';
        }
        
        // إضافة رد المساعد إلى واجهة الدردشة
        this.addMessage({
          role: 'assistant',
          content: response
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // إزالة مؤشر التحميل
      this.removeLoadingIndicator(loadingIndicator);
      
      // إضافة رسالة خطأ
      this.addMessage({
        role: 'assistant',
        content: 'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
      });
    }
  }
  
  addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.role === 'user' ? 'user' : 'bot');
    messageElement.textContent = message.content;
    this.messagesContainer.appendChild(messageElement);
    
    // التمرير إلى أسفل لعرض الرسالة الجديدة
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    
    // إضافة الرسالة إلى التاريخ
    this.history.push(message);
  }
  
  addLoadingIndicator() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('message', 'bot', 'loading');
    loadingElement.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    this.messagesContainer.appendChild(loadingElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return loadingElement;
  }
  
  removeLoadingIndicator(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
  setModel(modelId) {
    this.modelId = modelId;
    console.log(`تم تغيير النموذج إلى: ${modelId}`);
  }
  
  clearChat() {
    this.history = [];
    this.messagesContainer.innerHTML = '';
    this.addMessage({
      role: 'assistant',
      content: 'تم مسح المحادثة. كيف يمكنني مساعدتك؟'
    });
  }
}

// تهيئة واجهة الدردشة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const chatInterface = new ChatInterface();
  
  // إضافة إلى window للوصول من وحدات JavaScript أخرى
  window.chatInterface = chatInterface;
  
  // تغيير النموذج عند تغيير القائمة المنسدلة
  const modelSelector = document.getElementById('model-selector');
  if (modelSelector) {
    modelSelector.addEventListener('change', () => {
      if (window.chatInterface) {
        window.chatInterface.setModel(modelSelector.value);
      }
    });
  }
  
  // مسح المحادثة عند النقر على زر المسح
  const clearChatButton = document.getElementById('clear-chat');
  if (clearChatButton) {
    clearChatButton.addEventListener('click', () => {
      if (window.chatInterface) {
        window.chatInterface.clearChat();
      }
    });
  }
});
