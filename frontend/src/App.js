import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastProvider } from './components/ui/ToastProvider';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

  if (!isLoggedIn && showLogin) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-[#1a1a1a]">
          <Header
            isLoggedIn={false}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
            onLogout={handleLogout}
            onGetStarted={handleGetStarted}
            isTransparent={false}
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
              </div>
            </div>
          </main>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Router>
        <AppRoutes 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
          handleShowLogin={handleShowLogin}
          handleShowRegister={handleShowRegister}
          handleGetStarted={handleGetStarted}
        />
      </Router>
    </ToastProvider>
  );
}

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, handleLogout, handleShowLogin, handleShowRegister, handleGetStarted }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={
          <>
            <Header
              isLoggedIn={false}
              onLogin={handleShowLogin}
              onRegister={handleShowRegister}
              onLogout={handleLogout}
              onGetStarted={handleGetStarted}
              isTransparent={true}
            />
            <LandingPage onGetStarted={handleGetStarted} />
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header
            isLoggedIn={true}
            onLogin={handleShowLogin}
            onRegister={handleShowRegister}
            onLogout={handleLogoutClick}
            onGetStarted={handleGetStarted}
            isTransparent={false}
          />
          <LandingPage onGetStarted={handleGetStarted} />
        </>
      } />
      <Route path="/dashboard/*" element={
        <DashboardLayout onLogout={handleLogoutClick}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="tabular" element={<TabularModelEnhanced />} />
            <Route path="ecg" element={<EcgModelEnhanced />} />
            <Route path="history" element={<PredictionHistory />} />
          </Routes>
        </DashboardLayout>
      } />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
