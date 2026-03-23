import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BellOff, Loader2, Check, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const API_BASE_URL = 'https://theresmac-backend.fly.dev';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('You have been successfully unsubscribed from all price alerts.');
      } else {
        throw new Error(data.error || 'Failed to unsubscribe');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again or contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Helmet>
        <title>Unsubscribe | TheresMac</title>
        <meta name="description" content="Unsubscribe from TheresMac price alerts." />
      </Helmet>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            {status === 'success' ? (
              <Check className="h-8 w-8 text-green-400" />
            ) : status === 'error' ? (
              <AlertTriangle className="h-8 w-8 text-red-400" />
            ) : (
              <BellOff className="h-8 w-8 text-zinc-400" />
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            {status === 'success' ? 'Unsubscribed' : 
             status === 'error' ? 'Error' : 
             'Unsubscribe from Alerts'}
          </h1>
          
          <p className="text-zinc-400">
            {status === 'success' ? message :
             status === 'error' ? message :
             "Enter your email to stop receiving price drop notifications."}
          </p>
        </div>

        {status !== 'success' && (
          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading'}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <BellOff className="h-5 w-5" />
                  Unsubscribe
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-zinc-800 text-center space-y-3">
          {status === 'success' ? (
            <>
              <Link 
                to="/products"
                className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors"
              >
                Browse Products
              </Link>
              <p className="text-sm text-zinc-500">
                Changed your mind?{' '}
                <Link to="/alerts" className="text-blue-400 hover:underline">
                  Set up new alerts
                </Link>
              </p>
            </>
          ) : (
            <>
              <Link 
                to="/alerts/manage"
                className="text-sm text-zinc-500 hover:text-zinc-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Manage existing alerts
              </Link>
              <p className="text-xs text-zinc-600">
                Having trouble?{' '}
                <a href="mailto:support@theresmac.com" className="text-zinc-500 hover:text-zinc-400">
                  Contact support
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
