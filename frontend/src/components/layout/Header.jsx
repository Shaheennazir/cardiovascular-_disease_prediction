import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = ({ isLoggedIn, onLogin, onRegister, onLogout, onGetStarted, isTransparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerClasses = isTransparent
    ? "bg-transparent absolute top-0 left-0 right-0 z-50 border-b-2 border-solid border-[#4a4a4a]"
    : "border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50";
  
  const textColor = isTransparent ? "text-white" : "text-foreground";
  const hoverColor = isTransparent ? "hover:text-[#f20d80]" : "hover:text-primary";

  return (
    <header className={`${headerClasses} px-4 md:px-10 lg:px-20 xl:px-40`}>
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CardioPredict</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200 font-bold`}>Features</a>
            <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200 font-bold`}>How It Works</a>
            <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200 font-bold`}>Value Proposition</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 bg-[#f20d80] text-white text-base font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={onGetStarted}
                  className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 bg-[#f20d80] text-white text-base font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-md ${textColor} hover:bg-accent hover:text-accent-foreground transition-colors duration-200`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#4a4a4a] animate-fade-in-down bg-[#1a1a1a]">
            <div className="flex flex-col space-y-4">
              <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200`}>Features</a>
              <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200`}>How It Works</a>
              <a href="#" className={`${textColor} ${hoverColor} transition-colors duration-200`}>Value Proposition</a>
              
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <button
                    onClick={onGetStarted || onRegister}
                    className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  );
};

export default Header;