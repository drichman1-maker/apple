/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#141414',
        'dark-border': '#262626',
        'accent-blue': '#3b82f6',
        'accent-cyan': '#06b6d4',
        'accent-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
