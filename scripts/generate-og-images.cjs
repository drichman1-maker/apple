const { chromium } = require('/Users/douglasrichman/.hermes/hermes-agent/node_modules/playwright');
const fs = require('fs');
const path = require('path');

async function generateOgImage(htmlPath, pngPath) {
  console.log(`Generating: ${path.basename(pngPath)}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to OG image dimensions (1200x630)
  await page.setViewportSize({ width: 1200, height: 630 });

  // Load the HTML file
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Wait a bit for fonts/styles to settle
  await page.waitForTimeout(500);

  // Take screenshot
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();
  console.log(`  ✓ Saved: ${pngPath}`);
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const blogOgDir = path.join(publicDir, 'blog-og');

  // Generate main OG image first
  console.log('Generating main OG image...\n');
  const mainHtmlPath = path.join(publicDir, 'og-image.html');
  const mainPngPath = path.join(publicDir, 'og-image.png');
  if (fs.existsSync(mainHtmlPath)) {
    await generateOgImage(mainHtmlPath, mainPngPath);
  } else {
    console.log('  ⚠️  og-image.html not found, skipping main OG image');
  }

  // Generate blog OG images
  const htmlFiles = fs.readdirSync(blogOgDir).filter(f => f.endsWith('.html'));
  console.log(`\nFound ${htmlFiles.length} blog HTML templates to convert\n`);

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(blogOgDir, htmlFile);
    const pngFile = htmlFile.replace('.html', '.png');
    const pngPath = path.join(blogOgDir, pngFile);

    await generateOgImage(htmlPath, pngPath);
  }

  console.log('\n✅ All OG images regenerated successfully!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
