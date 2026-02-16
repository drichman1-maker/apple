import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, Bell, Search, BarChart3 } from 'lucide-react'
import Hero from '../components/Home/Hero'
import FeaturedProducts from '../components/Home/FeaturedProducts'
import Features from '../components/Home/Features'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <FeaturedProducts />
      
      {/* CTA Section */}
      <section className="bg-apple-blue text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Deal Again
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Set up price alerts and get notified when your favorite Apple products drop in price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/alerts"
              className="bg-white text-apple-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Create Alert
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-apple-blue transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home