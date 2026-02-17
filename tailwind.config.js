/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdecd8',
          200: '#fad4b1',
          300: '#f6b680',
          400: '#f08d4d',
          500: '#eb6f2a',
          600: '#dc5520',
          700: '#b73e1d',
          800: '#933220',
          900: '#772b1c',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeff4',
          200: '#d0dce6',
          300: '#a7bdd0',
          400: '#7798b5',
          500: '#557a9d',
          600: '#426284',
          700: '#36506b',
          800: '#2f445a',
          900: '#2b3c4d',
        },
        coin: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          copper: '#b87333',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}