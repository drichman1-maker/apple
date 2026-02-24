import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bell, Mail, ArrowLeft, Check, Shield, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const API_BASE_URL = 'https://mactrackr-backend-fresh.fly.dev';

const PriceAlerts = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })

      if (response.ok) {
        setStatus('success')
        setMessage('You\'re subscribed! Check your email to confirm.')
        setEmail('')
      } else {
        const data = await response.json()
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Price Alerts | MacTrackr</title>
        <meta name="description" content="Get notified when Apple products drop in price. Set alerts for any product." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900/20 to-transparent pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
              <Bell className="h-10 w-10 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Never Miss a Deal</h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Get instant email alerts when Apple products drop in price. 
              We monitor Amazon, Best Buy, B&H, and more.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">35+</div>
              <div className="text-zinc-500 text-sm">Products Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">9</div>
              <div className="text-zinc-500 text-sm">Retailers Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">Free</div>
              <div className="text-zinc-500 text-sm">Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Section */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">You're Subscribed!</h2>
              <p className="text-zinc-400">{message}</p>
              <Link 
                to="/products" 
                className="mt-6 inline-block px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-2 text-center">
                Get Deal Alerts
              </h2>
              <p className="text-zinc-500 text-center mb-6">
                Subscribe to get notified about price drops
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe to Alerts
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Privacy */}
              <div className="flex items-start gap-2 mt-6 pt-6 border-t border-zinc-800 text-xs text-zinc-500">
                <Shield size={14} className="mt-0.5 flex-shrink-0" />
                <p>
                  We don't share your email. No spam. Unsubscribe anytime. 
                  <Link to="/privacy" className="text-blue-400 hover:underline ml-1">Privacy Policy</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 py-20 border-t border-zinc-800">
        <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="text-blue-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">1. Set Your Alert</h3>
            <p className="text-zinc-500 text-sm">
              Choose a product and set your target price (or get alerts on any drop)
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="text-blue-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">2. We Monitor Prices</h3>
            <p className="text-zinc-500 text-sm">
              Our system checks prices every 4 hours across 9 major retailers
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">3. You Save Money</h3>
            <p className="text-zinc-500 text-sm">
              Get an instant email when the price drops. Click and buy at the best price.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-4 py-20 border-t border-zinc-800">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ</h2>
        
        <div className="space-y-4">
          <div className="bg-zinc-900/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Is this really free?</h3>
            <p className="text-zinc-400 text-sm">
              Yes. We make money through affiliate links when you buy, so alerts are free for you.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">How often do you check prices?</h3>
            <p className="text-zinc-400 text-sm">
              Every 4 hours, 24/7. If a price drops, you'll know within hours.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Can I unsubscribe?</h3>
            <p className="text-zinc-400 text-sm">
              Absolutely. Every email has an unsubscribe link. One click and you're out.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 py-20 border-t border-zinc-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to start saving?</h2>
        <p className="text-zinc-400 mb-6">Browse our products and set your first alert.</p>
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
        >
          Browse Products
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}

export default PriceAlerts
