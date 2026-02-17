// Health Index - High-Grade UI Component Library
// Based on Antigravity/Antigravity Pokemon Card Aggregator Design

export const theme = {
  colors: {
    // Base dark theme
    bg: '#0a0a0f',
    surface: '#12121a',
    elevated: '#1a1a25',
    border: 'rgba(255, 255, 255, 0.08)',
    
    // Neon accents
    cyan: '#00e5ff',
    violet: '#7c3aed',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
    
    // Text
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
  },
  
  glass: {
    card: 'background: rgba(26, 26, 37, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08);',
    elevated: 'background: rgba(26, 26, 37, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.12);',
  },
  
  glow: {
    cyan: 'box-shadow: 0 0 30px rgba(0, 229, 255, 0.3), 0 0 60px rgba(0, 229, 255, 0.1);',
    violet: 'box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);',
  },
  
  gradient: {
    hero: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, rgba(0, 229, 255, 0.1) 100%)',
    card: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
    accent: 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
  }
};

// Equipment Card - Glassmorphism style
export const EquipmentCardStyles = {
  container: `
    relative bg-[#1a1a25]/80 backdrop-blur-xl rounded-2xl 
    border border-white/10 overflow-hidden
    hover:border-[#00e5ff]/30 transition-all duration-500
    hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]
  `,
  imageContainer: `
    relative aspect-[4/3] bg-gradient-to-br from-[#12121a] to-[#0a0a0f]
    overflow-hidden group
  `,
  badge: {
    steal: `
      absolute top-4 left-4 z-10
      bg-gradient-to-r from-emerald-500 to-emerald-600
      text-white text-xs font-bold px-3 py-1.5 rounded-full
      shadow-lg shadow-emerald-500/25
    `,
    deal: `
      absolute top-4 right-4 z-10
      bg-gradient-to-r from-[#00e5ff] to-[#00b8d9]
      text-black text-xs font-bold px-3 py-1.5 rounded-full
      shadow-lg shadow-cyan-500/25
    `
  },
  title: 'text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors',
  price: 'text-2xl font-bold text-white',
  priceOld: 'text-lg text-white/50 line-through ml-2',
  meta: 'text-sm text-white/60',
};

// Header - Floating glass style
export const HeaderStyles = {
  container: `
    fixed top-0 left-0 right-0 z-50
    bg-[#0a0a0f]/80 backdrop-blur-xl
    border-b border-white/10
  `,
  logo: 'text-2xl font-bold bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] bg-clip-text text-transparent',
  nav: 'text-sm font-medium text-white/70 hover:text-white transition-colors',
  cta: `
    px-4 py-2 bg-gradient-to-r from-[#00e5ff] to-[#00b8d9]
    text-black font-semibold rounded-lg
    hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all
  `,
};

// Hero Section
export const HeroStyles = {
  container: `
    relative pt-32 pb-20 px-4
    bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0c1829]
  `,
  title: `
    text-5xl md:text-7xl font-bold text-center
    bg-gradient-to-r from-white via-white to-[#00e5ff]
    bg-clip-text text-transparent
  `,
  subtitle: 'text-xl text-center text-white/60 max-w-2xl mx-auto mt-6',
};

// Market Stats - Like Pokemon Card Aggregator
export const MarketStatsStyles = {
  container: `
    bg-[#1a1a25]/60 backdrop-blur-xl rounded-2xl
    border border-white/10 p-6
  `,
  statValue: 'text-3xl font-bold text-[#00e5ff] font-mono',
  statLabel: 'text-sm text-white/50 uppercase tracking-wider',
  divider: 'h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4',
};

// Price Comparison - Clean professional style
export const PriceComparisonStyles = {
  retailerRow: `
    flex items-center justify-between py-3 px-4
    rounded-xl hover:bg-white/5 transition-colors
  `,
  bestPrice: 'text-emerald-400 font-bold',
  inStock: 'w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
  outOfStock: 'w-2 h-2 rounded-full bg-rose-500',
};

// Spec Pills - Glass style
export const SpecPillStyles = {
  container: 'flex flex-wrap gap-2 mt-4',
  pill: `
    px-3 py-1.5 rounded-lg text-xs font-medium
    bg-white/5 border border-white/10
    text-white/70
  `,
};

// Buttons
export const ButtonStyles = {
  primary: `
    inline-flex items-center justify-center px-6 py-3
    bg-gradient-to-r from-[#00e5ff] to-[#00b8d9]
    text-black font-semibold rounded-xl
    hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]
    transition-all duration-300
  `,
  secondary: `
    inline-flex items-center justify-center px-6 py-3
    bg-white/5 border border-white/20
    text-white font-semibold rounded-xl
    hover:bg-white/10 hover:border-white/30
    transition-all duration-300
  `,
  ghost: `
    inline-flex items-center justify-center px-4 py-2
    text-white/70 hover:text-white
    transition-colors
  `,
};

export default theme;