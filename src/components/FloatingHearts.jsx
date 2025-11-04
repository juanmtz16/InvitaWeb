import { motion } from "framer-motion";

export default function FloatingHearts({ count = 20 }) {
  const hearts = Array.from({ length: count });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 5;

        return (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              fontSize: size,
              left: `${left}%`,
              bottom: "-30px",
            }}
            animate={{ y: [-30, -window.innerHeight - 50] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: delay,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}
