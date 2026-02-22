import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Apple, Sparkles, Package, RefreshCw } from 'lucide-react'
import { useProductCondition } from '../../contexts/ProductConditionContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [conditionDropdownOpen, setConditionDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { condition, setCondition, isNew } = useProductCondition()
  const location = useLocation()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setConditionDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Products', href: '/' },
    { name: 'iPhone', href: '/products/iphone' },
    { name: 'iPad', href: '/products/ipad' },
    { name: 'Mac', href: '/products/mac' },
    { name: 'Watch', href: '/products/watch' },
    { name: 'AirPods', href: '/products/airpods' },
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo - Simplified for mobile */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-apple-blue to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-shadow flex-shrink-0">
                <Apple className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white truncate">MacTrackr</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'bg-white/10 text-apple-blue'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Blog - Desktop only */}
            <Link
              to="/blog"
              className="hidden lg:inline-flex items-center px-4 py-2 bg-[#1a1a1a] border border-[#333] text-white rounded-lg font-medium text-sm hover:bg-[#262626] transition-all"
            >
              Blog
            </Link>
            
            {/* Price Alerts - Desktop only */}
            <Link
              to="/alerts"
              className="hidden lg:inline-flex items-center px-4 py-2 bg-gradient-to-r from-apple-blue to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Alerts</span>
            </Link>
            
            {/* Condition Toggle - Compact button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setConditionDropdownOpen(!conditionDropdownOpen)}
                className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-lg border transition-all duration-200 ${
                  isNew
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
                }`}
                aria-label={isNew ? 'New products' : 'Refurbished products'}
              >
                {isNew ? (
                  <Package className="h-5 w-5 sm:mr-1.5" />
                ) : (
                  <RefreshCw className="h-5 w-5 sm:mr-1.5" />
                )}
                <span className="hidden sm:inline text-sm font-medium">{isNew ? 'New' : 'Refurb'}</span>
              </button>
              
              {conditionDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-xl bg-[#1a1a1a] border border-[#333] shadow-2xl py-2 z-[101]">
                  <button
                    onClick={() => {
                      setCondition('new')
                      setConditionDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                      isNew ? 'bg-blue-500/20 text-white' : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isNew ? 'bg-blue-400' : 'bg-gray-600'}`} />
                    <div className="flex-1">
                      <div className="text-white">New</div>
                      <div className="text-xs text-gray-500">Latest models, sealed</div>
                    </div>
                    {isNew && <span className="text-blue-400">✓</span>}
                  </button>
                  
                  <div className="mx-3 my-1 border-t border-[#333]"></div>
                  
                  <button
                    onClick={() => {
                      setCondition('refurbished')
                      setConditionDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                      !isNew ? 'bg-green-500/20 text-white' : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${!isNew ? 'bg-green-400' : 'bg-gray-600'}`} />
                    <div className="flex-1">
                      <div className="text-white">Certified Refurbished</div>
                      <div className="text-xs text-gray-500">Apple tested, 1yr warranty</div>
                    </div>
                    {!isNew && <span className="text-green-400">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Larger touch target */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
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

      {/* Mobile Navigation - Full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-black/95 backdrop-blur-xl z-[99]">
          <div className="px-4 py-4 space-y-1 h-full overflow-y-auto">
            {/* Main nav items */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-white/10 text-apple-blue'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className="my-4 border-t border-white/10"></div>
            
            {/* Blog link */}
            <Link
              to="/blog"
              className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                isActive('/blog')
                  ? 'bg-white/10 text-apple-blue'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Blog
            </Link>
            
            {/* Price Alerts CTA */}
            <Link
              to="/alerts"
              className="flex items-center justify-center w-full mt-4 px-4 py-4 bg-gradient-to-r from-apple-blue to-blue-600 text-white rounded-xl font-medium text-lg hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Price Alerts
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar