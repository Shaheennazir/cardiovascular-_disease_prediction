/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        card: '#2a2a2a',
        'card-foreground': '#ffffff',
        popover: '#2a2a2a',
        'popover-foreground': '#ffffff',
        primary: {
          DEFAULT: '#f20d80',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6a6a6a',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#4a4a4a',
          foreground: '#6a6a6a',
        },
        accent: {
          DEFAULT: '#2a2a2a',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#f20d80',
          foreground: '#ffffff',
        },
        border: '#4a4a4a',
        input: '#4a4a4a',
        ring: '#f20d80',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
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