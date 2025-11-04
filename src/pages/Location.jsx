import { useEffect } from "react";

export default function Location() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = [];

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 4 + 2,
          dx: (Math.random() - 0.5) * 0.8,
          dy: (Math.random() - 0.5) * 0.8,
          color: `rgba(219, 39, 119, ${Math.random()})`, // pinkish
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx = -p.dx;
        if (p.y < 0 || p.y > height) p.dy = -p.dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-pink-50 py-20 overflow-hidden">
      {/* Canvas de fondo */}
      <canvas id="bg-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-pink-600 mb-6">
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
