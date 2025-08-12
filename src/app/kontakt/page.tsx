import React from 'react';
import type { Metadata } from "next";
import KontaktForm from './KontaktForm';

export const metadata: Metadata = {
  title: "Kontakt – Pflegebuddy | Kontaktformular & Support",
  description: "Nimm Kontakt mit dem Pflegebuddy-Team auf. Wir beantworten deine Fragen rund um digitale Pflegehilfe, Service & Support. Schnelle Rückmeldung garantiert!",
  keywords: ["Kontakt", "Pflegebuddy", "Support", "Pflegehilfe", "Fragen", "Service", "Kontaktformular", "Hilfe"],
  alternates: {
    canonical: "https://pflegebuddy.care/kontakt",
  },
};

export default function Kontakt() {
  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-3xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-8 backdrop-blur">
        <KontaktForm />
      </section>
    </main>
  );
} 