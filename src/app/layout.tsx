import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StickyContactButtons from "./components/StickyContactButtons";
import FeedbackButton from "./components/FeedbackButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CookieConsent from "./components/CookieConsent";
import Script from "next/script";
import dynamic from "next/dynamic";

// Dynamischer Import für den AnalyticsWrapper, um ihn nur client-seitig zu laden
const AnalyticsWrapper = dynamic(() => import('./components/AnalyticsWrapper'), {
  ssr: false // Nur client-seitig ausführen
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pflegebuddy.app'),
  title: {
    default: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    template: "%s | Pflegebuddy"
  },
  description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
  keywords: ["Pflege", "Pflegehilfe", "Pflegeassistent", "Pflegeberatung", "digitale Pflegehilfe"],
  authors: [{ name: "Pflegebuddy Team" }],
  creator: "Pflegebuddy GmbH",
  publisher: "Pflegebuddy GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
    url: "https://www.pflegebuddy.app/",
    siteName: "Pflegebuddy",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Pflegebuddy App Vorschau"
      }
    ],
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
    images: ["/og-image.webp"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Pflegebuddy Blog" href="/blog/rss.xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" sizes="any" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pflegebuddy",
            "url": "https://www.pflegebuddy.app",
            "logo": "https://www.pflegebuddy.app/logo.webp",
            "description": "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz und mehr.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "0174 1632129",
              "contactType": "customer service",
              "email": "deinpflegebuddy@gmail.com"
            },
            "sameAs": [
              "https://www.facebook.com/pflegebuddy",
              "https://www.instagram.com/pflegebuddy.app",
              "https://www.linkedin.com/company/pflegebuddy"
            ]
          })
        }} />
        {/* Brevo script wird geladen, aber erst nach Einwilligung aktiviert */}
        <Script src="https://cdn.brevo.com/js/sdk-loader.js" strategy="afterInteractive" />
        {/* Brevo Aktivierungs-Script entfernt - wird jetzt in CookieConsent.tsx gesteuert */}
        <noscript>
          <style>{`
            .no-js-content { display: block !important; }
            .js-only { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Hide on mobile, show from medium screens up */}
        <div className="hidden md:block">
          <AnimatedBackground />
        </div>
        <Navbar />
        {/* Hide on mobile, show from medium screens up */}
        <div className="hidden md:block">
          <StickyContactButtons />
        </div>
        {/* Hide on mobile, show from medium screens up */}
        <div className="hidden md:block">
          <FeedbackButton />
        </div>
        <ScrollToTopButton />
        <main>
          {children}
        </main>
        <Footer />
        <CookieConsent />
        {/* Vercel Analytics nur mit Einwilligung aktivieren - der Wrapper prüft die Einwilligung */}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
