// Affiliate tracking configuration
// Apply to Amazon Associates, B&H Photo, Adorama programs
// Update with your actual affiliate IDs after approval

export const affiliateConfig = {
  // Amazon Associates - replace with your tracking ID after approval
  // Format: tag=YOURID-20
  amazon: 'mactrackr-20',
  
  // B&H Photo - replace with your KBID after approval
  // Format: KBID=YOUR_KBID
  bh: 'mactrackr_bh',
  
  // Adorama - replace with your affiliate ID
  // Format: email=YOUR_ID (they use email-based tracking)
  adorama: 'mactrackr_adorama',
  
  // Other retailers (add when you join their programs)
  bestbuy: null,  // Rakuten/Impact Radius
  walmart: null,  // Impact Radius
  target: null,   // Impact Radius
  apple: null,    // Apple doesn't have public affiliate program
}

// Generate affiliate URL with tracking
export const getAffiliateUrl = (retailer, productName, productSku) => {
  const encodedName = encodeURIComponent(productName)
  const encodedSku = productSku ? encodeURIComponent(productSku) : ''
  
  const urls = {
    apple: {
      base: `https://apple.com/search/${encodedName}`,
      // Apple uses Partnerize - requires separate integration
    },
    amazon: {
      base: `https://amazon.com/s?k=${encodedName}`,
      param: `tag=${affiliateConfig.amazon}`,
    },
    bestbuy: {
      base: `https://bestbuy.com/site/searchpage.jsp?st=${encodedName}`,
      // Best Buy uses Rakuten/Impact Radius
    },
    bh: {
      base: `https://bhphotovideo.com/c/search?q=${encodedName}`,
      param: `KBID=${affiliateConfig.bh}`,
    },
    adorama: {
      base: `https://adorama.com/search?q=${encodedName}`,
      param: `email=${affiliateConfig.adorama}`,
    },
    walmart: {
      base: `https://walmart.com/search?q=${encodedName}`,
      // Walmart uses Impact Radius
    },
    target: {
      base: `https://target.com/s?searchTerm=${encodedName}`,
      // Target uses Impact Radius
    },
    ebay: {
      base: `https://ebay.com/sch/i.html?_nkw=${encodedName}`,
      // eBay Partner Network
    },
    cdw: {
      base: `https://cdw.com/search/?key=${encodedName}`,
      // CDW uses CJ Affiliate
    }
  }
  
  const config = urls[retailer]
  if (!config) return '#'
  
  // Build URL with affiliate parameter if available
  let url = config.base
  if (config.param) {
    const separator = url.includes('?') ? '&' : '?'
    url += separator + config.param
  }
  
  return url
}
