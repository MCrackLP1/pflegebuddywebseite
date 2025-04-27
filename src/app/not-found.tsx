import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#23243a] text-[#f3f6fa] p-8">
      <h1 className="text-5xl font-bold text-[#30b9c9] mb-4">404 – Seite nicht gefunden</h1>
      <p className="mb-8 text-lg">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
      <div className="flex gap-4">
        <Link href="/" className="bg-[#30b9c9] text-white px-6 py-2 rounded font-semibold shadow hover:bg-[#167080] transition">Zur Startseite</Link>
        <Link href="/blog" className="bg-[#23243a] border border-[#30b9c9] text-[#30b9c9] px-6 py-2 rounded font-semibold shadow hover:bg-[#30b9c9] hover:text-white transition">Zum Blog</Link>
      </div>
    </main>
  );
} 