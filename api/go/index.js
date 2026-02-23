// /go/{productId}/{retailer} - Redirect endpoint
// Formula: affiliate_link = template + encode(canonical_url)

// Product data with retailer SKUs and canonical URLs
const products = [
  {
    id: 'iphone-16-128gb',
    name: 'iPhone 16 128GB',
    retailerSkus: {
      amazon: 'B0DHTYV9M3',
      bestbuy: '6616543',
      apple: 'MTX73LL/A'
    },
    canonicalUrls: {
      amazon: 'https://www.amazon.com/dp/B0DHTYV9M3',
      bestbuy: 'https://www.bestbuy.com/site/iphone-16/6616543.p',
      apple: 'https://apple.com/iphone-16'
    }
  }
  // Add more products as needed...
];

// Affiliate templates - Formula: template + encode(canonical_url)
const affiliateTemplates = {
  amazon: (sku, canonicalUrl) => `https://www.amazon.com/dp/${sku}?tag=mactrackr-20`,
  
  // Best Buy via Impact - encode canonical URL
  bestbuy: (sku, canonicalUrl) => `https://bestbuy.7tiv.net/c/XXXX/XXXX/XXXX?u=${encodeURIComponent(canonicalUrl)}`,
  
  // B&H - direct KBID
  bh: (sku, canonicalUrl) => `https://www.bhphotovideo.com/c/product/${sku}.html?KBID=mactrackr_bh`,
  
  // Adorama - product code
  adorama: (sku, canonicalUrl) => `https://www.adorama.com/${sku}.html?email=mactrackr_adorama`,
  
  // eBay - encode canonical
  ebay: (sku, canonicalUrl) => `https://www.ebay.com/itm/${sku}?mkevt=1&mkcid=mactrackr_ebay`,
  
  // Apple - direct (no affiliate)
  apple: (sku, canonicalUrl) => canonicalUrl
};

export default function handler(req, res) {
  // Parse URL path: /go/{productId}/{retailer}
  // Vercel provides path in req.url
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  // Path should be ['go', productId, retailer]
  const productId = pathParts[1];
  const retailer = pathParts[2];
  
  if (!productId || !retailer) {
    return res.status(400).json({ error: 'Invalid URL format. Use /go/{productId}/{retailer}' });
  }
  
  // Find product
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Get canonical URL
  const canonicalUrl = product.canonicalUrls?.[retailer];
  if (!canonicalUrl) {
    return res.status(404).json({ error: 'Retailer not found for this product' });
  }
  
  // Get SKU
  const sku = product.retailerSkus?.[retailer];
  
  // Generate affiliate URL using formula: template + encode(canonical_url)
  const generateUrl = affiliateTemplates[retailer];
  const affiliateUrl = generateUrl ? generateUrl(sku, canonicalUrl) : canonicalUrl;
  
  // Track click (async, don't block redirect)
  trackClick(productId, retailer, req);
  
  // Redirect to affiliate URL
  res.status(302).setHeader('Location', affiliateUrl).end();
}

async function trackClick(productId, retailer, req) {
  const clickData = {
    event: 'click',
    productId,
    retailer,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    referrer: req.headers.referer,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  };
  
  // Log to console (production: send to database/analytics)
  console.log('[CLICK]', JSON.stringify(clickData));
  
  // TODO: Send to Postgres click_logs table
  // await db.query('INSERT INTO click_logs ...', clickData);
}
