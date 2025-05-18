import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header bg-background-light border-b border-background-lighter py-4 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="logo-container flex items-center">
            <Link to="/" className="logo text-2xl font-bold text-primary">
              CyberAI OS
            </Link>
          </div>
          
          <nav className="main-nav hidden md:flex">
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="nav-link hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/chat" className="nav-link hover:text-primary transition-colors">
                  الدردشة
                </Link>
              </li>
              <li>
                <Link to="/models" className="nav-link hover:text-primary transition-colors">
                  النماذج
                </Link>
              </li>
              <li>
                <Link to="/training" className="nav-link hover:text-primary transition-colors">
                  التدريب
                </Link>
              </li>
              <li>
                <Link to="/terminal" className="nav-link hover:text-primary transition-colors">
                  Terminal
                </Link>
              </li>
              <li>
                <Link to="/setup" className="nav-link hover:text-primary transition-colors">
                  الإعداد
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions flex items-center gap-4">
            <button 
              className="theme-toggle-btn bg-none border-none text-muted hover:text-foreground transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            
            <div className="user-menu relative">
              <button className="user-menu-btn bg-none border-none flex items-center gap-2">
                <div className="user-avatar w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <i className="fas fa-user"></i>
                </div>
              </button>
            </div>
            
            <button className="mobile-menu-btn md:hidden bg-none border-none text-muted hover:text-foreground transition-colors">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
