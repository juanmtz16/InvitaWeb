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
  className="py-20 bg-[#FFF1D6] text-center relative"
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <FloatingDots className="absolute inset-0 -z-10" /> {/* <- z-index bajo */}
  
  <motion.h2
    className="max-w-4xl mx-auto px-6 text-3xl font-bold text-[#C2AE8F] mb-6"
    variants={fadeInUp}
  >
    Hola a todos, soy yo… sí, todavía estoy en la pancita, pero ya no puedo esperar por más tiempo 😜👶
  </motion.h2>
  <motion.p
    className="max-w-4xl mx-auto px-6 text-gray-700 leading-relaxed text-justify"
    variants={fadeInUp}
  >
    He estado planeando algo muy especial y necesito que todos estén presentes para este gran momento.
    Después de muchas pataditas, siestas interminables y arrumacos con mis papás, ha llegado el momento de revelar si soy un niño travieso o una niña dulce. 
    Los invito a intentar adivinar mi género antes de que lo revelemos. Pueden vestirse de rosa o azul según su predicción… ¡y no se preocupen, yo estaré observando todo desde aquí dentro! 💖💙
    Por favor, díganle a mis papás si vendrán antes del 23 de noviembre para que puedan organizar todo a la perfección y asegurarse de que no me quede sin pastel.
  </motion.p>
</motion.section>

      {/* Carrusel de fotos */}
<motion.section
  id="galeria"
  className="py-16 bg-[#C2AE8F] text-center relative"
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 className="text-3xl font-bold text-[#FFF1D6] mb-6">
    Mis papás 📸
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
    className="relative min-h-screen flex flex-col justify-center items-center bg-[#FFF1D6] text-center px-6 py-20 overflow-hidden"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    >
    {/* Canvas de fondo animado */}
    <FloatingHeartsCanvas />
    <motion.h2
        className="relative z-10 text-4xl md:text-5xl font-bold text-[#C2AE8F] mb-12"
        variants={fadeInUp}
    >
        Detalles del Evento 📅
    </motion.h2>

    <motion.div
        className="relative z-10 max-w-4xl grid md:grid-cols-2 gap-8 text-gray-700"
        variants={fadeIn}
    >
        <motion.div
        className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Código de Vestimenta</h3>
        <p className="text-6xl md:text-8xl">🧢👚</p>
        <p className="mt-2 text-lg md:text-xl">Azul o Rosa</p>
        </motion.div>
       <motion.div
        className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Regalo</h3>
        <p className="text-6xl md:text-8xl">🎁 💌</p>
        </motion.div>
        </motion.div>

        <motion.div
            className="mt-12 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
        <Link
        to="/detalles"
        className="inline-block bg-[#C2AE8F] text-white px-6 py-2 rounded-full hover:bg-[#D9BC8D] transition"
        >
        Ver mas detalles
        </Link>
    </motion.div>
    </motion.section>



      {/* Confirmación */}
      <motion.section
        className="py-16 text-center bg-white relative"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FloatingHearts/>
        <h2 className="text-3xl font-bold text-[#C2AE8F] mb-6">
          ¿Nos acompañas? 💌
        </h2>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/confirmar"
            className="inline-block bg-[#C2AE8F] text-white px-6 py-2 rounded-full hover:bg-[#D9BC8D] transition"
          >
            Confirmar asistencia
          </Link>
        </motion.div>
        <motion.p
          className="text-lg text-[#D9BC8D] px-6 py-2"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
      style={{ backgroundImage: "url('/fondonuevo.jpg')" }}
    >
<div className="absolute inset-0 bg-gradient-to-b from-[#f5deb3]/40 via-black/40 to-[#f5deb3]/40"></div>



    <FloatingBaby />
      <motion.div
        className="relative z-10 text-white px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-serif mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ¡Mis papás quieren compartir mi secreto contigo!
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-2 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Estoy muy emocionado de invitarte a mi revelación de género. ¡Ven y alegra el corazón de mis papás, Keyla y Antonio!
        </motion.p>
        <motion.p
          className="text-md md:text-lg mb-6 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          23 de noviembre, 2025 • Gral Escobedo N.L.
        </motion.p>

        {/* Cuenta regresiva hero */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <CountdownHero />
        </motion.div>
                <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            to="/confirmar"
            className="inline-block bg-[#C2AE8F] hover:bg-[#D9BC8D] text-black mt-6 px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Confirmar asistencia
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Subcomponente de cuenta regresiva */
function CountdownHero() {
  const targetDate = new Date("2025-11-23T17:00:00").getTime();
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
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-2xl md:text-3xl">{value}</span>
          <span className="text-xs md:text-sm capitalize">{unit}</span>
        </motion.div>
      ))}
    </>
  );
}