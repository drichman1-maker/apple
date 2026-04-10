const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const htmlPath = path.join(__dirname, 'public', 'og-image.html');
  const outputPath = path.join(__dirname, 'public', 'og-image.png');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: outputPath, type: 'png' });
  
  await browser.close();
  
  console.log(`✅ Generated ${outputPath}`);
}

generateOGImage().catch(console.error);
