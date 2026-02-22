import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// MacTrackr API v2.1 - With Affiliate Links
// Deployed: Feb 20, 2026 - Added affiliate tracking
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ==========================================
// AFFILIATE CONFIGURATION
// ==========================================
// Placeholder IDs - Replace with real ones after approval
const AFFILIATE_IDS = {
  amazon: process.env.AMAZON_ASSOCIATES_TAG || 'mactrackr-20',
  apple: process.env.APPLE_AFFILIATE_ID || 'phg_placeholder',
  bestbuy: process.env.BESTBUY_AFFILIATE_ID || 'cj_placeholder',
  bh: process.env.BH_AFFILIATE_ID || 'bh_placeholder',
  adorama: process.env.ADORAMA_AFFILIATE_ID || 'avantlink_placeholder',
  ebay: process.env.EBAY_CAMPAIGN_ID || 'epn_placeholder'
};

// Build affiliate URL for each retailer
function buildAffiliateUrl(retailer, baseUrl) {
  if (!baseUrl || baseUrl === '#') return '#';
  
  const affiliateId = AFFILIATE_IDS[retailer];
  if (!affiliateId || affiliateId.includes('placeholder')) return baseUrl;
  
  switch(retailer) {
    case 'amazon':
      // Amazon: &tag=ASSOCIATES_ID
      return baseUrl.includes('?') 
        ? `${baseUrl}&tag=${affiliateId}`
        : `${baseUrl}?tag=${affiliateId}`;
    
    case 'apple':
      // Apple PHG: Wrap through redirect (format varies by account)
      return `https://apple.sjv.io/c/${affiliateId}?u=${encodeURIComponent(baseUrl)}`;
    
    case 'bestbuy':
      // Best Buy CJ: Add ref parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&ref=${affiliateId}`
        : `${baseUrl}?ref=${affiliateId}`;
    
    case 'bh':
      // B&H: kw parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&kw=${affiliateId}`
        : `${baseUrl}?kw=${affiliateId}`;
    
    case 'adorama':
      // Adorama: aff parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&aff=${affiliateId}`
        : `${baseUrl}?aff=${affiliateId}`;
    
    case 'ebay':
      // eBay Partner Network: Wrap through rover
      return `https://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=${affiliateId}&toolid=10001&customid=&mpre=${encodeURIComponent(baseUrl)}`;
    
    default:
      return baseUrl;
  }
}

// Add affiliate URLs to product data
function enrichProductWithAffiliateUrls(product) {
  const enrichedPrices = {};
  
  for (const [retailer, data] of Object.entries(product.prices)) {
    enrichedPrices[retailer] = {
      ...data,
      affiliateUrl: buildAffiliateUrl(retailer, data.url)
    };
  }
  
  const enrichedRefurbished = {};
  if (product.refurbishedPrices) {
    for (const [retailer, data] of Object.entries(product.refurbishedPrices)) {
      enrichedRefurbished[retailer] = {
        ...data,
        affiliateUrl: buildAffiliateUrl(retailer, data.url)
      };
    }
  }
  
  return {
    ...product,
    prices: enrichedPrices,
    ...(product.refurbishedPrices && { refurbishedPrices: enrichedRefurbished })
  };
}

// Helper to generate search URLs
function generateSearchUrl(retailer, productName, specs) {
  const query = encodeURIComponent(`${productName} ${specs.chip || ''} ${specs.ram || ''} ${specs.storage || ''}`.trim());
  
  const searchUrls = {
    apple: `https://www.apple.com/search?query=${query}`,
    amazon: `https://amazon.com/s?k=${query.replace(/ /g, '+')}`,
    walmart: `https://walmart.com/search?q=${query.replace(/ /g, '+')}`,
    target: `https://target.com/s?searchTerm=${query.replace(/ /g, '+')}`,
    bestbuy: `https://bestbuy.com/site/searchpage.jsp?st=${query.replace(/ /g, '+')}`,
    bh: `https://bhphotovideo.com/c/search?q=${query.replace(/ /g, '%20')}`,
    adorama: `https://www.adorama.com/search?query=${query.replace(/ /g, '%20')}`,
    ebay: `https://www.ebay.com/sch/i.html?_nkw=${query.replace(/ /g, '+')}`,
    cdw: `https://cdw.com/search/?key=${query.replace(/ /g, '%20')}`,
    backmarket: `https://www.backmarket.com/search?q=${query.replace(/ /g, '%20')}`,
    newegg: `https://www.newegg.com/p/pl?d=${query.replace(/ /g, '+')}`
  };
  
  return searchUrls[retailer] || '#';
}

// 11 Retailers
const retailers = ['apple', 'amazon', 'walmart', 'target', 'bestbuy', 'bh', 'adorama', 'ebay', 'cdw', 'backmarket', 'newegg'];

// ==========================================
// PRODUCT DATA (abbreviated - full data in separate file)
// ==========================================
// Import from existing server.js or keep inline
const products = [
  // This should include all your current products
  // For brevity, I'm showing the structure - use your full product array
  {
    id: 'iphone-16-128-unlocked',
    name: 'iPhone 16',
    modelNumber: 'A3287',
    sku: 'MYNF3LL/A',
    category: 'iphone',
    releaseDate: '2024-09-20',
    specs: { storage: '128GB', color: 'White', display: '6.1" Super Retina XDR', camera: '48MP Fusion' },
    prices: {
      apple: { price: 799, inStock: true, url: 'https://www.apple.com/shop/buy-iphone/iphone-16' },
      amazon: { price: 799, inStock: true, url: 'https://www.amazon.com/dp/B0DHTYW7P8' },
      bestbuy: { price: 799, inStock: true, url: 'https://www.bestbuy.com/site/apple-iphone-16-128gb-unlocked-white/JJGCQ866TH' },
      walmart: { price: 799, inStock: true, url: 'https://www.walmart.com/ip/iPhone-16-128GB-White-Apple-Intelligence/11469110090' },
      target: { price: 799, inStock: true, url: 'https://www.target.com/p/apple-iphone-16-128gb-white/-/A-86076262' },
      bh: { price: 799, inStock: true, url: 'https://www.bhphotovideo.com/c/product/1810538-REG/apple_mynf3ll_a_iphone_16_128gb_white.html' },
      adorama: { price: 799, inStock: true, url: 'https://www.adorama.com/acmynf3lla.html' },
      ebay: { price: 759, inStock: true, url: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+128GB+unlocked' }
    }
  },
  // ... include all other products here
];

// Add dynamic URLs to products that don't have direct URLs
products.forEach(product => {
  Object.keys(product.prices).forEach(retailer => {
    if (!product.prices[retailer].url) {
      product.prices[retailer].url = generateSearchUrl(retailer, product.name, product.specs);
    }
  });

  if (product.refurbishedPrices) {
    Object.keys(product.refurbishedPrices).forEach(retailer => {
      if (!product.refurbishedPrices[retailer].url) {
        product.refurbishedPrices[retailer].url = generateSearchUrl(retailer, product.name + ' refurbished', product.specs);
      }
    });
  }
});

// ==========================================
// API ROUTES
// ==========================================

// Get all products (with affiliate URLs)
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let result = category 
    ? products.filter(p => p.category === category)
    : products;
  
  // Enrich with affiliate URLs
  result = result.map(enrichProductWithAffiliateUrls);
  
  res.json(result);
});

// Get single product (with affiliate URLs)
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  
  res.json(enrichProductWithAffiliateUrls(product));
});

// Get retailers list
app.get('/api/retailers', (req, res) => {
  res.json(retailers);
});

// Get affiliate status (for debugging)
app.get('/api/affiliate-status', (req, res) => {
  const status = {};
  for (const [retailer, id] of Object.entries(AFFILIATE_IDS)) {
    status[retailer] = {
      configured: !id.includes('placeholder'),
      id: id.includes('placeholder') ? 'NOT_CONFIGURED' : 'CONFIGURED'
    };
  }
  res.json({
    status,
    note: 'Set affiliate IDs via environment variables (e.g., AMAZON_ASSOCIATES_TAG)'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    version: '2.1-affiliate-links', 
    timestamp: new Date().toISOString(),
    affiliateTracking: true
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MacTrackr API v2.1 - ${products.length} products with affiliate tracking`);
  console.log(`Affiliate IDs configured: ${Object.values(AFFILIATE_IDS).filter(id => !id.includes('placeholder')).length}/${Object.keys(AFFILIATE_IDS).length}`);
  console.log(`Running on port ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});
