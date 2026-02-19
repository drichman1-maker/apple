import React from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Tablet, Laptop, Watch, Headphones, Grid3X3 } from 'lucide-react'

const ProductCategories = ({ currentCategory }) => {
  const categories = [
    {
      id: 'all',
      name: 'All Products',
      icon: Grid3X3,
      href: '/products',
      count: '50+'
    },
    {
      id: 'iphone',
      name: 'iPhone',
      icon: Smartphone,
      href: '/products/iphone',
      count: '12'
    },
    {
      id: 'ipad',
      name: 'iPad',
      icon: Tablet,
      href: '/products/ipad',
      count: '8'
    },
    {
      id: 'mac',
      name: 'Mac',
      icon: Laptop,
      href: '/products/mac',
      count: '15'
    },
    {
      id: 'watch',
      name: 'Apple Watch',
      icon: Watch,
      href: '/products/watch',
      count: '6'
    },
    {
      id: 'airpods',
      name: 'AirPods',
      icon: Headphones,
      href: '/products/airpods',
      count: '4'
    }
  ]

  const isActive = (categoryId) => {
    if (categoryId === 'all') {
      return !currentCategory
    }
    return currentCategory === categoryId
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.href}
          className={`card p-6 text-center hover:shadow-lg transition-all duration-300 ${
            isActive(category.id) 
              ? 'ring-2 ring-apple-blue bg-apple-blue/5 dark:bg-apple-blue/10' 
              : ''
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${
              isActive(category.id)
                ? 'bg-apple-blue text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              <category.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className={`font-medium ${
                isActive(category.id)
                  ? 'text-apple-blue'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {category.count} products
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductCategories