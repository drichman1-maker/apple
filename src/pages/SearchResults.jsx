import React, { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Fuse from 'fuse.js'
import { Search, ArrowLeft, Calendar, FileText, Tag } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

// Fuzzy search configuration
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  
  const fuse = useMemo(() => new Fuse(blogPosts, fuseOptions), [])
  
  const results = useMemo(() => {
    if (!searchInput.trim()) return blogPosts
    return fuse.search(searchInput)
  }, [searchInput, fuse])

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL without navigating
    const url = new URL(window.location)
    url.searchParams.set('q', searchInput)
    window.history.pushState({}, '', url)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <Helmet>
        <title>Search{query ? ` - ${query}` : ''} | TheresMac</title>
        <meta name="description" content="Search TheresMac blog posts" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
        
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#333] rounded-2xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-lg"
              autoFocus
            />
          </div>
        </form>

        {/* Results */}
        <div className="mb-4">
          {searchInput.trim() === '' ? (
            <p className="text-gray-500">Showing all blog posts ({results.length})</p>
          ) : (
            <p className="text-gray-500">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchInput}"
            </p>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No results found</p>
            <p className="text-gray-600 mt-2">Try different keywords</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => {
              const post = result.item
              const score = result.score
              
              return (
                <article 
                  key={post.id} 
                  className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 hover:border-[#3b82f6]/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    {score !== undefined && (
                      <span className="text-xs text-gray-600">
                        {Math.round((1 - score) * 100)}% match
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-3 w-3 text-gray-600" />
                    {post.tags.slice(0, 4).map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs text-gray-500 hover:text-gray-400 cursor-pointer"
                        onClick={() => setSearchInput(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults