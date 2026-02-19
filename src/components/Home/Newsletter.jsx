import React, { useState } from 'react'
import { Mail, Sparkles, ArrowRight, Check } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      localStorage.setItem('newsletter_email', email)
    }, 1000)
  }

  if (submitted) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card-dark p-12 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
            <p className="text-gray-400">We'll send you the best Apple deals every week.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-blue/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="glass-card-dark p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-apple-blue/10 to-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-apple-blue mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Weekly Deals
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Never Miss a Deal
              </h3>
              <p className="text-gray-400 max-w-md">
                Get the best Apple prices delivered to your inbox every week. No spam, just deals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full sm:w-64 pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-apple-blue transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon px-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center md:text-left">
                2,000+ subsavers • Unsubscribe anytime
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
