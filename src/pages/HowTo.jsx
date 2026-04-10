import React from 'react'
import { Link } from 'react-router-dom'

const HowTo = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        How to Use TheresMac
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        A complete guide to finding the best Apple product deals
      </p>

      {/* Browse Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          📱 Browsing Products
        </h2>
        <div className="card p-6">
          <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li>
              <strong>Visit the homepage</strong> to see all tracked Apple products
            </li>
            <li>
              <strong>Filter by category</strong> using the buttons (MacBook, iPad, iPhone, Watch, AirPods, Mac)
            </li>
            <li>
              <strong>Search</strong> using the search bar (Cmd+K or click the search button)
            </li>
            <li>
              <strong>Sort</strong> by Newest, Best Deal, or Price
            </li>
            <li>
              <strong>Toggle New/Refurb</strong> to see new or refurbished products
            </li>
          </ol>
        </div>
      </section>

      {/* Product Details */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🔍 Viewing Product Details
        </h2>
        <div className="card p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click any product card to see:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ <strong>Best current price</strong> and which retailer offers it</li>
            <li>✓ <strong>Price history chart</strong> (90 days)</li>
            <li>✓ <strong>All retailer prices</strong> side by side</li>
            <li>✓ <strong>Stock status</strong> (In Stock, Limited, Out of Stock)</li>
            <li>✓ <strong>Product specifications</strong></li>
            <li>✓ <strong>Resale value estimate</strong></li>
          </ul>
        </div>
      </section>

      {/* Setting Up Alerts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🔔 Setting Up Price Alerts
        </h2>
        <div className="card p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Get notified when prices drop to your target:
          </p>
          <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li>
              <strong>Sign in</strong> with Google (click "Sign In" in the navbar)
            </li>
            <li>
              <strong>Go to Alerts</strong> or click "Set Alert" on a product page
            </li>
            <li>
              <strong>Select the product</strong> you want to track
            </li>
            <li>
              <strong>Enter your target price</strong> (the price you want to pay)
            </li>
            <li>
              <strong>Click "Create Alert"</strong>
            </li>
          </ol>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
            We'll email you when the price drops to or below your target.
          </p>
        </div>
      </section>

      {/* Managing Alerts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ⚙️ Managing Your Alerts
        </h2>
        <div className="card p-6">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• View all your alerts on the <Link to="/alerts" className="text-apple-blue hover:underline">Alerts page</Link></li>
            <li>• Delete alerts you no longer need</li>
            <li>• Set up to 5 alerts per product category</li>
            <li>• Alerts are checked multiple times per day</li>
          </ul>
        </div>
      </section>

      {/* Comparing Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Comparing Products
        </h2>
        <div className="card p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Compare multiple Apple products side by side:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li>Go to the <Link to="/compare" className="text-apple-blue hover:underline">Compare page</Link></li>
            <li>Select 2-4 products to compare</li>
            <li>View specs, prices, and value scores side by side</li>
          </ol>
        </div>
      </section>

      {/* Retailer Pages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🏪 Retailer Pages
        </h2>
        <div className="card p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            See all products available at a specific retailer:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <strong>Apple</strong> - Official Apple Store prices and stock</li>
            <li>• <strong>Amazon</strong> - Wide selection, fast shipping</li>
            <li>• <strong>Best Buy</strong> - In-store pickup, price matching</li>
            <li>• <strong>B&H Photo</strong> - Pro gear, no sales tax outside NY</li>
            <li>• <strong>Adorama</strong> - Camera & tech retailer</li>
            <li>• <strong>eBay</strong> - Refurbished and used deals</li>
            <li>• <strong>Back Market</strong> - Certified refurbished</li>
          </ul>
          <Link to="/retailers" className="inline-block mt-4 text-apple-blue hover:underline">
            View all retailers →
          </Link>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          💡 Pro Tips
        </h2>
        <div className="card p-6">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✓ <strong>Best time to buy:</strong> Black Friday, Prime Day, Back-to-School (August)</li>
            <li>✓ <strong>Apple releases:</strong> New Macs typically October-November</li>
            <li>✓ <strong>Refurbished:</strong> Apple's refurbished store offers 15% off with full warranty</li>
            <li>✓ <strong>Education pricing:</strong> Students and educators get 5-10% off at Apple</li>
            <li>✓ <strong>Price matching:</strong> Best Buy and B&H often match Apple Store prices</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              How accurate are the prices?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Prices are updated multiple times per day. Each price shows a timestamp. 
              Prices marked "Estimated" are predictions based on historical patterns.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Is TheresMac free?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, completely free. We earn a small commission when you purchase through our links 
              at no extra cost to you.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Do I need to create an account?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No account needed to browse products. You only need to sign in (with Google) to set up price alerts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Find Your Deal?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start browsing or set up your first price alert.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Browse Products
          </Link>
          <Link to="/alerts" className="btn-secondary">
            Set Up Alerts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HowTo
