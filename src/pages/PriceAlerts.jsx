import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bell, Mail, ArrowLeft, Check, AlertTriangle, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import MultiProductSelector from '../components/Alerts/MultiProductSelector'

const API_BASE_URL = 'https://theresmac-backend.fly.dev';
const MAX_PRODUCTS = 5;

const PriceAlerts = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [targetPrices, setTargetPrices] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

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
              {/* Email */}
              <div>
                <label className="block text-zinc-400 text-sm mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500" 
                />
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

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms} 
                  onChange={(e) => setAgreedToTerms(e.target.checked)} 
                  required
                  className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600" 
                />
                <span className="text-zinc-400 text-sm">I agree to receive price alert emails. Unsubscribe anytime.</span>
              </label>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm flex items-start gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  {message}
                </div>
              )}

              {/* Submit */}
              <button 
                type="submit" 
                disabled={isLoading || !email || !agreedToTerms || selectedProducts.length === 0}
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
