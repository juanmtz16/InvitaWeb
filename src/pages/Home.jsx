import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FloatingHearts from "../components/FloatingHearts";
import FloatingDots from "../components/FloatingDots";
import FloatingColorDots from "../components/FloatingColorDots";
import FloatingPetalos from "../components/FloatingPetalos";
import FloatingHeartsCanvas from "../components/FloatingHeartsCanvas";
import FloatingBaby from "../components/FloatingBaby";
import conejita from "../assets/fondoconejita/conejita.png";

import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

// Importar imágenes dinámicamente desde la carpeta Galería
const images = import.meta.glob("/src/assets/Carrusel/*.{jpg,jpeg,png,gif}", { eager: true });
const photos = Object.values(images).map((img) => img.default || img);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export default function Home() {
  return (
    <div className="text-gray-800 overflow-hidden">
      {/* Hero principal mejorado */}
      <HomeHero />

      {/* Nuestra historia */}
      <motion.section
        id="historia"
        className="py-20 bg-[#fce7f3] text-center relative"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src={conejita}
          alt=""
          className="absolute bottom-0 right-0 w-40 md:w-56 opacity-40 pointer-events-none z-0"
        />
        <motion.h2
          className="max-w-4xl mx-auto px-6 text-3xl font-bold text-[#db2777] mb-6"
          variants={fadeInUp}
        >
        Ya casi llego… y quiero celebrarlo contigo.
        </motion.h2>

        <motion.p
          className="max-w-4xl mx-auto px-6 text-gray-700 leading-relaxed text-justify"
          variants={fadeInUp}
        >
        Te invito a mi Baby Shower para compartir amor, sonrisas y mucha ilusión mientras me esperan con cariño.
        Mis papás están preparando todo con mucho amor y yo quiero que tú seas parte de este momento tan especial en mi Baby Shower.
        </motion.p>
      </motion.section>

      {/* Carrusel de fotos */}
      <motion.section
        id="galeria"
        className="py-16 bg-[#f9a8d4] text-center relative"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Algunos momentos 📸
        </h2>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            loop
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.img
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.section>

      {/* Detalles del evento */}
      <motion.section
        id="evento"
        className="relative min-h-screen flex flex-col justify-center items-center bg-[#fce7f3] text-center px-6 py-20 overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FloatingHeartsCanvas />

        <motion.h2
          className="relative z-10 text-4xl md:text-5xl font-bold text-[#db2777] mb-12"
          variants={fadeInUp}
        >
          Detalles del Evento 📅
        </motion.h2>

        <motion.div
          className="relative z-10 max-w-4xl grid md:grid-cols-2 gap-8 text-gray-700"
          variants={fadeIn}
        >
          <motion.div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">No Niños</h3>
            <p className="text-6xl md:text-8xl">🚫👶</p>
            <p className="mt-2 text-lg md:text-xl"></p>
          </motion.div>

          <motion.div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">Regalo</h3>
            <p className="text-6xl md:text-8xl">🎁 💌</p>
          </motion.div>
        </motion.div>

        <motion.div className="mt-12 relative z-10">
          <Link
            to="/detalles"
            className="inline-block bg-[#ec4899] text-white px-6 py-2 rounded-full hover:bg-[#db2777] transition"
          >
            Ver mas detalles
          </Link>
        </motion.div>
      </motion.section>

      {/* Confirmación */}
      <motion.section className="py-16 text-center bg-white relative">
        <FloatingHearts />
        <h2 className="text-3xl font-bold text-[#db2777] mb-6">
          ¿Nos acompañas? 💌
        </h2>

        <Link
          to="/confirmar"
          className="inline-block bg-[#ec4899] text-white px-6 py-2 rounded-full hover:bg-[#db2777] transition"
        >
          Confirmar asistencia
        </Link>

        <motion.p className="text-lg text-[#f472b6] px-6 py-2">
          Con mucho amor (y algunas pataditas) ...
        </motion.p>
      </motion.section>
    </div>
  );
}

/* Hero mejorado con cuenta regresiva integrada */
function HomeHero() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/fondonuevo2.jpeg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbcfe8]/40 via-black/40 to-[#fbcfe8]/40"></div>

      <FloatingBaby />

      <motion.div className="relative z-10 text-white px-6">
        <motion.h1 className="text-5xl md:text-6xl font-serif mb-2 drop-shadow-lg">
          ¡Te invito a mi Baby Shower!
        </motion.h1>

        <motion.p className="text-xl md:text-2xl mb-2 drop-shadow-md">
          Victoria Colette Gutierrez Garcia
        </motion.p>

        <motion.p className="text-md md:text-lg mb-6 drop-shadow-md">
          28 de febrero, 2026 <br />
          Canal Medular 329, Barrio Santa Isabel, 64102 Monterrey, N.L.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap justify-center gap-4">
          <CountdownHero />
        </motion.div>

        <Link
          to="/confirmar"
          className="inline-block bg-[#ec4899] hover:bg-[#db2777] text-white mt-6 px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Confirmar asistencia
        </Link>
      </motion.div>
    </section>
  );
}

/* Subcomponente de cuenta regresiva */
function CountdownHero() {
  const targetDate = new Date("2026-02-28T17:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        Dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((diff / (1000 * 60)) % 60),
        Segundos: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return <p className="text-2xl font-semibold">¡Hoy es el gran día! 🎉</p>;

  return (
    <>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          className="bg-white/80 text-black font-semibold rounded-xl shadow-lg w-20 p-3 flex flex-col items-center"
        >
          <span className="text-2xl md:text-3xl">{value}</span>
          <span className="text-xs md:text-sm capitalize">{unit}</span>
        </motion.div>
      ))}
    </>
  );
}
