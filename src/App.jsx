import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import ProductCatalog from './pages/ProductCatalog'
import PriceAlerts from './pages/PriceAlerts'
import ManageAlerts from './pages/ManageAlerts'
import Unsubscribe from './pages/Unsubscribe'
import Privacy from './pages/Privacy'
import AffiliateDisclosure from './pages/AffiliateDisclosure'
import Blog from './pages/Blog'
import SearchResults from './pages/SearchResults'
import Compare from './pages/Compare'
import RetailerLanding from './pages/RetailerLanding'

// Blog Articles
import BestMacBookVideoEditing from './pages/blog/Best-MacBook-Video-Editing-2026.jsx'
import M4vsM3UpgradeGuide from './pages/blog/M4-vs-M3-Upgrade-Guide-2026.jsx'
import RefurbishedMacMini from './pages/blog/Refurbished-Mac-Mini-Worth-Savings-2026.jsx'
import WhenMacBooksOnSale from './pages/blog/When-MacBooks-Go-On-Sale-2026.jsx'
import BestMacMusicProduction from './pages/blog/Best-Mac-Music-Production-2026.jsx'
import BestMacMiniAccessories from './pages/blog/Best-Mac-Mini-Accessories-2026.jsx'
import BestiPadDrawing from './pages/blog/Best-iPad-Drawing-2026.jsx'
import iPhone17vs16Upgrade from './pages/blog/iPhone-17-vs-16-Upgrade-Guide-2026.jsx'
import AppleTV4KvsRoku from './pages/blog/Apple-TV-4K-vs-Roku-vs-Fire-Stick-2026.jsx'
import AppleWatchComparison from './pages/blog/Apple-Watch-Series-10-vs-Ultra-2-vs-SE-2026.jsx'
import AirPodsComparison from './pages/blog/AirPods-vs-AirPods-Pro-vs-AirPods-Max-2026.jsx'
import BestiPadNoteTaking from './pages/blog/Best-iPad-Note-Taking-2026.jsx'
import M4MacBookAirvsPro from './pages/blog/M4-MacBook-Air-vs-M4-MacBook-Pro-2026.jsx'
import MacMiniM4vsM4Pro from './pages/blog/Mac-Mini-M4-vs-M4-Pro-2026.jsx'
import BestMacsToBuyMarch2026 from './pages/blog/Best-Macs-to-Buy-March-2026.jsx'
import iPadAirM4vsProM42026 from './pages/blog/iPad-Air-M4-vs-iPad-Pro-M4-2026.jsx'

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <main>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:category" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/retailers/:retailerId" element={<RetailerLanding />} />
          <Route path="/blog/Best-MacBook-Video-Editing-2026" element={<BestMacBookVideoEditing />} />
          <Route path="/blog/M4-vs-M3-Upgrade-Guide-2026" element={<M4vsM3UpgradeGuide />} />
          <Route path="/blog/Refurbished-Mac-Mini-Worth-Savings-2026" element={<RefurbishedMacMini />} />
          <Route path="/blog/When-MacBooks-Go-On-Sale-2026" element={<WhenMacBooksOnSale />} />
          <Route path="/blog/Best-Mac-Music-Production-2026" element={<BestMacMusicProduction />} />
          <Route path="/blog/Best-Mac-Mini-Accessories-2026" element={<BestMacMiniAccessories />} />
          <Route path="/blog/Best-iPad-Drawing-2026" element={<BestiPadDrawing />} />
          <Route path="/blog/iPhone-17-vs-16-Upgrade-Guide-2026" element={<iPhone17vs16Upgrade />} />
          <Route path="/blog/Apple-TV-4K-vs-Roku-vs-Fire-Stick-2026" element={<AppleTV4KvsRoku />} />
          <Route path="/blog/Apple-Watch-Series-10-vs-Ultra-2-vs-SE-2026" element={<AppleWatchComparison />} />
          <Route path="/blog/AirPods-vs-AirPods-Pro-vs-AirPods-Max-2026" element={<AirPodsComparison />} />
          <Route path="/blog/Best-iPad-Note-Taking-2026" element={<BestiPadNoteTaking />} />
          <Route path="/blog/M4-MacBook-Air-vs-M4-MacBook-Pro-2026" element={<M4MacBookAirvsPro />} />
          <Route path="/blog/Mac-Mini-M4-vs-M4-Pro-2026" element={<MacMiniM4vsM4Pro />} />
          <Route path="/blog/Best-Macs-to-Buy-March-2026" element={<BestMacsToBuyMarch2026 />} />
          <Route path="/blog/iPad-Air-M4-vs-iPad-Pro-M4-2026" element={<iPadAirM4vsProM42026 />} />
          <Route path="/alerts" element={<PriceAlerts />} />
          <Route path="/alerts/manage" element={<ManageAlerts />} />
          <Route path="/alerts/unsubscribe" element={<Unsubscribe />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </HelmetProvider>
  )
}

export default App
