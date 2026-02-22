import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Activity, TrendingUp, AlertCircle, DollarSign, ExternalLink } from 'lucide-react';

interface AggregatorStatus {
  id: string;
  name: string;
  domain: string;
  status: 'healthy' | 'warning' | 'down';
  products: number;
  lastUpdate: string;
  revenue: string;
}

const AGGREGATORS: AggregatorStatus[] = [
  {
    id: 'mactrackr',
    name: 'MacTrackr',
    domain: 'mactrackr.com',
    status: 'healthy',
    products: 38,
    lastUpdate: '2 min ago',
    revenue: '$0'
  },
  {
    id: 'mintcondition',
    name: 'MintCondition',
    domain: 'mintcondition.app',
    status: 'healthy',
    products: 0,
    lastUpdate: 'Never',
    revenue: '$0'
  },
  {
    id: 'coincurator',
    name: 'CoinCurator',
    domain: 'coincurator.app',
    status: 'healthy',
    products: 0,
    lastUpdate: 'Never',
    revenue: '$0'
  },
  {
    id: 'rumbledeals',
    name: 'RumbleDeals',
    domain: 'rumbledeals.com',
    status: 'warning',
    products: 0,
    lastUpdate: 'Never',
    revenue: '$0'
  }
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <Activity className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'down': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-pulse text-accent-cyan text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Aggregator Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dark-bg text-gray-100">
        {/* Header */}
        <header className="border-b border-dark-border bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Aggregator Dashboard</h1>
                <p className="text-gray-400 mt-1">Unified view of all price tracking projects</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Last synced: {new Date().toLocaleTimeString()}</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-white mt-1">38</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent-cyan" />
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Projects</p>
                  <p className="text-3xl font-bold text-white mt-1">1/4</p>
                </div>
                <Activity className="w-8 h-8 text-accent-blue" />
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white mt-1">$0</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent-purple" />
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Deal Alerts (24h)</p>
                  <p className="text-3xl font-bold text-white mt-1">0</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Aggregator Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {AGGREGATORS.map((aggregator) => (
                <div 
                  key={aggregator.id}
                  className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-accent-cyan/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{aggregator.name}</h3>
                    {getStatusIcon(aggregator.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Products</span>
                      <span className="text-white font-medium">{aggregator.products}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Status</span>
                      <span className={getStatusColor(aggregator.status)}>
                        {aggregator.status.charAt(0).toUpperCase() + aggregator.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Last Update</span>
                      <span className="text-gray-300">{aggregator.lastUpdate}</span>
                    </div>
                  </div>
                  <a 
                    href={`https://${aggregator.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-accent-cyan hover:text-accent-cyan/80 transition-colors"
                  >
                    Visit Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Migration Status */}
          <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Migration Status to Shared Backend</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-sm font-medium">✓</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">MacTrackr</p>
                    <p className="text-sm text-gray-400">Fully migrated to shared backend</p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">Complete</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-400 text-sm font-medium">~</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">MintCondition (Pokemon)</p>
                    <p className="text-sm text-gray-400">Frontend updated, needs backend data</p>
                  </div>
                </div>
                <span className="text-yellow-400 text-sm">In Progress</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-400 text-sm font-medium">~</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">CoinCurator</p>
                    <p className="text-sm text-gray-400">Frontend migrated, backend data pending</p>
                  </div>
                </div>
                <span className="text-yellow-400 text-sm">In Progress</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">○</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">RumbleDeals</p>
                    <p className="text-sm text-gray-400">Not started - needs frontend build</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">Not Started</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
