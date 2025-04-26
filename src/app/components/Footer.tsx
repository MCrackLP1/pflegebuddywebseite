import React from "react";
import { FaApple, FaGooglePlay, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#23243a] py-10 px-6 mt-10 text-sm text-[#f3f6fa]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h3 className="font-bold text-[#30b9c9]">Pflegebuddy</h3>
          <p className="mt-2 text-[#f3f6fa]">Deine App für den Pflegealltag – persönlich & digital.</p>
          <p className="mt-2 text-[#f3f6fa] font-semibold">Mark Tietz & Tim Werner</p>
        </div>
        <nav aria-label="Footer Navigation" className="md:col-span-1">
          <h4 className="font-semibold text-[#30b9c9]">Navigation</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="/ueber-uns" className="hover:text-[#30b9c9] transition">Über uns</a></li>
            <li><a href="/blog" className="hover:text-[#30b9c9] transition">Blog</a></li>
            <li><a href="/#faq" className="hover:text-[#30b9c9] transition">FAQ</a></li>
            <li><a href="/kontakt" className="hover:text-[#30b9c9] transition">Kontakt</a></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-semibold text-[#30b9c9]">Kontakt</h4>
          <p className="flex items-center gap-2 mt-2">
            <a href="tel:01741632129" className="hover:text-[#30b9c9] transition">0174 1632129</a>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <a href="mailto:deinpflegebuddy@gmail.com" className="hover:text-[#30b9c9] transition">deinpflegebuddy@gmail.com</a>
          </p>
          <p className="flex items-center gap-2 mt-1">
            Königplatz 3, Waltenhofen
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#30b9c9]">Folge uns</h4>
          <div className="flex gap-3 mt-2">
            <a href="https://www.instagram.com/pflege.buddy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#30b9c9] transition"><FaInstagram size={28} /></a>
          </div>
          <h4 className="font-semibold text-[#30b9c9] mt-4">Jetzt herunterladen</h4>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Apple App Store (bald verfügbar)" className="hover:text-[#30b9c9] transition"><FaApple size={28} /></a>
            <a href="https://pflegebuddy.carrd.co" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store"><FaGooglePlay size={28} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-[#f3f6fa]/70 gap-2">
        <div>© 2025 Pflegebuddy. Alle Rechte vorbehalten.</div>
        <div className="flex gap-4">
          <a href="/datenschutz" className="hover:text-[#30b9c9] transition">Datenschutz</a>
          <a href="/impressum" className="hover:text-[#30b9c9] transition">Impressum</a>
          <a href="/haftungsausschluss" className="hover:text-[#30b9c9] transition">Haftungsausschluss</a>
          <a href="/agb" className="hover:text-[#30b9c9] transition">AGB</a>
        </div>
      </div>
    </footer>
  );
} 