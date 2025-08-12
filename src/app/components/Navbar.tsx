"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = useMemo(
    () => [
      { href: "/blog", label: "Blog" },
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/#faq", label: "FAQ" },
    ],
    []
  );

  useEffect(() => {
    // Close menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Lock scroll when mobile menu is open
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // Handle anchor to home
    if (href.startsWith("/#")) return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      <nav
        aria-label="Hauptnavigation"
        className="bg-[#23243a]/95 backdrop-blur border-b border-[#30b9c9]/20 shadow"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 min-h-[56px] flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#f3f6fa] font-bold text-xl hover:text-[#30b9c9] transition-colors"
            aria-label="Startseite"
          >
            <Image
              src="/logo.webp"
              alt="Pflegebuddy Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
            PflegeBuddy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-semibold transition-colors ${
                  isActive(href)
                    ? "text-[#30b9c9]"
                    : "text-[#f3f6fa] hover:text-[#30b9c9]"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://pflegebuddy.carrd.co"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center rounded-full bg-[#30b9c9] px-4 py-2 text-white font-semibold hover:bg-[#167080] transition-colors"
            >
              Jetzt herunterladen
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden text-[#f3f6fa] hover:text-[#30b9c9]"
            aria-label="Menü öffnen"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay and menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            id="mobile-menu"
            className="fixed top-[56px] left-0 right-0 z-[70] bg-[#23243a] border-b border-white/10 shadow-md md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navigationLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#f3f6fa] font-semibold hover:text-[#30b9c9] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://pflegebuddy.carrd.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#30b9c9] px-4 py-2 text-white font-semibold hover:bg-[#167080] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jetzt herunterladen
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}