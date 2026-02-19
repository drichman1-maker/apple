import React, { useState, useEffect } from 'react'
import { Plus, Bell, Trash2, Edit, TrendingDown } from 'lucide-react'
import AlertModal from '../components/Alerts/AlertModal'
import AlertCard from '../components/Alerts/AlertCard'
import EmptyState from '../components/UI/EmptyState'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingAlert, setEditingAlert] = useState(null)

  useEffect(() => {
    // Load mock alerts
    setAlerts(getMockAlerts())
  }, [])

  const getMockAlerts = () => {
    return [
      {
        id: '1',
        productId: 'iphone-15-pro',
        productName: 'iPhone 15 Pro',
        productCategory: 'iPhone',
        currentPrice: 999,
        targetPrice: 899,
        email: 'user@example.com',
        isActive: true,
        createdAt: '2024-01-15',
        triggeredAt: null,
        retailer: 'any'
      },
      {
        id: '2',
        productId: 'macbook-air-m2',
        productName: 'MacBook Air M2',
        productCategory: 'Mac',
        currentPrice: 1199,
        targetPrice: 1099,
        email: 'user@example.com',
        isActive: false,
        createdAt: '2024-01-10',
        triggeredAt: '2024-01-20',
        retailer: 'amazon'
      },
      {
        id: '3',
        productId: 'airpods-pro-2',
        productName: 'AirPods Pro (2nd Gen)',
        productCategory: 'AirPods',
        currentPrice: 249,
        targetPrice: 199,
        email: 'user@example.com',
        isActive: true,
        createdAt: '2024-01-05',
        triggeredAt: null,
        retailer: 'any'
      }
    ]
  }

  const handleCreateAlert = (alertData) => {
    const newAlert = {
      id: Date.now().toString(),
      ...alertData,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      triggeredAt: null
    }
    setAlerts(prev => [newAlert, ...prev])
    setShowModal(false)
  }

  const handleEditAlert = (alertData) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === editingAlert.id ? { ...alert, ...alertData } : alert
    ))
    setEditingAlert(null)
  }

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const handleToggleAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ))
  }

  const activeAlertsCount = alerts.filter(alert => alert.isActive).length
  const triggeredAlertsCount = alerts.filter(alert => alert.triggeredAt).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Price Alerts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get notified when your favorite Apple products drop in price
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center mt-4 sm:mt-0"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Alert
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-apple-blue mb-2">
              {alerts.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Alerts</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {activeAlertsCount}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Active Alerts</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {triggeredAlertsCount}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Deals Found</div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Price Alerts Yet"
          description="Create your first price alert to get notified when Apple products go on sale."
          actionLabel="Create Alert"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Alerts
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Bell className="h-4 w-4" />
              <span>{activeAlertsCount} active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onEdit={() => setEditingAlert(alert)}
                onDelete={() => handleDeleteAlert(alert.id)}
                onToggle={() => handleToggleAlert(alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="mt-16">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How Price Alerts Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-apple-blue/10 rounded-full mb-4">
                <Plus className="h-8 w-8 text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                1. Create Alert
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set your target price for any Apple product you want to track.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                2. We Monitor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our system checks prices across retailers multiple times daily.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                3. Get Notified
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive instant email alerts when prices drop to your target.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      {(showModal || editingAlert) && (
        <AlertModal
          isOpen={showModal || !!editingAlert}
          onClose={() => {
            setShowModal(false)
            setEditingAlert(null)
          }}
          onSave={editingAlert ? handleEditAlert : handleCreateAlert}
          editingAlert={editingAlert}
        />
      )}
    </div>
  )
}

export default Alerts