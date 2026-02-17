import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ExternalLink, Shield, Truck, RefreshCcw } from 'lucide-react'
import { products } from '@/data/products'
import { Product } from '@/types'
import RelatedProducts from '@/components/RelatedProducts'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p: Product) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              by {product.brand}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-primary-600">
            ${product.price}
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          {product.features && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <div className="space-y-4">
            <Link
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>Buy Now</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              * This is an affiliate link. We may earn a commission at no extra cost to you.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure Purchase</p>
            </div>
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast Shipping</p>
            </div>
            <div className="text-center">
              <RefreshCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      {product.specifications && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Specifications
          </h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {key}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </div>
  )
}