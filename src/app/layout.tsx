import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StickyContactButtons from "./components/StickyContactButtons";
import FeedbackButton from "./components/FeedbackButton";
import ScrollToTopButton from "./components/ScrollToTopButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
  description: "Pflegebuddy unterstützt dich im Pflegealltag: Pflegegradrechner, Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
  openGraph: {
    title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Pflegegradrechner, Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
    url: "https://pflegebuddy.de/",
    siteName: "Pflegebuddy",
    images: [
      {
        url: "/og-image.jpg", // Lege ein passendes Bild in /public ab
        width: 1200,
        height: 630,
        alt: "Pflegebuddy App Vorschau"
      }
    ],
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pflegebuddy – Deine digitale Pflegehilfe für zu Hause",
    description: "Pflegebuddy unterstützt dich im Pflegealltag: Pflegegradrechner, Kalender, Experten-Chat, Service-Marktplatz und mehr. Persönlich, digital, kostenlos.",
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnimatedBackground />
        <Navbar />
        <StickyContactButtons />
        <FeedbackButton />
        <ScrollToTopButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
