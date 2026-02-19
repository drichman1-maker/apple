import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-lg">
          No products found matching your criteria.
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="glass-card p-3 hover-glow animate-slide-up cursor-pointer"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="relative aspect-[4/3] mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold px-2 py-1 bg-red-600 rounded text-xs">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {product.brand}
              </p>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mt-0.5 line-clamp-1">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price}
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-1">
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-2 py-1.5 rounded text-xs font-medium transition-colors text-center"
              >
                Details
              </Link>
              <Link
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors text-center flex items-center justify-center ${
                  product.inStock
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                onClick={!product.inStock ? (e) => e.preventDefault() : undefined}
              >
                <span>Buy</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}