import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = ["❤️", "⭐", "💧", "🔺", "💛"]; // Corazón, estrella, gota, triángulo, círculo

export default function FloatingShapes({ count = 20 }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 30 + 15, // tamaño entre 15 y 45px
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 5, // duración de animación 5-15s
      delay: Math.random() * 5, // retraso inicial
    }));
    setItems(generated);
  }, [count]);

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: item.y, opacity: 0 }}
          animate={{ y: item.y - 1000, opacity: [0, 1, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            position: "absolute",
            left: item.x,
            fontSize: item.size,
            pointerEvents: "none",
          }}
        >
          {item.shape}
        </motion.div>
      ))}
    </>
  );
}
