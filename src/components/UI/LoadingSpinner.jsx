import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} text-apple-blue animate-spin mb-4`} />
      <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400`}>
        {text}
      </p>
    </div>
  )
}

export default LoadingSpinner