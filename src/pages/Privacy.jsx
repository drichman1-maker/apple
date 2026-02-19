import React from 'react'
import { Helmet } from 'react-helmet-async'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <Helmet>
        <title>Privacy Policy | MacTrackr</title>
        <meta name="description" content="MacTrackr privacy policy - we don't collect your data." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">We Don't Collect Your Data</h2>
            <p>MacTrackr is anonymous by design. We built this site because we were tired of Big Tech tracking every click.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What We Don't Do</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No user accounts required</li>
              <li>No tracking cookies</li>
              <li>No email lists (unless you explicitly opt into price alerts)</li>
              <li>No data sold to third parties</li>
              <li>No analytics that identify you personally</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What We Do Collect</h2>
            <p className="mb-3">Almost nothing:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Local storage:</strong> Your "New vs Refurbished" preference (stored only on your device)</li>
              <li><strong>Price alerts:</strong> If you sign up, we store your email and the products you want to track</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Affiliate Disclosure</h2>
            <p>MacTrackr participates in affiliate programs (Amazon Associates, B&H Photo, Adorama). When you click a retailer link and make a purchase, we may earn a small commission at no extra cost to you.</p>
            <p className="mt-3">This doesn't affect which products we show or how we rank them. We show the best prices regardless of affiliate relationships.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Third-Party Links</h2>
            <p>We link to retailer websites (Apple, Amazon, B&H, etc.). These sites have their own privacy policies. We don't control how they handle your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Changes</h2>
            <p>If we ever change this policy, we'll post the update here. But our core principle won't change: <strong>minimal data, maximum privacy.</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>Questions? Contact us at privacy@mactrackr.com</p>
          </section>

          <div className="pt-6 border-t border-[#333]">
            <p className="text-sm text-gray-500">Last updated: February 17, 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
