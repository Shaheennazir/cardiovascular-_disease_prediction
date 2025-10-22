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
        {/* The new LandingPage has its own dark background and header */}
        <div>
          <Header
            isLoggedIn={false}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
            onGetStarted={handleGetStarted}
            isTransparent={true}
          />
          <LandingPage onGetStarted={handleGetStarted} />
        </div>
      </ToastProvider>
    );
  }

  if (!isLoggedIn && showLogin) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-[#1a1a1a]">
          <Header
            isLoggedIn={false}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
          />
          <main className="container py-8">
            <div className="mx-auto max-w-md">
              <div className="rounded-[3rem] bg-[#2a2a2a] p-8">
                <h2 className="text-white text-3xl font-extrabold mb-8 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
                
                {error && (
                  <div className="bg-[#f20d80]/10 border-2 border-solid border-[#f20d80] rounded-[3rem] p-4 mb-6">
                    <p className="text-[#f20d80] text-base font-normal">{error}</p>
                  </div>
                )}
                
                {isRegistering ? (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-4">
                      <label htmlFor="username" className="text-white text-base font-bold">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label htmlFor="email" className="text-white text-base font-bold">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label htmlFor="password" className="text-white text-base font-bold">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-full"
                    >
                      <span className="truncate">Register</span>
                    </button>
                    
                    <p className="text-center text-[#6a6a6a] text-base font-normal">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="text-[#f20d80] underline-offset-4 hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                      <label htmlFor="login-username" className="text-white text-base font-bold">Username</label>
                      <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label htmlFor="login-password" className="text-white text-base font-bold">Password</label>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-full"
                    >
                      <span className="truncate">Login</span>
                    </button>
                    
                    <p className="text-center text-[#6a6a6a] text-base font-normal">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className="text-[#f20d80] underline-offset-4 hover:underline"
                      >
                        Register
                      </button>
                    </p>
                  </form>
                )}
                
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-[#6a6a6a] text-base font-normal hover:text-[#f20d80] hover:underline"
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
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 text-base font-extrabold leading-normal tracking-[0.015em] transition-colors w-fit ${
              activeView === 'dashboard'
                ? 'bg-[#f20d80] text-white'
                : 'bg-[#2a2a2a] text-[#6a6a6a] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a]'
            }`}
          >
            <span className="truncate">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('tabular')}
            className={`flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 text-base font-extrabold leading-normal tracking-[0.015em] transition-colors w-fit ${
              activeView === 'tabular'
                ? 'bg-[#f20d80] text-white'
                : 'bg-[#2a2a2a] text-[#6a6a6a] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a]'
            }`}
          >
            <span className="truncate">Tabular Prediction</span>
          </button>
          <button
            onClick={() => setActiveView('ecg')}
            className={`flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 text-base font-extrabold leading-normal tracking-[0.015em] transition-colors w-fit ${
              activeView === 'ecg'
                ? 'bg-[#f20d80] text-white'
                : 'bg-[#2a2a2a] text-[#6a6a6a] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a]'
            }`}
          >
            <span className="truncate">ECG Analysis</span>
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-12 px-6 text-base font-extrabold leading-normal tracking-[0.015em] transition-colors w-fit ${
              activeView === 'history'
                ? 'bg-[#f20d80] text-white'
                : 'bg-[#2a2a2a] text-[#6a6a6a] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a]'
            }`}
          >
            <span className="truncate">Prediction History</span>
          </button>
        </div>
        
        {renderAuthenticatedView()}
      </DashboardLayout>
    </ToastProvider>
  );
}

export default App;
