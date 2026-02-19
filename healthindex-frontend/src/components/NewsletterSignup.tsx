'use client'

import { useState } from 'react'
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card-dark p-12 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You are In!</h3>
            <p className="text-gray-400">We will send you the best wellness equipment deals.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="glass-card-dark p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Exclusive Deals
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated on Wellness Tech
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest product reviews, wellness tips, and exclusive deals delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-neon px-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}