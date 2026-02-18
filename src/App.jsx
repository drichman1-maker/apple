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
          <Route path="/alerts" element={<PriceAlerts />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
