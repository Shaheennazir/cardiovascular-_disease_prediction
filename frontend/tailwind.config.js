/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#020817',
        card: '#ffffff',
        'card-foreground': '#020817',
        popover: '#ffffff',
        'popover-foreground': '#020817',
        primary: {
          DEFAULT: '#0ea5e9',
          foreground: '#f0f9ff',
        },
        secondary: {
          DEFAULT: '#0d9488',
          foreground: '#f0fdfa',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#e2e8f0',
          foreground: '#0f172a',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#fef2f2',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#0ea5e9',
        // New colors from the design template
        'zen-blue': '#A3B7C5',
        'zen-green': '#8BA8A1',
        'zen-light-blue': '#DDE7EE',
        'zen-dark-blue': '#4F626E',
        'tactile-primary': '#4A6E7F',
        'tactile-secondary': '#BFD7ED',
        'tactile-text-dark': '#0A1F28',
        'tactile-text-light': '#E0EAF2',
        'tactile-accent': '#E87C5E',
        'background-light': '#f8f8f5',
        'background-dark': '#231e0f',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        'tactile-light': '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.15)',
        'tactile-dark': '0 6px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.3s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}