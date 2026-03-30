import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell, ExternalLink } from 'lucide-react'
import PriceAlertSignup from '../components/PriceAlertSignup'

// Helper function to format price (defined at module level for reuse)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price || 0)
}

// Product Content Component - Generates 300+ words of SEO content
const ProductContent = ({ product, prices, bestPrice, savings, savingsPercent }) => {
  if (!product) return null;
  
  const productName = product.name || product.model;
  const category = product.category;
  const specs = product.specs || {};
  const chip = specs.chip || specs.processor || '';
  const storage = specs.storage || '';
  const ram = specs.memory || specs.ram || '';
  const display = specs.display || '';
  const bestRetailer = bestPrice?.retailer || 'Apple';
  const priceCount = prices?.length || 0;
  const hasSavings = savings > 0;
  
  // Generate category-specific content
  const getCategoryContent = () => {
    switch(category) {
      case 'iphone':
        return {
          useCase: "ideal for photography enthusiasts, power users, and anyone who wants the latest mobile technology",
          keyFeatures: `the ${chip} chip delivers exceptional performance for gaming, video editing, and multitasking`,
          timing: "Apple typically releases new iPhone models in September, so prices on previous generations often drop in October-November",
          alternatives: "comparable Android flagships like Samsung Galaxy S series or Google Pixel"
        };
      case 'mac':
        return {
          useCase: "perfect for creative professionals, students, and anyone needing reliable computing power",
          keyFeatures: `the ${chip} chip provides desktop-class performance with incredible energy efficiency`,
          timing: "Mac refreshes typically happen in October-November, making spring and early summer good times to find deals",
          alternatives: "Windows laptops from Dell XPS, ThinkPad, or Surface lines"
        };
      case 'ipad':
        return {
          useCase: "great for digital artists, note-takers, media consumption, and light productivity work",
          keyFeatures: `the ${chip} chip handles demanding apps and multitasking with ease`,
          timing: "iPad updates are less predictable, but spring events often bring new models",
          alternatives: "Microsoft Surface Pro or Samsung Galaxy Tab series"
        };
      case 'watch':
        return {
          useCase: "essential for fitness tracking, health monitoring, and staying connected without your phone",
          keyFeatures: "advanced health sensors and seamless iPhone integration",
          timing: "New Apple Watch models arrive in September alongside iPhones",
          alternatives: "Garmin, Fitbit, or Samsung Galaxy Watch"
        };
      case 'airpods':
        return {
          useCase: "perfect for commuters, gym-goers, and anyone who wants premium audio on the go",
          keyFeatures: "industry-leading Active Noise Cancellation and spatial audio",
          timing: "AirPods see updates every 2-3 years, making them a safe buy most of the time",
          alternatives: "Sony WF-1000XM5 or Bose QuietComfort Earbuds"
        };
      default:
        return {
          useCase: "designed for Apple ecosystem users who want seamless integration",
          keyFeatures: " premium build quality and Apple\'s renowned user experience",
          timing: "Apple products typically see annual refreshes",
          alternatives: "comparable products from competing brands"
        };
    }
  };
  
  const content = getCategoryContent();
  const releaseYear = product.releaseDate ? new Date(product.releaseDate).getFullYear() : '2024';
  const retailers = prices?.map(p => p.retailer).join(', ') || 'major retailers';
  
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mt-6">
      <h2 className="text-lg font-semibold text-[#fafafa] mb-4">About the {productName}</h2>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-[#a3a3a3] leading-relaxed mb-4">
          The {productName} is {content.useCase}. Released in {releaseYear}, 
          {chip && ` it features ${content.keyFeatures}.`} 
          {display && ` The ${display} display delivers stunning visuals for work and entertainment.`}
          {storage && ` With ${storage} of storage,`} 
          {ram && ` and ${ram} of RAM,`} 
          {` you'll have plenty of space and memory for apps, photos, and files.`}
        </p>
        
        <h3 className="text-[#fafafa] font-medium mt-6 mb-3">Current Pricing & Availability</h3>
        <p className="text-[#a3a3a3] leading-relaxed mb-4">
          Right now, the {productName} is available from {priceCount} major retailers: {retailers}. 
          The best price is currently {formatPrice(bestPrice?.price)} at {bestRetailer.charAt(0).toUpperCase() + bestRetailer.slice(1)}
          {hasSavings && `, which represents a ${savingsPercent}% savings off the MSRP`}. 
          Prices are updated in real-time, so you can be confident you're seeing the most current deals available.
        </p>
        
        <h3 className="text-[#fafafa] font-medium mt-6 mb-3">Should You Buy Now?</h3>
        <p className="text-[#a3a3a3] leading-relaxed mb-4">
          {hasSavings 
            ? `With current savings of ${formatPrice(savings)}, now is a great time to buy the ${productName}. `
            : `While the ${productName} is selling at full price currently, `
          }
          {content.timing}. If you're not in a rush, setting a price alert will notify you immediately 
          when the price drops. Historically, we've seen discounts of 10-20% during Black Friday, 
          Prime Day, and back-to-school sales.
        </p>
        
        <h3 className="text-[#fafafa] font-medium mt-6 mb-3">New vs. Used Options</h3>
        <p className="text-[#a3a3a3] leading-relaxed mb-4">
          On TheresMac, you'll find both new and used options for the {productName}. 
          New units from authorized retailers like Apple, Amazon, Best Buy, and B&H come with 
          full warranties and the peace of mind of being the first owner. Used options, 
          primarily from eBay, can offer significant savings—sometimes 20-40% off retail—though 
          warranty coverage may vary. All conditions are clearly labeled so you can make 
          an informed decision.
        </p>
        
        <h3 className="text-[#fafafa] font-medium mt-6 mb-3">Alternatives to Consider</h3>
        <p className="text-[#a3a3a3] leading-relaxed">
          If the {productName} doesn't quite fit your needs or budget, consider {content.alternatives}. 
          You can also browse our {category === 'mac' ? 'Mac' : category === 'iphone' ? 'iPhone' : category === 'ipad' ? 'iPad' : 'product'} 
          comparison page to see how different models stack up side-by-side. 
          Remember, the best deal isn't always the lowest price—it's the right product 
          at the right price for your specific needs.
        </p>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#262626]">
        <p className="text-xs text-[#525252]">
          Prices tracked across {priceCount} retailers • Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

// Helper to update document title and meta tags
const usePageTitle = (product) => {
  useEffect(() => {
    if (!product) return;
    
    const productName = product.name || product.model || 'Product';
    const basePrice = product.lowest_price || product.price || product.base_price;
    const priceText = basePrice ? ` from $${basePrice}` : '';
    const productId = product.id || product.sku || '';
    
    // Update title
    document.title = `${productName} Price Tracker${priceText} | TheresMac`;
    
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
    canonical.setAttribute('href', `https://theresmac.com/product/${productId}`);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${productName} Price Tracker${priceText} | TheresMac`);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', `Track ${productName} prices across retailers. Compare deals and set price alerts.`);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://theresmac.com/product/${productId}`);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', `${productName} Price Tracker${priceText} | TheresMac`);
    
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', `Track ${productName} prices across retailers. Compare deals and set price alerts.`);
    
    return () => {
      document.title = 'TheresMac - Apple Product Price Tracking';
      if (canonical) canonical.setAttribute('href', 'https://theresmac.com');
      if (ogTitle) ogTitle.setAttribute('content', 'TheresMac - Apple Product Price Tracking');
      if (ogDesc) ogDesc.setAttribute('content', 'Track Apple product prices across retailers. Get the best deals on iPhone, iPad, Mac, Apple Watch, and AirPods with real-time price comparisons and alerts.');
      if (ogUrl) ogUrl.setAttribute('content', 'https://theresmac.com');
      if (twitterTitle) twitterTitle.setAttribute('content', 'TheresMac - Apple Product Price Tracking');
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
  const [priceHistoryData, setPriceHistoryData] = useState(null)
  const [priceHistoryLoading, setPriceHistoryLoading] = useState(false)

  // Update page title dynamically
  usePageTitle(product);

  useEffect(() => {
    fetchProductData()
  }, [id])

  // Fetch price history when product or chart range changes
  useEffect(() => {
    if (id) {
      fetchPriceHistory()
    }
  }, [id, chartRange])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      // Try to fetch specific product first
      const response = await fetch(`https://theresmac-backend.fly.dev/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        // Fallback: fetch all products and find by ID
        console.log('Individual product endpoint failed, trying fallback...')
        const allResponse = await fetch('https://theresmac-backend.fly.dev/api/products')
        if (allResponse.ok) {
          const allProducts = await allResponse.json()
          const found = allProducts.find(p => p.id === id || p.id === parseInt(id))
          if (found) {
            setProduct(found)
          } else {
            console.error('Product not found in product list')
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch product:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPriceHistory = async () => {
    try {
      setPriceHistoryLoading(true)
      const days = parseInt(chartRange)
      const response = await fetch(`https://theresmac-backend.fly.dev/api/prices/${id}/history?timeframe=${days}`)
      if (response.ok) {
        const data = await response.json()
        setPriceHistoryData(data)
      }
    } catch (err) {
      console.error('Failed to fetch price history:', err)
    } finally {
      setPriceHistoryLoading(false)
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
            "text": `${productName} is currently in stock at ${inStockCount} retailer${inStockCount !== 1 ? 's' : ''}: ${prices.filter(p => p.inStock).map(p => p.retailer).join(', ') || 'Check back soon'}. You can compare prices and availability across Amazon, Best Buy, Apple, B&H, eBay, and Walmart on TheresMac.`
          }
        },
        {
          "@type": "Question",
          "name": `Can I buy a used or refurbished ${productName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, used and refurbished ${productName} options are available through eBay and other certified refurbishers. Used ${productName} listings on eBay typically offer the deepest discounts, sometimes 20-40% off MSRP. All condition types are clearly labeled on TheresMac: NEW (Amazon, Best Buy, Apple, B&H), USED (eBay), and REFURBISHED (when available). Compare all conditions to find the best value.`
          }
        },
        {
          "@type": "Question",
          "name": `Is ${productName} worth buying now or should I wait?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${productName} is currently ${savings > 50 ? `on sale with $${savings} savings - a good time to buy.` : 'available at regular pricing. Set a price alert on TheresMac to get notified when the price drops.'} Apple typically releases new models in September-October for iPhones and October-November for Macs. Check our price history charts to see if prices are trending down.`
          }
        },
        {
          "@type": "Question",
          "name": `What retailers sell ${productName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${productName} is available from ${prices.length} major retailers: ${prices.map(p => p.retailer).join(', ')}. Each retailer offers different prices, shipping options, and return policies. Compare all options on TheresMac to find the best deal.`
          }
        },
        {
          "@type": "Question",
          "name": `Does ${productName} ever go on sale?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, ${productName} periodically goes on sale, especially during major shopping events like Black Friday, Prime Day, and back-to-school season. Current savings are ${savings > 0 ? `$${savings} off MSRP` : 'not available - check back for deals'}. Track prices with TheresMac to catch the next sale.`
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

  // Use affiliate URL if available, otherwise fallback to regular URL
  const getRetailerUrl = (price) => {
    return price.affiliateUrl || price.url || '#'
  }

  // Determine condition based on retailer
  const getRetailerCondition = (retailer) => {
    const usedRetailers = ['ebay'];
    const refurbishedRetailers = [];
    
    if (usedRetailers.includes(retailer?.toLowerCase())) {
      return { label: 'USED', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    if (refurbishedRetailers.includes(retailer?.toLowerCase())) {
      return { label: 'REFURB', className: 'bg-green-500/20 text-green-400 border-green-500/30' };
    }
    return { label: 'NEW', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
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

  // Process real price history data for chart
  const priceHistory = React.useMemo(() => {
    if (!priceHistoryData || !priceHistoryData.prices) {
      // Fallback to empty array if no data
      return []
    }
    
    const retailerPrices = priceHistoryData.prices
    const dates = priceHistoryData.dates || []
    
    // Calculate the best (lowest) price across all retailers for each day
    return dates.map((_, dayIndex) => {
      let lowestPrice = Infinity
      Object.values(retailerPrices).forEach(retailerPriceArray => {
        if (retailerPriceArray && retailerPriceArray[dayIndex] != null) {
          lowestPrice = Math.min(lowestPrice, retailerPriceArray[dayIndex])
        }
      })
      return lowestPrice === Infinity ? bestPrice?.price || 0 : lowestPrice
    })
  }, [priceHistoryData, bestPrice?.price])
  
  const maxPrice = priceHistory.length > 0 ? Math.max(...priceHistory) : (bestPrice?.price || 1000)
  const minPrice = priceHistory.length > 0 ? Math.min(...priceHistory) : (bestPrice?.price || 1000)

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
            {sortedPrices.map((price, index) => {
              const condition = getRetailerCondition(price.retailer);
              return (
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
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#fafafa] capitalize">{price.retailer}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${condition.className}`}>
                          {condition.label}
                        </span>
                      </div>
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
              );
            })}
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
              {priceHistoryLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-[#3b82f6] text-sm">Loading history...</div>
                </div>
              ) : priceHistory.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-[#525252] text-sm">No price history available</p>
                </div>
              ) : (
                priceHistory.map((price, i) => {
                  const height = maxPrice === minPrice ? 50 : ((price - minPrice) / (maxPrice - minPrice)) * 100
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#3b82f6] to-[#3b82f6]/50 rounded-t min-h-[4px]"
                      style={{ height: `${Math.max(height, 4)}%` }}
                      title={`${new Date(priceHistoryData?.dates?.[i] || Date.now()).toLocaleDateString()}: ${formatPrice(price)}`}
                    />
                  )
                })
              )}
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

        {/* SEO Content Section - 300+ words */}
        <ProductContent product={product} prices={prices} bestPrice={bestPrice} savings={savings} savingsPercent={savingsPercent} />
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
          <p className="text-[#a3a3a3] text-sm">© 2026 TheresMac</p>
        </div>
      </footer>
    </div>
  )
}

export default ProductDetail
