'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Equipment', href: '/equipment' },
    { name: 'Categories', href: '/categories' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Market Pulse', href: '/market' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#00e5ff]/20 group-hover:shadow-[#00e5ff]/40 transition-all duration-300">
              <span className="text-white font-bold text-xl">H</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7c3aed] opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-[#00e5ff] bg-clip-text text-transparent">
                Health Index
              </span>
              <span className="text-xs text-white/40 hidden sm:block">Recovery Equipment Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Search className="w-5 h-5 text-white/60" />
            </button>

            {/* CTA */}
            <Link
              href="/consultation"
              className="hidden md:flex items-center px-5 py-2.5 bg-gradient-to-r from-[#00e5ff] to-[#00b8d9] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 text-sm"
            >
              Get Quote
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/consultation"
                className="mx-4 mt-2 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00e5ff] to-[#00b8d9] text-black font-semibold rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}