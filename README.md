# CoinCurator Frontend

A comprehensive Next.js frontend for the CoinCurator rare coins aggregator. Features a modern, responsive design with dark mode support, PCGS/NGC grading integration, price history charts, and advanced filtering capabilities.

## Features

- 🪙 **Comprehensive Coin Catalog** - Browse US, World, and Ancient coins
- 🏆 **PCGS & NGC Integration** - View certified grades and population data
- 📊 **Price History Charts** - Interactive charts with historical auction data
- 🔍 **Advanced Search & Filters** - Filter by category, country, year, price, grade, and more
- 🌙 **Dark Mode Support** - Automatic theme switching with user preference
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Next.js 14 and modern React patterns
- 🎨 **Modern UI/UX** - Beautiful design with Tailwind CSS and Lucide icons

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js with React-ChartJS-2
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Theme**: next-themes
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running (coin-agg backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coincurator-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and configure:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── catalog/            # Catalog page
│   ├── coins/[id]/         # Individual coin pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Homepage
├── components/             # React components
│   ├── catalog/           # Catalog-specific components
│   ├── coin-detail/       # Individual coin page components
│   ├── coins/             # Coin-related components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components (navbar, footer)
│   ├── providers/         # Context providers
│   ├── search/            # Search functionality
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
│   ├── api.ts            # API client and endpoints
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## API Integration

The frontend connects to a backend API with the following endpoints:

### Coins API
- `GET /api/coins` - Get all coins with filters and pagination
- `GET /api/coins/:id` - Get specific coin details
- `POST /api/coins/search` - Search coins by query
- `GET /api/coins/category/:category` - Get coins by category
- `GET /api/coins/featured` - Get featured coins
- `GET /api/coins/recent` - Get recently added coins

### Grades API
- `GET /api/grades/coin/:coinId` - Get grades for a specific coin
- `GET /api/grades/:id` - Get specific grade details
- `POST /api/grades` - Create new grade record

### Price History API
- `GET /api/price-history/coin/:coinId` - Get price history for a coin
- `GET /api/price-history/coin/:coinId/latest` - Get latest price
- `POST /api/price-history` - Add price record

### Collections API
- `GET /api/collections` - Get user collections
- `POST /api/collections` - Create collection
- `POST /api/collections/:id/coins` - Add coin to collection

## Key Components

### CoinCard
Reusable component for displaying coin information in grid layouts.

### CatalogFilters
Advanced filtering interface with category, country, year range, price range, grading service, and grade range filters.

### PriceChart
Interactive chart component displaying historical price data with multiple time ranges and statistics.

### GradeDisplay
Component for displaying PCGS/NGC grading information with population data and certification details.

### SearchModal
Global search interface with recent searches, popular searches, and real-time results.

## Styling

The application uses Tailwind CSS with a custom design system:

- **Colors**: Primary (orange) and secondary (blue) color schemes
- **Dark Mode**: Automatic theme switching with system preference detection
- **Responsive**: Mobile-first design with breakpoints for all screen sizes
- **Animations**: Smooth transitions and hover effects throughout

## Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: API response caching and browser caching
- **Lazy Loading**: Components and images loaded on demand
- **Debounced Search**: Optimized search with request debouncing

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Traditional Hosting
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

3. **Static Export** (optional)
   ```bash
   npm run build && npm run export
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |
| `DATABASE_URL` | Database connection (if needed) | - |
| `NEXTAUTH_URL` | Authentication URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Authentication secret | - |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- PCGS and NGC for grading standards and population data
- Chart.js for beautiful interactive charts
- Tailwind CSS for the utility-first CSS framework
- Lucide for the icon library
- Next.js team for the excellent framework