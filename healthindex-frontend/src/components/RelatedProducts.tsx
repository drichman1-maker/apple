import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Product } from '@/types'
import { products } from '@/data/products'

interface RelatedProductsProps {
  currentProduct: Product
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Find related products from the same category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3)

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

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        You Might Also Like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="product-card group"
          >
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {product.brand}
              </p>
              
              <h3 className="font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviewCount})
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {product.description}
              </p>

              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}