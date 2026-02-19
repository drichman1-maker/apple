import { Shield, Heart, Star, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Health Index
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your trusted guide to the world of wellness technology. We help you discover, 
          understand, and choose the best devices for your health journey.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              In an era where wellness technology is rapidly evolving, we believe everyone 
              deserves access to honest, comprehensive information about the devices that 
              can transform their health.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We cut through the marketing noise to provide you with evidence-based reviews, 
              detailed comparisons, and practical guidance to help you make informed decisions 
              about your wellness investments.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Health First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your wellness is our priority
              </p>
            </div>
            <div className="card text-center">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Trusted Reviews</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Honest, unbiased evaluations
              </p>
            </div>
            <div className="card text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Expert Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional recommendations
              </p>
            </div>
            <div className="card text-center">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real user experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Cover */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          What We Cover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔴</span>
            </div>
            <h3 className="font-bold text-white mb-2">Red Light Therapy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              From handheld devices to full-body panels, we review the complete spectrum of photobiomodulation technology.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-white mb-2">PEMF Therapy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore pulsed electromagnetic field devices for enhanced circulation and cellular health.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔥</span>
            </div>
            <h3 className="font-bold text-white mb-2">Infrared Saunas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive reviews of home saunas for detoxification and recovery.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="font-bold text-white mb-2">Massage Guns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Percussive therapy devices for muscle recovery and pain relief.
            </p>
          </div>
        </div>
      </div>

      {/* How We Work */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Our Review Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="font-bold text-white mb-3">Research</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We thoroughly research each product, studying specifications, clinical data, and user feedback.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="font-bold text-white mb-3">Test</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              When possible, we get hands-on experience with devices to provide real-world insights.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="font-bold text-white mb-3">Review</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We compile our findings into comprehensive, honest reviews that help you make informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Transparency */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Transparency & Trust
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-3">
              Affiliate Disclosure
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We may earn commissions from affiliate links, but this never influences our reviews. 
              Our recommendations are based solely on product quality and value.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">
              Editorial Independence
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We maintain complete editorial independence. Companies cannot pay for better reviews 
              or influence our recommendations in any way.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}