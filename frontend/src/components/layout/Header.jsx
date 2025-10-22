import React from 'react';
import { Button } from '../ui/button';

const Header = ({ isLoggedIn, onLogin, onRegister }) => {
  return (
    <header className="bg-surface border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-text-primary">CardioPredict</h1>
          </div>
          
          {!isLoggedIn && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={onLogin}>
                Login
              </Button>
              <Button onClick={onRegister}>
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;