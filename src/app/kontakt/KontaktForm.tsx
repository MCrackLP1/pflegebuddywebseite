'use client';

import React, { useState } from "react";

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

export default function KontaktForm() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const t = translations[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; privacy?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!form.name) errs.name = t.required;
    if (!form.email) errs.email = t.required;
    if (!form.privacy) errs.privacy = t.required;
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          className={`px-3 py-1 rounded text-sm font-semibold border mr-2 ${lang === 'de' ? 'bg-[#30b9c9] text-white border-[#30b9c9]' : 'bg-[#23243a] text-[#30b9c9] border-[#30b9c9]'}`}
          onClick={() => setLang('de')}
        >DE</button>
        <button
          className={`px-3 py-1 rounded text-sm font-semibold border ${lang === 'en' ? 'bg-[#30b9c9] text-white border-[#30b9c9]' : 'bg-[#23243a] text-[#30b9c9] border-[#30b9c9]'}`}
          onClick={() => setLang('en')}
        >EN</button>
      </div>
      <h1 className="text-3xl font-bold text-[#30b9c9] mb-6">{t.title}</h1>
      {submitted ? (
        <div className="text-green-400 text-lg font-semibold mb-6">{t.success}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#30b9c9] font-semibold mb-1">
              {t.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30b9c9] placeholder-gray-400"
              required
            />
            {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-[#30b9c9] font-semibold mb-1">
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30b9c9] placeholder-gray-400"
              required
            />
            {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-[#30b9c9] font-semibold mb-1">{t.message}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30b9c9] min-h-[100px] placeholder-gray-400"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="privacy"
              checked={form.privacy}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-[#f3f6fa] text-sm">
              {t.privacy} <span className="text-red-500">*</span>
            </label>
            {errors.privacy && <div className="text-red-400 text-sm ml-2">{errors.privacy}</div>}
          </div>
          <button
            type="submit"
            className="bg-[#30b9c9] text-white px-6 py-2 rounded font-semibold shadow hover:bg-[#167080] transition"
          >
            {t.submit}
          </button>
        </form>
      )}
      <hr className="my-8 border-[#30b9c9]/30" />
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-[#30b9c9] mb-2">{t.contact}</h2>
        <ul className="text-[#f3f6fa] space-y-1">
          <li>👤 {t.team}</li>
          <li>📧 <a href="mailto:deinpflegebuddy@gmail.com" className="text-[#30b9c9] underline font-semibold">{t.emailContact}</a></li>
          <li>📍 {t.address}</li>
          <li>📲 <a href="https://www.instagram.com/pflege.buddy/" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">{t.instagram}</a></li>
        </ul>
      </div>
    </>
  );
} 