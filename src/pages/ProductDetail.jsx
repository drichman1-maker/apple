import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell, ExternalLink } from 'lucide-react'
import PriceAlertSignup from '../components/PriceAlertSignup'

// Helper to update document title and meta tags
const usePageTitle = (product) => {
  useEffect(() => {
    if (!product) return;
    
    const productName = product.name || product.model || 'Product';
    const basePrice = product.lowest_price || product.price || product.base_price;
    const priceText = basePrice ? ` from $${basePrice}` : '';
    const productId = product.id || product.sku || '';
    
    // Update title
    document.title = `${productName} Price Tracker${priceText} | MacTrackr`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        `Track ${productName} prices across retailers. Compare deals, set price alerts, and find the best price on ${productName}.`);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://mactrackr.com/product/${productId}`);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${productName} Price Tracker${priceText} | MacTrackr`);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', `Track ${productName} prices across retailers. Compare deals and set price alerts.`);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://mactrackr.com/product/${productId}`);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', `${productName} Price Tracker${priceText} | MacTrackr`);
    
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', `Track ${productName} prices across retailers. Compare deals and set price alerts.`);
    
    return () => {
      document.title = 'MacTrackr - Apple Product Price Tracking';
      if (canonical) canonical.setAttribute('href', 'https://mactrackr.com');
      if (ogTitle) ogTitle.setAttribute('content', 'MacTrackr - Apple Product Price Tracking');
      if (ogDesc) ogDesc.setAttribute('content', 'Track Apple product prices across retailers. Get the best deals on iPhone, iPad, Mac, Apple Watch, and AirPods with real-time price comparisons and alerts.');
      if (ogUrl) ogUrl.setAttribute('content', 'https://mactrackr.com');
      if (twitterTitle) twitterTitle.setAttribute('content', 'MacTrackr - Apple Product Price Tracking');
      if (twitterDesc) twitterDesc.setAttribute('content', 'Track Apple product prices across retailers. Get the best deals on iPhone, iPad, Mac, Apple Watch, and AirPods with real-time price comparisons and alerts.');
    };
  }, [product]);
};

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [alertEnabled, setAlertEnabled] = useState(false)
  const [chartRange, setChartRange] = useState('90d')
  const [showAlertModal, setShowAlertModal] = useState(false)

  // Update page title dynamically
  usePageTitle(product);

  useEffect(() => {
    fetchProductData()
  }, [id])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://mactrackr-backend-fresh.fly.dev/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (err) {
      console.error('Failed to fetch product:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPrices = (product) => {
    if (!product?.prices) return []
    return Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices || {}).map(([retailer, data]) => ({ retailer, ...data }))
  }

  // Add JSON-LD schema for SEO
  useEffect(() => {
    if (!product) return;
    
    const prices = getPrices(product);
    const bestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : null;
    const inStockCount = prices.filter(p => p.inStock).length;
    const bestPriceRetailer = prices.find(p => p.price === bestPrice)?.retailer || 'Apple';
    const productName = product.name || product.model;
    const msrp = product.msrp || product.base_price || product.price || 0;
    const savings = msrp > bestPrice ? msrp - bestPrice : 0;
    
    // Product Schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": productName,
      "description": product.description || `${productName} - Track the best prices and find the lowest prices across retailers.`,
      "sku": product.sku || product.id,
      "mpn": product.mpn || product.model,
      "brand": {
        "@type": "Brand",
        "name": "Apple"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Apple Inc."
      },
      "image": product.image_url || product.image,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": bestPrice || product.lowest_price || product.price || 0,
        "priceValidUntil": "2026-12-31",
        "availability": inStockCount > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": bestPriceRetailer
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "minPrice": bestPrice || 0,
          "maxPrice": prices.length > 0 ? Math.max(...prices.map(p => p.price)) : (product.price || 0)
        }
      },
      "aggregateRating": product.rating ? {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount || product.review_count || 1,
        "bestRating": 5,
        "worstRating": 1
      } : undefined
    };
    
    // FAQ Schema - Auto-generated based on product data
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the best price for ${productName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The best price for ${productName} is currently $${bestPrice || 'N/A'} from ${bestPriceRetailer}.${savings > 0 ? ` You save $${savings} compared to the MSRP of $${msrp}.` : ''} Prices are updated in real-time across ${prices.length} retailers.`
          }
        },
        {
          "@type": "Question",
          "name": `Where can I buy ${productName} in stock?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${productName} is currently in stock at ${inStockCount} retailer${inStockCount !== 1 ? 's' : ''}: ${prices.filter(p => p.inStock).map(p => p.retailer).join(', ') || 'Check back soon'}. You can compare prices and availability across Amazon, Best Buy, Apple, B&H, eBay, and Walmart on MacTrackr.`
          }
        },
        {
          "@type": "Question",
          "name": `Is ${productName} worth buying now or should I wait?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${productName} is currently ${savings > 50 ? `on sale with $${savings} savings - a good time to buy.` : 'available at regular pricing. Set a price alert on MacTrackr to get notified when the price drops.'} Apple typically releases new models in September-October for iPhones and October-November for Macs. Check our price history charts to see if prices are trending down.`
          }
        },
        {
          "@type": "Question",
          "name": `What retailers sell ${productName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${productName} is available from ${prices.length} major retailers: ${prices.map(p => p.retailer).join(', ')}. Each retailer offers different prices, shipping options, and return policies. Compare all options on MacTrackr to find the best deal.`
          }
        },
        {
          "@type": "Question",
          "name": `Does ${productName} ever go on sale?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, ${productName} periodically goes on sale, especially during major shopping events like Black Friday, Prime Day, and back-to-school season. Current savings are ${savings > 0 ? `$${savings} off MSRP` : 'not available - check back for deals'}. Track prices with MacTrackr to catch the next sale.`
          }
        }
      ]
    };
    
    // Create scripts
    const scripts = [];
    
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.id = 'product-schema';
    productScript.text = JSON.stringify(productSchema);
    document.head.appendChild(productScript);
    scripts.push(productScript);
    
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'faq-schema';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
    scripts.push(faqScript);
    
    return () => {
      scripts.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  // Use affiliate URL if available, otherwise fallback to regular URL
  const getRetailerUrl = (price) => {
    return price.affiliateUrl || price.url || '#'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-[#3b82f6]">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a3a3a3]">Product not found</p>
          <Link to="/" className="text-[#3b82f6] hover:underline mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const prices = getPrices(product)
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price)
  const bestPrice = sortedPrices[0]
  const worstPrice = sortedPrices[sortedPrices.length - 1]
  const savings = worstPrice && bestPrice ? worstPrice.price - bestPrice.price : 0
  const savingsPercent = worstPrice && bestPrice ? Math.round((savings / worstPrice.price) * 100) : 0
  const year = product.releaseDate ? new Date(product.releaseDate).getFullYear() : null

  // Mock price history data for chart
  const priceHistory = Array.from({ length: 30 }, (_, i) => {
    const base = bestPrice?.price || 1000
    const variance = Math.sin(i * 0.3) * 50 + Math.random() * 30
    return base + variance
  })
  const maxPrice = Math.max(...priceHistory)
  const minPrice = Math.min(...priceHistory)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/" className="text-xl font-semibold tracking-tight text-[#fafafa]">
              Mac<span className="text-[#3b82f6]">Trackr</span>
            </Link>
          </div>
          <Link to="/alerts" className="text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
            <Bell className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-8">
        {/* Product Title */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-2">
            {product.name}
          </h1>
          {year && (
            <p className="text-[#a3a3a3] text-lg">Released {year}</p>
          )}
        </div>

        {/* Specs Grid - Large Boxes */}
        {product.specs && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="bg-[#141414] border border-[#262626] rounded-xl p-4">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-1">{key}</p>
                <p className="text-[#fafafa] font-semibold">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Best Price Hero */}
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0d2137] border border-[#3b82f6]/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#a3a3a3] uppercase tracking-wider">Best Available Price</span>
            <span className="px-3 py-1 bg-[#3b82f6]/20 text-[#3b82f6] text-xs font-medium rounded-full uppercase">
              {bestPrice?.retailer}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl md:text-6xl font-bold text-[#fafafa] mb-2">
                {formatPrice(bestPrice?.price)}
              </p>
              {savings > 0 && (
                <p className="text-[#10b981] font-medium">
                  Save {formatPrice(savings)} vs MSRP
                </p>
              )}
              <p className="text-[#a3a3a3] text-sm mt-1">
                at {bestPrice?.retailer} {bestPrice?.inStock && <span className="text-[#10b981]">●</span>}
              </p>
            </div>
            <a
              href={getRetailerUrl(bestPrice)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white font-medium rounded-xl hover:bg-[#059669] transition-colors"
            >
              BUY NOW
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <a
            href={getRetailerUrl(bestPrice)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="md:hidden w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-[#10b981] text-white font-medium rounded-xl hover:bg-[#059669] transition-colors"
          >
            BUY NOW
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* All Retailers - Right after Best Price */}
        <div className="mb-6">
          <h3 className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-4 text-center">Compare Prices</h3>
          <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden">
            {sortedPrices.map((price, index) => (
              <a
                key={index}
                href={getRetailerUrl(price)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-between p-4 hover:bg-[#1a1a1a] transition-colors border-b border-[#262626] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}
                  >
                    {price.retailer.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-[#fafafa] capitalize">{price.retailer}</p>
                    <p className={`text-xs ${price.inStock ? 'text-[#10b981]' : 'text-rose-400'}`}>
                      {price.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`text-xl font-bold ${price.price === bestPrice?.price ? 'text-[#10b981]' : 'text-[#fafafa]'}`}>
                    {formatPrice(price.price)}
                  </p>
                  <span className="px-4 py-2 bg-[#262626] text-[#a3a3a3] text-sm rounded-lg hover:bg-[#333] transition-colors">
                    Visit
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Price Alerts */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-[#a3a3a3] uppercase tracking-wider">Price Alerts</span>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${alertEnabled ? 'bg-[#3b82f6]' : 'bg-[#262626]'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${alertEnabled ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-[#262626] mx-auto mb-4" />
              <p className="text-[#a3a3a3] mb-4">Get notified when the price drops</p>
              <button 
                onClick={() => setShowAlertModal(true)}
                className="px-6 py-2.5 bg-[#3b82f6] text-white font-medium rounded-xl hover:bg-[#2563eb] transition-colors"
              >
                Set Price Alert
              </button>
            </div>
          </div>

          {/* Right Column - Price Velocity Chart */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#a3a3a3] uppercase tracking-wider">Price Velocity ({chartRange})</span>
              <div className="flex gap-1">
                {['30d', '60d', '90d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setChartRange(range)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      chartRange === range 
                        ? 'bg-[#3b82f6] text-white' 
                        : 'text-[#a3a3a3] hover:text-[#fafafa]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-32 flex items-end gap-1">
              {priceHistory.map((price, i) => {
                const height = ((price - minPrice) / (maxPrice - minPrice)) * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#3b82f6] to-[#3b82f6]/50 rounded-t"
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mt-6">
          <h3 className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-4">Specifications</h3>
          <div className="space-y-3">
            {product.specs && Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-[#262626] last:border-0">
                <span className="text-[#a3a3a3] text-sm uppercase">{key}</span>
                <span className="text-[#fafafa] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Price Alert Modal */}
      {showAlertModal && (
        <PriceAlertSignup 
          product={product} 
          onClose={() => setShowAlertModal(false)} 
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#262626] mt-16 py-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#a3a3a3] text-sm mb-2">
            <Link to="/privacy" className="hover:text-[#3b82f6] mx-2">Privacy</Link>
            <span className="text-[#333]">|</span>
            <Link to="/terms" className="hover:text-[#3b82f6] mx-2">Terms</Link>
            <span className="text-[#333]">|</span>
            <Link to="/about" className="hover:text-[#3b82f6] mx-2">About</Link>
          </p>
          <p className="text-[#a3a3a3] text-sm">© 2026 MacTrackr</p>
        </div>
      </footer>
    </div>
  )
}

export default ProductDetail
