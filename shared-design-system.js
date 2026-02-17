// Unified Design System for All Aggregator Sites
// High-grade, professional, modern aesthetic

export const colors = {
  // Primary palette
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
  // Dark mode base
  dark: {
    bg: '#0a0a0f',
    surface: '#12121a',
    elevated: '#1a1a25',
    border: '#2a2a3a',
  },
  // Accent
  accent: {
    cyan: '#06b6d4',
    violet: '#8b5cf6',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
  }
};

export const gradients = {
  hero: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0c4a6e 100%)',
  card: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  glow: 'radial-gradient(ellipse at top, rgba(6,182,212,0.15) 0%, transparent 50%)',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.3)',
  md: '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.4)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -4px rgba(0,0,0,0.5)',
  glow: '0 0 20px rgba(6,182,212,0.3)',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
};

export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
};

export const transitions = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
};

// Shared component classes
export const componentClasses = {
  // Layout
  page: 'min-h-screen bg-dark-bg text-gray-100',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 lg:py-20',
  
  // Cards
  card: 'bg-dark-surface border border-dark-border rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300',
  cardElevated: 'bg-dark-elevated border border-dark-border rounded-xl shadow-lg hover:shadow-xl hover:border-primary-500/30 transition-all duration-300',
  
  // Typography
  heading1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white',
  heading2: 'text-3xl md:text-4xl font-bold tracking-tight text-white',
  heading3: 'text-xl md:text-2xl font-semibold text-white',
  body: 'text-base text-gray-400 leading-relaxed',
  caption: 'text-sm text-gray-500',
  
  // Interactive
  buttonPrimary: 'inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25',
  buttonSecondary: 'inline-flex items-center justify-center px-6 py-3 bg-dark-surface border border-dark-border hover:border-primary-500/50 text-white font-semibold rounded-lg transition-all duration-200',
  
  // Forms
  input: 'w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors',
  
  // Navigation
  navLink: 'text-gray-400 hover:text-white transition-colors duration-200',
  navLinkActive: 'text-white font-medium',
};

export default {
  colors,
  gradients,
  shadows,
  typography,
  spacing,
  borderRadius,
  transitions,
  componentClasses,
};