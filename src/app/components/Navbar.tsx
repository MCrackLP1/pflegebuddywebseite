"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="relative bg-white/70 backdrop-blur border border-white/60 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 text-[#30b9c9] font-bold text-xl hover:text-[#167080] transition-colors">
            <Image src="/logo.webp" alt="PflegeBuddy Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            PflegeBuddy
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/leistungen" className="text-gray-600 hover:text-[#30b9c9] transition-colors">Leistungen</Link> */}
            <Link href="/blog" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
              Blog
            </Link>
            <Link href="/ueber-uns" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
              Über uns
            </Link>
            <Link href="/kontakt" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-900 hover:text-[#30b9c9]"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="relative bg-white/10 backdrop-blur border border-white/40 mt-2 rounded-3xl shadow-lg py-4 px-6">
            <div className="flex flex-col space-y-4">
              {/* <Link href="/leistungen" className="text-gray-600 hover:text-[#30b9c9] transition-colors">Leistungen</Link> */}
              <Link href="/blog" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
                Blog
              </Link>
              <Link href="/ueber-uns" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
                Über uns
              </Link>
              <Link href="/kontakt" className="text-gray-900 font-semibold hover:text-[#30b9c9] transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 