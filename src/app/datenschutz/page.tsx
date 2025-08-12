import React from 'react';
import type { Metadata } from "next";

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-4xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-8 backdrop-blur">
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
              zur Analyse Ihres Nutzerverhaltens verwendet werden, jedoch nur nach Ihrer ausdrücklichen Einwilligung.
            </p>

            <h4 className="font-medium mb-1">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen 
              Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
              Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit widerrufen. Außerdem haben 
              Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
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
              Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">
              https://vercel.com/legal/privacy-policy</a>
            </p>
            <p className="mt-2">
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst 
              zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich
              auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="mt-2">
              Der Datenübertragung in die USA liegt ein Angemessenheitsbeschluss der Europäischen Kommission, die &quot;EU-US Data Privacy Framework&quot; (EU-US DPF) zugrunde.
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
              E-Mail: deinpflegebuddy@gmail.com<br />
              Website: <a href="https://pflegebuddy.care" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">https://pflegebuddy.care</a>
            </p>

            <p className="mb-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und 
              Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Speicherdauer</h3>
            <p className="mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen 
              Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder 
              eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen 
              Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); 
              im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</h3>
            <p className="mb-4">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 
              Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien verarbeitet werden. Im Falle einer 
              ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem 
              auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen 
              in Ihr Endgerät (z.B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage 
              von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
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
            <p className="mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die 
              Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO)
              oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>

            <h3 className="text-lg font-medium mb-2">Cookies und Tracking-Technologien</h3>
            <p className="mb-4">
              Unsere Website verwendet verschiedene Arten von Cookies und Tracking-Technologien, die je nach Kategorie unterschiedliche Zwecke erfüllen.
              Wir geben Ihnen die Möglichkeit, selbst zu entscheiden, welche Cookies Sie zulassen möchten. Sie können Ihre Einstellungen jederzeit 
              in unserer Cookie-Einstellungsbox anpassen.
            </p>

            <h4 className="font-medium mb-1 mt-3">Technisch notwendige Cookies</h4>
            <p className="mb-4">
              Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. Sie speichern Ihre Cookie-Präferenzen 
              und ermöglichen die ordnungsgemäße Funktion der Website. Diese Cookies setzen wir auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, 
              da wir ein berechtigtes Interesse an der technisch fehlerfreien Bereitstellung unserer Dienste haben.
            </p>

            <h4 className="font-medium mb-1">Analyse-Cookies (Vercel Analytics)</h4>
            <p className="mb-4">
              Bei Ihrer Einwilligung nutzen wir Vercel Analytics, um die Nutzung unserer Website zu analysieren und zu verbessern. 
              Vercel Analytics ist ein Webanalyse-Dienst der Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA). Diese Cookies 
              sammeln anonymisierte Daten darüber, wie Besucher die Website nutzen. Dazu gehören Informationen wie die Anzahl der Besucher, 
              von welchen Websites Besucher zur Seite gekommen sind und welche Seiten sie besuchen. 
              Die Verarbeitung erfolgt nur mit Ihrer Einwilligung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
              Weitere Informationen finden Sie in der <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">
              Datenschutzerklärung von Vercel</a>.
            </p>

            <h4 className="font-medium mb-1">Marketing-Cookies (Brevo)</h4>
            <p className="mb-4">
              Bei Ihrer Einwilligung nutzen wir Brevo, um Ihnen relevante Inhalte anzuzeigen und unser Marketing zu optimieren. 
              Brevo ist ein E-Mail-Marketing- und Automatisierungsdienst der Brevo SAS (55 rue d'Amsterdam, 75008 Paris, Frankreich). 
              Diese Cookies helfen uns, die Relevanz unserer Kommunikation zu verbessern und Ihnen passende Inhalte anzuzeigen. 
              Die Verarbeitung erfolgt nur mit Ihrer Einwilligung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
              Weitere Informationen finden Sie in der <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] underline font-semibold">
              Datenschutzerklärung von Brevo</a>.
            </p>

            <h4 className="font-medium mb-1">Cookie-Einstellungen ändern</h4>
            <p className="mb-4">
              Sie können Ihre Cookie-Einstellungen jederzeit ändern. In unserer Cookie-Consent-Box am unteren Bildschirmrand finden Sie 
              die Option "Einstellungen", wo Sie Ihre Präferenzen anpassen können. Außerdem können Sie Cookies in Ihrem Browser löschen 
              und die Annahme von Cookies in Ihren Browser-Einstellungen deaktivieren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">5. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten 
              zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung 
              der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der 
              zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="mb-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">6. Datenübermittlung und Drittländer</h2>
            <p className="mb-4">
              Diese Website kann Inhalte und Dienste von Drittanbietern einbinden, die ihren Sitz in Staaten außerhalb der Europäischen Union 
              (EU) bzw. des Europäischen Wirtschaftsraums (EWR) haben. Beim Besuch dieser Website können Ihre Daten in diese Drittländer 
              übertragen werden, in denen möglicherweise ein geringeres Datenschutzniveau als in der EU bzw. im EWR besteht. Sofern keine 
              ausdrückliche Einwilligung für die Datenübermittlung in Drittländer vorliegt oder ein sonstiger Erlaubnistatbestand erfüllt 
              ist, werden wir sicherstellen, dass für die Datenübermittlung in diese Länder angemessene Garantien bestehen. Das können etwa 
              EU-Standarddatenschutzklauseln, anerkannte Verhaltensregeln oder Zertifizierungsmechanismen sein.
            </p>
            <p className="mb-4">
              Bei der Nutzung von Vercel und Brevo werden Daten in die USA oder andere Drittländer übertragen. Die Übermittlung erfolgt 
              auf Basis des EU-US Data Privacy Framework bzw. entsprechender Angemessenheitsbeschlüsse oder geeigneter Garantien wie 
              EU-Standarddatenschutzklauseln.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#30b9c9] mb-3">7. Stand und Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung hat den Stand: {new Date().toLocaleDateString('de-DE')}. Wir behalten uns vor, diese Datenschutzerklärung 
              anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer 
              Leistungen in der Datenschutzerklärung umzusetzen.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Datenschutz – Pflegebuddy | Datenschutzerklärung & DSGVO",
  description: "Wie schützt Pflegebuddy deine Daten? Alle Infos zu DSGVO, Nutzerrechten, Datensicherheit und Kontaktmöglichkeiten auf einen Blick.",
  keywords: ["Datenschutz", "DSGVO", "Pflegebuddy", "Datenverarbeitung", "Nutzerrechte", "Datensicherheit", "Datenschutzerklärung"],
  alternates: {
    canonical: "https://pflegebuddy.care/datenschutz",
  },
}; 