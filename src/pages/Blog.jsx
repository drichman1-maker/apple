import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'

const blogPosts = [
  {
    id: 'best-macbook-video-editing-2026',
    title: 'Best MacBook for Video Editing 2026',
    excerpt: 'M4 Pro vs M3 Max: Which MacBook delivers the best performance for Final Cut Pro, DaVinci Resolve, and Adobe Premiere?',
    date: '2026-02-17',
    category: 'Buying Guide'
  },
  {
    id: 'm4-vs-m3-upgrade-worth-it',
    title: 'M4 vs M3: Is the Upgrade Worth It?',
    excerpt: 'Benchmark comparison, real-world performance gains, and whether you should buy M4 or save money on M3.',
    date: '2026-02-17',
    category: 'Comparison'
  },
  {
    id: 'refurbished-mac-mini-worth-savings',
    title: 'Refurbished Mac Mini: Worth the Savings?',
    excerpt: 'Apple Certified Refurbished vs new: $150+ savings, same warranty, but are there any downsides?',
    date: '2026-02-17',
    category: 'Buying Guide'
  },
  {
    id: 'when-do-macbooks-go-on-sale',
    title: 'When Do MacBooks Go on Sale?',
    excerpt: 'The complete calendar: Black Friday, Back to School, WWDC, and secret sale periods throughout the year.',
    date: '2026-02-17',
    category: 'Deals'
  }
]

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <Helmet>
        <title>Blog | MacTrackr</title>
        <meta name="description" content="Buying guides, comparisons, and deals for Apple products." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
        
        <h1 className="text-3xl font-bold text-white mb-4">MacTrackr Blog</h1>
        <p className="text-gray-400 mb-12">Buying guides, specs comparisons, and money-saving tips for Apple products.</p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
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
      </div>
    </div>
  )
}

export default Blog
