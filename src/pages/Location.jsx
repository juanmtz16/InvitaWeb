import { useEffect } from "react";
import FloatingColorDots from "../components/FloatingColorDots";

export default function Location() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#FFF1D6] py-20 overflow-hidden">
      {/* Canvas de fondo */}
      <canvas id="bg-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <FloatingColorDots />
      <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-[#C2AE8F] mb-6">
        Ubicación 📍
      </h2>
      <p className="relative z-10 text-gray-700 mb-10 max-w-xl px-4">
        Quinta La Toscana — Vía de Numancia 115, Nueva Castilla, 66052 Cdad. Gral. Escobedo, N.L.
      </p>

      <div className="relative z-10 w-[90%] max-w-3xl h-96 rounded-3xl overflow-hidden shadow-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.5547396173883!2d-100.27001494189592!3d25.818259701097897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86629381a97d5071%3A0xae728fb8388e7e70!2sQuinta%20La%20Toscana!5e0!3m2!1sen!2smx!4v1762208489113!5m2!1sen!2smx"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
