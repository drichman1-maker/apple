import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bell, Mail, ArrowLeft, Check, Shield, ArrowRight, Loader2, AlertTriangle, X, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ProductSelector from '../components/Alerts/ProductSelector'

const API_BASE_URL = 'https://theresmac-backend.fly.dev';
const MAX_PRODUCTS = 5;

const PriceAlerts = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([]) // Supports up to 5 products
  const [targetPrices, setTargetPrices] = useState({}) // Map of productId -> targetPrice
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showProductSelector, setShowProductSelector] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get('email')
    if (emailParam) setEmail(emailParam)
  }, [])

  const addProduct = (product) => {
    if (selectedProducts.length >= MAX_PRODUCTS) {
      setStatus('error')
      setMessage(`Maximum ${MAX_PRODUCTS} products allowed`)
      return
    }
    if (selectedProducts.find(p => p.id === product.id)) {
      setStatus('error')
      setMessage('Product already added')
      return
    }
    setSelectedProducts([...selectedProducts, product])
    setShowProductSelector(false)
    setStatus(null)
  }

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
    const newTargetPrices = { ...targetPrices }
    delete newTargetPrices[productId]
    setTargetPrices(newTargetPrices)
  }

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
    if (!email) return
    if (selectedProducts.length === 0) {
      setStatus('error')
      setMessage('Please select at least one product')
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      const results = [];
      
      // Create alerts for all selected products
      for (const product of selectedProducts) {
        const targetPrice = targetPrices[product.id];
        const response = await fetch(`${API_BASE_URL}/api/alerts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
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
        setMessage(`Success! Alerts created for ${successCount} product${successCount > 1 ? 's' : ''}. We'll notify you when prices drop.`);
        setSelectedProducts([]);
        setTargetPrices({});
      } else {
        setStatus('error');
        setMessage(`${successCount}/${selectedProducts.length} alerts created. Some failed.`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleGeneralSubscribe = async () => {
    if (!email) return
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(`You're subscribed! We'll send you the best Apple deals.`);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Price Alerts | TheresMac</title>
      </Helmet>
      
      {/* Hero */}
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

          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center"><div className="text-3xl font-bold text-white">35+</div><div className="text-zinc-500 text-sm">Products Tracked</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-white">9</div><div className="text-zinc-500 text-sm">Retailers Monitored</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-green-400">Free</div><div className="text-zinc-500 text-sm">Forever</div></div>
          </div>
        </div>
      </div>

      {/* Signup Section */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-500/20">
                <Check className="text-green-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">✅ You're All Set!</h2>
              <p className="text-zinc-400">{message}</p>
              <div className="mt-6 space-y-3">
                <Link to="/products" className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Browse More Products</Link>
                <button onClick={() => navigate('/alerts/manage?email=' + encodeURIComponent(email))} className="block w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">Manage My Alerts</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-2 text-center">Get Deal Alerts</h2>
              <p className="text-zinc-500 text-center mb-6">Create up to {MAX_PRODUCTS} price alerts at once</p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-zinc-400 text-sm mb-2 flex items-center gap-2"><Mail size={16} /> Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500" />
                </div>

                {/* Selected Products */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-zinc-400 text-sm">Selected Products ({selectedProducts.length}/{MAX_PRODUCTS})</label>
                    {selectedProducts.length < MAX_PRODUCTS && (
                      <button type="button" onClick={() => setShowProductSelector(true)} className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                        <Plus size={14} /> Add Product
                      </button>
                    )}
                  </div>

                  {selectedProducts.length === 0 ? (
                    <button type="button" onClick={() => setShowProductSelector(true)} className="w-full py-8 border-2 border-dashed border-zinc-700 rounded-xl text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors">
                      Click to select products
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {selectedProducts.map((product) => {
                        const currentPrice = getBestPrice(product);
                        return (
                          <div key={product.id} className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-2xl">
                              {product.category === 'macbook' ? '💻' : product.category === 'iphone' ? '📱' : product.category === 'ipad' ? '📲' : product.category === 'watch' ? '⌚' : product.category === 'airpods' ? '🎧' : '📦'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium">{product.name}</p>
                              <p className="text-zinc-500 text-sm">Current: ${currentPrice.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                                <input
                                  type="number"
                                  placeholder={`${Math.floor(currentPrice * 0.9)}`}
                                  value={targetPrices[product.id] || ''}
                                  onChange={(e) => updateTargetPrice(product.id, e.target.value)}
                                  className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg pl-6 pr-2 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <button type="button" onClick={() => removeProduct(product.id)} className="p-2 text-zinc-500 hover:text-red-400 transition-colors">
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} required
                    className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600" />
                  <span className="text-zinc-400 text-sm">I agree to receive price alert emails. Unsubscribe anytime.</span>
                </label>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={isLoading || !email || !agreedToTerms || selectedProducts.length === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> Creating alerts...</> : 
                   <><Bell size={18} /> Create {selectedProducts.length > 0 ? `${selectedProducts.length} Alert${selectedProducts.length > 1 ? 's' : ''}` : 'Alerts'}</>}
                </button>

                {/* General subscription fallback */}
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm text-center mb-3">Or subscribe to general deal alerts</p>
                  <button type="button" onClick={handleGeneralSubscribe} disabled={isLoading || !email}
                    className="w-full py-2 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800 transition-colors">
                    Subscribe to Weekly Deals
                  </button>
                </div>
              </form>

              {/* Product Selector Modal */}
              {showProductSelector && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                  <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
                    <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Select Product {selectedProducts.length > 0 && `(${selectedProducts.length}/${MAX_PRODUCTS} selected)`}</h3>
                        <p className="text-zinc-500 text-sm mt-1">Click a product to add it to your alerts</p>
                      </div>
                      <button onClick={() => setShowProductSelector(false)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 bg-zinc-950">
                      <ProductSelector selectedProduct={null} onSelect={addProduct} />
                    </div>
                    <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-between items-center">
                      <span className="text-zinc-500 text-sm">{selectedProducts.length} of {MAX_PRODUCTS} products selected</span>
                      <button onClick={() => setShowProductSelector(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Manage link */}
        <div className="mt-4 text-center">
          <Link to="/alerts/manage" className="text-sm text-zinc-500 hover:text-zinc-300">Already have alerts? Manage them here</Link>
        </div>
      </div>
    </div>
  )
}

export default PriceAlerts