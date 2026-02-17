import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/Products/ProductGrid'
import ProductFilters from '../components/Products/ProductFilters'
import ProductCategories from '../components/Products/ProductCategories'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: category || 'all',
    priceRange: [0, 5000],
    inStock: false,
    onSale: false,
    sortBy: 'popular'
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      // Simulate API call with mock data
      setTimeout(() => {
        setProducts(getMockProducts(category))
        setLoading(false)
      }, 500)
    }

    fetchProducts()
  }, [category])

  const getMockProducts = (categoryFilter) => {
    const allProducts = [
      // === 2026 MACBOOKS ===
      {
        id: 'macbook-pro-16-m5',
        name: 'MacBook Pro 16" M5',
        category: 'mac',
        image: '/images/macbook-pro-16-m5.jpg',
        prices: {
          apple: { price: 2499, inStock: true },
          bestbuy: { price: 2499, inStock: true }
        },
        specifications: {
          chip: ['M5 Pro', 'M5 Max'],
          memory: ['24GB', '36GB', '48GB', '64GB', '128GB'],
          storage: ['512GB', '1TB', '2TB', '4TB', '8TB']
        }
      },
      {
        id: 'macbook-pro-14-m5',
        name: 'MacBook Pro 14" M5',
        category: 'mac',
        image: '/images/macbook-pro-14-m5.jpg',
        prices: {
          apple: { price: 1599, inStock: true },
          bestbuy: { price: 1599, inStock: true }
        },
        specifications: {
          chip: ['M5', 'M5 Pro', 'M5 Max'],
          memory: ['18GB', '24GB', '36GB', '48GB', '64GB', '128GB'],
          storage: ['512GB', '1TB', '2TB', '4TB', '8TB']
        }
      },
      {
        id: 'macbook-air-13-m4',
        name: 'MacBook Air 13" M4',
        category: 'mac',
        image: '/images/macbook-air-13-m4.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true }
        },
        specifications: {
          chip: ['M4 (8-core)', 'M4 (10-core)'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB']
        }
      },
      {
        id: 'macbook-air-15-m4',
        name: 'MacBook Air 15" M4',
        category: 'mac',
        image: '/images/macbook-air-15-m4.jpg',
        prices: {
          apple: { price: 1299, inStock: true },
          amazon: { price: 1249, inStock: true }
        },
        specifications: {
          chip: ['M4 (10-core)'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB']
        }
      },
      // === 2026 MAC DESKTOPS ===
      {
        id: 'mac-mini-m4',
        name: 'Mac mini M4',
        category: 'mac',
        image: '/images/mac-mini-m4.jpg',
        prices: {
          apple: { price: 599, inStock: true },
          amazon: { price: 549, inStock: true }
        },
        specifications: {
          chip: ['M4', 'M4 Pro'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB']
        }
      },
      {
        id: 'mac-studio',
        name: 'Mac Studio',
        category: 'mac',
        image: '/images/mac-studio.jpg',
        prices: {
          apple: { price: 1999, inStock: true }
        },
        specifications: {
          chip: ['M4 Max', 'M4 Ultra'],
          memory: ['36GB', '64GB', '96GB', '128GB', '192GB'],
          storage: ['512GB', '1TB', '2TB', '4TB', '8TB']
        }
      },
      {
        id: 'imac-m4',
        name: 'iMac M4',
        category: 'mac',
        image: '/images/imac-m4.jpg',
        prices: {
          apple: { price: 1299, inStock: true }
        },
        specifications: {
          chip: ['M4'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB'],
          display: ['24" 4.5K']
        }
      },
      // === 2026 IPADS ===
      {
        id: 'ipad-pro-13-m5',
        name: 'iPad Pro 13" M5',
        category: 'ipad',
        image: '/images/ipad-pro-13-m5.jpg',
        prices: {
          apple: { price: 1099, inStock: true },
          amazon: { price: 1049, inStock: true }
        },
        specifications: {
          chip: ['M5'],
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Black']
        }
      },
      {
        id: 'ipad-pro-11-m5',
        name: 'iPad Pro 11" M5',
        category: 'ipad',
        image: '/images/ipad-pro-11-m5.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true }
        },
        specifications: {
          chip: ['M5'],
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Black']
        }
      },
      {
        id: 'ipad-air-m3-13',
        name: 'iPad Air 13" M3',
        category: 'ipad',
        image: '/images/ipad-air-m3-13.jpg',
        prices: {
          apple: { price: 599, inStock: true },
          amazon: { price: 549, inStock: true }
        },
        specifications: {
          chip: ['M3'],
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Blue', 'Purple', 'Starlight', 'Space Gray']
        }
      },
      {
        id: 'ipad-air-m3-11',
        name: 'iPad Air 11" M3',
        category: 'ipad',
        image: '/images/ipad-air-m3-11.jpg',
        prices: {
          apple: { price: 499, inStock: true },
          amazon: { price: 449, inStock: true }
        },
        specifications: {
          chip: ['M3'],
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Blue', 'Purple', 'Starlight', 'Space Gray']
        }
      },
      {
        id: 'ipad-mini',
        name: 'iPad mini',
        category: 'ipad',
        image: '/images/ipad-mini.jpg',
        prices: {
          apple: { price: 499, inStock: true }
        },
        specifications: {
          chip: ['A17 Pro'],
          storage: ['128GB', '256GB', '512GB'],
          colors: ['Starlight', 'Purple', 'Space Gray']
        }
      },
      {
        id: 'ipad-10',
        name: 'iPad (10th Gen)',
        category: 'ipad',
        image: '/images/ipad-10.jpg',
        prices: {
          apple: { price: 349, inStock: true },
          amazon: { price: 299, inStock: true }
        },
        specifications: {
          chip: ['A14 Bionic'],
          storage: ['64GB', '256GB'],
          colors: ['Blue', 'Pink', 'Yellow', 'Silver']
        }
      },
      // === 2026 AIRPODS ===
      {
        id: 'airpods-pro-3',
        name: 'AirPods Pro 3',
        category: 'airpods',
        image: '/images/airpods-pro-3.jpg',
        prices: {
          apple: { price: 249, inStock: true },
          amazon: { price: 229, inStock: true }
        },
        specifications: {
          features: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C'],
          chip: ['H3']
        }
      },
      {
        id: 'airpods-4-nc',
        name: 'AirPods 4 with ANC',
        category: 'airpods',
        image: '/images/airpods-4-nc.jpg',
        prices: {
          apple: { price: 179, inStock: true },
          amazon: { price: 159, inStock: true }
        },
        specifications: {
          features: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C'],
          chip: ['H2']
        }
      },
      // === 2026 WATCH ===
      {
        id: 'apple-watch-series-11-46',
        name: 'Apple Watch Series 11 46mm',
        category: 'watch',
        image: '/images/apple-watch-series-11.jpg',
        prices: {
          apple: { price: 429, inStock: true },
          amazon: { price: 399, inStock: true }
        },
        specifications: {
          size: ['42mm', '46mm'],
          materials: ['Aluminum', 'Titanium'],
          colors: ['Jet Black', 'Natural Titanium', 'Rose Gold']
        }
      },
      // === 2026 IPHONES (secondary) ===
      {
        id: 'iphone-17-pro-max',
        name: 'iPhone 17 Pro Max',
        category: 'iphone',
        image: '/images/iphone-17-pro-max.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1149, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB'],
          colors: ['Desert Titanium', 'Natural Titanium', 'White', 'Black']
        }
      },
      {
        id: 'iphone-17-pro',
        name: 'iPhone 17 Pro',
        category: 'iphone',
        image: '/images/iphone-17-pro.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Desert Titanium', 'Natural Titanium', 'White', 'Black']
        }
      },
      {
        id: 'iphone-17-air',
        name: 'iPhone 17 Air',
        category: 'iphone',
        image: '/images/iphone-17-air.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB'],
          colors: ['Blue', 'Green', 'Pink', 'White', 'Black']
        }
      },
      {
        id: 'iphone-16-pro-max',
        name: 'iPhone 16 Pro Max',
        category: 'iphone',
        image: '/images/iphone-16-pro-max.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1149, inStock: true },
          bestbuy: { price: 1199, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB'],
          colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-16-pro',
        name: 'iPhone 16 Pro',
        category: 'iphone',
        image: '/images/iphone-16-pro.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true },
          bestbuy: { price: 999, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-16',
        name: 'iPhone 16',
        category: 'iphone',
        image: '/images/iphone-16.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB'],
          colors: ['Ultramarine', 'Teal', 'Pink', 'White', 'Black']
        }
      },
      // 2025 MacBook Air M4
      {
        id: 'macbook-air-13-m4',
        name: 'MacBook Air 13" M4',
        category: 'mac',
        image: '/images/macbook-air-13-m4.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true },
          bestbuy: { price: 999, inStock: true }
        },
        specifications: {
          chip: ['M4 (8-core CPU/GPU)', 'M4 (10-core CPU/GPU)'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB']
        }
      },
      {
        id: 'macbook-air-15-m4',
        name: 'MacBook Air 15" M4',
        category: 'mac',
        image: '/images/macbook-air-15-m4.jpg',
        prices: {
          apple: { price: 1299, inStock: true },
          amazon: { price: 1249, inStock: true },
          bestbuy: { price: 1299, inStock: true }
        },
        specifications: {
          chip: ['M4 (10-core CPU/GPU)', 'M4 (10-core CPU/GPU)'],
          memory: ['16GB', '24GB', '32GB'],
          storage: ['256GB', '512GB', '1TB', '2TB']
        }
      },
      // 2024 MacBook Pro M4
      {
        id: 'macbook-pro-14-m4',
        name: 'MacBook Pro 14" M4',
        category: 'mac',
        image: '/images/macbook-pro-14-m4.jpg',
        prices: {
          apple: { price: 1599, inStock: true },
          bestbuy: { price: 1599, inStock: true }
        },
        specifications: {
          chip: ['M4', 'M4 Pro', 'M4 Max'],
          memory: ['18GB', '24GB', '36GB', '48GB', '64GB', '128GB'],
          storage: ['512GB', '1TB', '2TB', '4TB', '8TB']
        }
      },
      {
        id: 'macbook-pro-16-m4',
        name: 'MacBook Pro 16" M4',
        category: 'mac',
        image: '/images/macbook-pro-16-m4.jpg',
        prices: {
          apple: { price: 2499, inStock: true },
          bestbuy: { price: 2499, inStock: true }
        },
        specifications: {
          chip: ['M4 Pro', 'M4 Max'],
          memory: ['24GB', '36GB', '48GB', '64GB', '128GB'],
          storage: ['512GB', '1TB', '2TB', '4TB', '8TB']
        }
      },
      // 2024 iPad Pro M4
      {
        id: 'ipad-pro-13-m4',
        name: 'iPad Pro 13" M4',
        category: 'ipad',
        image: '/images/ipad-pro-13-m4.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true },
          bestbuy: { price: 999, inStock: true }
        },
        specifications: {
          chip: ['M4 (9-core CPU)', 'M4 (10-core CPU)'],
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Black']
        }
      },
      {
        id: 'ipad-pro-11-m4',
        name: 'iPad Pro 11" M4',
        category: 'ipad',
        image: '/images/ipad-pro-11-m4.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: true }
        },
        specifications: {
          chip: ['M4 (9-core CPU)', 'M4 (10-core CPU)'],
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Black']
        }
      },
      // 2024 iPad Air M2
      {
        id: 'ipad-air-13-m2',
        name: 'iPad Air 13" M2',
        category: 'ipad',
        image: '/images/ipad-air-13-m2.jpg',
        prices: {
          apple: { price: 599, inStock: true },
          amazon: { price: 549, inStock: true }
        },
        specifications: {
          chip: ['M2'],
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Blue', 'Purple', 'Starlight', 'Space Gray']
        }
      },
      {
        id: 'ipad-air-11-m2',
        name: 'iPad Air 11" M2',
        category: 'ipad',
        image: '/images/ipad-air-11-m2.jpg',
        prices: {
          apple: { price: 499, inStock: true },
          amazon: { price: 449, inStock: true }
        },
        specifications: {
          chip: ['M2'],
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Blue', 'Purple', 'Starlight', 'Space Gray']
        }
      },
      // 2024 Apple Watch Series 10
      {
        id: 'apple-watch-series-10-46',
        name: 'Apple Watch Series 10 46mm',
        category: 'watch',
        image: '/images/apple-watch-series-10.jpg',
        prices: {
          apple: { price: 429, inStock: true },
          amazon: { price: 399, inStock: true },
          bestbuy: { price: 429, inStock: true }
        },
        specifications: {
          size: ['42mm', '46mm'],
          materials: ['Aluminum', 'Titanium'],
          colors: ['Jet Black', 'Natural Titanium', 'Rose Gold', 'Slate']
        }
      },
      // iPhone 15 (2023 - now older)
      {
        id: 'iphone-15-pro-max',
        name: 'iPhone 15 Pro Max',
        category: 'iphone',
        image: '/images/iphone-15-pro-max.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1149, inStock: true },
          bestbuy: { price: 1199, inStock: false },
          bh: { price: 1179, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB'],
          colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        category: 'iphone',
        image: '/images/iphone-15-pro.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true },
          bestbuy: { price: 999, inStock: true },
          bh: { price: 979, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-15',
        name: 'iPhone 15',
        category: 'iphone',
        image: '/images/iphone-15.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: true },
          bh: { price: 779, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB'],
          colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black']
        }
      },
      // iPad Products
      {
        id: 'ipad-pro-12-9-m2',
        name: 'iPad Pro 12.9" M2',
        category: 'ipad',
        image: '/images/ipad-pro-12-9-m2.jpg',
        prices: {
          apple: { price: 1099, inStock: true },
          amazon: { price: 1049, inStock: true },
          bestbuy: { price: 1099, inStock: false },
          bh: { price: 1079, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Gray']
        }
      },
      {
        id: 'ipad-air-m1',
        name: 'iPad Air M1',
        category: 'ipad',
        image: '/images/ipad-air-m1.jpg',
        prices: {
          apple: { price: 599, inStock: true },
          amazon: { price: 549, inStock: true },
          bestbuy: { price: 599, inStock: true },
          bh: { price: 579, inStock: true }
        },
        specifications: {
          storage: ['64GB', '256GB'],
          colors: ['Space Gray', 'Starlight', 'Pink', 'Purple', 'Blue']
        }
      },
      // Mac Products
      {
        id: 'macbook-pro-16-m3-max',
        name: 'MacBook Pro 16" M3 Max',
        category: 'mac',
        image: '/images/macbook-pro-16-m3-max.jpg',
        prices: {
          apple: { price: 3499, inStock: true },
          amazon: { price: 3399, inStock: false },
          bestbuy: { price: 3499, inStock: true },
          bh: { price: 3449, inStock: true }
        },
        specifications: {
          storage: ['512GB', '1TB', '2TB', '4TB'],
          colors: ['Space Black', 'Silver']
        }
      },
      {
        id: 'macbook-air-m2',
        name: 'MacBook Air M2',
        category: 'mac',
        image: '/images/macbook-air-m2.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1099, inStock: true },
          bestbuy: { price: 1149, inStock: true },
          bh: { price: 1129, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Starlight', 'Space Gray', 'Midnight']
        }
      },
      // Apple Watch Products
      {
        id: 'apple-watch-series-9-45mm',
        name: 'Apple Watch Series 9 45mm',
        category: 'watch',
        image: '/images/apple-watch-series-9-45mm.jpg',
        prices: {
          apple: { price: 429, inStock: true },
          amazon: { price: 379, inStock: true },
          bestbuy: { price: 429, inStock: true },
          bh: { price: 409, inStock: true }
        },
        specifications: {
          sizes: ['41mm', '45mm'],
          colors: ['Pink', 'Starlight', 'Silver', 'Product RED', 'Midnight']
        }
      },
      {
        id: 'apple-watch-ultra-2',
        name: 'Apple Watch Ultra 2',
        category: 'watch',
        image: '/images/apple-watch-ultra-2.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: false },
          bh: { price: 779, inStock: true }
        },
        specifications: {
          sizes: ['49mm'],
          colors: ['Natural', 'Blue', 'White']
        }
      },
      // AirPods Products
      {
        id: 'airpods-pro-2',
        name: 'AirPods Pro (2nd Gen)',
        category: 'airpods',
        image: '/images/airpods-pro-2.jpg',
        prices: {
          apple: { price: 249, inStock: true },
          amazon: { price: 199, inStock: true },
          bestbuy: { price: 229, inStock: true },
          bh: { price: 219, inStock: true }
        },
        specifications: {
          features: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging']
        }
      },
      {
        id: 'airpods-max',
        name: 'AirPods Max',
        category: 'airpods',
        image: '/images/airpods-max.jpg',
        prices: {
          apple: { price: 549, inStock: true },
          amazon: { price: 479, inStock: true },
          bestbuy: { price: 549, inStock: true },
          bh: { price: 519, inStock: true }
        },
        specifications: {
          colors: ['Space Gray', 'Silver', 'Sky Blue', 'Green', 'Pink']
        }
      }
    ]

    if (!categoryFilter || categoryFilter === 'all') {
      return allProducts
    }

    return allProducts.filter(product => product.category === categoryFilter)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const filterProducts = (products) => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false
      }

      // Price range filter
      const minPrice = Math.min(...Object.values(product.prices).map(p => p.price))
      if (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1]) {
        return false
      }

      // In stock filter
      if (filters.inStock) {
        const hasStock = Object.values(product.prices).some(p => p.inStock)
        if (!hasStock) return false
      }

      // On sale filter
      if (filters.onSale) {
        const prices = Object.values(product.prices).map(p => p.price)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)
        if (maxPrice === minPrice) return false // No price variation
      }

      return true
    })
  }

  const sortProducts = (products) => {
    const sorted = [...products]
    
    // Popular products - 2026: MacBooks, iPads, Watch, AirPods first
    const popularProducts = ['macbook-pro', 'macbook-air', 'ipad-pro', 'ipad-air', 'ipad-mini', 'mac-mini', 'mac-studio', 'imac', 'apple-watch', 'airpods', 'iphone-17']
    
    switch (filters.sortBy) {
      case 'popular':
        return sorted.sort((a, b) => {
          const aIndex = popularProducts.findIndex(p => a.id?.includes(p) || a.name?.toLowerCase().includes(p))
          const bIndex = popularProducts.findIndex(p => b.id?.includes(p) || b.name?.toLowerCase().includes(p))
          const aScore = aIndex === -1 ? 999 : aIndex
          const bScore = bIndex === -1 ? 999 : bIndex
          return aScore - bScore
        })
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...Object.values(a.prices).map(p => p.price))
          const priceB = Math.min(...Object.values(b.prices).map(p => p.price))
          return priceA - priceB
        })
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...Object.values(a.prices).map(p => p.price))
          const priceB = Math.min(...Object.values(b.prices).map(p => p.price))
          return priceB - priceA
        })
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        // Default to popular
        return sorted.sort((a, b) => {
          const aIndex = popularProducts.findIndex(p => a.id?.includes(p) || a.name?.toLowerCase().includes(p))
          const bIndex = popularProducts.findIndex(p => b.id?.includes(p) || b.name?.toLowerCase().includes(p))
          const aScore = aIndex === -1 ? 999 : aIndex
          const bScore = bIndex === -1 ? 999 : bIndex
          return aScore - bScore
        })
    }
  }

  const filteredAndSortedProducts = sortProducts(filterProducts(products))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {category ? 
            `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 
            'All Products'
          }
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare prices and track your favorite Apple products
        </p>
      </div>

      <ProductCategories currentCategory={category} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:w-3/4">
          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog