import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Contact TheresMac
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Info */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Get in Touch
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-apple-blue/10 rounded-lg">
                <svg className="h-5 w-5 text-apple-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@theresmac.com</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">We typically respond within 24-48 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-apple-blue/10 rounded-lg">
                <svg className="h-5 w-5 text-apple-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
              <p className="text-gray-600 dark:text-gray-400">Remote-first, USA</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Common Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How do price alerts work?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in with Google, set your target price for any product, and we'll email you when it drops to that price or below.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is TheresMac free?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! TheresMac is completely free to use. We earn a small commission when you purchase through our links, at no extra cost to you.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How accurate are the prices?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We update prices multiple times per day. Each price shows a timestamp so you know when it was last verified. Prices marked as "Estimated" are predictions based on historical data.
            </p>
          </div>
        </div>
      </div>

      {/* Business Inquiries */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Business Inquiries
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          For partnerships, advertising, or press inquiries, please reach out to us at:
        </p>
        <p className="text-apple-blue font-medium">business@theresmac.com</p>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
        <p>TheresMac is independently owned and operated.</p>
        <p className="mt-2">We participate in affiliate programs with Amazon, eBay, and other retailers.</p>
      </div>
    </div>
  )
}

export default Contact
