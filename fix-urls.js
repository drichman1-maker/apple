const fs = require('fs');
const path = '/Users/douglasrichman/.openclaw/workspace/mactrackr-backend/src/server.js';
let content = fs.readFileSync(path, 'utf8');

// Fix Adorama URLs - replace fake product URLs with category page
content = content.replace(/https:\/\/adorama\.com\/ac[^'"]+\.html/g, 'https://www.adorama.com/l/Computers/Apple~Computers');

// Fix eBay URLs - replace fake item IDs with search
content = content.replace(/https:\/\/ebay\.com\/itm\/\d+/g, 'https://www.ebay.com/sch/i.html?_nkw=Apple');

fs.writeFileSync(path, content);
console.log('Fixed Adorama and eBay URLs');
