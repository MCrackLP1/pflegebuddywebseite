import React, { useState } from "react";
import type { Metadata } from "next";
import KontaktForm from './KontaktForm';

const translations = {
  de: {
    title: "Kontaktieren Sie uns",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht (optional)",
    privacy: "Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.",
    submit: "Absenden",
    success: "Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah.",
    required: "* Pflichtfeld",
    contact: "Kontaktinformationen",
    address: "Königplatz 3, Waltenhofen",
    team: "Mark Tietz & Tim Werner",
    emailContact: "deinpflegebuddy@gmail.com",
    instagram: "Instagram: @pflege.buddy"
  },
  en: {
    title: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message (optional)",
    privacy: "I have read and accept the privacy policy.",
    submit: "Send",
    success: "Thank you for your message! We will get back to you soon.",
    required: "* required",
    contact: "Contact Information",
    address: "Königplatz 3, Waltenhofen",
    team: "Mark Tietz & Tim Werner",
    emailContact: "deinpflegebuddy@gmail.com",
    instagram: "Instagram: @pflege.buddy"
  }
};

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
      <section className="max-w-3xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-16 backdrop-blur">
        <KontaktForm />
      </section>
    </main>
  );
} 