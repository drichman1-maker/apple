import React from 'react'
import { Link } from 'react-router-dom'
import { Apple, Twitter, Github, Mail, Sparkles, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA Section */}
        <div className="mb-16">
          <div className="glass-card-dark p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-apple-blue/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-apple-blue mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Never miss a deal
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Set Up Price Alerts
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Get instant notifications when your favorite Apple products drop in price.
              </p>
              <Link 
                to="/alerts"
                className="btn-neon inline-flex items-center px-8 py-4 text-lg"
              >
                Create Free Alert
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-apple-blue to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-shadow">
                <Apple className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MacTrackr</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Track Apple product prices across multiple retailers. Get notified when your favorite Apple products go on sale.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/mactrackr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-apple-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/drichman1-maker" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:hello@mactrackr.com" className="text-gray-500 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products/iphone" className="text-gray-400 hover:text-apple-blue transition-colors">
                  iPhone
                </Link>
              </li>
              <li>
                <Link to="/products/ipad" className="text-gray-400 hover:text-apple-blue transition-colors">
                  iPad
                </Link>
              </li>
              <li>
                <Link to="/products/mac" className="text-gray-400 hover:text-apple-blue transition-colors">
                  Mac
                </Link>
              </li>
              <li>
                <Link to="/products/watch" className="text-gray-400 hover:text-apple-blue transition-colors">
                  Apple Watch
                </Link>
              </li>
              <li>
                <Link to="/products/airpods" className="text-gray-400 hover:text-apple-blue transition-colors">
                  AirPods
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-apple-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-gray-400 hover:text-apple-blue transition-colors">
                  Price Alerts
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-apple-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-apple-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © 2026 MacTrackr. All rights reserved. Not affiliated with Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer