import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, Bell, Apple } from 'lucide-react'
import SearchModal from '../Search/SearchModal'
import { LoginButton } from '../../auth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [retailersOpen, setRetailersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const productsRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdowns when route changes
  useEffect(() => {
    setProductsOpen(false)
    setRetailersOpen(false)
    setIsOpen(false)
  }, [location.pathname])

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

  const productCategories = [
    { name: 'MacBooks', path: '/products/macbook', emoji: '💻' },
    { name: 'iMac', path: '/products/imac', emoji: '🖥️' },
    { name: 'Mac Studio', path: '/products/mac-studio', emoji: '🖥️' },
    { name: 'iPhone', path: '/products/iphone', emoji: '📱' },
    { name: 'iPad', path: '/products/ipad', emoji: '📲' },
    { name: 'Watch', path: '/products/watch', emoji: '⌚' },
    { name: 'AirPods', path: '/products/airpods', emoji: '🎧' },
    { name: 'Accessories', path: '/products/accessories', emoji: '🔌' },
  ]

  const retailerLinks = [
    { name: 'Amazon', path: '/retailers/amazon', color: '#FF9900' },
    { name: 'Best Buy', path: '/retailers/bestbuy', color: '#0046BE' },
    { name: 'Apple', path: '/retailers/apple', color: '#86868B' },
    { name: 'B&H Photo', path: '/retailers/bh', color: '#E53935' },
    { name: 'Walmart', path: '/retailers/walmart', color: '#FFC220' },
    { name: 'Target', path: '/retailers/target', color: '#CC0000' },
    { name: 'Adorama', path: '/retailers/adorama', color: '#F37021' },
    { name: 'eBay', path: '/retailers/ebay', color: '#E53238' },
    { name: 'Micro Center', path: '/retailers/microcenter', color: '#00A651' },
    { name: 'Back Market', path: '/retailers/backmarket', color: '#00C853' },
  ]

  const navLinks = [
    { name: 'Compare', path: '/compare' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Blog', path: '/blog' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Left */}
            <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                <Apple className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-white">Theres</span>
                <span className="text-[#3b82f6]">Mac</span>
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center" ref={productsRef}>
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  onMouseEnter={() => setProductsOpen(true)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/products') ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>

                {productsOpen && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#141414] border border-[#262626] rounded-xl shadow-2xl overflow-hidden"
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <div className="py-2">
                      {productCategories.map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-[#1f1f1f] hover:text-white transition-colors"
                        >
                          <span className="text-lg">{category.emoji}</span>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Retailers Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRetailersOpen(!retailersOpen)}
                  onMouseEnter={() => setRetailersOpen(true)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/retailers') ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Retailers
                  <ChevronDown className={`h-4 w-4 transition-transform ${retailersOpen ? 'rotate-180' : ''}`} />
                </button>

                {retailersOpen && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#141414] border border-[#262626] rounded-xl shadow-2xl overflow-hidden"
                    onMouseLeave={() => setRetailersOpen(false)}
                  >
                    <div className="py-2">
                      {retailerLinks.map((retailer) => (
                        <Link
                          key={retailer.path}
                          to={retailer.path}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-[#1f1f1f] hover:text-white transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: retailer.color }}></span>
                          {retailer.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name === 'Alerts' && <Bell className="h-4 w-4" />}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Search */}
            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 bg-[#141414] border border-[#262626] rounded-lg hover:border-[#3b82f6] hover:text-white transition-all"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-zinc-500 bg-[#0a0a0a] rounded border border-[#262626]">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-zinc-400 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-[#262626]">
            <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              <div className="font-medium text-zinc-400 text-sm mb-2">Products</div>
              {productCategories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-[#141414] rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </Link>
              ))}

              <div className="font-medium text-zinc-400 text-sm mb-2 mt-4">Retailers</div>
              {retailerLinks.slice(0, 6).map((retailer) => (
                <Link
                  key={retailer.path}
                  to={retailer.path}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-[#141414] rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: retailer.color }}></span>
                  {retailer.name}
                </Link>
              ))}

              <div className="border-t border-[#262626] my-2 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-[#141414] rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name === 'Alerts' && <Bell className="h-4 w-4" />}
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="hidden md:flex items-center ml-4">
          <LoginButton />
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Navbar