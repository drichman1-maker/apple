import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Search } from 'lucide-react'

const PRODUCT_CATEGORIES = ['All', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods']

const blogPosts = [
  {
    id: 'Mac-Mini-M4-vs-M4-Pro-2026',
    title: 'Mac Mini M4 vs M4 Pro: Which One Do You Actually Need?',
    excerpt: 'Complete comparison of Mac Mini M4 vs M4 Pro: performance, ports, pricing, and which to buy with M5 on the horizon.',
    date: '2026-03-03',
    category: 'Comparison',
    productCategory: 'Mac'
  },
  {
    id: 'iPad-Air-M4-vs-iPad-Pro-M4-2026',
    title: 'iPad Air M4 vs iPad Pro M4: Is the Pro Still Worth the Premium?',
    excerpt: '$400 separates these two M4 iPads. We break down performance, display, ports, and which one delivers the best value in 2026.',
    date: '2026-03-03',
    category: 'Comparison',
    productCategory: 'iPad'
  },
  {
    id: 'Best-Macs-to-Buy-March-2026',
    title: 'Best Macs to Buy Right Now (March 2026)',
    excerpt: 'Complete guide to the best Macs to buy in March 2026. MacBook Air M5, MacBook Pro M5, Mac mini, iMac, Mac Studio, and recommendations for every budget.',
    date: '2026-03-03',
    category: 'Buying Guide',
    productCategory: 'Mac'
  },
  {
    id: 'M4-MacBook-Air-vs-M4-MacBook-Pro-2026',
    title: 'M4 MacBook Air vs M4 MacBook Pro: Which Should You Buy?',
    excerpt: 'Complete comparison of M4 MacBook Air vs Pro: performance, display, ports, battery life, and which to buy with M5 on the horizon.',
    date: '2026-03-03',
    category: 'Comparison',
    productCategory: 'Mac'
  },
  {
    id: 'Best-iPad-Note-Taking-2026',
    title: 'Best iPad for Note-Taking 2026: Apple Pencil Pro, Math Notes & Stage Manager',
    excerpt: 'Comparing iPad Pro M4, iPad Air M3, and iPad A16 for note-taking: Apple Pencil Pro, Math Notes, Stage Manager, and which is best for students.',
    date: '2026-03-02',
    category: 'Buying Guide',
    productCategory: 'iPad'
  },
  {
    id: 'Apple-TV-4K-vs-Roku-vs-Fire-Stick-2026',
    title: 'Apple TV 4K vs Roku vs Fire Stick: Is Apple TV Worth It?',
    excerpt: 'Comparing Apple TV 4K, Roku Streaming Stick 4K, and Amazon Fire TV Stick 4K Max — price, features, Dolby Vision, gaming, and ecosystem integration.',
    date: '2026-03-02',
    category: 'Comparison',
    productCategory: null
  },
  {
    id: 'Apple-Watch-Series-10-vs-Ultra-2-vs-SE-2026',
    title: 'Apple Watch Series 10 vs Ultra 2 vs SE: Which Should You Buy?',
    excerpt: 'Complete comparison of Apple Watch models: price, health features, battery life, and which is best for your lifestyle.',
    date: '2026-03-02',
    category: 'Buying Guide',
    productCategory: 'Watch'
  },
  {
    id: 'AirPods-vs-AirPods-Pro-vs-AirPods-Max-2026',
    title: 'AirPods vs AirPods Pro vs AirPods Max: Complete Buyer\'s Guide',
    excerpt: 'AirPods 4, AirPods Pro 2, and AirPods Max compared — ANC, spatial audio, hearing health, and which model delivers the best value.',
    date: '2026-03-02',
    category: 'Buying Guide',
    productCategory: 'AirPods'
  },
  {
    id: 'Best-MacBook-Video-Editing-2026',
    title: 'Best MacBook for Video Editing 2026',
    excerpt: 'M4 Pro vs M3 Max: Which MacBook delivers the best performance for Final Cut Pro, DaVinci Resolve, and Adobe Premiere?',
    date: '2026-02-17',
    category: 'Buying Guide',
    productCategory: 'Mac'
  },
  {
    id: 'M4-vs-M3-Upgrade-Guide-2026',
    title: 'M4 vs M3: Is the Upgrade Worth It?',
    excerpt: 'Benchmark comparison, real-world performance gains, and whether you should buy M4 or save money on M3.',
    date: '2026-02-17',
    category: 'Comparison',
    productCategory: 'Mac'
  },
  {
    id: 'Refurbished-Mac-Mini-Worth-Savings-2026',
    title: 'Refurbished Mac Mini: Worth the Savings?',
    excerpt: 'Apple Certified Refurbished vs new: $150+ savings, same warranty, but are there any downsides?',
    date: '2026-02-17',
    category: 'Buying Guide',
    productCategory: 'Mac'
  },
  {
    id: 'When-MacBooks-Go-On-Sale-2026',
    title: 'When Do MacBooks Go on Sale?',
    excerpt: 'The complete calendar: Black Friday, Back to School, WWDC, and secret sale periods throughout the year.',
    date: '2026-02-17',
    category: 'Deals',
    productCategory: 'Mac'
  },
  {
    id: 'Best-Mac-Music-Production-2026',
    title: 'Best Mac for Music Production 2026: Logic Pro Buyer\'s Guide',
    excerpt: 'DAW performance, RAM recommendations, and which Mac delivers the best value for Logic Pro, Ableton Live, and Pro Tools users.',
    date: '2026-02-19',
    category: 'Buying Guide',
    productCategory: 'Mac'
  },
  {
    id: 'Best-Mac-Mini-Accessories-2026',
    title: 'Best Accessories for Mac Mini 2026: Keyboard, Mouse & Monitor Guide',
    excerpt: 'Complete setup guide: best keyboards, mice, monitors, and Thunderbolt docks for your Mac Mini M4 from budget to premium.',
    date: '2026-02-24',
    category: 'Buying Guide',
    productCategory: 'Mac'
  },
  {
    id: 'Best-iPad-Drawing-2026',
    title: 'Best iPad for Drawing 2026: iPad Pro vs iPad Air vs Base iPad',
    excerpt: 'Apple Pencil compatibility, display quality, ProMotion 120Hz, and which iPad is right for digital artists at every budget.',
    date: '2026-03-03',
    category: 'Buying Guide',
    productCategory: 'iPad'
  },
  {
    id: 'iPhone-17-vs-16-Upgrade-Guide-2026',
    title: 'iPhone 17 vs iPhone 16: Should You Upgrade or Wait?',
    excerpt: '120Hz ProMotion, 24MP front camera, A19 chip, and whether to buy the iPhone 17 or grab an iPhone 16 on sale.',
    date: '2026-03-06',
    category: 'Comparison',
    productCategory: 'iPhone'
  }
]

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || post.productCategory === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <Helmet>
        <title>Blog | TheresMac</title>
        <meta name="description" content="Buying guides, comparisons, and deals for Apple products." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>

        <h1 className="text-3xl font-bold text-white mb-4">TheresMac Blog</h1>
        <p className="text-gray-400 mb-8">Buying guides, specs comparisons, and money-saving tips for Apple products.</p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#333] hover:border-[#555] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#262626] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="text-gray-400 text-sm mb-4">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        )}

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 hover:border-[#3b82f6]/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-400 text-sm">{post.excerpt}</p>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
