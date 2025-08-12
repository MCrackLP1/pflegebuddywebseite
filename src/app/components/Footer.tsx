import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGooglePlay, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#23243a] border-t border-[#30b9c9]/20 mt-10 text-sm text-[#f3f6fa]">
      {/* Top CTA inside footer */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.webp" alt="PflegeBuddy Logo" width={28} height={28} className="rounded" />
          <div className="font-semibold">PflegeBuddy – Deine App für den Pflegealltag</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Apple App Store (bald verfügbar)" className="inline-flex items-center gap-2 rounded-full bg-[#30b9c9] hover:bg-[#167080] text-white px-4 py-2 transition"><FaApple /> App Store</a>
          <a href="https://pflegebuddy.carrd.co" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store" className="inline-flex items-center gap-2 rounded-full bg-[#30b9c9] hover:bg-[#167080] text-white px-4 py-2 transition"><FaGooglePlay /> Google Play</a>
        </div>
      </div>

      <div className="px-6 py-10 bg-[#23243a]/95">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.webp" alt="PflegeBuddy Logo" width={32} height={32} />
              <span className="text-lg font-bold text-[#f3f6fa]">PflegeBuddy</span>
            </div>
            <p className="mt-3 text-[#f3f6fa]/90">Deine App für den Pflegealltag – persönlich & digital.</p>
            <p className="mt-2 text-[#f3f6fa]/80">Mark Tietz & Tim Werner</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation">
            <h2 className="font-semibold text-[#30b9c9]">Navigation</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/ueber-uns" className="hover:text-[#30b9c9] transition">Über uns</Link></li>
              <li><Link href="/blog" className="hover:text-[#30b9c9] transition">Blog</Link></li>
              <li><Link href="/#faq" className="hover:text-[#30b9c9] transition">FAQ</Link></li>
              <li><Link href="/kontakt" className="hover:text-[#30b9c9] transition">Kontakt</Link></li>
            </ul>
          </nav>

          {/* Rechtliches */}
          <nav aria-label="Rechtliches">
            <h2 className="font-semibold text-[#30b9c9]">Rechtliches</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/datenschutz" className="hover:text-[#30b9c9] transition">Datenschutz</Link></li>
              <li><Link href="/impressum" className="hover:text-[#30b9c9] transition">Impressum</Link></li>
              <li><Link href="/haftungsausschluss" className="hover:text-[#30b9c9] transition">Haftungsausschluss</Link></li>
              <li><Link href="/agb" className="hover:text-[#30b9c9] transition">AGB</Link></li>
            </ul>
          </nav>

          {/* Kontakt & Social */}
          <div>
            <h2 className="font-semibold text-[#30b9c9]">Kontakt</h2>
            <div className="mt-3 space-y-1">
              <a href="tel:01741632129" className="hover:text-[#30b9c9] transition">0174 1632129</a>
              <div>
                <a href="mailto:deinpflegebuddy@gmail.com" className="hover:text-[#30b9c9] transition">deinpflegebuddy@gmail.com</a>
              </div>
              <div>Königplatz 3, Waltenhofen</div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-[#30b9c9]">Folge uns</h3>
              <div className="flex gap-3 mt-2 text-[#f3f6fa]">
                <a href="https://www.instagram.com/pflege.buddy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#30b9c9] transition"><FaInstagram size={22} /></a>
                <a href="https://www.facebook.com/pflegebuddy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#30b9c9] transition"><FaFacebook size={22} /></a>
                <a href="https://www.linkedin.com/company/pflegebuddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#30b9c9] transition"><FaLinkedin size={22} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#f3f6fa]/70">
          <div>© {year} PflegeBuddy. Alle Rechte vorbehalten.</div>
          <div className="flex gap-4">
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