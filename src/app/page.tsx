import { Suspense } from "react";
import Image from "next/image";
import { FaRegFileAlt, FaRegLightbulb, FaRegChartBar, FaRegComments, FaRegCalendarAlt } from "react-icons/fa";
import FeedbackButton from "./components/FeedbackButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import { blogPosts as pflegeBlogPosts } from "./blog/blogPosts";
import dynamic from 'next/dynamic';
import HomeContent from './components/HomeContent';
import PflegeQuiz from './components/PflegeQuiz';
import FAQAccordion from './components/FAQAccordion';

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

export default function Home() {
  return (
    <main className="bg-[#23243a] text-[#f3f6fa] font-sans">
      <ScrollToTopButton />
      <HomeContent features={features} />
      
      {/* Quiz Section */}
      <section id="quiz" className="py-16 bg-[#167080] px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
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

      <Footer />
    </main>
  );
}
