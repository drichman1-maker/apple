export const RETAILER_LABELS = {
  apple: 'Apple',
  amazon: 'Amazon',
  walmart: 'Walmart',
  target: 'Target',
  bestbuy: 'Best Buy',
  bh: 'B&H Photo',
  adorama: 'Adorama',
  ebay: 'eBay',
  sweetwater: 'Sweetwater',
  abt: 'ABT',
  microcenter: 'Micro Center',
  cdw: 'CDW',
  newegg: 'Newegg',
}

export const retailerLabel = (key) => RETAILER_LABELS[key] || key

const SEARCH_URLS = {
  apple: (q) => `https://www.apple.com/search/${q}`,
  amazon: (q) => `https://www.amazon.com/s?k=${q}`,
  walmart: (q) => `https://www.walmart.com/search?q=${q}`,
  target: (q) => `https://www.target.com/s?searchTerm=${q}`,
  bestbuy: (q) => `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`,
  bh: (q) => `https://www.bhphotovideo.com/c/search?q=${q}`,
  adorama: (q) => `https://www.adorama.com/search?q=${q}`,
  ebay: (q) => `https://www.ebay.com/sch/i.html?_nkw=${q}`,
  sweetwater: (q) => `https://www.sweetwater.com/store/search.php?s=${q}`,
  abt: (q) => `https://www.abt.com/search?query=${q}`,
  microcenter: (q) => `https://www.microcenter.com/search/search_results.aspx?Ntt=${q}`,
  cdw: (q) => `https://www.cdw.com/search?q=${q}`,
  newegg: (q) => `https://www.newegg.com/p/pl?d=${q}`,
}

export const retailerSearchUrl = (retailer, productName) => {
  const build = SEARCH_URLS[retailer]
  return build ? build(encodeURIComponent(productName)) : '#'
}
