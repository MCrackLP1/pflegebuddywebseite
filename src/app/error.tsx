"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#23243a] text-[#f3f6fa] p-8">
      <h1 className="text-5xl font-bold text-[#30b9c9] mb-4">500 – Ein Fehler ist aufgetreten</h1>
      <p className="mb-8 text-lg">Leider ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut oder gehe zurück zur Startseite.</p>
      <div className="flex gap-4 mb-4">
        <button onClick={reset} className="bg-[#30b9c9] text-white px-6 py-2 rounded font-semibold shadow hover:bg-[#167080] transition">Seite neu laden</button>
        <Link href="/" className="bg-[#23243a] border border-[#30b9c9] text-[#30b9c9] px-6 py-2 rounded font-semibold shadow hover:bg-[#30b9c9] hover:text-white transition">Zur Startseite</Link>
        <Link href="/blog" className="bg-[#23243a] border border-[#30b9c9] text-[#30b9c9] px-6 py-2 rounded font-semibold shadow hover:bg-[#30b9c9] hover:text-white transition">Zum Blog</Link>
      </div>
      <pre className="bg-[#1a1b2e] text-[#f3f6fa] p-4 rounded text-xs max-w-xl overflow-x-auto">{error.message}</pre>
    </main>
  );
} 