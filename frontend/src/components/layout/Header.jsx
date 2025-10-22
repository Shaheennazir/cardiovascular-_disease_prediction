import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { TactileButton } from '../ui/tactile-button';

const Header = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-zen-blue/20 dark:border-zen-blue/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="size-8 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold text-zen-dark-blue dark:text-zen-light-blue">HeartPredict SaaS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">Home</a>
            <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">Features</a>
            <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">How It Works</a>
            <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">About</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <TactileButton variant="primary" onClick={onLogout}>
                Logout
              </TactileButton>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-lg text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20"
                >
                  Login
                </button>
                <TactileButton variant="primary" onClick={onRegister}>
                  Register
                </TactileButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-zen-dark-blue dark:text-zen-light-blue hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zen-blue/20 dark:border-zen-blue/10 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">Home</a>
              <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">Features</a>
              <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">How It Works</a>
              <a href="#" className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20">About</a>
              
              {isLoggedIn ? (
                <TactileButton variant="primary" onClick={onLogout} className="w-full">
                  Logout
                </TactileButton>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <button
                    onClick={onLogin}
                    className="w-full px-4 py-2 rounded-lg text-zen-dark-blue/80 dark:text-zen-light-blue/80 hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20 transition-colors duration-200"
                  >
                    Login
                  </button>
                  <TactileButton variant="primary" onClick={onRegister} className="w-full">
                    Register
                  </TactileButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;