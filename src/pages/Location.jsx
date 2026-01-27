import { useEffect } from "react";
import FloatingColorDots from "../components/FloatingColorDots";

export default function Location() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#fce7f3] py-20 overflow-hidden">
      {/* Canvas de fondo */}
      <canvas
        id="bg-canvas"
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>

      <FloatingColorDots />

      <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-[#db2777] mb-6">
        Ubicación 📍
      </h2>

      <p className="relative z-10 text-gray-600 mb-10 max-w-xl px-4">
      Quinta Medular - C. Canal Medular 329, Barrio Santa Isabel, 64102 Monterrey, N.L.
      </p>

      <div className="relative z-10 w-[90%] max-w-3xl h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#f9a8d4]/40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.750946818933!2d-100.39586042602834!3d25.778788607901543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866291190ad3c055%3A0x405206352d697daa!2sQuinta%20medular!5e0!3m2!1ses!2smx!4v1769535161617!5m2!1ses!2smx"
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
