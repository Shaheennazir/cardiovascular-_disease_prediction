# Phase 1 Implementation: Foundation Setup

## Overview
This document details the specific steps and code changes required for Phase 1 of the frontend modernization: Foundation Setup. This phase focuses on installing and configuring Tailwind CSS and shadcn/ui components.

## Prerequisites
- Node.js 14+ installed
- Existing React project (already present)
- npm or yarn package manager

## Step-by-Step Implementation

### 1. Install Tailwind CSS Dependencies

First, we need to install Tailwind CSS and its dependencies:

```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind CSS

Create/update `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#5eead4',
          300: '#2dd4bf',
          400: '#14b8a6',
          500: '#0d9488',
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 3. Create Global CSS File

Update `frontend/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.5rem;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 4. Install shadcn/ui

Install required dependencies:

```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
```

Initialize shadcn/ui:

```bash
npx shadcn-ui@latest init
```

Configuration options:
- Would you like to use TypeScript? No
- Which style would you like to use? Default
- Which color would you like to use as base color? Slate
- Where is your global CSS file? src/index.css
- Do you want to use CSS variables for colors? Yes
- Where is your tailwind.config.js located? tailwind.config.js
- Configure the import alias? No

### 5. Generate Core Components

Generate the first set of components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
```

### 6. Update Component Structure

Create the components directory structure:

```
src/
├── components/
│   ├── ui/
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   └── select.jsx
│   └── layout/
```

### 7. Create First Layout Component

Create `src/components/layout/Header.jsx`:

```jsx
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = ({ isLoggedIn, onLogout, onLogin }) => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="text-lg font-bold">CardioPredict</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
          <a href="#" className="text-sm font-medium hover:text-primary">Features</a>
          <a href="#" className="text-sm font-medium hover:text-primary">About</a>
          <a href="#" className="text-sm font-medium hover:text-primary">Contact</a>
        </nav>
        
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          ) : (
            <Button onClick={onLogin}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### 8. Update Main Application Component

Update `src/App.js` to use the new components:

```jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
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
      <div className="min-h-screen bg-background">
        <Header isLoggedIn={false} onLogin={() => {}} />
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
                  
                  <Button type="submit" className="w-full">Register</Button>
                  
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
                  
                  <Button type="submit" className="w-full">Login</Button>
                  
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
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <TabularModel />
          <EcgModel />
        </div>
      </main>
    </div>
  );
}

export default App;
```

### 9. Update Package.json Scripts

Add development scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.{js,jsx,css}"
  }
}
```

## Verification Steps

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Verify Tailwind CSS is working:
   - Check that utility classes are applied
   - Verify custom colors are available
   - Confirm responsive behavior

3. Test shadcn/ui components:
   - Button variants render correctly
   - Form components have proper styling
   - Components are accessible

4. Validate folder structure:
   - Components organized in proper directories
   - UI components in `components/ui/`
   - Layout components in `components/layout/`

## Expected Outcomes

By the end of Phase 1, we should have:
- ✅ Tailwind CSS fully configured and working
- ✅ shadcn/ui initialized with core components
- ✅ Design system implemented in Tailwind config
- ✅ Basic layout components (Header)
- ✅ Updated authentication forms with Tailwind styling
- ✅ Working development environment with hot reload
- ✅ No breaking changes to existing functionality

## Next Steps

After completing Phase 1:
1. Review and test all changes
2. Document any issues or deviations
3. Prepare for Phase 2: Core Components Development
4. Begin implementing layout components (Sidebar, Footer)
5. Create dashboard foundation components

## Potential Challenges

1. **CSS Conflicts**: Existing CSS in App.css may conflict with Tailwind classes
   - Solution: Gradually replace with Tailwind classes
   
2. **Component Styling**: shadcn/ui components may need customization
   - Solution: Use component props and variants appropriately
   
3. **Build Performance**: Adding Tailwind may increase build times
   - Solution: Optimize content paths in tailwind.config.js

## Rollback Plan

If critical issues arise:
1. Revert changes to package.json
2. Remove added dependencies
3. Restore original CSS files
4. Return to previous working state
5. Document issues for future reference