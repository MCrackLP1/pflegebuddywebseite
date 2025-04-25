'use client';
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="fixed bottom-24 right-6 z-50 bg-[#30b9c9] hover:bg-[#2693a5] text-white rounded-full shadow-lg p-3 transition-all"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Zurück nach oben"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  );
} 