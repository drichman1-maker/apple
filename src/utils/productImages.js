// Product image mapping for Apple products
// Uses Apple's official product images or high-quality fallbacks

export const getProductImage = (productId, category) => {
  const images = {
    // MacBook Pro
    'macbook-pro-14-m4-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
    'macbook-pro-16-m4-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
    
    // MacBook Air
    'macbook-air-13-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688219',
    'macbook-air-15-m3': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684340991622',
    
    // iPhone
    'iphone-15': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378',
    'iphone-15-pro': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895702781',
    'iphone-15-pro-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895702781',
    
    // iPad
    'ipad-pro-13-m4': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-finish-select-202405-space-black-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713920820139',
    'ipad-air-11-m2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713308272877',
    
    // Apple Watch
    'apple-watch-series-10': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-46-aluminum-jetblack-nc-s10_VW_PF+watch-face-46-aluminum-jetblack-s10_VW_PF?wid=1000&hei=1000&fmt=png-alpha&.v=1724370702654',
    'apple-watch-ultra-2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-49-titanium-ultra2_VW_PF+watch-face-49-alpine-ultra2_VW_PF?wid=1000&hei=1000&fmt=png-alpha&.v=1724193111854',
    
    // AirPods
    'airpods-pro-2': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
    'airpods-max': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=470&hei=556&fmt=png-alpha&.v=1604021221000'
  }

  // Return specific image or fallback
  if (images[productId]) {
    return images[productId]
  }

  // Category fallbacks
  const categoryFallbacks = {
    mac: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
    iphone: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378',
    ipad: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-finish-select-202405-space-black-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713920820139',
    watch: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-46-aluminum-jetblack-nc-s10_VW_PF+watch-face-46-aluminum-jetblack-s10_VW_PF?wid=1000&hei=1000&fmt=png-alpha&.v=1724370702654',
    airpods: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361'
  }

  return categoryFallbacks[category] || categoryFallbacks.mac
}

export default getProductImage