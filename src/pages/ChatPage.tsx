import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modelDropdownActive, setModelDropdownActive] = useState(false);
  const [activeModel, setActiveModel] = useState('DeepSeek-R1-70B');
  const [conversations, setConversations] = useState([
    { id: 'new', title: 'محادثة جديدة', active: true },
    { id: 'conv1', title: 'شرح مفهوم الذكاء الاصطناعي', active: false },
    { id: 'conv2', title: 'كيفية تثبيت نموذج TinyLlama', active: false },
    { id: 'conv3', title: 'مقارنة بين نماذج الذكاء الاصطناعي', active: false }
  ]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const models = [
    { id: 'deepseek', name: 'DeepSeek-R1-70B', desc: 'نموذج متقدم للمهام المعقدة', icon: 'deepseek', color: '#2196f3' },
    { id: 'together', name: 'DeepSeek-R1-Distill-Llama', desc: 'نموذج مقطر للأداء المتوازن', icon: 'together', color: '#4caf50' },
    { id: 'openrouter', name: 'GPT-4o (OpenRouter)', desc: 'نموذج متعدد الوسائط من OpenAI', icon: 'openrouter', color: '#ffc107' },
    { id: 'llama', name: 'Llama 2 (7B)', desc: 'نموذج محلي متوسط الحجم', icon: 'llama', color: '#9c27b0' },
    { id: 'tinyllama', name: 'TinyLlama (1.1B)', desc: 'نموذج محلي خفيف للأجهزة المحدودة', icon: 'tinyllama', color: '#ff9800' }
  ];
  
  const suggestions = [
    { title: 'شرح مفهوم', text: 'اشرح لي مفهوم الشبكات العصبية الالتفافية بطريقة مبسطة' },
    { title: 'كتابة كود', text: 'اكتب لي كود Python لتحليل المشاعر في النصوص العربية' },
    { title: 'حل مشكلة', text: 'كيف يمكنني تحسين أداء نموذج TinyLlama على جهازي؟' },
    { title: 'مقارنة', text: 'قارن بين نماذج DeepSeek وLlama من حيث الأداء والدقة' }
  ];
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const toggleModelDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModelDropdownActive(!modelDropdownActive);
  };
  
  const selectModel = (model: string) => {
    setActiveModel(model);
    setModelDropdownActive(false);
  };
  
  const selectConversation = (id: string) => {
    const updatedConversations = conversations.map(conv => ({
      ...conv,
      active: conv.id === id
    }));
    setConversations(updatedConversations);
  };
  
  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
  };
  
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    
    // Hide welcome screen
    setShowWelcome(false);
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        model: activeModel,
        content: `هذه استجابة توضيحية من النموذج ${activeModel}. في التطبيق الفعلي، سيتم استدعاء API النموذج المحدد واستخدام الاستجابة الحقيقية.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };
  
  // Close model dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setModelDropdownActive(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="chat-container flex h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className={`sidebar bg-background-darker border-l border-background-lighter flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-[60px]' : 'w-[280px]'}`}>
        <div className="sidebar-header p-4 border-b border-background-lighter flex items-center justify-between">
          <button className="new-chat-btn bg-primary text-white border-none rounded-md py-2 px-4 font-semibold flex items-center gap-2 w-full transition-colors duration-200 hover:bg-primary-dark">
            <i className="fas fa-plus"></i>
            {!sidebarCollapsed && <span>محادثة جديدة</span>}
          </button>
          <button className="sidebar-toggle bg-none border-none text-muted text-lg p-1 transition-colors duration-200 hover:text-foreground" onClick={toggleSidebar}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="conversations flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {conversations.map(conv => (
            <div 
              key={conv.id}
              className={`conversation-item p-2 px-4 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 text-muted ${conv.active ? 'bg-background-light text-foreground font-semibold' : 'hover:bg-background-light hover:text-foreground'}`}
              onClick={() => selectConversation(conv.id)}
            >
              <i className="fas fa-comments"></i>
              {!sidebarCollapsed && (
                <>
                  <div className="conversation-title flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {conv.title}
                  </div>
                  <div className="conversation-actions hidden gap-1 group-hover:flex">
                    <button className="icon-btn"><i className="fas fa-edit"></i></button>
                    <button className="icon-btn"><i className="fas fa-trash"></i></button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer p-4 border-t border-background-lighter flex items-center justify-between">
          <div className="model-selector-container relative">
            <button 
              className="model-selector-btn bg-none border-none text-muted flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              onClick={toggleModelDropdown}
            >
              <i className="fas fa-robot"></i>
              {!sidebarCollapsed && (
                <>
                  <span>{activeModel}</span>
                  <i className="fas fa-chevron-up"></i>
                </>
              )}
            </button>
            
            {modelDropdownActive && (
              <div className="model-dropdown absolute bottom-full right-0 bg-background-lighter rounded-md shadow-lg w-[280px] p-4 z-10 animate-fadeIn">
                <h4 className="mb-4 text-foreground">اختر النموذج</h4>
                <div className="model-options flex flex-col gap-2">
                  {models.map(model => (
                    <div 
                      key={model.id}
                      className={`model-option flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-background-light ${activeModel === model.name ? 'bg-background-light' : ''}`}
                      onClick={() => selectModel(model.name)}
                    >
                      <div 
                        className="model-option-icon w-6 h-6 rounded text-sm flex items-center justify-center text-white"
                        style={{ backgroundColor: model.color }}
                      >
                        {model.icon === 'deepseek' && 'DS'}
                        {model.icon === 'together' && 'TG'}
                        {model.icon === 'openrouter' && 'OR'}
                        {model.icon === 'llama' && 'LL'}
                        {model.icon === 'tinyllama' && 'TL'}
                      </div>
                      <div className="model-option-info flex-1">
                        <div className="model-option-name font-semibold text-sm">{model.name}</div>
                        <div className="model-option-desc text-xs text-muted">{model.desc}</div>
                      </div>
                      {activeModel === model.name && (
                        <i className="fas fa-check model-option-check text-primary"></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button className="icon-btn">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="chat-main flex-1 flex flex-col bg-background-dark">
        <div className="chat-header p-4 border-b border-background-lighter flex items-center justify-between">
          <div className="chat-title font-semibold">
            {conversations.find(conv => conv.active)?.title || 'محادثة جديدة'}
          </div>
          <div className="chat-header-actions flex gap-2">
            <button className="icon-btn mobile-sidebar-toggle md:hidden">
              <i className="fas fa-bars"></i>
            </button>
            <button className="icon-btn">
              <i className="fas fa-share"></i>
            </button>
            <button className="icon-btn">
              <i className="fas fa-download"></i>
            </button>
            <button className="icon-btn">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
        
        <div className="chat-body flex-1 p-4 overflow-y-auto flex flex-col gap-6">
          {showWelcome ? (
            <div className="chat-welcome text-center max-w-[600px] mx-auto py-16">
              <h2 className="text-4xl mb-4 text-primary font-bold">مرحباً بك في CyberAI OS</h2>
              <p className="text-muted mb-8">
                استخدم واجهة الدردشة للتفاعل مع نماذج الذكاء الاصطناعي المحلية والسحابية. اختر النموذج المناسب لاحتياجاتك من القائمة الجانبية.
              </p>
              
              <div className="suggestions grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="suggestion bg-background-lighter rounded-md p-4 cursor-pointer transition-all duration-200 hover:bg-background-light hover:transform hover:-translate-y-1"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <h4 className="mb-2 text-accent font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted">{suggestion.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(message => (
                <div key={message.id} className="message-group">
                  <div className="message-container flex gap-4">
                    <div className={`message-avatar w-9 h-9 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${message.sender === 'user' ? 'bg-accent' : 'bg-primary'}`}>
                      {message.sender === 'user' ? 'أ' : 'AI'}
                    </div>
                    <div className="message-content flex-1 p-4 rounded-md bg-background-lighter">
                      <div className="message-header flex items-center justify-between mb-2">
                        <div className="message-name font-semibold">
                          {message.sender === 'user' ? 'أنت' : message.model}
                        </div>
                        <div className="message-time text-xs text-muted">
                          {message.time}
                        </div>
                      </div>
                      <div className="message-text leading-relaxed">
                        <p>{message.content}</p>
                      </div>
                      
                      {message.sender === 'ai' && (
                        <div className="message-actions flex gap-2 mt-4">
                          <button className="message-action-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground hover:text-green-500">
                            <i className="far fa-thumbs-up"></i>
                            <span>إعجاب</span>
                          </button>
                          <button className="message-action-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground hover:text-primary">
                            <i className="far fa-thumbs-down"></i>
                            <span>عدم إعجاب</span>
                          </button>
                          <button className="message-action-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground">
                            <i className="far fa-copy"></i>
                            <span>نسخ</span>
                          </button>
                          <button className="message-action-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground">
                            <i className="fas fa-share"></i>
                            <span>مشاركة</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        <div className="chat-input-container p-4 border-t border-background-lighter">
          <div className="chat-input-wrapper relative max-w-[900px] mx-auto">
            <textarea 
              className="chat-input w-full min-h-[60px] max-h-[200px] py-4 pr-4 pl-12 rounded-md bg-background-lighter border border-transparent text-foreground resize-none overflow-y-auto transition-colors duration-200 focus:outline-none focus:border-primary"
              placeholder="اكتب رسالتك هنا... (اضغط Shift + Enter لإضافة سطر جديد)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            ></textarea>
            <button 
              className="chat-submit-btn absolute bottom-[10px] left-[10px] bg-primary text-white border-none rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-primary-dark hover:transform hover:scale-105"
              onClick={handleSubmit}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <div className="chat-input-tools flex items-center justify-between mt-2 px-2">
            <div className="chat-input-info text-xs text-muted">
              <span>{activeModel}</span> • <span>استخدام API</span>
            </div>
            <div className="chat-input-settings flex gap-2">
              <button className="settings-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground">
                <i className="fas fa-image"></i>
                <span>إرفاق صورة</span>
              </button>
              <button className="settings-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground">
                <i className="fas fa-microphone"></i>
                <span>تسجيل صوتي</span>
              </button>
              <button className="settings-btn bg-none border-none text-muted text-sm flex items-center gap-1 transition-colors duration-200 hover:text-foreground">
                <i className="fas fa-sliders-h"></i>
                <span>إعدادات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
