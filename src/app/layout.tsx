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
            html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;line-height:1.5;-webkit-text-size-adjust:100%}
            body{margin:0;font-family:inherit;line-height:inherit;color:#1f2937;background-color:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            
            /* Layout primitives */
            .fixed{position:fixed}.relative{position:relative}.absolute{position:absolute}.sticky{position:sticky}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .top-0{top:0}.top-4{top:1rem}.left-0{left:0}.left-1\\/2{left:50%}.right-0{right:0}.bottom-0{bottom:0}
            .z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-50{z-index:50}
            
            /* Transforms and positioning */
            .-translate-x-1\\/2{--tw-translate-x:-50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}
            .translate-x-0{--tw-translate-x:0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}
            
            /* Flexbox and grid */
            .flex{display:flex}.grid{display:grid}.hidden{display:none}.block{display:block}.inline-block{display:inline-block}
            .flex-col{flex-direction:column}.flex-row{flex-direction:row}
            .items-center{align-items:center}.items-start{align-items:flex-start}.items-end{align-items:flex-end}
            .justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-start{justify-content:flex-start}
            .text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}
            
            /* Sizing */
            .w-full{width:100%}.w-auto{width:auto}.w-\\[90\\%\\]{width:90%}.w-16{width:4rem}.w-8{width:2rem}
            .h-full{height:100%}.h-auto{height:auto}.h-16{height:4rem}.h-8{height:2rem}.h-96{height:24rem}
            .min-h-screen{min-height:100vh}.min-h-\\[65vh\\]{min-height:65vh}
            .max-w-6xl{max-width:72rem}.max-w-5xl{max-width:64rem}.max-w-4xl{max-width:56rem}.max-w-3xl{max-width:48rem}
            
            /* Spacing */
            .p-0{padding:0}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}
            .px-2{padding-left:0.5rem;padding-right:0.5rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}
            .py-3{padding-top:0.75rem;padding-bottom:0.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-16{padding-top:4rem;padding-bottom:4rem}
            .pt-24{padding-top:6rem}.pb-12{padding-bottom:3rem}
            .mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.mb-12{margin-bottom:3rem}.mb-16{margin-bottom:4rem}
            .mx-auto{margin-left:auto;margin-right:auto}.mt-8{margin-top:2rem}
            .space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem*calc(1-var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem*var(--tw-space-y-reverse))}
            .space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem*calc(1-var(--tw-space-y-reverse)));margin-bottom:calc(2rem*var(--tw-space-y-reverse))}
            .gap-4{gap:1rem}.gap-2{gap:0.5rem}.gap-8{gap:2rem}
            
            /* Colors */
            .bg-white{background-color:#fff}.bg-gray-50{background-color:#f9fafb}.bg-gray-100{background-color:#f3f4f6}
            .bg-black\\/40{background-color:rgb(0 0 0 / 0.4)}
            .bg-white\\/70{background-color:rgb(255 255 255 / 0.7)}
            .bg-\\[\\#30b9c9\\]{background-color:#30b9c9}.bg-\\[\\#23243a\\]{background-color:#23243a}
            .text-white{color:#fff}.text-gray-900{color:#111827}.text-gray-600{color:#4b5563}.text-gray-500{color:#6b7280}
            .text-\\[\\#30b9c9\\]{color:#30b9c9}.text-\\[\\#f3f6fa\\]{color:#f3f6fa}.text-\\[\\#167080\\]{color:#167080}
            
            /* Typography */
            .font-bold{font-weight:700}.font-semibold{font-weight:600}
            .text-sm{font-size:0.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}
            .text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}
            .text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}
            .text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}
            .text-6xl{font-size:3.75rem;line-height:1}.leading-tight{line-height:1.25}.leading-relaxed{line-height:1.625}
            
            /* Borders and shadows */
            .border{border-width:1px}.border-white\\/60{border-color:rgb(255 255 255 / 0.6)}
            .rounded-full{border-radius:9999px}.rounded-xl{border-radius:0.75rem}
            .shadow-lg{box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1),0 4px 6px -4px rgb(0 0 0 / 0.1)}
            .backdrop-blur{backdrop-filter:blur(8px)}
            
            /* Transitions */
            .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            .transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            .duration-200{transition-duration:200ms}
            .hover\\:bg-\\[\\#167080\\]:hover{background-color:#167080}
            .hover\\:text-\\[\\#167080\\]:hover{color:#167080}
            .hover\\:scale-105:hover{transform:scale(1.05)}
            .hover\\:transform:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}
            .group:hover .group-hover\\:text-\\[\\#167080\\]{color:#167080}
            .group:hover .group-hover\\:scale-105{transform:scale(1.05)}
            
            /* Responsive grid */
            .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
            @media (min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
            @media (min-width:1024px){.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
            @media (min-width:640px){.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:pt-24{padding-top:6rem}.sm\\:pb-16{padding-bottom:4rem}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.sm\\:text-xl{font-size:1.25rem;line-height:1.75rem}.sm\\:flex-row{flex-direction:row}}
            @media (min-width:768px){.md\\:pt-28{padding-top:7rem}.md\\:pb-20{padding-bottom:5rem}.md\\:py-20{padding-top:5rem;padding-bottom:5rem}.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}.md\\:space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem*calc(1-var(--tw-space-y-reverse)));margin-bottom:calc(2rem*var(--tw-space-y-reverse))}.md\\:mb-16{margin-bottom:4rem}}
            @media (min-width:1024px){.lg\\:text-6xl{font-size:3.75rem;line-height:1}}
            
            /* Utilities */
            .overflow-hidden{overflow:hidden}.object-cover{object-fit:cover}.object-center{object-position:center}
            .cursor-pointer{cursor:pointer}.select-none{user-select:none}
            .min-w-\\[200px\\]{min-width:200px}.max-w-full{max-width:100%}
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-[#30b9c9] focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          Zum Inhalt springen
        </a>
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
        <main id="main-content" className="pt-16">
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
