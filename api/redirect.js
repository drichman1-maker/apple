/**
 * Affiliate Redirect API
 * Handles monetized redirects to retailers with tracking
 */

const AFFILIATE_IDS = {
  amazon: 'Theresmac-20',
  ebay: '5339142921',
  bestbuy: '', // Add when approved
  bh: '', // B&H affiliate
  newegg: '', // Newegg via Rakuten
  walmart: '', // Walmart affiliate
  target: '', // Target affiliate
  apple: '', // Apple affiliate
  backmarket: '', // BackMarket affiliate
};

const RETAILER_URLS = {
  amazon: {
    base: 'https://www.amazon.com',
    search: (query) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_IDS.amazon}`,
    product: (asin) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_IDS.amazon}`,
  },
  ebay: {
    base: 'https://www.ebay.com',
    search: (query) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&campid=${AFFILIATE_IDS.ebay}`,
    product: (id) => `https://www.ebay.com/itm/${id}?campid=${AFFILIATE_IDS.ebay}`,
  },
  bestbuy: {
    base: 'https://www.bestbuy.com',
    search: (query) => `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}`,
    product: (sku) => `https://www.bestbuy.com/site/${sku}.p`,
  },
  bh: {
    base: 'https://www.bhphotovideo.com',
    search: (query) => `https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(query)}`,
    product: (sku) => `https://www.bhphotovideo.com/c/product/${sku}`,
  },
  newegg: {
    base: 'https://www.newegg.com',
    search: (query) => `https://www.newegg.com/p/pl?d=${encodeURIComponent(query)}`,
    product: (id) => `https://www.newegg.com/p/${id}`,
  },
  walmart: {
    base: 'https://www.walmart.com',
    search: (query) => `https://www.walmart.com/search?q=${encodeURIComponent(query)}`,
    product: (id) => `https://www.walmart.com/ip/${id}`,
  },
  apple: {
    base: 'https://www.apple.com',
    search: (query) => `https://www.apple.com/search/${encodeURIComponent(query)}`,
    product: (path) => `https://www.apple.com${path}`,
  },
  backmarket: {
    base: 'https://www.backmarket.com',
    search: (query) => `https://www.backmarket.com/search?q=${encodeURIComponent(query)}`,
    product: (id) => `https://www.backmarket.com/en-us/p/${id}`,
  },
};

// Simple click tracking (can be enhanced with database)
function trackClick(retailer, product, type) {
  const timestamp = new Date().toISOString();
  const clickData = {
    timestamp,
    retailer,
    product,
    type, // 'product' or 'search'
    userAgent: navigator?.userAgent,
    referrer: document?.referrer,
  };
  
  // Send to analytics (console for now, can be API call)
  console.log('[Affiliate Click]', clickData);
  
  // TODO: Send to your analytics endpoint
  // fetch('/api/track-click', { method: 'POST', body: JSON.stringify(clickData) })
}

export default function handler(req, res) {
  const { retailer, id, query, url } = req.query;
  
  if (!retailer || !RETAILER_URLS[retailer]) {
    return res.status(400).json({ error: 'Invalid or missing retailer' });
  }
  
  const retailerConfig = RETAILER_URLS[retailer];
  let redirectUrl;
  
  // If direct product URL provided, use it
  if (url) {
    redirectUrl = decodeURIComponent(url);
    // Add affiliate tag if not present
    if (retailer === 'amazon' && !redirectUrl.includes('tag=')) {
      redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + `tag=${AFFILIATE_IDS.amazon}`;
    }
    if (retailer === 'ebay' && !redirectUrl.includes('campid=')) {
      redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + `campid=${AFFILIATE_IDS.ebay}`;
    }
  }
  // If product ID provided, construct product URL
  else if (id) {
    redirectUrl = retailerConfig.product(id);
  }
  // If search query provided, use search URL
  else if (query) {
    redirectUrl = retailerConfig.search(query);
  }
  // Fallback to base URL
  else {
    redirectUrl = retailerConfig.base;
  }
  
  // Track the click
  trackClick(retailer, id || query, id ? 'product' : 'search');
  
  // Perform redirect
  res.setHeader('Location', redirectUrl);
  res.status(302).end();
}
