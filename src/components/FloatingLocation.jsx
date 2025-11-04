import { motion } from "framer-motion";

export default function FloatingLocation({ count = 25 }) {
  const emojis = ["📍", "📌", "🗺️", "🏡", "🏠", "🧭", "🚗", "🛣️", "🅿️", "🏕️"];
  const icons = Array.from({ length: count });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((_, i) => {
        const size = Math.random() * 24 + 12; // tamaño entre 12px y 36px
        const left = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 6 + 6;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        return (
          <motion.div
            key={i}
            className="absolute text-red-400"
            style={{
              fontSize: size,
              left: `${left}%`,
              bottom: "-40px",
            }}
            animate={{ y: [-40, -window.innerHeight - 60] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: delay,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
