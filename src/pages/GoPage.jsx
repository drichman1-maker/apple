import { useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'

// Affiliate IDs
const AFFILIATE_IDS = {
  amazon: 'Theresmac-20',
  ebay: '5339142921',
  bestbuy: '',
  bh: '',
  'b&h': '',
  newegg: '',
  walmart: '',
  target: '',
  apple: '',
  backmarket: '',
}

const RETAILER_URLS = {
  amazon: {
    search: (query) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  ebay: {
    search: (query) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  bestbuy: {
    search: (query) => `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  bh: {
    search: (query) => `https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  'b&h': {
    search: (query) => `https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  newegg: {
    search: (query) => `https://www.newegg.com/p/pl?d=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  walmart: {
    search: (query) => `https://www.walmart.com/search?q=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  target: {
    search: (query) => `https://www.target.com/s?searchTerm=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  apple: {
    search: (query) => `https://www.apple.com/search/${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  backmarket: {
    search: (query) => `https://www.backmarket.com/search?q=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  adorama: {
    search: (query) => `https://www.adorama.com/s?query=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  microcenter: {
    search: (query) => `https://www.microcenter.com/search?query=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
  cdw: {
    search: (query) => `https://www.cdw.com/search/?key=${encodeURIComponent(query)}`,
    product: (url) => url,
  },
}

function addAffiliateTag(url, retailer) {
  const affiliateId = AFFILIATE_IDS[retailer]
  if (!affiliateId) return url
  
  // Amazon
  if (retailer === 'amazon') {
    if (url.includes('tag=')) return url
    return url + (url.includes('?') ? '&' : '?') + `tag=${affiliateId}`
  }
  
  // eBay
  if (retailer === 'ebay') {
    if (url.includes('campid=')) return url
    return url + (url.includes('?') ? '&' : '?') + `campid=${affiliateId}`
  }
  
  return url
}

const GoPage = () => {
  const { retailer } = useParams()
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    const url = searchParams.get('url')
    const query = searchParams.get('query')
    const retailerKey = retailer?.toLowerCase()
    
    // Track click
    const clickData = {
      timestamp: new Date().toISOString(),
      retailer: retailerKey,
      query,
      hasDirectUrl: !!url,
      referrer: document.referrer,
    }
    console.log('[Redirect]', clickData)
    
    // Determine redirect URL
    let redirectUrl
    const retailerConfig = RETAILER_URLS[retailerKey]
    
    if (!retailerConfig) {
      // Unknown retailer, try to redirect anyway
      redirectUrl = url || '/'
    } else if (url && url !== 'null' && url !== 'undefined') {
      // Use direct product URL with affiliate tag
      redirectUrl = addAffiliateTag(url, retailerKey)
    } else if (query) {
      // Fall back to search
      redirectUrl = retailerConfig.search(query)
      redirectUrl = addAffiliateTag(redirectUrl, retailerKey)
    } else {
      // No URL or query, go to retailer homepage
      redirectUrl = retailerConfig.search('apple') // generic search
    }
    
    // Perform redirect
    window.location.href = redirectUrl
  }, [retailer, searchParams])
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
        <p className="text-[#a3a3a3]">Redirecting to {retailer}...</p>
        <p className="text-[#525252] text-sm mt-2">This helps support our price tracking</p>
      </div>
    </div>
  )
}

export default GoPage
