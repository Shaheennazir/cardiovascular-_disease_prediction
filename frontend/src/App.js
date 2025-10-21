import React, { useState, useEffect } from 'react';
import './App.css';
import TabularModel from './TabularModel';
import EcgModel from './EcgModel';
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

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cardiovascular Disease Prediction</h1>
        </header>
        <main>
          <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            
            {error && <div className="error-message"><p>{error}</p></div>}
            
            {isRegistering ? (
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Register</button>
                <p>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsRegistering(false)}>
                    Login
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Login</button>
                <p>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsRegistering(true)}>
                    Register
                  </button>
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cardiovascular Disease Prediction</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <TabularModel />
        <EcgModel />
      </main>
    </div>
  );
}

export default App;

