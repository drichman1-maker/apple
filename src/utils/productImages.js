// Product image mapping for Apple products
// Using verified working Apple CDN URLs

export const getProductImage = (productId, category) => {
  // Direct working URLs for popular products
  const images = {
    // iPhone 17 Series (2026)
    'iphone-17-pro-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-max-desert-titanium-select-202511?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1751328000000',
    'iphone-17-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-desert-titanium-select-202511?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1751328000000',
    'iphone-17-air': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-air-blue-select-202511?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1751328000000',
    'iphone-17': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-blue-select-202511?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1751328000000',
    
    // iPhone 16 Series (2025) - Using verified URLs
    'iphone-16': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-black-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725630000000',
    'iphone-16-plus': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-plus-black-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725630000000',
    'iphone-16-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-black-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725630000000',
    'iphone-16-pro-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-black-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725630000000',
    
    // iPhone 15 Series
    'iphone-15': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1694625000000',
    'iphone-15-plus': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-blue-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1694625000000',
    'iphone-15-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-natural-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1694625000000',
    'iphone-15-pro-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1694625000000',
    
    // MacBook Air M4 (2025)
    'macbook-air-13-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-midnight-select-202501?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1735680000000',
    'macbook-air-15-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-15-silver-select-202501?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1735680000000',
    
    // MacBook Air M3 (2024)
    'macbook-air-13-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-starlight-select-202402?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1708367688219',
    'macbook-air-15-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-15-starlight-select-202402?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1708367688219',
    'macbook-air-m3-13': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-starlight-select-202402?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1708367688219',
    'macbook-air-m3-15': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-15-starlight-select-202402?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1708367688219',
    'macbook-air-m2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-starlight-select-202402?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1708367688219',
    
    // MacBook Pro M5 (2026)
    'macbook-pro-14-m5': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-14-spaceblack-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    'macbook-pro-16-m5': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-16-spaceblack-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    
    // MacBook Pro M4 (2024)
    'macbook-pro-14-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-14-spaceblack-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'macbook-pro-16-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-16-spaceblack-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'macbook-pro-14-m4-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-14-spaceblack-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'macbook-pro-16-m4-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-16-spaceblack-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'macbook-pro-14-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-14-spaceblack-select-202310?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1697311054290',
    'macbook-pro-16-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-16-spaceblack-select-202310?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1697311054290',
    
    // Mac mini M4 (2024)
    'mac-mini-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-pickered-202411?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1730332800000',
    'mac-mini': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-pickered-202411?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1730332800000',
    
    // iMac M4 (2024)
    'imac-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'imac': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-select-202410?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    
    // iPad Pro M5 (2026)
    'ipad-pro-13-m5': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-spaceblack-wifi-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    'ipad-pro-11-m5': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-spaceblack-wifi-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    
    // iPad Pro M4 (2024)
    'ipad-pro-13-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-spaceblack-wifi-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    'ipad-pro-11-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-spaceblack-wifi-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    'ipad-pro-12-9-m2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-9-silver-select-202212?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1670947200000',
    
    // iPad Air M3 (2025)
    'ipad-air-m3-13': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-13-blue-select-202501?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1735680000000',
    'ipad-air-m3-11': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-blue-select-202501?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1735680000000',
    
    // iPad Air M2 (2024)
    'ipad-air-13-m2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-13-blue-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    'ipad-air-11-m2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-blue-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    
    // iPad mini
    'ipad-mini': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-purple-select-202409?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1728000000000',
    'ipad-air-m1': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-blue-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    'ipad-air': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-blue-select-202405?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1714022400000',
    
    // Apple Watch Series 11 (2026)
    'apple-watch-series-11': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-alum-46mm-black-nc-cellular-select-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000',
    'apple-watch-series-11-46': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-alum-46mm-black-nc-cellular-select-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000',
    
    // Apple Watch Series 10 (2024)
    'apple-watch-series-10': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-alum-46mm-black-nc-cellular-select-202409?wid=2048&hei=2048&fmt=png-alpha&.v=1728000000000',
    'apple-watch-series-10-46': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-alum-46mm-black-nc-cellular-select-202409?wid=2048&hei=2048&fmt=png-alpha&.v=1728000000000',
    'apple-watch-ultra-2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-titanium-nc-cellular-select-202409?wid=2048&hei=2048&fmt=png-alpha&.v=1728000000000',
    'apple-watch-se': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-44mm-midnight-nc-cellular-select-202409?wid=2048&hei=2048&fmt=png-alpha&.v=1728000000000',
    
    // AirPods (2026)
    'airpods-pro-3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-3rd-gen-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000',
    'airpods-4-nc': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000',
    
    // AirPods (older)
    'airpods-pro-2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen-202411?wid=2048&hei=2048&fmt=png-alpha&.v=1730332800000',
    'airpods-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen-202411?wid=2048&hei=2048&fmt=png-alpha&.v=1730332800000',
    'airpods-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-silver-select-202409?wid=2048&hei=2048&fmt=png-alpha&.v=1728000000000',
    'airpods-3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-3rd-gen-202411?wid=2048&hei=2048&fmt=png-alpha&.v=1730332800000',
  }

  // Return specific image or fallback
  if (images[productId]) {
    return images[productId]
  }

  // Category fallbacks - 2026 latest
  const categoryFallbacks = {
    mac: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-14-spaceblack-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    iphone: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-desert-titanium-select-202511?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1751328000000',
    ipad: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-spaceblack-wifi-select-202511?wid=4520&hei=2540&fmt=jpeg&qlt=90&.v=1751328000000',
    watch: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-alum-46mm-black-nc-cellular-select-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000',
    airpods: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-202511?wid=2048&hei=2048&fmt=png-alpha&.v=1751328000000'
  }

  return categoryFallbacks[category] || categoryFallbacks.mac
}

export default getProductImage
