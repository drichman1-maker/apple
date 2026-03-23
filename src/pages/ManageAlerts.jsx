import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bell, Trash2, Loader2, AlertTriangle, ArrowLeft, RefreshCw, BellOff, ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const API_BASE_URL = 'https://theresmac-backend.fly.dev';

export default function ManageAlerts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(!searchParams.get('email'));

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      fetchAlerts(emailParam);
    }
  }, [searchParams]);

  const fetchAlerts = async (emailToFetch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts?email=${encodeURIComponent(emailToFetch)}`);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (err) {
      setError('Failed to load alerts. Please try again.');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    setSearchParams({ email });
    fetchAlerts(email);
  };

  const handleDelete = async (alertId) => {
    if (!confirm('Are you sure you want to delete this alert?')) return;
    
    setDeletingId(alertId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts/${alertId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setAlerts(alerts.filter(a => a.id !== alertId));
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      alert('Failed to delete alert. Please try again.');
      console.error('Error deleting alert:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Manage Alerts | TheresMac</title>
        <meta name="description" content="Manage your price alerts for Apple products." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-4 text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Your Alerts</h1>
          <p className="text-zinc-400">View and manage your price drop notifications</p>
        </div>

        {/* Email Input Form */}
        {showEmailInput ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Enter Your Email</h2>
              <p className="text-zinc-400 text-sm">
                We'll look up all your active alerts
              </p>
            </div>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Bell className="h-5 w-5" />
                    View My Alerts
                  </>
                )}
              </button>
            </form>
          </div>
        ) : loading ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-zinc-400">Loading your alerts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
            <p className="text-red-400 mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => fetchAlerts(email)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <button
                onClick={() => setShowEmailInput(true)}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
              >
                Use Different Email
              </button>
            </div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <BellOff className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Active Alerts</h3>
            <p className="text-zinc-400 mb-6">
              You don't have any price alerts set up for {email}.
            </p>
            <Link 
              to="/alerts" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              Create Your First Alert
            </Link>
          </div>
        ) : (
          <>
            {/* Alerts List */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-400" />
                  <h3 className="font-semibold text-white">
                    {alerts.length} Active Alert{alerts.length !== 1 ? 's' : ''}
                  </h3>
                </div>
                <button
                  onClick={() => setShowEmailInput(true)}
                  className="text-sm text-zinc-500 hover:text-zinc-300"
                >
                  {email}
                </button>
              </div>

              <div className="divide-y divide-zinc-800">
                {alerts.map((alert) => (
                  <div key={alert.id} className="px-6 py-4 hover:bg-zinc-800/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">
                          {alert.product_name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm">
                          <span className="text-zinc-500">
                            Created {formatDate(alert.created_at)}
                          </span>
                          {alert.target_price ? (
                            <span className="text-blue-400">
                              Target: ${alert.target_price.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-green-400">
                              Any price drop
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(alert.id)}
                        disabled={deletingId === alert.id}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                        title="Delete alert"
                      >
                        {deletingId === alert.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/alerts"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Bell className="h-5 w-5" />
                Create New Alert
              </Link>
              <Link
                to="/products"
                className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Browse Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
