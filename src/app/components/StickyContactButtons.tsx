import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const contacts = [
  { icon: <Phone size={20} />, label: "Anrufen", href: "tel:01741632129", color: "bg-[#30b9c9]" },
  { icon: <Mail size={20} />, label: "Mail", href: "mailto:deinpflegebuddy@gmail.com", color: "bg-[#4dd0e1]" },
];
const socials = [
  { icon: <FaInstagram size={20} />, label: "Instagram", href: "https://www.instagram.com/pflege.buddy/", color: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500" },
  { icon: <FaWhatsapp size={20} />, label: "WhatsApp", href: "https://wa.me/message/WK67K2T7SZCYH1", color: "bg-[#25d366]" },
];

export default function StickyContactButtons() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {contacts.map((c) => (
        <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
          className={`flex items-center justify-center w-12 h-12 mb-1 rounded-full shadow-lg text-white hover:scale-110 transition-all ${c.color}`}
          aria-label={c.label}
        >
          {c.icon}
        </a>
      ))}
      <div className="h-2" />
      {socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
          className={`flex items-center justify-center w-12 h-12 mb-1 rounded-full shadow-lg text-white hover:scale-110 transition-all ${s.color}`}
          aria-label={s.label}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
} 