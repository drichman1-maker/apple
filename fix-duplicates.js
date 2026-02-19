const fs = require('fs');
const path = '/Users/douglasrichman/.openclaw/workspace/mactrackr-backend/src/server.js';

let content = fs.readFileSync(path, 'utf8');

// Extract the products array
const productsMatch = content.match(/const products = ([\s\S]*?)(?:;\s*\/\/|\n\/\/|\n\n)/);
if (!productsMatch) {
  console.log('Could not find products array');
  process.exit(1);
}

// Use a different approach - find all product IDs and their positions
const productRegex = /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?prices:\s*{/g;
const seen = new Set();
const duplicates = [];
let match;

while ((match = productRegex.exec(content)) !== null) {
  const id = match[1];
  if (seen.has(id)) {
    duplicates.push(id);
  } else {
    seen.add(id);
  }
}

console.log('Duplicate IDs found:', [...new Set(duplicates)]);

// Now we need to remove duplicates - keep first occurrence
const lines = content.split('\n');
const newLines = [];
const foundIds = new Set();
let inProduct = false;
let currentProductId = null;
let skipUntilNextProduct = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is the start of a product
  const productStartMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (productStartMatch && !line.includes('//')) {
    const id = productStartMatch[1];
    if (foundIds.has(id)) {
      // This is a duplicate, skip it
      skipUntilNextProduct = true;
      braceCount = 1; // We're inside the product object
      console.log(`Skipping duplicate: ${id}`);
      continue;
    } else {
      foundIds.add(id);
      skipUntilNextProduct = false;
    }
  }
  
  if (skipUntilNextProduct) {
    // Count braces to know when we're out of this product
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;
    
    // Check if we're at the next product or end of array
    if (braceCount <= 0 && line.includes('}')) {
      skipUntilNextProduct = false;
    }
    continue;
  }
  
  newLines.push(line);
}

const newContent = newLines.join('\n');
fs.writeFileSync(path, newContent);
console.log(`Removed duplicates. Products: ${foundIds.size}`);
console.log('Unique IDs:', [...foundIds].slice(0, 10));
