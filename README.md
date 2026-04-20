# TheresMac Frontend

A React/Vite application for tracking Apple product prices across multiple retailers.

## Features

✅ **Apple Product Catalog**
- Browse iPhone, iPad, Mac, Apple Watch, and AirPods
- Filter by category, price range, availability
- Sort by price, name, popularity

✅ **Price Comparison**
- Real-time prices from multiple retailers
- Best price highlighting
- Stock availability tracking

✅ **Price History Charts**
- Interactive historical price data
- Multiple timeframe views (1M, 3M, 6M, 1Y)
- Retailer-specific price tracking

✅ **Deal Alerts System**
- Create custom price alerts
- Email notifications when targets are met
- Manage and track alert status

✅ **Dark Mode Support**
- System preference detection
- Manual theme toggle
- Persistent user preference

## Tech Stack

- **Frontend**: React 18, Vite 4
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router 6
- **HTTP**: Axios

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd mactrackr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files (already provided)
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## Environment Variables

### Development (.env.development)
```
VITE_API_URL=http://localhost:3001
VITE_ENV=development
```

### Production (.env.production)
```
VITE_API_URL=https://api.theresmac.com
VITE_ENV=production
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Navigation, footer, layout
│   ├── Home/           # Homepage components
│   ├── Products/       # Product catalog components
│   ├── Product/        # Single product components
│   ├── Alerts/         # Alert management components
│   └── UI/             # Generic UI components
├── pages/              # Route components
├── contexts/           # React contexts (theme, etc.)
├── api.js              # API client functions
├── index.css           # Global styles & Tailwind
└── main.jsx            # Application entry point
```

## Key Components

### Layout Components
- **Navbar**: Navigation with dark mode toggle
- **Footer**: Site-wide footer with links

### Home Page
- **Hero**: Landing section with CTAs
- **Features**: Key feature showcase
- **FeaturedProducts**: Popular product deals

### Product Catalog
- **ProductCategories**: Category filter tabs
- **ProductFilters**: Price, availability filters
- **ProductGrid**: Responsive product grid
- **ProductCard**: Individual product cards

### Product Detail
- **PriceChart**: Historical price visualization
- **PriceComparison**: Multi-retailer comparison
- **ProductSpecs**: Specifications and features

### Alerts System
- **AlertCard**: Individual alert management
- **AlertModal**: Create/edit alert form

## API Integration

The app expects a backend API with these endpoints:

```
GET  /api/health                    # Health check
GET  /api/products                  # Get products with filters
GET  /api/products/:id              # Get single product
GET  /api/products/search           # Search products
GET  /api/prices/:id                # Get current prices
GET  /api/prices/:id/history        # Get price history
POST /api/alerts                    # Create alert
GET  /api/alerts                    # Get user alerts
PUT  /api/alerts/:id                # Update alert
DELETE /api/alerts/:id              # Delete alert
```

## Styling

### Tailwind Configuration
- Custom Apple-inspired color palette
- Dark mode support via class strategy
- Responsive breakpoints
- Custom component classes

### Custom CSS Classes
```css
.btn-primary        # Primary button style
.btn-secondary      # Secondary button style
.card              # Card container
.product-card      # Product card with hover effects
.price-card        # Price comparison card
.input-field       # Form input styling
```

## Dark Mode

Dark mode is implemented using:
1. **Tailwind's class-based dark mode**
2. **ThemeContext** for state management
3. **localStorage** for persistence
4. **System preference detection**

## Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Tailwind's responsive utilities
- Touch-friendly interactions
- Optimized mobile navigation

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Setup
1. Set production environment variables
2. Configure API endpoint
3. Set up any required build hooks
4. Configure redirect rules for SPA routing

## Performance Optimizations

- **Code splitting** via React Router
- **Lazy loading** of route components
- **Image optimization** placeholders
- **Bundle analysis** available via tools
- **Tree shaking** enabled by Vite

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

- 📧 Email: support@theresmac.com
- 🐛 Issues: GitHub Issues
- 📖 Docs: This README

---

**TheresMac** - Never miss an Apple deal again! 🍎