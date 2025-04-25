'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';
import { FaApple, FaGooglePlay, FaRegFileAlt, FaRegLightbulb, FaRegChartBar, FaRegComments, FaRegCalendarAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { CheckCircle } from 'lucide-react';

const ThreeSceneClient = dynamic(() => import('./ThreeSceneClient'), { ssr: false });

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface HomeContentProps {
  features: Feature[];
}

export default function HomeContent({ features }: HomeContentProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[65vh] flex items-center justify-center px-2 sm:px-4 py-12 sm:py-16 md:py-20 overflow-hidden">
        <Image 
          src="/Headersectionbg.jpg" 
          alt="Pflegebuddy Header Hintergrund" 
          fill 
          style={{objectFit: 'cover', zIndex: 0}} 
          priority
        />
        <div className="absolute inset-0 bg-[#167080]/70 z-0" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-4 items-center relative z-10">
          {/* Text-Box */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center bg-[#23243a]/90 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 mb-4 md:mb-0 z-10 backdrop-blur min-h-[220px] sm:min-h-[320px] md:min-h-[360px] max-w-full md:max-w-lg w-full mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#30b9c9] mb-4 text-center drop-shadow-lg w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              Pflegebuddy – Deine digitale Pflegehilfe für zu Hause
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-[#e0e6ed] mb-10 text-center w-full tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            >
              Kostenlos. Persönlich. Entlastend.
            </motion.p>
            <div className="flex flex-col items-center gap-4 w-full mt-auto">
              <button className="bg-[#30b9c9] hover:bg-[#167080] text-white text-lg px-8 py-3 rounded-xl font-semibold shadow-md transition-all w-full sm:max-w-xs">
                Jetzt testen
              </button>
              <div className="flex gap-2 sm:gap-4 items-center justify-center mt-2">
                <span className="text-xs text-[#e0e6ed]">Auch als App:</span>
                <FaApple size={28} className="hover:scale-110 transition-transform cursor-pointer" />
                <a href="https://pflegebuddy.carrd.co" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store">
                  <FaGooglePlay size={28} className="hover:scale-110 transition-transform cursor-pointer" />
                </a>
              </div>
            </div>
          </motion.div>
          {/* Smartphone-Mockup mit Floating-Animation */}
          <div className="w-full flex justify-center md:block">
            <motion.div
              className="flex-1 flex justify-center items-center relative z-10 min-h-[220px] sm:min-h-[320px] md:min-h-[360px]"
              animate={{ y: [0, -16, 0, 16, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Suspense fallback={<div className="text-[#30b9c9]">Lädt 3D...</div>}>
                <ThreeSceneClient />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
    </>
  );
}

function renderIcon(iconName: string) {
  switch (iconName) {
    case 'file':
      return <FaRegFileAlt className="text-[#0ea5e9]" size={32} />;
    case 'lightbulb':
      return <FaRegLightbulb className="text-[#00C4B4]" size={32} />;
    case 'chart':
      return <FaRegChartBar className="text-[#0ea5e9]" size={32} />;
    case 'comments':
      return <FaRegComments className="text-[#00C4B4]" size={32} />;
    case 'calendar':
      return <FaRegCalendarAlt className="text-[#0ea5e9]" size={32} />;
    default:
      return null;
  }
} 