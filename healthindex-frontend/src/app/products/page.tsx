'use client'

import { useState, useMemo } from 'react'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import { products } from '@/data/products'
import { Product } from '@/types'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [sortBy, setSortBy] = useState<string>('name')

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return categoryMatch && brandMatch && priceMatch
    })

    // Sort products
    filtered.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [selectedCategory, selectedBrand, priceRange, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wellness Products
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover our curated selection of wellness technology products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main className="lg:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} products
            </p>
          </div>
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  )
}