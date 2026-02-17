# Health Index - Wellness Technology Guide

A modern Next.js application showcasing wellness technology products including red light therapy, PEMF devices, saunas, and massage guns.

## Features

- 🎨 **Modern Design** - Clean, responsive UI with dark mode support
- 📱 **Mobile First** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Next.js 14 and optimized images
- 🔍 **Product Catalog** - Advanced filtering and sorting capabilities
- 🛍️ **Affiliate Ready** - Built-in affiliate link integration
- 🌙 **Dark Mode** - Automatic theme switching
- ✨ **Animations** - Smooth transitions and micro-interactions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode
- **TypeScript**: Full type safety
- **Deployment**: Optimized for Vercel

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   cd healthindex-frontend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── products/          # Product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── providers.tsx     # Theme providers
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── WellnessCategories.tsx
│   ├── ProductGrid.tsx
│   └── ...
├── data/                 # Static data
│   └── products.ts       # Product catalog
└── types/               # TypeScript types
    └── index.ts
```

## Customization

### Adding Products

Edit `src/data/products.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  slug: 'product-slug',
  brand: 'Brand Name',
  category: 'red-light' | 'pemf' | 'sauna' | 'massage-gun',
  price: 299,
  rating: 4.8,
  reviewCount: 125,
  image: 'https://example.com/image.jpg',
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  affiliateLink: 'https://affiliate-link.com',
  inStock: true
}
```

### Styling

- Colors: Edit `tailwind.config.js` to customize the color palette
- Components: Modify component styles in `src/app/globals.css`
- Layout: Adjust spacing and typography in component files

### Adding Categories

Update the `categories` array in `src/data/products.ts` and add corresponding category handling in components.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Set Environment Variables:**
   - Add your environment variables in Vercel dashboard
   - Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## SEO & Performance

- ✅ **Meta Tags** - Comprehensive SEO meta tags
- ✅ **Open Graph** - Social media sharing optimization
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Static Generation** - Pre-rendered product pages
- ✅ **Performance** - Optimized for Core Web Vitals

## Analytics Integration

The app is ready for analytics integration. Add your tracking IDs to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS=GA_MEASUREMENT_ID
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=PIXEL_ID
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own wellness product site!

## Support

For questions or support, please open an issue in the repository.