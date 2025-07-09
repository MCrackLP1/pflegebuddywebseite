'use client';

import React, { useState, useEffect } from 'react';

// Verschiedene Cookie-Kategorien definieren
type ConsentSettings = {
  necessary: boolean;  // Immer true, technisch notwendig
  analytics: boolean;  // Für Vercel Analytics
  marketing: boolean;  // Für Brevo Tracker
};

// Check if user agent suggests a crawler/bot
const isBot = () => {
  if (typeof window === 'undefined') return true;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const botPatterns = [
    'googlebot', 'bingbot', 'slurp', 'crawler', 'spider', 'bot',
    'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
    'telegrambot', 'applebot', 'baiduspider', 'yandexbot'
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
};

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Don't show consent banner for bots/crawlers
    if (isBot()) {
      return;
    }

    // Prüfe, ob der Benutzer bereits zugestimmt hat
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    } else {
      try {
        // Bestehende Einstellungen laden
        const savedSettings = JSON.parse(consent) as ConsentSettings;
        setConsentSettings(savedSettings);
        
        // Tracking-Tools entsprechend aktivieren
        if (savedSettings.analytics) {
          // Analytics aktivieren (wird durch den Import bereits initialisiert)
          window.sessionStorage.setItem('analytics-enabled', 'true');
        }
        
        if (savedSettings.marketing) {
          // Brevo Tracker aktivieren
          window.sessionStorage.setItem('brevo-enabled', 'true');
          activateBrevo();
        }
      } catch (e) {
        // Bei Fehlern Cookie-Consent neu abfragen
        setShowConsent(true);
      }
    }
  }, []);

  const activateBrevo = () => {
    // Brevo-Tracker aktivieren
    if (typeof window !== 'undefined' && window.Brevo) {
      window.Brevo.push([
        "init",
        {
          client_key: "m75l043hj2peifdjjybyxxby"
        }
      ]);
    }
  };

  const acceptAllCookies = () => {
    const settings: ConsentSettings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    setConsentSettings(settings);
    setShowConsent(false);
    
    // Tracking aktivieren
    window.sessionStorage.setItem('analytics-enabled', 'true');
    window.sessionStorage.setItem('brevo-enabled', 'true');
    activateBrevo();
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentSettings));
    setShowConsent(false);
    
    // Tracking entsprechend der Einstellungen aktivieren
    if (consentSettings.analytics) {
      window.sessionStorage.setItem('analytics-enabled', 'true');
    }
    
    if (consentSettings.marketing) {
      window.sessionStorage.setItem('brevo-enabled', 'true');
      activateBrevo();
    }
  };

  const handleToggle = (category: keyof ConsentSettings) => {
    if (category === 'necessary') return; // Necessary cookies can't be disabled
    setConsentSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const acceptNecessaryCookies = () => {
    const settings: ConsentSettings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    setConsentSettings(settings);
    setShowConsent(false);
  };

  // Don't render anything for bots or when consent is not needed
  if (!showConsent || isBot()) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1b2e] border-t border-[#30b9c9]/30 p-4 md:p-6 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="text-[#f3f6fa]">
            <p className="text-sm md:text-base">
              Diese Website verwendet Cookies, um die Funktionalität zu gewährleisten und Ihr Nutzererlebnis zu verbessern. 
              Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="text-[#30b9c9] underline">Datenschutzerklärung</a>.
            </p>
          </div>
          
          {showDetails && (
            <div className="text-[#f3f6fa] text-sm bg-[#23243a] p-4 rounded-md">
              <div className="flex items-center justify-between py-2 border-b border-[#30b9c9]/20">
                <div>
                  <h4 className="font-medium">Notwendige Cookies</h4>
                  <p className="text-xs text-[#f3f6fa]/70">Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={consentSettings.necessary} 
                    disabled
                    className="opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-[#30b9c9]/20">
                <div>
                  <h4 className="font-medium">Analyse-Cookies (Vercel Analytics)</h4>
                  <p className="text-xs text-[#f3f6fa]/70">Diese Cookies helfen uns, die Nutzung der Website zu verstehen und zu verbessern.</p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    checked={consentSettings.analytics} 
                    onChange={() => handleToggle('analytics')}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Marketing-Cookies (Brevo)</h4>
                  <p className="text-xs text-[#f3f6fa]/70">Diese Cookies helfen uns, relevante Inhalte anzuzeigen.</p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    checked={consentSettings.marketing} 
                    onChange={() => handleToggle('marketing')}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 justify-end">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 text-sm font-medium text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
            >
              {showDetails ? 'Schließen' : 'Einstellungen'}
            </button>
            <button 
              onClick={acceptNecessaryCookies}
              className="px-4 py-2 text-sm font-medium text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
            >
              Nur notwendige
            </button>
            {showDetails ? (
              <button 
                onClick={savePreferences}
                className="px-4 py-2 text-sm font-medium text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors"
              >
                Auswahl speichern
              </button>
            ) : (
              <button 
                onClick={acceptAllCookies}
                className="px-4 py-2 text-sm font-medium text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors"
              >
                Alle akzeptieren
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

// Erweitern der globalen Window-Schnittstelle
declare global {
  interface Window {
    Brevo?: {
      push: (args: any[]) => void;
    };
  }
} 