import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FloatingHearts from "../components/FloatingHearts";
import FloatingShapes from "../components/FloatingShapes";

const images = import.meta.glob(
  "/src/assets/Galeria/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

// 🔽 ORDENAR IMÁGENES POR NÚMERO EN EL NOMBRE
const photos = Object.entries(images)
  .map(([path, img]) => {
    // Extrae el número del nombre del archivo (ej: 1.jpg → 1)
    const match = path.match(/(\d+)/);
    const number = match ? parseInt(match[1], 10) : 0;

    return {
      src: img.default || img,
      number,
    };
  })
  .sort((a, b) => a.number - b.number) // orden numérico
  .map((item) => item.src); // dejamos solo las URLs

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="relative min-h-screen bg-[#fce7f3] py-20 text-center overflow-hidden">
      {/* Canvas de fondo */}
      <canvas
        id="bg-canvas"
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>

      <FloatingShapes count={50} />

      <h2 className="relative z-10 text-4xl font-bold text-[#db2777] mb-10">
        Mi Familia 💞
      </h2>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer border-4 border-[#f9a8d4]/40"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {index >= 0 && (
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos.map((src) => ({ src }))}
          onPrev={() =>
            setIndex((index - 1 + photos.length) % photos.length)
          }
          onNext={() =>
            setIndex((index + 1) % photos.length)
          }
        />
      )}
    </section>
  );
}
