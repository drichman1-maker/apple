import React from 'react'
import { Edit, Trash2, Bell, BellOff, Check, TrendingDown, TrendingUp } from 'lucide-react'

const AlertCard = ({ alert, onEdit, onDelete, onToggle }) => {
  const {
    productName,
    productCategory,
    currentPrice,
    targetPrice,
    isActive,
    createdAt,
    triggeredAt,
    retailer
  } = alert

  const priceDifference = currentPrice - targetPrice
  const percentageToTarget = Math.abs((priceDifference / currentPrice) * 100)
  const isTriggered = !!triggeredAt
  const isCloseToTarget = Math.abs(priceDifference) <= currentPrice * 0.1 // Within 10%

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getRetailerDisplayName = (retailerKey) => {
    const names = {
      any: 'Any Retailer',
      apple: 'Apple Store',
      amazon: 'Amazon',
      bestbuy: 'Best Buy',
      bh: 'B&H Photo'
    }
    return names[retailerKey] || retailerKey
  }

  const getStatusBadge = () => {
    if (isTriggered) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Triggered
        </span>
      )
    }
    
    if (!isActive) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <BellOff className="h-3 w-3 mr-1" />
          Inactive
        </span>
      )
    }

    if (isCloseToTarget) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <TrendingDown className="h-3 w-3 mr-1" />
          Close
        </span>
      )
    }

    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <Bell className="h-3 w-3 mr-1" />
        Active
      </span>
    )
  }

  return (
    <div className={`card p-6 ${isTriggered ? 'ring-2 ring-green-500' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm text-apple-blue font-medium capitalize">
            {productCategory}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {productName}
          </h3>
        </div>
        {getStatusBadge()}
      </div>

      {/* Price Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Current Price</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${currentPrice}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Target Price</span>
          <span className="text-lg font-bold text-green-600">
            ${targetPrice}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Difference</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              priceDifference > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {priceDifference > 0 ? '+' : ''}${Math.abs(priceDifference)}
            </span>
            {priceDifference > 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
      </div>

      {/* Alert Details */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
        <div>Retailer: {getRetailerDisplayName(retailer)}</div>
        <div>Created: {formatDate(createdAt)}</div>
        {triggeredAt && (
          <div className="text-green-600 font-medium">
            Triggered: {formatDate(triggeredAt)}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!isTriggered && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Progress to target
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {percentageToTarget.toFixed(1)}% to go
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isCloseToTarget ? 'bg-yellow-500' : 'bg-apple-blue'
              }`}
              style={{
                width: `${Math.min(100 - percentageToTarget, 100)}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onToggle}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
            isActive
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              : 'bg-apple-blue text-white hover:bg-blue-600'
          }`}
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={onEdit}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          title="Edit Alert"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          title="Delete Alert"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default AlertCard