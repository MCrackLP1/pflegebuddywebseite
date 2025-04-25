'use client';

import { useState } from 'react';

export default function FAQAccordion() {
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