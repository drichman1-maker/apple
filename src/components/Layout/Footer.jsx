import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apple } from 'lucide-react'

const Footer = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="border-t border-[#262626] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Apple className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">MacTrackr</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm">
              Anonymous price tracking for Apple products. We don't collect your data.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-medium mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleCategoryClick('mac')} className="text-gray-500 hover:text-white transition-colors text-left">Mac</button></li>
              <li><button onClick={() => handleCategoryClick('iphone')} className="text-gray-500 hover:text-white transition-colors text-left">iPhone</button></li>
              <li><button onClick={() => handleCategoryClick('ipad')} className="text-gray-500 hover:text-white transition-colors text-left">iPad</button></li>
              <li><button onClick={() => handleCategoryClick('watch')} className="text-gray-500 hover:text-white transition-colors text-left">Watch</button></li>
              <li><button onClick={() => handleCategoryClick('airpods')} className="text-gray-500 hover:text-white transition-colors text-left">AirPods</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/alerts" className="text-gray-500 hover:text-white transition-colors">Price Alerts</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#262626] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2026 MacTrackr. Anonymous price tracking.
          </p>
          <p className="text-gray-600 text-sm mt-2 sm:mt-0">
            Not affiliated with Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
