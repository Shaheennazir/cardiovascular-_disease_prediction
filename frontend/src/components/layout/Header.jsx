import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CardioPredict</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Home</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Features</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">How It Works</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">About</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-md text-foreground hover:text-primary transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Home</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Features</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">How It Works</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">About</a>
              
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
                    onClick={onLogin}
                    className="w-full px-4 py-2 rounded-md text-foreground hover:bg-accent transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={onRegister}
                    className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                  >
                    Register
                  </button>
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