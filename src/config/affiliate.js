// Affiliate tracking configuration
// Apply to Amazon Associates, B&H Photo, Adorama programs
// Update with your actual affiliate IDs after approval

export const affiliateConfig = {
  // Amazon Associates - replace with your tracking ID after approval
  amazon: 'mactrackr-20',
  
  // B&H Photo - replace with your KBID after approval
  bh: 'mactrackr_bh',
  
  // Adorama - replace with your affiliate ID
  adorama: 'mactrackr_adorama',
}

// Generate affiliate URL with tracking
// Uses direct product URL if available, falls back to search
export const getAffiliateUrl = (retailer, productName, productSku, directUrl) => {
  // If we have a direct URL, use it and add affiliate tracking
  if (directUrl) {
    const affiliateId = affiliateConfig[retailer]
    if (!affiliateId) return directUrl
    
    // Add affiliate parameter based on retailer
    const separator = directUrl.includes('?') ? '&' : '?'
    
    switch(retailer) {
      case 'amazon':
        return `${directUrl}${separator}tag=${affiliateId}`
      case 'bh':
        return `${directUrl}${separator}KBID=${affiliateId}`
      case 'adorama':
        return `${directUrl}${separator}email=${affiliateId}`
      default:
        return directUrl
    }
  }
  
  // Fallback to search URL if no direct URL
  const encodedName = encodeURIComponent(productName)
  
  const searchUrls = {
    apple: `https://apple.com/search/${encodedName}`,
    amazon: `https://amazon.com/s?k=${encodedName}&tag=${affiliateConfig.amazon}`,
    bestbuy: `https://bestbuy.com/site/searchpage.jsp?st=${encodedName}`,
    bh: `https://bhphotovideo.com/c/search?q=${encodedName}&KBID=${affiliateConfig.bh}`,
    adorama: `https://adorama.com/search?q=${encodedName}&email=${affiliateConfig.adorama}`,
    walmart: `https://walmart.com/search?q=${encodedName}`,
    target: `https://target.com/s?searchTerm=${encodedName}`,
    ebay: `https://ebay.com/sch/i.html?_nkw=${encodedName}`,
    cdw: `https://cdw.com/search/?key=${encodedName}`
  }
  
  return searchUrls[retailer] || '#'
}
