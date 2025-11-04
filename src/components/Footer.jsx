import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappLink = "https://wa.me/5218123992302"; // 👉 cambia por tu número con lada

  const handleClick = (e) => {
    // Detecta si es un dispositivo táctil
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      e.preventDefault(); // evita que abra inmediatamente
      setShowTooltip(true);
      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 1200); // espera 1.2 segundos antes de abrir WhatsApp
    }
  };

  return (
    <footer className="fixed bottom-4 left-4 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <MessageCircle className="text-white" size={28} />

        {/* Tooltip */}
        {showTooltip && (
          <span className="absolute left-14 whitespace-nowrap bg-white text-[#C2AE8F] text-sm font-medium px-3 py-1 rounded-lg shadow-md border border-[#C2AE8F]/30 animate-fade">
            Contactar al desarrollador
          </span>
        )}
      </a>

      {/* Animación del tooltip */}
      <style jsx>{`
        @keyframes fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          animation: fade 0.25s ease-out;
        }
      `}</style>
    </footer>
  );
}
