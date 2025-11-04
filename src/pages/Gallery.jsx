import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FloatingHearts from "../components/FloatingHearts";
import FloatingShapes from "../components/FloatingShapes";

const images = import.meta.glob("/src/assets/Galeria/*.{jpg,jpeg,png,gif}", { eager: true });
const photos = Object.values(images).map((img) => img.default || img);

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    
    <section className="relative min-h-screen bg-pink-50 py-20 text-center overflow-hidden">
      {/* Canvas de fondo */}
      <canvas id="bg-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        <FloatingShapes count={50} />
      <h2 className="relative z-10 text-4xl font-bold text-pink-600 mb-10">
        Nuestra Historia 💞
      </h2>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
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
          onPrev={() => setIndex((index - 1 + photos.length) % photos.length)}
          onNext={() => setIndex((index + 1) % photos.length)}
        />
      )}
    </section>
  );
}
