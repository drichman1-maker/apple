
import { EnhancedPriceOracle } from '../packages/infra/src/price-oracle';

const runVerification = async () => {
    const oracle = new EnhancedPriceOracle();
    const catalog = oracle.getProductCatalog();

    console.log(`\n🔍 Verifying Data Layer...`);
    console.log(`----------------------------------------`);
    console.log(`✅ Catalog Size: ${catalog.length} products loaded.`);

    // Verify Categories
    const macs = oracle.getProductsByCategory('Mac');
    const iphones = oracle.getProductsByCategory('iPhone');
    console.log(`✅ Categories Checked: ${macs.length} Macs, ${iphones.length} iPhones.`);

    // Verify Search
    const searchTest = 'MW2'; // Model Number fragment
    const results = oracle.searchProducts(searchTest);
    console.log(`✅ Search Test ('${searchTest}'): Found ${results.length} matches.`);
    if (results.length > 0) {
        console.log(`   - First Match: ${results[0].name} (SKU: ${results[0].sku})`);
    } else {
        console.error(`❌ Search Logic Failed`);
    }

    // Verify Prices & Links
    if (catalog.length > 0) {
        const sample = catalog[0];
        const prices = await oracle.fetchRetailerPrices(sample.sku);
        console.log(`\n💰 Price Verification for ${sample.name}:`);
        console.log(`   - Base Price: $${sample.basePrice}`);
        console.log(`   - Retailer Quotes Found: ${prices.length}`);

        const hasUrls = prices.every(p => p.url && p.url.startsWith('http'));
        if (hasUrls) {
            console.log(`✅ URL Generation: SUCCESS`);
            console.log(`   - Sample Link: ${prices[0].url}`);
        } else {
            console.error(`❌ URL Generation Failed`);
        }
    }

    console.log(`\n----------------------------------------`);
    console.log(`🚀 VERIFICATION COMPLETE`);
};

runVerification();
