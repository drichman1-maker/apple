import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { Search, X, Command, FileText, ArrowRight, Calendar, Hash } from 'lucide-react'
import { blogPosts } from '../../data/blogPosts'

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

const SearchModal = ({ isOpen, onClose, showAllLink = false }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const navigate = useNavigate()

  // Create Fuse instance with blog posts
  const fuse = useMemo(() => new Fuse(blogPosts, fuseOptions), [])

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).slice(0, 10)
  }, [query, fuse])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Keyboard shortcut handler (Cmd/Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open modal with Cmd/Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          // This will be handled by the parent component
          window.dispatchEvent(new CustomEvent('openSearch'))
        }
      }

      // Close modal with Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      }

      // Navigate results with arrow keys
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter' && results[selectedIndex]) {
          e.preventDefault()
          const post = results[selectedIndex].item
          navigate(`/blog/${post.id}`)
          onClose()
          setQuery('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex, navigate])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, results.length])

  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  const handleResultClick = (post) => {
    navigate(`/blog/${post.id}`)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-4 border-b border-[#333]">
            <Search className="h-5 w-5 text-gray-500 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              autoComplete="off"
            />
            <div className="flex items-center gap-2">
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#262626] border border-[#404040] rounded text-xs text-gray-400">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div 
            ref={resultsRef}
            className="max-h-[400px] overflow-y-auto"
          >
            {query.trim() === '' ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p>Start typing to search blog posts</p>
                <p className="text-sm mt-2 text-gray-600">
                  Search by title, content, tags, or category
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2 text-gray-600">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.item.id}
                    onClick={() => handleResultClick(result.item)}
                    className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                      index === selectedIndex 
                        ? 'bg-blue-500/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`mt-1 p-2 rounded-lg ${
                      index === selectedIndex 
                        ? 'bg-blue-500/30 text-blue-400' 
                        : 'bg-[#262626] text-gray-400'
                    }`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${
                        index === selectedIndex ? 'text-white' : 'text-gray-200'
                      }`}>
                        {result.item.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {result.item.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          {result.item.category}
                        </span>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(result.item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <ArrowRight className="h-4 w-4 text-blue-400 mt-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer with "View All" link */}
          {showAllLink && results.length > 0 && (
            <div className="px-4 py-3 border-t border-[#333] bg-[#151515]">
              <Link
                to={`/search?q=${encodeURIComponent(query)}`}
                onClick={handleClose}
                className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all results
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="px-4 py-2 border-t border-[#333] bg-[#151515] flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">↵</kbd>
                <span className="ml-1">Open</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">esc</kbd>
                <span className="ml-1">Close</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal