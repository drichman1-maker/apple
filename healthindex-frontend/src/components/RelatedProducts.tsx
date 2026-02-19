import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Equipment, equipment } from '@/data/equipment'

interface RelatedProductsProps {
  currentProduct: Equipment
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Find related products from the same category, excluding current product
  const relatedProducts = equipment
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3)

  const renderStars = (rating?: number) => {
    if (!rating) return null
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-600'
        }`}
      />
    ))
  }

  const getLowestPrice = (prices: Equipment['prices']) => {
    return Math.min(...Object.values(prices).map(p => p.price))
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">
        You Might Also Like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="bg-charcoal border border-gray-dark rounded-xl overflow-hidden hover:border-neon-cyan/50 transition-all group"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-white leading-tight group-hover:text-neon-cyan transition-colors">
                {product.name}
              </h3>

              {product.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-400">
                    ({product.reviewCount || 0})
                  </span>
                </div>
              )}

              <p className="text-gray-400 text-sm line-clamp-2">
                {product.description}
              </p>

              <div className="text-xl font-bold text-white">
                From ${getLowestPrice(product.prices)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
