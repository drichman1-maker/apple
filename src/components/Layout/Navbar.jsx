import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Apple, Sparkles } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'iPhone', href: '/products/iphone' },
    { name: 'iPad', href: '/products/ipad' },
    { name: 'Mac', href: '/products/mac' },
    { name: 'Watch', href: '/products/watch' },
    { name: 'AirPods', href: '/products/airpods' },
    { name: 'Alerts', href: '/alerts' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-apple-blue to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-shadow">
                <Apple className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MacTrackr</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.slice(0, -2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-white/10 text-apple-blue'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - CTA + Theme */}
          <div className="flex items-center space-x-3">
            <Link
              to="/alerts"
              className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-apple-blue to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Price Alerts
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-6 space-y-1 bg-black/95 backdrop-blur-xl border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-white/10 text-apple-blue'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/alerts"
              className="flex items-center justify-center w-full mt-4 px-4 py-3 bg-gradient-to-r from-apple-blue to-blue-600 text-white rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Price Alerts
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar