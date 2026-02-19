import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { products } from '@/data/products'

export default function FeaturedProducts() {
  // Get top-rated products (4 featured products)
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

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

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Top-rated wellness devices chosen by our experts
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                  Featured
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {product.brand}
                </p>
                
                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
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

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}