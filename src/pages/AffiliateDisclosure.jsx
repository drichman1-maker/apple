// Affiliate Disclosure Page - Mactrackr
// Required for FTC compliance and affiliate program approvals

import React from 'react';
import { Link } from 'react-router-dom';

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Affiliate Disclosure</h1>
        
        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="text-xl mb-6 text-gray-400">
            Last updated: March 2, 2026
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Commitment to Transparency</h2>
          <p>
            Mactrackr participates in affiliate marketing programs. This means we may earn commissions 
            when you click on links to Apple products and make purchases from our retail partners. 
            This comes at no additional cost to you.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How Affiliate Links Work</h2>
          <p>
            When you click on a retailer link on Mactrackr, that link may contain a special tracking code. 
            If you make a purchase after clicking that link, we may receive a small commission from the 
            retailer. This helps us maintain and improve our price tracking and deal alert services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Partners</h2>
          <p>We currently have affiliate relationships with:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li><strong className="text-purple-400">Amazon Associates</strong> — MacBooks, iPads, iPhones, and accessories</li>
            <li><strong className="text-purple-400">Apple</strong> — Direct Apple Store purchases (when approved)</li>
            <li><strong className="text-purple-400">Best Buy</strong> — Apple products and refurbished Macs</li>
            <li><strong className="text-purple-400">Adorama</strong> — Apple computers and professional gear</li>
          </ul>
          <p>
            We also feature products from retailers where we do not have affiliate relationships 
            (e.g., B&H Photo, Micro Center, Costco). These are included for price comparison, 
            stock availability, and refurbished deals only.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Price Accuracy & Independence</h2>
          <p>
            Our price tracking, MSRP comparisons, and deal scoring are independent of our affiliate 
            relationships. We display the same prices whether or not we earn a commission. Our goal 
            is to help you find the best deals on Apple products, regardless of where you ultimately purchase.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Refurbished & Open Box</h2>
          <p>
            We specifically highlight refurbished and open-box deals from Apple, Best Buy, and other 
            retailers. These often provide the best value. We do not prioritize affiliate retailers 
            over non-affiliate ones when recommending refurbished options.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships, please contact us at{' '}
            <a href="mailto:affiliates@mactrackr.com" className="text-purple-400 hover:underline">
              affiliates@mactrackr.com
            </a>.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link to="/" className="text-purple-400 hover:underline">
              ← Back to Mactrackr
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
