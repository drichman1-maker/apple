import React from 'react'
import { Search, Bell, Shield, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search Products',
      description: 'Find any Apple product you want to track'
    },
    {
      icon: Bell,
      title: 'Set Alerts',
      description: 'Choose your target price and get notified'
    },
    {
      icon: TrendingDown,
      title: 'Save Money',
      description: 'Buy at the perfect moment'
    }
  ]

  return (
    <section className="py-20 bg-gray-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-apple-blue/5 via-transparent to-purple-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400">
            Three simple steps to start saving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-apple-blue/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-apple-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-5 w-5 mr-2" />
            Free to use
          </div>
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-5 w-5 mr-2" />
            No spam
          </div>
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-5 w-5 mr-2" />
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks