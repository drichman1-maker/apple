const fs = require('fs');
const path = '/Users/douglasrichman/.openclaw/workspace/mactrackr-backend/src/server.js';
let content = fs.readFileSync(path, 'utf8');

// Parse products and fix URLs
const productRegex = /{\s*id: '([^']+)',\s*name: '([^']+)'[\s\S]*?prices: ({[\s\S]*?})\s*}/g;
let match;

// Find all products and build a map
const products = [];
const productRegex2 = /id: '([^']+)',[\s\S]*?name: '([^']+)'/g;
let m;
while ((m = productRegex2.exec(content)) !== null) {
  products.push({ id: m[1], name: m[2] });
}

// For each product, fix its Adorama and eBay URLs
products.forEach(p => {
  const searchTerm = encodeURIComponent(p.name.replace(/"/g, ''));
  
  // Replace Adorama URL for this product
  const adoramaPattern = new RegExp(`(id: '${p.id}'[\\s\\S]*?adorama:[^}]+)url: '[^']+'`, 'g');
  content = content.replace(adoramaPattern, `$1url: 'https://www.adorama.com/search?query=${searchTerm}'`);
  
  // Replace eBay URL for this product  
  const ebayPattern = new RegExp(`(id: '${p.id}'[\\s\\S]*?ebay:[^}]+)url: '[^']+'`, 'g');
  content = content.replace(ebayPattern, `$1url: 'https://www.ebay.com/sch/i.html?_nkw=${searchTerm}'`);
});

fs.writeFileSync(path, content);
console.log('Fixed Adorama and eBay URLs with product-specific searches');
