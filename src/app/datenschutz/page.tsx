'use client';

import React from 'react';

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-4xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-16 backdrop-blur">
        <h1 className="text-3xl font-bold text-[#30b9c9] mb-6">Datenschutzerklärung</h1>
        
        <div className="space-y-6 text-[#f3f6fa]">
          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
              werden können.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Datenerfassung auf dieser Website</h3>
            <h4 className="font-medium mb-1">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p className="mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem 
              Impressum dieser Website entnehmen.
            </p>

            <h4 className="font-medium mb-1">Wie erfassen wir Ihre Daten?</h4>
            <p className="mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, 
              die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der 
              Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem 
              oder Uhrzeit des Seitenaufrufs).
            </p>

            <h4 className="font-medium mb-1">Wofür nutzen wir Ihre Daten?</h4>
            <p className="mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können 
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            <h3 className="text-lg font-medium my-2 text-[#30b9c9]">Vercel</h3>
            <p>
              Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Details entnehmen Sie der 
              Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" className="text-[#30b9c9] underline font-semibold">
              https://vercel.com/legal/privacy-policy</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-lg font-medium mb-2">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
              dieser Datenschutzerklärung.
            </p>

            <h3 className="text-lg font-medium mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Mark Tietz & Tim Werner<br />
              Königplatz 3<br />
              87448 Waltenhofen<br />
              Deutschland<br /><br />
              E-Mail: deinpflegebuddy@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-lg font-medium mb-2">Kontaktformular</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von 
              Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <h3 className="text-lg font-medium mb-2">Cookies</h3>
            <p>
              Unsere Website verwendet keine Tracking-Cookies. Lediglich technisch notwendige Cookies für die Funktionalität 
              der Website können gesetzt werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">5. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten 
              zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung 
              der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">6. Stand und Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung hat den Stand: Januar 2024. Wir behalten uns vor, diese Datenschutzerklärung 
              anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer 
              Leistungen in der Datenschutzerklärung umzusetzen.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
} 