import React, { useState, useEffect } from 'react';
import { Bell, Mail, ArrowRight, Check, Shield, Trash2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mactrackr-api.onrender.com';

export default function PriceAlertsPage() {
  const [email, setEmail] = useState('');
  const [myAlerts, setMyAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [showManage, setShowManage] = useState(false);

  // Fetch user's alerts
  const fetchAlerts = async (userEmail) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts/status/${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setMyAlerts(data.alerts || []);
      }
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus(null);

    try {
      // Subscribe to newsletter
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('You\'re subscribed! Check your email to confirm.');
        setEmail('');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageAlerts = async (e) => {
    e.preventDefault();
    if (!email) return;
    await fetchAlerts(email);
    setShowManage(true);
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      await fetch(`${API_BASE_URL}/api/alerts/${alertId}`, {
        method: 'DELETE'
      });
      setMyAlerts(myAlerts.filter(a => a.id !== alertId));
    } catch (err) {
      console.error('Failed to delete alert:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Bell size={16} className="text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Price Drop Alerts</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Never Miss a Deal
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Get instant email alerts when Apple products drop in price. 
            We monitor Amazon, Best Buy, B&H, and more.
          </p>

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
        {!showManage ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              Get Deal Alerts
            </h2>

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

              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="text-green-500" size={24} />
                  </div>
                  <p className="text-green-400">{message}</p>
                </div>
              ) : (
                <>
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
                    {isLoading ? 'Subscribing...' : 'Subscribe to Alerts'}
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleManageAlerts}
                    className="w-full py-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                  >
                    Manage my alerts
                  </button>
                </>
              )}
            </form>

            {/* Privacy */}
            <div className="flex items-start gap-2 mt-6 pt-6 border-t border-zinc-800 text-xs text-zinc-500">
              <Shield size={14} className="mt-0.5 flex-shrink-0" />
              <p>
                We don't share your email. No spam. Unsubscribe anytime. 
                <a href="/privacy" className="text-blue-400 hover:underline ml-1">Privacy Policy</a>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">My Alerts</h2>
              <button
                onClick={() => setShowManage(false)}
                className="text-zinc-500 hover:text-white text-sm"
              >
                Back
              </button>
            </div>

            {myAlerts.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                <Bell size={48} className="mx-auto mb-4 opacity-30" />
                <p>No active alerts for {email}</p>
                <p className="text-sm mt-2">Browse products and create your first alert!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between bg-zinc-900 rounded-xl p-4"
                  >
                    <div>
                      <p className="text-white font-medium">{alert.productName}</p>
                      <p className="text-zinc-500 text-sm">
                        Target: ${alert.targetPrice || 'Any drop'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
    </div>
  );
}
