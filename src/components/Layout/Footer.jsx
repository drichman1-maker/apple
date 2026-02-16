import React from 'react'
import { Link } from 'react-router-dom'
import { Apple, Twitter, Github, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Apple className="h-8 w-8 text-apple-blue" />
              <span className="text-xl font-bold">MacTrackr</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track Apple product prices across multiple retailers. Get notified when your favorite Apple products go on sale.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/iphone"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  iPhone
                </Link>
              </li>
              <li>
                <Link
                  to="/products/ipad"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  iPad
                </Link>
              </li>
              <li>
                <Link
                  to="/products/mac"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  Mac
                </Link>
              </li>
              <li>
                <Link
                  to="/products/watch"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  Apple Watch
                </Link>
              </li>
              <li>
                <Link
                  to="/products/airpods"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  AirPods
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/alerts"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  Price Alerts
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 MacTrackr. All rights reserved. Not affiliated with Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer