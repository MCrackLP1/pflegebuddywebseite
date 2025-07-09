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
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="X_Huj2yd7jxZnYG-7QZ1l0DZGv7gr2k0XC13EEkq-wo" />
        
        {/* Preconnect hints for critical external services */}
        <link rel="preconnect" href="https://js.brevo.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://cdn.vercel-insights.com" />
        <link rel="preconnect" href="https://api.brevo.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Priority resource hints */}
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/Headersectionbg.webp" as="image" type="image/webp" />
        
        {/* Critical CSS inline for faster initial render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;line-height:1.5;color:#1f2937;background-color:#fff}
            .fixed{position:fixed}
            .relative{position:relative}
            .top-4{top:1rem}
            .left-1\\/2{left:50%}
            .-translate-x-1\\/2{transform:translateX(-50%)}
            .z-50{z-index:50}
            .w-\\[90\\%\\]{width:90%}
            .max-w-5xl{max-width:64rem}
            .bg-white\\/70{background-color:rgb(255 255 255 / 0.7)}
            .backdrop-blur{backdrop-filter:blur(8px)}
            .border{border-width:1px}
            .border-white\\/60{border-color:rgb(255 255 255 / 0.6)}
            .rounded-full{border-radius:9999px}
            .px-6{padding-left:1.5rem;padding-right:1.5rem}
            .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
            .shadow-lg{box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1),0 4px 6px -4px rgb(0 0 0 / 0.1)}
            .flex{display:flex}
            .items-center{align-items:center}
            .justify-between{justify-content:space-between}
            .text-\\[\\#30b9c9\\]{color:#30b9c9}
            .font-bold{font-weight:700}
            .text-xl{font-size:1.25rem;line-height:1.75rem}
            .min-h-screen{min-height:100vh}
            .bg-\\[\\#23243a\\]{background-color:#23243a}
            .text-\\[\\#f3f6fa\\]{color:#f3f6fa}
          `
        }} />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pflegebuddy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pflegebuddy" />
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
