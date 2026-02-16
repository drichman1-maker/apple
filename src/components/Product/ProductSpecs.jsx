import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

const ProductSpecs = ({ specifications, features }) => {
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(true)
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(true)

  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      {specifications && Object.keys(specifications).length > 0 && (
        <div className="card p-6">
          <button
            onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Technical Specifications
            </h2>
            {isSpecsExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {isSpecsExpanded && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex justify-between items-start">
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {key}
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-white text-right max-w-xs">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Key Features */}
      {features && features.length > 0 && (
        <div className="card p-6">
          <button
            onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Key Features
            </h2>
            {isFeaturesExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {isFeaturesExpanded && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Product Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Why Buy This Product?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Latest technology and premium build quality</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Excellent resale value</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Regular software updates and long-term support</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Seamless integration with Apple ecosystem</span>
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Price Tracking Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-apple-blue mt-0.5 flex-shrink-0" />
              <span>Set price alerts to get notified of deals</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-apple-blue mt-0.5 flex-shrink-0" />
              <span>Check multiple retailers for best prices</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-apple-blue mt-0.5 flex-shrink-0" />
              <span>Consider refurbished options for savings</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-apple-blue mt-0.5 flex-shrink-0" />
              <span>Wait for seasonal sales and promotions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductSpecs