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
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
                
                {error && (
                  <div className="bg-destructive/10 border border-destructive/50 rounded-md p-3 mb-4">
                    <p className="text-destructive text-sm">{error}</p>
                  </div>
                )}
                
                {isRegistering ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    >
                      Register
                    </button>
                    
                    <p className="text-center text-sm">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="login-username" className="text-sm font-medium">Username</label>
                      <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    >
                      Login
                    </button>
                    
                    <p className="text-center text-sm">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Register
                      </button>
                    </p>
                  </form>
                )}
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-sm text-primary hover:underline"
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
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'dashboard'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('tabular')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'tabular'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Tabular Prediction
          </button>
          <button
            onClick={() => setActiveView('ecg')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'ecg'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            ECG Analysis
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'history'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Prediction History
          </button>
        </div>
        
        {renderAuthenticatedView()}
      </DashboardLayout>
    </ToastProvider>
  );
}

export default App;
