"use client";
// app/page.tsx (Next.js 13+ mit App Router)

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay, FaRegCalendarAlt, FaRegComments, FaRegFileAlt, FaRegLightbulb, FaRegChartBar, FaBoxOpen, FaUtensils, FaGavel, FaRegUser, FaRegSmile, FaRegMeh } from "react-icons/fa";
import { CheckCircle, Phone, Mail } from "lucide-react";
import FeedbackButton from "./components/FeedbackButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SplinePhone from './components/SplinePhone';
import Footer from "./components/Footer";
import { blogPosts as pflegeBlogPosts } from "./blog/blogPosts";
import dynamic from 'next/dynamic';

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

const services = [
  {
    icon: <FaBoxOpen className="text-[#30b9c9]" size={32} />, title: "Pflegehilfsmittelbox", desc: "Kostenlose Pflegehilfsmittel bequem nach Hause geliefert – wir übernehmen die Bürokratie." },
  {
    icon: <FaGavel className="text-[#30b9c9]" size={32} />, title: "Pflegewiderspruch-Service", desc: "Unterstützung beim Widerspruch gegen Pflegegrad-Entscheidungen durch erfahrene Expert:innen." },
  {
    icon: <FaUtensils className="text-[#30b9c9]" size={32} />, title: "Mahlzeitenlieferung", desc: "Täglich frische Mahlzeiten direkt an die Haustür – einfach, lecker und zuverlässig." },
];

const testimonials = [
  {
    name: "Anna L.",
    icon: <FaRegUser size={64} className="mb-4 text-[#30b9c9]" />,
    text: "Mit Pflegebuddy habe ich im Notfall sofort die richtigen Maßnahmen parat. Das gibt mir Sicherheit im Alltag mit meinem Vater.",
  },
  {
    name: "Michael S.",
    icon: <FaRegUser size={64} className="mb-4 text-[#30b9c9]" />,
    text: "Die Tools für die Pflegedokumentation und die Medikamentensuche sparen mir täglich Zeit. Endlich alles in einer App!",
  },
  {
    name: "Sabine W.",
    icon: <FaRegUser size={64} className="mb-4 text-[#30b9c9]" />,
    text: "Ich finde es super, dass ich Pflegewissen und Tipps immer griffbereit habe – und bei Fragen schnell Hilfe finde.",
  },
];

// Neue Alltagshilfen-Section statt Service-Marktplatz
const alltagshilfen = [
  {
    icon: <FaRegFileAlt className="text-[#30b9c9]" size={32} />, 
    title: "Im Notfall schnell handeln", 
    desc: "Checklisten & Sofortmaßnahmen für jede Situation – immer griffbereit auf deinem Smartphone."
  },
  {
    icon: <FaRegLightbulb className="text-[#4dd0e1]" size={32} />, 
    title: "Pflegewissen immer dabei", 
    desc: "Krankheitsbilder, Pflegestandards, Lexikon & Tipps – verständlich erklärt und jederzeit verfügbar."
  },
  {
    icon: <FaRegChartBar className="text-[#30b9c9]" size={32} />, 
    title: "Medikamente & Werte verwalten", 
    desc: "Medikamentensuche, Frequenzzähler, Ernährungs- & Infusionsrechner – alles digital und einfach."
  },
  {
    icon: <FaRegComments className="text-[#4dd0e1]" size={32} />, 
    title: "Pflegezeiten dokumentieren", 
    desc: "Arbeitszeiterfassung & Dokumentationshilfen – für mehr Überblick und weniger Papierkram."
  },
  {
    icon: <FaRegCalendarAlt className="text-[#30b9c9]" size={32} />, 
    title: "Wichtige Kontakte immer griffbereit", 
    desc: "Alle Notfallnummern, Ärzte & Ansprechpartner zentral verwalten und schnell erreichen."
  },
];

// Quiz-Fragen für Pflege/Medizin
const quizQuestions = [
  {
    question: "Was ist ein Pflegegrad?",
    options: [
      "Eine Bewertung der Pflegebedürftigkeit",
      "Ein Medikament",
      "Ein Pflegeheim",
      "Eine Krankenkasse"
    ],
    answer: 0,
    help: "Pflegebuddy erklärt dir, was ein Pflegegrad ist und wie du ihn beantragst."
  },
  {
    question: "Wie oft sollte die Pulsfrequenz bei Erwachsenen im Ruhezustand etwa sein?",
    options: [
      "20-40 Schläge/Minute",
      "60-80 Schläge/Minute",
      "100-120 Schläge/Minute",
      "140-160 Schläge/Minute"
    ],
    answer: 1,
    help: "Mit dem Frequenzzähler von Pflegebuddy kannst du Vitalwerte einfach messen und nachschlagen."
  },
  {
    question: "Wofür steht die Abkürzung BMI?",
    options: [
      "Blut-Mess-Index",
      "Bewegungs-Mess-Intensität",
      "Body-Mass-Index",
      "Blutdruck-Mess-Instrument"
    ],
    answer: 2,
    help: "Pflegebuddy bietet dir einen BMI-Rechner und erklärt die Werte verständlich."
  },
  {
    question: "Was ist eine Infusion?",
    options: [
      "Eine Tablette",
      "Eine Flüssigkeitsgabe über die Vene",
      "Ein Verband",
      "Ein Pflegegrad"
    ],
    answer: 1,
    help: "Mit dem Infusionsrechner von Pflegebuddy kannst du Tropfenzahl und Dosierung berechnen."
  },
  {
    question: "Was hilft bei der Suche nach Medikamenteninformationen?",
    options: [
      "Pflegebuddy-App",
      "Nur Google",
      "Nur Arzt fragen",
      "Nichts"
    ],
    answer: 0,
    help: "Pflegebuddy bietet eine integrierte Medikamentensuche mit wichtigen Infos."
  },
];

function PflegeQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [anim, setAnim] = useState<'in'|'out'|null>('in');

  const q = quizQuestions[step];
  const total = quizQuestions.length;
  const progress = ((step + (finished ? 1 : 0)) / total) * 100;

  function handleAnswer(idx: number) {
    setSelected(idx);
    if (idx === q.answer) {
      setScore(s => s + 1);
      setShowHelp(false);
      setTimeout(() => {
        setAnim('out');
        setTimeout(() => {
          if (step < quizQuestions.length - 1) {
            setStep(step + 1);
            setSelected(null);
            setAnim('in');
          } else {
            setFinished(true);
          }
        }, 400);
      }, 600);
    } else {
      setShowHelp(true);
    }
  }

  // Buddy-Avatar Feedback
  function BuddyFace() {
    if (selected === null) return <FaRegUser size={48} className="text-[#30b9c9] mb-2" />;
    if (selected === q.answer) return <FaRegSmile size={48} className="text-green-400 animate-bounce mb-2" />;
    return <FaRegMeh size={48} className="text-red-400 animate-shake mb-2" />;
  }

  // Progressbar
  function ProgressBar() {
    return (
      <div className="w-full mb-6 flex items-center gap-2">
        <div className="flex-shrink-0"><FaRegUser size={24} className="text-[#30b9c9]" /></div>
        <div className="flex-1 h-3 bg-[#e0f7fa] rounded-full overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-3 bg-gradient-to-r from-[#30b9c9] to-[#4dd0e1] rounded-full transition-all duration-500"></div>
        </div>
        <div className="flex-shrink-0"><span className="text-xs text-[#30b9c9] font-bold">{step+1}/{total}</span></div>
      </div>
    );
  }

  // Flip-Card für Gutschein
  function CouponCard() {
    return (
      <div className="relative w-full max-w-xs mx-auto h-40 mb-4">
        <div className="absolute w-full h-full rounded-xl shadow-xl bg-gradient-to-br from-[#30b9c9] to-[#4dd0e1] text-white flex flex-col items-center justify-center transition-transform duration-700">
          <span className="text-lg font-semibold mb-2">Dein Gutscheincode</span>
          <span className="font-mono text-2xl tracking-widest bg-white/20 px-4 py-2 rounded-lg">Early25</span>
          <span className="text-xs mt-2">25% Rabatt auf Premium</span>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] rounded-3xl p-1 max-w-xl mx-auto shadow-2xl animate-fade-in">
        <div className="bg-[#23243a] rounded-2xl p-8 text-white flex flex-col items-center">
          <FaRegLightbulb size={48} className="mb-4 text-[#30b9c9]" />
          <h3 className="text-2xl font-bold mb-4 text-[#30b9c9]">Quiz-Challenge</h3>
          <p className="mb-6 text-lg text-center">Löse jetzt das Quiz und sichere dir <span className="font-bold text-[#4dd0e1]">25% Rabatt</span> auf die Premium-Funktionen von Pflegebuddy!</p>
          <button
            className="bg-[#30b9c9] hover:bg-[#2693a5] text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition-all"
            onClick={() => setStarted(true)}
          >
            Quiz starten
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-[#23243a] rounded-xl p-8 text-white text-center max-w-xl mx-auto shadow-2xl animate-fade-in">
        <h3 className="text-2xl font-bold mb-4 text-[#30b9c9]">Quiz abgeschlossen!</h3>
        <p className="mb-4">Du hast {score} von {quizQuestions.length} Fragen richtig beantwortet.</p>
        <CouponCard />
        <p className="text-sm">Nutze diesen Code für 25% Rabatt auf die Premium-Funktionen von Pflegebuddy!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] rounded-3xl p-1 max-w-xl mx-auto shadow-2xl animate-fade-in">
      <div className={`bg-[#23243a] rounded-2xl p-8 text-white relative overflow-hidden transition-all duration-500 ${anim === 'in' ? 'animate-slide-in' : anim === 'out' ? 'animate-slide-out' : ''}`.trim()}>
        <ProgressBar />
        <div className="flex flex-col items-center mb-4">
          <BuddyFace />
          <h3 className="text-xl font-bold mb-2 text-[#30b9c9]">Pflegebuddy-Quiz</h3>
        </div>
        <p className="mb-6 text-lg text-center font-semibold">{q.question}</p>
        <div className="flex flex-col gap-3 mb-4">
          {q.options.map((opt, idx) => (
            <button
              key={opt}
              className={`rounded px-4 py-2 text-left border font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#30b9c9] 
                ${selected === idx ? (idx === q.answer ? 'bg-green-500 border-green-500 text-white animate-pop' : 'bg-red-500 border-red-500 text-white animate-shake') : 'bg-[#23243a] border-[#30b9c9] hover:bg-[#30b9c9] hover:text-white hover:scale-105'}`}
              disabled={selected === q.answer}
              onClick={() => handleAnswer(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
        {showHelp && (
          <div className="bg-[#4dd0e1] text-[#23243a] rounded p-3 mb-2 flex items-center gap-2 animate-fade-in">
            <FaRegLightbulb className="text-[#30b9c9]" size={20} />
            <span>{q.help} <span className="font-semibold">Richtige Antwort: {q.options[q.answer]}</span></span>
          </div>
        )}
        {selected === q.answer && !showHelp && <div className="text-sm text-green-300 mb-2 animate-fade-in">Richtig!</div>}
      </div>
      <style jsx>{`
        .animate-slide-in { animation: slideIn 0.5s cubic-bezier(.4,2,.6,1) both; }
        .animate-slide-out { animation: slideOut 0.4s cubic-bezier(.4,2,.6,1) both; }
        @keyframes slideIn { from { opacity:0; transform:translateY(40px) scale(0.95);} to { opacity:1; transform:translateY(0) scale(1);} }
        @keyframes slideOut { from { opacity:1; transform:translateY(0) scale(1);} to { opacity:0; transform:translateY(-40px) scale(0.95);} }
        .animate-pop { animation: pop 0.3s cubic-bezier(.4,2,.6,1); }
        @keyframes pop { 0% { transform: scale(1); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }
        .animate-shake { animation: shake 0.3s cubic-bezier(.4,2,.6,1); }
        @keyframes shake { 0% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } 100% { transform: translateX(0); } }
        .animate-fade-in { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .perspective { perspective: 800px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-flip { animation: flipCard 0.7s cubic-bezier(.4,2,.6,1); }
        @keyframes flipCard { 0% { transform: rotateY(0); } 100% { transform: rotateY(180deg); } }
      `}</style>
    </div>
  );
}

const ThreeScene = dynamic(() => import('./components/ThreeComponents'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#23243a] text-[#f3f6fa] font-sans">
      <ScrollToTopButton />
      
      {/* Hero Section */}
      <div className="relative min-h-[65vh] flex items-center justify-center px-4 py-8 overflow-hidden">
        <Image 
          src="/Headersectionbg.jpg" 
          alt="Pflegebuddy Header Hintergrund" 
          fill 
          style={{objectFit: 'cover', zIndex: 0}} 
          priority
        />
        <div className="absolute inset-0 bg-[#167080]/70 z-0" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative z-10">
          {/* Text-Box */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center bg-[#23243a]/90 rounded-3xl shadow-2xl p-8 md:p-12 mb-4 md:mb-0 z-10 backdrop-blur min-h-[360px] max-w-lg w-full mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-[#30b9c9] mb-4 text-center drop-shadow-lg w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              Pflegebuddy – Deine digitale Pflegehilfe für zu Hause
            </motion.h1>
            <motion.p
              className="text-lg text-[#e0e6ed] mb-10 text-center w-full tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            >
              Kostenlos. Persönlich. Entlastend.
            </motion.p>
            <div className="flex flex-col items-center gap-4 w-full mt-auto">
              <button className="bg-[#30b9c9] hover:bg-[#167080] text-white text-lg px-8 py-3 rounded-xl font-semibold shadow-md transition-all w-full max-w-xs">
                Jetzt testen
              </button>
              <div className="flex gap-4 items-center justify-center mt-2">
                <span className="text-xs text-[#e0e6ed]">Auch als App:</span>
                <FaApple size={28} className="hover:scale-110 transition-transform cursor-pointer" />
                <a href="https://pflegebuddy.carrd.co" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store">
                  <FaGooglePlay size={28} className="hover:scale-110 transition-transform cursor-pointer" />
                </a>
              </div>
            </div>
          </motion.div>
          {/* Smartphone-Mockup mit Floating-Animation */}
          <motion.div
            className="flex-1 flex justify-center items-center relative z-10"
            animate={{ y: [0, -16, 0, 16, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Suspense fallback={<div className="text-[#30b9c9]">Lädt 3D...</div>}>
              <ThreeScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Funktionsübersicht */}
      <section id="funktionen" className="py-16 bg-[#23243a] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#30b9c9]">Hauptfunktionen der Pflegebuddy App</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 + i * 0.15 }}
                className="flex flex-col items-center bg-[#167080]/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {f.icon}
                <h3 className="mt-4 text-lg font-semibold text-[#f3f6fa]">{f.title}</h3>
                <p className="mt-2 text-[#e0e6ed] text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz statt Pflegegradrechner */}
      <section id="quiz" className="py-16 bg-[#167080] px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <PflegeQuiz />
        </div>
      </section>

      {/* Alltagshilfen-Section */}
      <section id="alltagshilfen" className="py-16 bg-[#23243a] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#30b9c9]">So hilft dir Pflegebuddy im Alltag</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {alltagshilfen.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 + i * 0.15 }}
                className="flex flex-col items-center bg-[#167080]/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {a.icon}
                <h3 className="mt-4 text-lg font-semibold text-[#f3f6fa]">{a.title}</h3>
                <p className="mt-2 text-[#e0e6ed] text-sm text-center">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutzer-Stories / Testimonials */}
      <section id="stories" className="py-16 bg-[#167080] px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#30b9c9]">Erfahrungen unserer Nutzer:innen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 + i * 0.2 }}
                className="bg-[#23243a] rounded-xl shadow-md p-6 flex flex-col items-center text-[#f3f6fa]"
              >
                {t.icon}
                <p className="text-[var(--foreground)] italic mb-4">“{t.text}”</p>
                <span className="font-semibold text-[#30b9c9]">{t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog-Vorschau */}
      <section id="blog" className="py-16 bg-[#23243a] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#30b9c9]">Pflege-Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pflegeBlogPosts.slice(0, 6).map((b, i) => (
              <motion.a
                key={b.slug}
                href={`/blog/${b.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 + i * 0.2 }}
                className="bg-[#167080]/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-start cursor-pointer hover:bg-[#30b9c9]/80 group"
                style={{ textDecoration: 'none' }}
              >
                {b.imageUrl && (
                  <Image src={b.imageUrl} alt={b.title} width={400} height={220} className="rounded-lg object-cover mb-4 w-full h-40" />
                )}
                <span className="text-xs text-[#e0e6ed] mb-2">{new Date(b.date).toLocaleDateString('de-DE')}</span>
                <div className="flex flex-wrap gap-2 mb-2">
                  {b.categories.map((cat) => (
                    <span key={cat} className="px-2 py-1 text-xs font-medium text-[#30b9c9] bg-[#23243a] border border-[#30b9c9] rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#f3f6fa] group-hover:text-white transition-colors line-clamp-2">{b.title}</h3>
                <p className="text-[#e0e6ed] text-sm mb-4 line-clamp-3">{b.excerpt}</p>
                <span className="mt-auto text-[#30b9c9] font-medium hover:underline">Mehr erfahren</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#167080] px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-[#f3f6fa] text-center">Häufige Fragen (FAQ)</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Vorteile Section */}
      <section id="vorteile" className="py-16 bg-[#23243a] px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#30b9c9]">Deine Vorteile mit Pflegebuddy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Schnelle Hilfe im Notfall – Notfall-Checklisten & Sofortmaßnahmen immer griffbereit",
              "Pflegewissen jederzeit verfügbar – Nachschlagewerk, Lexikon & Medikamenteninfos in einer App",
              "Alltagserleichterung durch smarte Tools – Rechner, Zähler, Kontaktverwaltung & Dokumentationshilfen",
              "Zentrale Suche & persönliche Tipps – Alles sofort finden, plus wechselnde Pflege-Tipps",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 + i * 0.2 }}
                className="flex flex-col items-center bg-[#167080]/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="text-[#30b9c9] mb-4" size={32} />
                <p className="text-lg font-medium text-[#f3f6fa] text-center">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "Was ist Pflegebuddy?",
      a: "Pflegebuddy ist eine digitale App, die pflegende Angehörige und Pflegekräfte im Alltag unterstützt – mit Notfall-Checklisten, Pflegewissen, Tools und persönlicher Beratung."
    },
    {
      q: "Für wen ist die App geeignet?",
      a: "Für pflegende Angehörige, Pflegekräfte, Betroffene und alle, die sich rund um das Thema Pflege informieren oder Unterstützung suchen."
    },
    {
      q: "Was kostet Pflegebuddy?",
      a: "Die Grundfunktionen von Pflegebuddy sind kostenlos nutzbar. Premium-Funktionen können optional freigeschaltet werden."
    },
    {
      q: "Wie hilft mir Pflegebuddy im Notfall?",
      a: "Mit Sofortmaßnahmen, Notfall-Checklisten und wichtigen Kontakten hast du im Ernstfall alles schnell griffbereit."
    },
    {
      q: "Wie funktioniert die Medikamentensuche?",
      a: "Du kannst Medikamente direkt in der App suchen und erhältst wichtige Informationen zu Wirkung, Dosierung und Wechselwirkungen."
    },
    {
      q: "Wie kann ich Kontakt aufnehmen?",
      a: "Du erreichst uns per E-Mail (deinpflegebuddy@gmail.com), Telefon (0174 1632129) oder über das Kontaktformular auf der Website."
    },
    {
      q: "Ist die Nutzung von Pflegebuddy datenschutzkonform?",
      a: "Ja, wir legen großen Wert auf Datenschutz. Alle Daten werden sicher verarbeitet und nicht an Dritte weitergegeben."
    },
    {
      q: "Gibt es Pflegebuddy auch als App für iOS/Android?",
      a: "Ja, Pflegebuddy ist als Web-App verfügbar. Native Apps für iOS und Android sind in Planung." 
    },
  ];
  return (
    <div className="space-y-4">
      {faqs.map((item, idx) => (
        <div key={item.q} className="bg-white/80 rounded-xl shadow p-4">
          <button
            className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#30b9c9] focus:outline-none"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
            aria-controls={`faq-panel-${idx}`}
          >
            {item.q}
            <span className={`ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`}>▼</span>
          </button>
          <div
            id={`faq-panel-${idx}`}
            className={`overflow-hidden transition-all duration-300 ${open === idx ? 'max-h-40 mt-2' : 'max-h-0'}`}
            style={{ color: '#23243a' }}
            aria-hidden={open !== idx}
          >
            <p className="pt-2 text-base">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
