import React from 'react'
import { BarChart3, Bell, Shield, Clock, Users, Award } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Price Tracking',
      description: 'Monitor prices across major retailers with updates every few hours to ensure you never miss a deal.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get instant notifications when products reach your target price, with customizable alert preferences.'
    },
    {
      icon: Shield,
      title: 'Data Privacy',
      description: 'Your information is secure and private. We only track prices, not your personal browsing habits.'
    },
    {
      icon: Clock,
      title: 'Historical Data',
      description: 'View detailed price history charts to identify trends and make informed purchasing decisions.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Apple Products Tracked' },
    { number: '10+', label: 'Major Retailers' },
    { number: '24/7', label: 'Price Monitoring' },
    { number: '99.9%', label: 'Uptime Reliability' }
  ]

  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former Apple engineer with a passion for helping people save money on tech.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Data scientist specializing in price prediction and market analysis.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Product Manager',
      bio: 'Apple enthusiast who understands what features users actually want.',
      avatar: '👨‍💼'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About MacTrackr
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We're on a mission to help Apple fans save money by providing the most comprehensive 
          price tracking and alert system for Apple products.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="card p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Apple products are incredible, but they don't have to break the bank. MacTrackr was created 
            because we believe everyone should have access to the best deals on Apple products. We monitor 
            prices across major retailers 24/7, so you can focus on what matters most – using amazing 
            technology to enhance your life.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-apple-blue mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Why Choose MacTrackr?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-apple-blue/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          How We Save You Money
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-2xl font-bold text-apple-blue">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Continuous Monitoring
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our automated systems check prices across major retailers multiple times per day, 
              ensuring we catch every price drop as soon as it happens.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Instant Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              When prices drop to your target level, we send instant email alerts so you can 
              act fast before deals expire or inventory runs out.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Smart Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              View historical price trends and analytics to time your purchases perfectly 
              and avoid buying at peak prices.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-6xl mb-4">{member.avatar}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-apple-blue font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="card p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Users className="h-12 w-12 text-apple-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User First
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Every decision we make prioritizes user experience and value.
            </p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Privacy & Security
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your data is protected and we never share personal information.
            </p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We strive for the highest quality in everything we build.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is MacTrackr free to use?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! MacTrackr is completely free. We make money through affiliate commissions 
              when you purchase products through our links, but this never affects the prices you pay.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How often are prices updated?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We update prices multiple times per day, typically every 2-6 hours depending on the 
              retailer and product popularity. High-demand items are checked more frequently.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibent text-gray-900 dark:text-white mb-2">
              Which retailers do you track?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We currently track prices from Apple Store, Amazon, Best Buy, B&H Photo, Target, 
              Walmart, and several other major retailers. We're always adding new sources.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I track refurbished products?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! We track both new and refurbished Apple products, including Apple's own 
              refurbished store which offers excellent deals with full warranty coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Have Questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We'd love to hear from you. Reach out with any questions, suggestions, or feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@mactrackr.com"
            className="btn-primary"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="btn-secondary"
          >
            Join Our Newsletter
          </a>
        </div>
      </div>
    </div>
  )
}

export default About