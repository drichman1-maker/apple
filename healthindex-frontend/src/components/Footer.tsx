import Link from 'next/link'
import { Twitter, Instagram, Facebook, Sparkles, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* CTA Section */}
        <div className="mb-16">
          <div className="glass-card p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Ready to upgrade your facility?
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Custom Pricing for Your Facility
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Our team will help you find the right equipment at the best prices.
              </p>
              <Link 
                href="/consultation"
                className="btn-neon inline-flex items-center px-8 py-4 text-lg"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-white">Health Index</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted guide to wellness technology. Discover the best devices for optimal health and recovery.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  All Equipment
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Equipment</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=cryotherapy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  ❄️ Cryotherapy
                </Link>
              </li>
              <li>
                <Link href="/products?category=hyperbaric" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  💨 Hyperbaric
                </Link>
              </li>
              <li>
                <Link href="/products?category=redlight" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  🔴 Red Light Therapy
                </Link>
              </li>
              <li>
                <Link href="/products?category=compression" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  🧘 Compression
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>info@healthindex.app</span>
              </div>
              <p className="text-gray-500 text-sm">
                Mon-Fri: 9AM - 6PM EST
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 Health Index. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/affiliate-disclosure" className="text-gray-500 hover:text-white transition-colors">
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}