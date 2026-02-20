import React, { useState } from 'react';
import { Bell, Mail, Shield, X, Check, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mactrackr-api.onrender.com';

export default function PriceAlertSignup({ product, onClose }) {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !agreedToTerms) return;
    
    setIsLoading(true);
    setStatus(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          productId: product.id,
          productName: product.name,
          targetPrice: targetPrice ? parseFloat(targetPrice) : null
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage('Check your email to confirm your alert!');
        setEmail('');
        setTargetPrice('');
        setAgreedToTerms(false);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const prices = product.prices ? Object.values(product.prices) : [];
  const bestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bell className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Price Alert</h2>
              <p className="text-blue-100 text-sm">Get notified when the price drops</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center text-2xl">
              📱
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{product.name}</h3>
              <p className="text-zinc-400 text-sm">
                {product.specs?.storage} • {product.specs?.color}
              </p>
              <p className="text-green-400 font-bold mt-1">
                ${bestPrice} <span className="text-zinc-500 text-sm font-normal">current best</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-500" size={32} />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">You're all set!</h3>
              <p className="text-zinc-400">{message}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Email Input */}
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

              {/* Target Price (Optional) */}
              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Target Price (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder={`e.g., ${Math.floor(bestPrice * 0.9)}`}
                    min="1"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-8 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="text-zinc-500 text-xs mt-2">
                  Leave empty to get alerts on any price drop (5% or more)
                </p>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
                  I agree to receive price alert emails. Unsubscribe anytime.
                </span>
              </label>

              {/* Privacy Notice */}
              <div className="flex items-start gap-2 text-xs text-zinc-500">
                <Shield size={14} className="mt-0.5 flex-shrink-0" />
                <p>
                  We don't share your email. No spam, just price drops. 
                  See our <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
                </p>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !agreedToTerms}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Setting up alert...
                  </>
                ) : (
                  <>
                    <Bell size={20} />
                    Create Price Alert
                  </>
                )}
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
              >
                Maybe later
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
