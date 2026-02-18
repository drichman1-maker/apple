import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetail from './pages/ProductDetail'
import Privacy from './pages/Privacy'
import PriceAlerts from './pages/PriceAlerts'
import Blog from './pages/Blog'

// Blog Articles
import BestMacBookVideoEditing from './pages/blog/Best-MacBook-Video-Editing-2026.jsx'
import M4vsM3UpgradeGuide from './pages/blog/M4-vs-M3-Upgrade-Guide-2026.jsx'
import RefurbishedMacMini from './pages/blog/Refurbished-Mac-Mini-Worth-Savings-2026.jsx'
import WhenMacBooksOnSale from './pages/blog/When-MacBooks-Go-On-Sale-2026.jsx'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:category" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/Best-MacBook-Video-Editing-2026" element={<BestMacBookVideoEditing />} />
          <Route path="/blog/M4-vs-M3-Upgrade-Guide-2026" element={<M4vsM3UpgradeGuide />} />
          <Route path="/blog/Refurbished-Mac-Mini-Worth-Savings-2026" element={<RefurbishedMacMini />} />
          <Route path="/blog/When-MacBooks-Go-On-Sale-2026" element={<WhenMacBooksOnSale />} />
          <Route path="/alerts" element={<PriceAlerts />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
