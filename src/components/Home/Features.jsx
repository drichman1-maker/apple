import React from 'react'
import { BarChart3, Bell, Zap, Shield, Smartphone, Laptop, Sparkles } from 'lucide-react'

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
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6">
            <Sparkles className="h-4 w-4 mr-2 text-apple-blue" />
            Why Choose MacTrackr
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Shop Smarter,{' '}
            <span className="bg-gradient-to-r from-apple-blue via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Save More
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of Apple users who never miss a deal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card-dark p-8 rounded-2xl hover:shadow-[0_0_40px_rgba(0,122,255,0.15)] transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-apple-blue/20 to-purple-500/20 rounded-2xl mb-6 group-hover:from-apple-blue/30 group-hover:to-purple-500/30 transition-all">
                <feature.icon className="h-8 w-8 text-apple-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-apple-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
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