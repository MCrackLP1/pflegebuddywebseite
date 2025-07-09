'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense, lazy } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

// Make ThreeSceneClient optional and only load on client
const ThreeSceneClient = lazy(() => import('./ThreeSceneClient'));

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface HomeContentProps {
  features: Feature[];
}

// Optimized animation variants to reduce GPU load
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function HomeContent({ features }: HomeContentProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[65vh] flex items-center justify-center px-2 sm:px-4 pt-24 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <Image 
          src="/Headersectionbg.webp" 
          alt="Pflegebuddy Header Background" 
          fill 
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Dein digitaler Pflegeassistent
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
            >
              Pflegebuddy unterstützt dich mit einem intelligenten Kalender, Experten-Chat, 
              Service-Marktplatz und umfassendem Pflegewissen – alles in einer App.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6"
            >
              <button className="bg-[#30b9c9] hover:bg-[#167080] text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center gap-2 min-w-[200px] justify-center">
                <FaApple size={20} />
                App Store
              </button>
              <button className="bg-[#30b9c9] hover:bg-[#167080] text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center gap-2 min-w-[200px] justify-center">
                <FaGooglePlay size={20} />
                Google Play
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Alles für die Pflege in einer App
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Entdecke, wie Pflegebuddy deinen Pflegealltag vereinfacht und dich bei jeder Herausforderung unterstützt.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group hover:transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 text-[#30b9c9] flex items-center justify-center text-2xl group-hover:text-[#167080] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3D Scene (Non-blocking) */}
      <Suspense fallback={
        <div className="h-96 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Lade interaktive 3D-Szene...</div>
        </div>
      }>
        <ThreeSceneClient />
      </Suspense>
    </>
  );
} 