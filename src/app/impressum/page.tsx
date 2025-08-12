import React from 'react';
import type { Metadata } from "next";

export default function Impressum() {
  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-4xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-8 backdrop-blur">
        <h1 className="text-3xl font-bold text-[#30b9c9] mb-6">Impressum</h1>
        
        <div className="space-y-6 text-[#f3f6fa]">
          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Angaben gemäß § 5 TMG</h2>
            <p>
              Mark Tietz & Tim Werner<br />
              Königplatz 3<br />
              87448 Waltenhofen<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Kontakt</h2>
            <p>
              Telefon: 0174 1632129<br />
              E-Mail: deinpflegebuddy@gmail.com<br />
              Website: <a href="https://pflegebuddy.care" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">https://pflegebuddy.care</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Vertreten durch</h2>
            <p>
              Mark Tietz<br />
              Tim Werner
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              Derzeit nicht umsatzsteuerpflichtig nach § 19 UStG (Kleinunternehmerregelung)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Redaktionell verantwortlich</h2>
            <p>
              Mark Tietz<br />
              Tim Werner<br />
              Königplatz 3<br />
              87448 Waltenhofen
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle 
              teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen 
              Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, 
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf 
              eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen 
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer 
              konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese 
              Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten 
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum 
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-2">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer 
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend 
              entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-2">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter 
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine 
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden 
              von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
          
          <section className="mt-8 pt-4 border-t border-[#30b9c9]/30">
            <p className="text-sm italic">
              Stand: {new Date().toLocaleDateString('de-DE')}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Impressum – Pflegebuddy | Anbieterkennzeichnung & Kontakt",
  description: "Impressum der Pflegebuddy: Anbieterkennzeichnung, Kontakt, Verantwortliche, rechtliche Hinweise nach § 5 TMG und DSGVO. Transparenz & Erreichbarkeit auf einen Blick.",
  keywords: ["Impressum", "Pflegebuddy", "Anbieterkennzeichnung", "Kontakt", "Rechtliche Hinweise", "TMG", "DSGVO", "Transparenz"],
  alternates: {
    canonical: "https://pflegebuddy.care/impressum",
  },
}; 