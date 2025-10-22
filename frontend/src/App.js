import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastProvider } from './components/ui/ToastProvider';
import Header from './components/layout/Header';
import LandingPage from './components/layout/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import TabularModelEnhanced from './components/predictions/TabularModelEnhanced';
import EcgModelEnhanced from './components/predictions/EcgModelEnhanced';
import PredictionHistory from './components/dashboard/PredictionHistory';
import apiService from './api';
import { Button } from './components/ui/button';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, tabular, ecg, history

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await apiService.login({ username, password });
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await apiService.register({ username, email, password });
      // After registration, switch to login mode
      setIsRegistering(false);
      setError('Registration successful! Please login.');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setEmail('');
    setActiveView('dashboard');
  };

  const handleShowLogin = () => {
    setIsRegistering(false);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setIsRegistering(true);
    setShowLogin(true);
  };

  const handleGetStarted = () => {
    setIsRegistering(false);
    setShowLogin(true);
  };

  const renderAuthenticatedView = () => {
    switch (activeView) {
      case 'tabular':
        return <TabularModelEnhanced />;
      case 'ecg':
        return <EcgModelEnhanced />;
      case 'history':
        return <PredictionHistory />;
      default:
        return <DashboardHome />;
    }
  };

  if (!isLoggedIn && !showLogin) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <Header
            isLoggedIn={false}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
          />
          <LandingPage onGetStarted={handleGetStarted} />
        </div>
      </ToastProvider>
    );
  }

  if (!isLoggedIn && showLogin) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <Header
            isLoggedIn={false}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
          />
          <main className="container py-8">
            <div className="mx-auto max-w-md">
              <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                <h2 className="heading-2 mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
                
                {error && (
                  <div className="bg-danger-50 border border-danger-200 rounded-md p-3 mb-4">
                    <p className="text-danger-800 body-small">{error}</p>
                  </div>
                )}
                
                {isRegistering ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="body-small font-medium">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="body-small font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="body-small font-medium">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      Register
                    </Button>
                    
                    <p className="text-center body-small">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="text-primary-500 underline-offset-4 hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="login-username" className="body-small font-medium">Username</label>
                      <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="login-password" className="body-small font-medium">Password</label>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      Login
                    </Button>
                    
                    <p className="text-center body-small">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className="text-primary-500 underline-offset-4 hover:underline"
                      >
                        Register
                      </button>
                    </p>
                  </form>
                )}
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowLogin(false)}
                    className="body-small text-primary-500 hover:underline"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <DashboardLayout onLogout={handleLogout}>
        <div className="mb-4 flex gap-2 flex-wrap">
          <Button
            onClick={() => setActiveView('dashboard')}
            variant={activeView === 'dashboard' ? 'primary' : 'outline'}
            size="sm"
          >
            Dashboard
          </Button>
          <Button
            onClick={() => setActiveView('tabular')}
            variant={activeView === 'tabular' ? 'primary' : 'outline'}
            size="sm"
          >
            Tabular Prediction
          </Button>
          <Button
            onClick={() => setActiveView('ecg')}
            variant={activeView === 'ecg' ? 'primary' : 'outline'}
            size="sm"
          >
            ECG Analysis
          </Button>
          <Button
            onClick={() => setActiveView('history')}
            variant={activeView === 'history' ? 'primary' : 'outline'}
            size="sm"
          >
            Prediction History
          </Button>
        </div>
        
        {renderAuthenticatedView()}
      </DashboardLayout>
    </ToastProvider>
  );
}

export default App;
