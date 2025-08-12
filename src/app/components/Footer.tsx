import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGooglePlay, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#23243a] border-top border-[#30b9c9]/20 mt-10 text-sm text-[#f3f6fa]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          {/* Brand */}
          <div className="min-w-[220px] flex-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.webp" alt="PflegeBuddy Logo" width={28} height={28} />
              <span className="text-base font-bold">PflegeBuddy</span>
            </div>
            <p className="mt-2 text-[#f3f6fa]/80">Deine App für den Pflegealltag – persönlich & digital.</p>
            <div className="mt-3 flex gap-2">
              <a href="#" aria-label="Apple App Store (bald verfügbar)" className="inline-flex items-center gap-2 rounded-full bg-[#30b9c9] hover:bg-[#167080] text-white px-3 py-1.5 transition"><FaApple /> App</a>
              <a href="https://pflegebuddy.carrd.co" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store" className="inline-flex items-center gap-2 rounded-full bg-[#30b9c9] hover:bg-[#167080] text-white px-3 py-1.5 transition"><FaGooglePlay /> Play</a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation" className="min-w-[180px]">
            <h2 className="font-semibold text-[#30b9c9]">Navigation</h2>
            <ul className="mt-2 space-y-1">
              <li><Link href="/ueber-uns" className="hover:text-[#30b9c9] transition">Über uns</Link></li>
              <li><Link href="/blog" className="hover:text-[#30b9c9] transition">Blog</Link></li>
              <li><Link href="/#faq" className="hover:text-[#30b9c9] transition">FAQ</Link></li>
              <li><Link href="/kontakt" className="hover:text-[#30b9c9] transition">Kontakt</Link></li>
            </ul>
          </nav>

          {/* Rechtliches */}
          <nav aria-label="Rechtliches" className="min-w-[180px]">
            <h2 className="font-semibold text-[#30b9c9]">Rechtliches</h2>
            <ul className="mt-2 space-y-1">
              <li><Link href="/datenschutz" className="hover:text-[#30b9c9] transition">Datenschutz</Link></li>
              <li><Link href="/impressum" className="hover:text-[#30b9c9] transition">Impressum</Link></li>
              <li><Link href="/haftungsausschluss" className="hover:text-[#30b9c9] transition">Haftungsausschluss</Link></li>
              <li><Link href="/agb" className="hover:text-[#30b9c9] transition">AGB</Link></li>
            </ul>
          </nav>

          {/* Kontakt & Social */}
          <div className="min-w-[220px] flex-1">
            <h2 className="font-semibold text-[#30b9c9]">Kontakt</h2>
            <div className="mt-2 space-y-1">
              <a href="tel:01741632129" className="hover:text-[#30b9c9] transition">0174 1632129</a>
              <div>
                <a href="mailto:deinpflegebuddy@gmail.com" className="hover:text-[#30b9c9] transition">deinpflegebuddy@gmail.com</a>
              </div>
              <div>Königplatz 3, Waltenhofen</div>
            </div>
            <div className="mt-3 flex gap-3 text-[#f3f6fa]">
              <a href="https://www.instagram.com/pflege.buddy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#30b9c9] transition"><FaInstagram size={20} /></a>
              <a href="https://www.facebook.com/pflegebuddy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#30b9c9] transition"><FaFacebook size={20} /></a>
              <a href="https://www.linkedin.com/company/pflegebuddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#30b9c9] transition"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom bar (compact) */}
        <div className="mt-6 border-t border-white/10 pt-3 text-xs text-[#f3f6fa]/70 flex flex-wrap items-center justify-between gap-3">
          <div>© {year} PflegeBuddy. Alle Rechte vorbehalten.</div>
          <div className="flex gap-3">
            <Link href="/datenschutz" className="hover:text-[#30b9c9] transition">Datenschutz</Link>
            <Link href="/impressum" className="hover:text-[#30b9c9] transition">Impressum</Link>
            <Link href="/haftungsausschluss" className="hover:text-[#30b9c9] transition">Haftungsausschluss</Link>
            <Link href="/agb" className="hover:text-[#30b9c9] transition">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}