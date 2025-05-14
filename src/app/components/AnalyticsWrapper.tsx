'use client';

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

export default function AnalyticsWrapper() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Prüfe, ob Analytics aktiviert ist
    const checkConsent = () => {
      try {
        // Entweder aus Session Storage oder aus localStorage
        const fromSession = window.sessionStorage.getItem('analytics-enabled');
        if (fromSession === 'true') {
          setAnalyticsEnabled(true);
          return;
        }

        // Ansonsten aus den Cookie-Einstellungen prüfen
        const consent = localStorage.getItem('cookie-consent');
        if (consent) {
          const settings = JSON.parse(consent);
          if (settings && settings.analytics) {
            setAnalyticsEnabled(true);
            // Für die aktuelle Session speichern
            window.sessionStorage.setItem('analytics-enabled', 'true');
          }
        }
      } catch (e) {
        console.error('Fehler beim Prüfen der Analytics-Einstellungen:', e);
        setAnalyticsEnabled(false);
      }
    };

    checkConsent();

    // Event Listener für Änderungen der Cookie-Einstellungen
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Analytische Daten nur senden, wenn der Nutzer zugestimmt hat
  if (!analyticsEnabled) {
    return null;
  }

  return <Analytics />;
} 