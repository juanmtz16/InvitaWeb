import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Details() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = [];

    // Crear corazones
    const createParticles = () => {
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          dx: (Math.random() - 0.5) * 0.5,
          dy: -Math.random() * 0.5 - 0.2,
          color: `rgba(210, 180, 140, ${Math.random() * 0.8 + 0.2})`, 
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    const drawHeart = (x, y, size, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(size / 2, -size, size, 0, 0, size);
      ctx.bezierCurveTo(-size, 0, -size / 2, -size, 0, -size / 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.angle += p.rotationSpeed;

        if (p.y + p.size < 0) p.y = height + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = width + p.size;

        drawHeart(p.x, p.y, p.size, p.angle, p.color);
      });
      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col justify-center items-center bg-[#FFF1D6] text-center px-6 py-20 overflow-hidden"
    >
      {/* Canvas de fondo */}
      <canvas id="bg-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-[#C2AE8F] mb-8">
        Detalles del Evento
      </h2>

      <div className="relative z-10 max-w-3xl grid md:grid-cols-2 gap-6 text-gray-700">
      <div className="bg-white/70 p-6 rounded-2xl shadow-lg md:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
        <p>Vía de Numancia 115, Nueva Castilla, 66052 Cdad. Gral. Escobedo, N.L.</p>
        <p>Quinta La Toscana</p>
        <p>Hora: 4:30 pm</p>
      </div>

      <div className="bg-white/70 p-6 rounded-2xl shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Código de Vestimenta</h3>
        <p className="text-6xl md:text-8xl">🧢👚</p>
        <p className="mt-2 text-lg md:text-xl">Azul o Rosa</p>
      </div>

      <div className="bg-white/70 p-6 rounded-2xl shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Regalo</h3>
        <p className="text-6xl md:text-8xl">🎁💌</p>
      </div>
    </div>

    </motion.section>
  );
}
