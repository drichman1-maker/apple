// affiliate.js
// Amazon Associates affiliate link helper

const AMAZON_TAG = 'mactrackr-20';

// Convert any URL to Amazon affiliate link
export const toAffiliateLink = (url, retailer = 'amazon') => {
  if (!url) return '#';
  
  // Already has our tag
  if (url.includes(AMAZON_TAG)) return url;
  
  // Amazon
  if (retailer === 'amazon') {
    if (url.includes('amazon.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tag=${AMAZON_TAG}`;
    }
    // Try to search Amazon for the product
    return `https://www.amazon.com/s?k=${encodeURIComponent(url)}&tag=${AMAZON_TAG}`;
  }
  
  // Best Buy
  if (retailer === 'bestbuy') {
    return url;
  }
  
  return url;
};

// Get search URL for a product
export const getAffiliateSearchUrl = (productName) => {
  return `https://www.amazon.com/s?k=${encodeURIComponent(productName)}&tag=${AMAZON_TAG}`;
};

// Track affiliate click
export const trackAffiliateClick = (productId, retailer) => {
  // In production, this would send to analytics
  console.log(`Affiliate click: ${productId} from ${retailer}`);
};
