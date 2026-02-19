// Shared Component Library Template
// Apply to: RumbleDeals, BabyGear, Appliances, Robot, SluggerData, MintCondition, CoinCurator, Auto, Fixed Income
// EXCLUDED: MacTrackr, Health Index

// === USAGE ===
// 1. Copy relevant components to your project's src/components/ folder
// 2. Update imports to match your project structure
// 3. Apply design tokens from shared-design-system.js

// === COMMON FIXES ===
// A. Add postcss.config.js if Tailwind v4 issue:
// module.exports = { plugins: { '@tailwindcss/postcss': {} } }

// B. Add 'use client' to components using hooks:
// 'use client';
// import { useState, useEffect } from 'react';

// === COMPONENTS TO COPY ===
// 1. Layout: Navbar, Footer
// 2. UI: Button, Card, Input, Badge
// 3. Data: ProductCard, PriceDisplay, ComparisonTable
// 4. Feedback: LoadingSpinner, ErrorMessage, EmptyState

// === DESIGN TOKENS ===
export const theme = {
  colors: {
    primary: '#0ea5e9',
    dark: {
      bg: '#0a0a0f',
      surface: '#12121a',
      elevated: '#1a1a25',
      border: '#2a2a3a',
    },
    accent: {
      cyan: '#06b6d4',
      violet: '#8b5cf6',
      emerald: '#10b981',
      amber: '#f59e0b',
    }
  },
  fonts: {
    sans: 'system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, monospace',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  }
};
