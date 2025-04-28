import { FaRegFileAlt, FaRegLightbulb, FaRegChartBar, FaRegComments, FaRegCalendarAlt } from "react-icons/fa";
import ScrollToTopButton from "./components/ScrollToTopButton";
// import Footer from "./components/Footer"; // Remove Footer import
import dynamic from 'next/dynamic';
// import HomeContent from './components/HomeContent'; // Remove direct import
import PflegeQuiz from './components/PflegeQuiz';
import FAQAccordion from './components/FAQAccordion';
import Script from 'next/script';

// Dynamically import HomeContent without SSR
const HomeContent = dynamic(() => import('./components/HomeContent'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><p>Lade Inhalte...</p></div> // Optional loading state
});

const features = [
  {
    icon: <FaRegFileAlt className="text-[#0ea5e9]" size={32} />, 
    title: "Notfallmanagement", 
    desc: "Sofortmaßnahmen & Checklisten für verschiedene Notfälle. Schneller Zugriff auf alles, was im Ernstfall zählt."
  },
  {
    icon: <FaRegLightbulb className="text-[#00C4B4]" size={32} />, 
    title: "Pflegewissen", 
    desc: "Nachschlagewerk für Krankheitsbilder, Pflegestandards, Lexikon & Online-Medizinwissen. Inklusive Medikamentensuche."
  },
  {
    icon: <FaRegChartBar className="text-[#0ea5e9]" size={32} />, 
    title: "Tools für den Pflegealltag", 
    desc: "Frequenzzähler, Kontaktverwaltung, Ernährungs- & Infusionsrechner, Arbeitszeiterfassung & Dokumentationshilfen."
  },
  {
    icon: <FaRegComments className="text-[#00C4B4]" size={32} />, 
    title: "App-weite Suche", 
    desc: "Zentrale Suchfunktion für Notfälle, Krankheiten, Standards, Lexikon & Wikipedia. Alles sofort auffindbar."
  },
  {
    icon: <FaRegCalendarAlt className="text-[#0ea5e9]" size={32} />, 
    title: "Weitere Funktionen", 
    desc: "Rotierende Pflege-Tipps, Datenschutz- & Impressumsseiten. Immer aktuell & rechtssicher."
  },
];

// FAQ-Daten für strukturierte Daten
const faqData = [
  {
    question: "Was ist Pflegebuddy?",
    answer: "Pflegebuddy ist eine digitale Pflegehilfe, die Pflegende im Alltag unterstützt mit Funktionen wie Kalender, Experten-Chat und Service-Marktplatz."
  },
  {
    question: "Ist Pflegebuddy kostenlos?",
    answer: "Ja, die Grundfunktionen von Pflegebuddy sind kostenlos nutzbar. Premium-Funktionen können über ein Abonnement freigeschaltet werden."
  },
  {
    question: "Wie kann Pflegebuddy mir im Pflegealltag helfen?",
    answer: "Pflegebuddy bietet Ihnen Werkzeuge für Notfallmanagement, Pflegewissen, Alltagshilfen, schnelle Informationssuche und Organisationshilfen."
  }
];

export default function Home() {
  // JSON-LD für Unternehmen
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pflegebuddy',
    url: 'https://pflegebuddy.care',
    logo: 'https://pflegebuddy.care/logo.webp',
    sameAs: [
      'https://www.facebook.com/pflegebuddy',
      'https://www.instagram.com/pflegebuddy.app',
      'https://www.linkedin.com/company/pflegebuddy'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      email: 'info@pflegebuddy.care'
    }
  };

  // JSON-LD für Software-Anwendung
  const applicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pflegebuddy',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android, iOS, Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '156'
    }
  };

  // JSON-LD für FAQs
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="application-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationJsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-[#23243a] text-[#f3f6fa] font-sans">
        <ScrollToTopButton />
        <HomeContent features={features} />
        
        {/* Quiz Section */}
        <section id="quiz" className="py-16 bg-[#167080] px-6">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-[#f3f6fa] text-center">Testen Sie Ihr Pflegewissen</h2>
            <PflegeQuiz />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-[#167080] px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-[#f3f6fa] text-center">Häufige Fragen (FAQ)</h2>
            <FAQAccordion />
          </div>
        </section>

        {/* <Footer /> */ /* Remove Footer usage */}
      </main>
    </>
  );
}

export const metadata = {
  title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
  description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz, Pflegewissen, Notfallmanagement und mehr. Persönlich, digital, kostenlos.",
  keywords: ["Pflege", "digitale Pflegehilfe", "Pflegeberatung", "Pflegewissen", "Notfallmanagement", "Service-Marktplatz", "Experten-Chat"],
  alternates: {
    canonical: "https://pflegebuddy.care/",
  },
  openGraph: {
    title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz, Pflegewissen, Notfallmanagement und mehr. Persönlich, digital, kostenlos.",
    url: "https://pflegebuddy.care/",
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
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Kalender, Experten-Chat, Service-Marktplatz, Pflegewissen, Notfallmanagement und mehr. Persönlich, digital, kostenlos.",
    images: ["/og-image.webp"]
  }
};
