'use client';

import { useState } from 'react';
import { FaRegUser, FaRegSmile, FaRegMeh, FaRegLightbulb, FaEnvelope } from 'react-icons/fa';

// Add type declaration for Brevo
declare global {
  interface Window {
    Brevo?: {
      push: (args: any[]) => void;
    }
  }
}

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

export default function PflegeQuiz() {
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

  // Function to show newsletter popup
  const showNewsletterPopup = () => {
    if (typeof window !== 'undefined' && window.Brevo) {
      window.Brevo.push(["show", {
        id: "newsletter",
        back: false
      }]);
    }
  };

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
          <span className="text-xs mt-2">25% Rabatt auf zukünftige Premium-Funktionen</span>
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
          <p className="mb-6 text-lg text-center">Löse jetzt das Quiz und sichere dir <span className="font-bold text-[#4dd0e1]">25% Rabatt</span> auf die zukünftigen Premium-Funktionen von Pflegebuddy!</p>
          <p className="mb-6 text-sm text-center text-[#999]">
            <button 
              onClick={showNewsletterPopup}
              className="text-[#30b9c9] hover:text-[#4dd0e1] underline inline-flex items-center gap-1"
            >
              <FaEnvelope size={14} />
              Trage dich in unseren Newsletter ein
            </button>
            {' '}um den Gutschein zu erhalten, sobald Premium-Funktionen verfügbar sind.
          </p>
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
        <p className="text-sm mb-2">
          <button 
            onClick={showNewsletterPopup}
            className="text-[#30b9c9] hover:text-[#4dd0e1] underline inline-flex items-center gap-1"
          >
            <FaEnvelope size={14} />
            Trage dich in unseren Newsletter ein
          </button>
          {' '}und erhalte diesen Gutscheincode, sobald die Premium-Funktionen verfügbar sind!
        </p>
        <p className="text-xs text-[#999] mb-4">Aktuell ist die App komplett kostenlos nutzbar. Premium-Funktionen werden in Zukunft hinzugefügt.</p>
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