import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogin, onRegister, onLogout, onGetStarted, isTransparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const headerClasses = isTransparent
    ? "bg-transparent absolute top-0 left-0 right-0 z-50 border-b-2 border-solid border-[#4a4a4a]"
    : "border-b-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] sticky top-0 z-50";
  

  return (
    <header className={`${headerClasses} px-4 md:px-10 lg:px-20 xl:px-40`}>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-[#f20d80]" />
              <span className="text-white text-2xl font-extrabold leading-tight tracking-[-0.015em]">CardioPredict</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200 text-base font-bold">Features</Link>
            <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200 text-base font-bold">How It Works</Link>
            <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200 text-base font-bold">Value Proposition</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogoutClick}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
              >
                <span className="truncate">Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onGetStarted || (() => navigate('/'))}
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
                >
                  <span className="truncate">Get Started</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-[#2a2a2a] transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#4a4a4a] animate-fade-in-down bg-[#1a1a1a]">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Features</Link>
              <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
              <Link to="/" className="text-[#6a6a6a] hover:text-[#f20d80] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Value Proposition</Link>
              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogoutClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
                >
                  <span className="truncate">Logout</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <button
                    onClick={() => {
                      if (onGetStarted) onGetStarted();
                      else navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
                  >
                    <span className="truncate">Get Started</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
    </header>
  );
};

export default Header;