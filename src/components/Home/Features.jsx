import React from 'react'
import { BarChart3, Bell, Zap, Shield, Smartphone, Laptop } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Price History Charts',
      description: 'View detailed price trends and historical data to make informed purchase decisions.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified instantly when prices drop below your target threshold.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Prices are updated multiple times daily across all major retailers.'
    },
    {
      icon: Shield,
      title: 'Price Protection',
      description: 'Never overpay again with our comprehensive price comparison system.'
    },
    {
      icon: Smartphone,
      title: 'All Apple Products',
      description: 'Track iPhone, iPad, Mac, Apple Watch, AirPods, and accessories.'
    },
    {
      icon: Laptop,
      title: 'Multiple Retailers',
      description: 'Compare prices from Apple, Amazon, Best Buy, B&H, and more.'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Save Money
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our comprehensive tracking system helps you find the best deals on Apple products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-apple-blue/10 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-apple-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features