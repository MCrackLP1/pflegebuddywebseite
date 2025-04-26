'use client';

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Prüfe, ob der Benutzer bereits zugestimmt hat
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1b2e] border-t border-[#30b9c9]/30 p-4 md:p-6 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-[#f3f6fa]">
            <p className="text-sm md:text-base">
              Diese Website verwendet nur technisch notwendige Cookies, um die Funktionalität zu gewährleisten. 
              Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="text-[#30b9c9] underline">Datenschutzerklärung</a>.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
            >
              Ablehnen
            </button>
            <button 
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 