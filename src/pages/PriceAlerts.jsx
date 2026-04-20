import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bell, Mail, ArrowLeft, Check, AlertTriangle, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import MultiProductSelector from '../components/Alerts/MultiProductSelector'
import { useAuth } from '../auth/AuthContext'

const API_BASE_URL = 'https://agg-api-hub.fly.dev';
const MAX_PRODUCTS = 5;

const PriceAlerts = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut, loading: authLoading } = useAuth();
  const [selectedProducts, setSelectedProducts] = useState([])
  const [targetPrices, setTargetPrices] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  
  // Check for pre-selected product from product detail page
  useEffect(() => {
    const storedProduct = sessionStorage.getItem('alert_product')
    if (storedProduct) {
      try {
        const product = JSON.parse(storedProduct)
        setSelectedProducts([product])
        // Clear it so it doesn't persist on refresh
        sessionStorage.removeItem('alert_product')
      } catch (e) {
        console.error('Failed to parse stored product:', e)
      }
    }
  }, [])

  const updateTargetPrice = (productId, price) => {
    setTargetPrices({ ...targetPrices, [productId]: price })
  }

  const getBestPrice = (product) => {
    if (!product?.prices) return 0;
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }));
    
    const inStockPrices = pricesArray.filter(p => p.inStock && p.price);
    if (inStockPrices.length === 0) return 0;
    return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0]).price;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!user?.email) return
    if (selectedProducts.length === 0) {
      setStatus('error')
      setMessage('Please select at least one product')
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      const results = [];
      
      for (const product of selectedProducts) {
        const targetPrice = targetPrices[product.id];
        const response = await fetch(`${API_BASE_URL}/api/theresmac/alerts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            product_id: product.id,
            product_name: product.name,
            target_price: targetPrice ? parseInt(targetPrice) : null,
            notify_on_any_drop: !targetPrice
          }),
        });

        const data = await response.json();
        results.push({ product: product.name, success: response.ok && data.success, error: data.error });
      }

      const successCount = results.filter(r => r.success).length;
      
      if (successCount === selectedProducts.length) {
        setStatus('success');
        setMessage(`Success! Alerts created for ${successCount} product${successCount > 1 ? 's' : ''}.`);
        setSelectedProducts([]);
        setTargetPrices({});
      } else {
        setStatus('error');
        setMessage(`${successCount}/${selectedProducts.length} alerts created.`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Sign in prompt when not authenticated
  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Helmet>
          <title>Price Alerts | TheresMac</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Link to="/products" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Price Alerts</h1>
            <p className="text-zinc-400">
              Get notified when prices drop on your favorite Apple products.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Sign in to Create Alerts</h2>
            <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
              Get instant email notifications when prices drop to your target.
            </p>
            <button
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Price Alerts | TheresMac</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <Bell className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Price Alerts</h1>
          <p className="text-zinc-400">
            Get notified when prices drop. Select up to {MAX_PRODUCTS} products.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-500/20">
                <Check className="text-green-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">You're All Set!</h2>
              <p className="text-zinc-400">{message}</p>
              <div className="mt-6 space-y-3">
                <Link to="/products" className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center">
                  Browse More Products
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-6">
              {/* Signed in user display */}
              <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user?.email?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{user?.displayName || user?.email}</p>
                    <p className="text-zinc-400 text-sm">Alerts will be sent to this email</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>

              {/* Multi Product Selector */}
              <MultiProductSelector
                selectedProducts={selectedProducts}
                onChange={setSelectedProducts}
                maxProducts={MAX_PRODUCTS}
              />

              {/* Target Prices for Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm text-zinc-400">Target Prices (optional)</label>
                  {selectedProducts.map((product) => {
                    const currentPrice = getBestPrice(product);
                    return (
                      <div key={product.id} className="flex items-center gap-3 bg-zinc-800/50 rounded-lg p-3">
                        <span className="text-white text-sm flex-1 truncate">{product.name}</span>
                        <span className="text-zinc-500 text-sm">${currentPrice.toLocaleString()}</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                          <input
                            type="number"
                            placeholder="Target"
                            value={targetPrices[product.id] || ''}
                            onChange={(e) => updateTargetPrice(product.id, e.target.value)}
                            className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg pl-6 pr-2 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm flex items-start gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  {message}
                </div>
              )}

              {/* Submit */}
              <button 
                type="submit" 
                disabled={isLoading || selectedProducts.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><Loader2 size={18} className="animate-spin" /> Creating...</>
                ) : (
                  <><Bell size={18} /> Create {selectedProducts.length} Alert{selectedProducts.length !== 1 ? 's' : ''}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PriceAlerts
