import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductConditionContext = createContext()

export const useProductCondition = () => {
  const context = useContext(ProductConditionContext)
  if (!context) {
    throw new Error('useProductCondition must be used within a ProductConditionProvider')
  }
  return context
}

export const ProductConditionProvider = ({ children }) => {
  const [condition, setCondition] = useState(() => {
    const savedCondition = localStorage.getItem('productCondition')
    // Default to new unless explicitly set to refurbished
    return savedCondition || 'new'
  })

  const toggleCondition = () => {
    setCondition(prev => prev === 'new' ? 'refurbished' : 'new')
  }

  const setToNew = () => setCondition('new')
  const setToRefurbished = () => setCondition('refurbished')

  useEffect(() => {
    localStorage.setItem('productCondition', condition)
  }, [condition])

  const value = {
    condition,
    isNew: condition === 'new',
    isRefurbished: condition === 'refurbished',
    toggleCondition,
    setToNew,
    setToRefurbished
  }

  return (
    <ProductConditionContext.Provider value={value}>
      {children}
    </ProductConditionContext.Provider>
  )
}
