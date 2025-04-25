'use client';

import { useState } from "react";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-[#30b9c9] hover:bg-[#2693a5] text-white rounded-full shadow-lg px-5 py-3 font-semibold text-base transition-all"
        onClick={() => setOpen(true)}
        aria-label="Feedback geben"
      >
        Feedback
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#23243a]/95 rounded-3xl p-6 shadow-xl w-full max-w-sm relative backdrop-blur border border-[#30b9c9]/30">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" onClick={() => setOpen(false)} aria-label="Schließen">✕</button>
            <h3 className="text-lg font-bold mb-2 text-[#30b9c9]">Feedback</h3>
            {sent ? (
              <div className="text-green-400 font-semibold py-8 text-center">Danke für dein Feedback!</div>
            ) : (
              <form onSubmit={e => {e.preventDefault(); setSent(true);}}>
                <label className="block text-sm font-medium text-[#30b9c9] mb-1" htmlFor="feedback-name">Name*</label>
                <input
                  id="feedback-name"
                  className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded p-2 mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30b9c9]"
                  placeholder="Dein Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  type="text"
                />
                <label className="block text-sm font-medium text-[#30b9c9] mb-1" htmlFor="feedback-email">E-Mail-Adresse*</label>
                <input
                  id="feedback-email"
                  className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded p-2 mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30b9c9]"
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  type="email"
                />
                <label className="block text-sm font-medium text-[#30b9c9] mb-1" htmlFor="feedback-text">Feedback*</label>
                <textarea
                  id="feedback-text"
                  className="w-full border border-[#30b9c9] bg-[#23243a] text-[#f3f6fa] rounded p-2 mb-4 min-h-[80px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30b9c9]"
                  placeholder="Dein Feedback..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  required
                />
                <button type="submit" className="bg-[#30b9c9] hover:bg-[#167080] text-white px-4 py-2 rounded font-semibold w-full">Absenden</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
} 