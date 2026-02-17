/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Antigravity Design System
        black: '#000000',
        charcoal: '#1a1a1a',
        'charcoal-light': '#2a2a2a',
        'gray-dark': '#404040',
        'neon-blue': '#3b82f6',
        'neon-blue-dim': 'rgba(59, 130, 246, 0.1)',
        // Legacy compatibility
        'apple-blue': '#3b82f6',
        'apple-dark-gray': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}