import React from 'react'

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  children 
}) => {
  return (
    <div className="text-center py-12 px-4">
      {Icon && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full">
            <Icon className="h-10 w-10 text-gray-400" />
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
        >
          {actionLabel}
        </button>
      )}
      
      {children}
    </div>
  )
}

export default EmptyState