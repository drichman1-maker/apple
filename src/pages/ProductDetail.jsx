import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import PriceVelocityChart from '../components/Product/PriceVelocityChart'
import ResaleValueCard from '../components/Product/ResaleValueCard'
import RetailerAvailability from '../components/Product/RetailerAvailability'
import PriceAlertsPanel from '../components/Product/PriceAlertsPanel'
import SpecPills from '../components/Product/SpecPills'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { getProduct } from '../api'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProductData()
  }, [id])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const data = await getProduct(id)
      setProduct(data)
      
      // Generate 90-day price history for all retailers
      const history = generatePriceHistory(data.prices)
      setPriceHistory(history)
      
      setError(null)
    } catch (err) {
      console.error('Failed to fetch product:', err)
      setError('Failed to load product data')
    } finally {
      setLoading(false)
    }
  }

  const generatePriceHistory = (prices) => {
    const now = new Date()
    const data = []
    const days = 90
    
    const basePrices = {}
    Object.entries(prices).forEach(([retailer, data]) => {
      basePrices[retailer] = data.price
    })

    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000)
      const point = { date: date.toISOString().split('T')[0] }
      
      Object.entries(basePrices).forEach(([retailer, basePrice]) => {
        const trend = Math.sin((days - i) / 15) * (basePrice * 0.03)
        const noise = (Math.random() - 0.5) * (basePrice * 0.02)
        point[retailer] = Math.round(basePrice + trend + noise)
      })
      
      data.push(point)
    }
    
    return data
  }

  const getBestPrice = (prices) => {
    return Object.entries(prices).reduce((best, [retailer, data]) => {
      if (data.price < best.price && data.inStock) {
        return { retailer, ...data }
      }
      return best
    }, { price: Infinity })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
          <Link to="/products" className="text-blue-400 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const bestPrice = getBestPrice(product.prices)
  const msrp = Math.max(...Object.values(product.prices).map(p => p.price))
  const savings = msrp - bestPrice.price

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/products" 
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
            <h1 className="text-xl font-bold text-white">{product.name}</h1>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
            {product.modelNumber && (
              <p className="text-gray-500">
                Model: {product.modelNumber} | SKU: {product.sku}
              </p>
            )}
          </div>
          <a
            href={bestPrice.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            BUY NOW
          </a>
        </div>

        {/* Specs List */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {product.specs && Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-500 uppercase text-sm tracking-wide">{key}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Best Market Price */}
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Best Market Price</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                {bestPrice.retailer?.toUpperCase()}
              </span>
            </div>
            <div className="text-5xl font-bold text-white mb-2">
              ${bestPrice.price?.toLocaleString()}
            </div>
            {savings > 0 && (
              <p className="text-green-400 text-sm">
                {savings.toLocaleString()} USD below MSRP
              </p>
            )}
          </div>

          {/* Resale Value */}
          <ResaleValueCard currentPrice={bestPrice.price} />
        </div>

        {/* Spec Pills */}
        <div className="mb-8">
          <SpecPills specs={product.specs} />
        </div>

        {/* Price Velocity Chart */}
        <div className="mb-8">
          <PriceVelocityChart 
            data={priceHistory} 
            retailers={Object.keys(product.prices)} 
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Retailer Availability */}
          <RetailerAvailability prices={product.prices} />

          {/* Price Alerts */}
          <PriceAlertsPanel 
            currentPrice={bestPrice.price} 
            productId={product.id} 
          />
        </div>
      </main>
    </div>
  )
}

export default ProductDetail