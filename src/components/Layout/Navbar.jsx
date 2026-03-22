import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Apple, Sparkles, ChevronDown, Search } from 'lucide-react'
import SearchModal from '../Search/SearchModal'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [retailersOpen, setRetailersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const productsRef = useRef(null)
  const retailersRef = useRef(null)
  const location = useLocation()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false)
      }
      if (retailersRef.current && !retailersRef.current.contains(event.target)) {
        setRetailersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Global Cmd/Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdowns when route changes
  useEffect(() => {
    setProductsOpen(false)
    setRetailersOpen(false)
    setIsOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const products = [
    { name: 'Mac', href: '/products/mac', desc: 'MacBook, iMac, Mac mini, Mac Studio' },
    { name: 'iPhone', href: '/products/iphone', desc: 'Latest iPhone models' },
    { name: 'iPad', href: '/products/ipad', desc: 'iPad Pro, Air, mini' },
    { name: 'Watch', href: '/products/watch', desc: 'Apple Watch models' },
    { name: 'AirPods', href: '/products/airpods', desc: 'AirPods and accessories' },
  ]

  const retailers = [
    { name: 'Amazon', href: '/retailers/amazon' },
    { name: 'Best Buy', href: '/retailers/bestbuy' },
    { name: 'B&H Photo', href: '/retailers/bh' },
    { name: 'Apple', href: '/retailers/apple' },
    { name: 'Walmart', href: '/retailers/walmart' },
    { name: 'Target', href: '/retailers/target' },
    { name: 'Micro Center', href: '/retailers/microcenter' },
    { name: 'Adorama', href: '/retailers/adorama' },
    { name: 'eBay', href: '/retailers/ebay' },
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Apple className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TheresMac</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Products Dropdown */}
              <div className="relative" ref={productsRef}>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/products') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Products
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {productsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-2 z-50">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-500 text-xs">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/compare"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/compare') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Compare
              </Link>

              {/* Retailers Dropdown */}
              <div className="relative" ref={retailersRef}>
                <button
                  onClick={() => setRetailersOpen(!retailersOpen)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/retailers') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Retailers
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${retailersOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {retailersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto">
                    {retailers.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/blog') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Blog
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-gray-400 hover:text-white transition-all text-sm"
              >
                <Search className="h-4 w-4" />
                <span className="hidden xl:inline">Search...</span>
                <span className="text-xs text-gray-600 hidden xl:inline">⌘K</span>
              </button>
              
              {/* Alerts */}
              <Link
                to="/alerts"
                className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Alerts
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#0a0a0a] border-t border-[#222]">
            <div className="px-4 py-4 space-y-2">
              <div className="font-medium text-gray-400 px-3 py-2">Products</div>
              {products.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-6 py-2 text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-[#222] my-2" />
              
              <Link to="/compare" className="block px-3 py-2 text-gray-300 hover:text-white">Compare</Link>
              
              <div className="font-medium text-gray-400 px-3 py-2 mt-4">Retailers</div>
              {retailers.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-6 py-2 text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-[#222] my-2" />
              
              <Link to="/blog" className="block px-3 py-2 text-gray-300 hover:text-white">Blog</Link>
              <Link to="/alerts" className="block px-3 py-2 text-blue-400 hover:text-blue-300">Price Alerts</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Navbar
