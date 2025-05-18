import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ModelsPage from './pages/ModelsPage';
import SetupPage from './pages/SetupPage';
import ModelTrainingPage from './pages/ModelTrainingPage';
import TerminalPage from './pages/TerminalPage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // تطبيق الوضع المظلم/الفاتح على الصفحة
    document.documentElement.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/training" element={<ModelTrainingPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
          </Routes>
        </main>
        
        <footer className="footer bg-background-darker text-center p-6 border-t border-background-lighter">
          <div className="container mx-auto">
            <p className="mb-2">معلومات عن مشروع CyberAI OS والمطور عبدالعزيز.</p>
            <p className="mb-2">تابعنا على سناب: <a href="https://www.snapchat.com/add/bx90_9?share_id=TrrHZq1-nMo&locale=ar-EG" target="_blank" className="text-primary hover:underline">@bx90_9</a></p>
            <p>راسلنا على: <a href="mailto:sa55aau6@gmail.com" className="text-primary hover:underline">sa55aau6@gmail.com</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
