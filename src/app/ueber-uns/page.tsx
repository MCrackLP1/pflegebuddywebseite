import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

export default function UeberUns() {
  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-3xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-16 backdrop-blur">
        <h1 className="text-3xl font-bold text-[#30b9c9] mb-6">Über uns</h1>
        <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
          <div className="flex-shrink-0">
            <Image
              src="/author-mark.jpg"
              alt="Mark Tietz"
              width={120}
              height={120}
              className="rounded-full border-4 border-[#30b9c9]"
            />
            <Image
              src="/author-tim.jpg"
              alt="Tim Werner"
              width={120}
              height={120}
              className="rounded-full border-4 border-[#30b9c9] mt-4"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-[#30b9c9]">👋 Hallo, wir sind Mark Tietz & Tim Werner</h2>
            <div className="text-[#30b9c9] font-medium mb-2">Gründerteam von Pflegebuddy – Pflegeexperten & digitale Lösungsentwickler</div>
            <p className="text-[#f3f6fa] mb-2">
              Wir – Mark Tietz und Tim Werner – sind examinierte Pflegefachmänner mit langjähriger Erfahrung im Klinikalltag. Mark arbeitet auf der Neurologie-Station A2 im Klinikum Kempten und bringt neben seinem pflegerischen Know-how auch seine kreative Ader als Fotograf ein. Tim bringt zusätzliche Expertise in den Bereichen Pflegepädagogik und digitale Prozessoptimierung mit.
            </p>
            <p className="text-[#f3f6fa] mb-2">
              Tag für Tag erleben wir, wie viel Potenzial in digitaler Unterstützung für Pflegekräfte steckt – und wie oft dieses Potenzial ungenutzt bleibt. Genau hier setzt Pflegebuddy an: Wir wollen den Pflegealltag einfacher, sicherer und moderner machen.
            </p>
            <p className="text-[#f3f6fa] mb-2">
              Wir leben in Waltenhofen und Marktoberdorf und sind nicht nur Kollegen, sondern auch Freunde mit einer gemeinsamen Vision: Pflege digital stärken.
            </p>
            <p className="text-[#f3f6fa] mb-2">
              <span className="font-semibold">Unsere Motivation:</span> Pflegekräften echte Werkzeuge an die Hand geben – digital, praktisch, intuitiv.
            </p>
            <p className="text-[#f3f6fa] mb-2">
              <span className="font-semibold">Unsere Werte:</span> Qualität vor Quantität. Lösungen statt Bürokratie. Praxisnähe statt Theorie.
            </p>
          </div>
        </div>
        <hr className="my-8 border-[#30b9c9]/30" />
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-[#30b9c9]">Was ist Pflegebuddy?</h2>
          <p className="text-[#f3f6fa] mb-2">
            Pflegebuddy ist eine moderne, barrierefreie und offlinefähige Web-App für Pflegekräfte. Sie bietet praxisnahe Tools und medizinisches Fachwissen – immer griffbereit im Stationsalltag.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-[#30b9c9] mb-2">
            <span>🗓️ Gründung: 2025</span>
            <span>📍 Standort: Waltenhofen, Allgäu</span>
            <span>📱 Website & App: In Entwicklung</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2">Unsere Zielgruppe</h3>
          <ul className="list-disc list-inside text-[#f3f6fa] space-y-1">
            <li>Examinierte Pflegekräfte (stationär & ambulant)</li>
            <li>Praxisanleiter*innen</li>
            <li>Pflegende Angehörige</li>
            <li>Pflege-Azubis</li>
            <li>… und alle, die im Krankenhaus oder Pflegedienst kompetente, schnelle Informationen brauchen.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2">Unsere Mission</h3>
          <p className="text-[#f3f6fa] mb-2">Pflegebuddy will Pflege stärken – durch intelligente digitale Tools, die Zeit sparen, Sicherheit geben und Wissen auffrischen.</p>
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2 mt-4">Unsere Vision</h3>
          <p className="text-[#f3f6fa] mb-2">Ein smarter Helfer für jede Pflegekraft.<br/>Digital. Einfach. Zuverlässig.</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2">Was macht uns besonders?</h3>
          <ul className="list-disc list-inside text-[#f3f6fa] space-y-1">
            <li>✅ Offlinefähig & barrierefrei – läuft auch ohne WLAN</li>
            <li>✅ Fuzzy-Suche & Darkmode – modern & nutzerfreundlich</li>
            <li>✅ Anbindung an Wikipedia, ICD-10, Pflegewissen</li>
            <li>✅ Spezial-Tools: Infusions-/Medikationsrechner, Notfallhilfe, Pflege-Quick-Infos</li>
            <li>✅ Realistische Gestaltung – mit echtem Bezug zum Pflegealltag</li>
            <li>✅ Starker Fokus auf Datenschutz & einfache Anwendung</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2">Wer steht dahinter?</h3>
          <ul className="list-inside text-[#f3f6fa] space-y-1">
            <li>👨‍⚕️ <span className="font-semibold">Mark Tietz</span> – Pflegeexperte, Digitalentwickler & Gründer</li>
            <li>👨‍⚕️ <span className="font-semibold">Tim Werner</span> – Pflegeexperte, Marketing & Markenbotschafter</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#30b9c9] mb-2">Kontakt & Social Media</h3>
          <ul className="list-inside text-[#f3f6fa] space-y-1">
            <li>📧 E-Mail: <a href="mailto:deinpflegebuddy@gmail.com" className="text-[#30b9c9] underline font-semibold">deinpflegebuddy@gmail.com</a></li>
            <li>📲 Instagram: <a href="https://www.instagram.com/pflege.buddy/" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">@pflege.buddy</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Über uns – Pflegebuddy | Team, Mission & Vision",
  description: "Das Team hinter Pflegebuddy: Pflegeexperten Mark Tietz & Tim Werner. Unsere Mission: Digitale Tools für Pflegekräfte. Vision, Werte & Kontakt auf einen Blick.",
  keywords: ["Über uns", "Pflegebuddy Team", "Mission", "Vision", "Pflegeexperten", "Digitale Pflege", "Kontakt", "Werte"],
  alternates: {
    canonical: "https://pflegebuddy.care/ueber-uns",
  },
}; 