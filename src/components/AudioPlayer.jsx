import { useState, useEffect, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react"; // iconos elegantes

// 🎶 Contexto global de audio
const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/musicafondo.mp3"); // ✅ archivo en /public
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // 🔊 Intentar reproducir automáticamente al mover el mouse
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Quitamos los listeners para que solo ocurra una vez
          document.removeEventListener("mousemove", tryPlay);
          document.removeEventListener("click", tryPlay);
          document.removeEventListener("scroll", tryPlay);
        })
        .catch(() => {
          console.log("Autoplay bloqueado por el navegador.");
        });
    };

    // Escuchar la primera interacción (mover mouse, clic o scroll)
    document.addEventListener("mousemove", tryPlay);
    document.addEventListener("click", tryPlay);
    document.addEventListener("scroll", tryPlay);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("mousemove", tryPlay);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeOut(audio);
    } else {
      fadeIn(audio);
    }
    setIsPlaying(!isPlaying);
  };

  // 🌙 Suaviza el inicio (fade in)
  const fadeIn = (audio) => {
    audio.play();
    let volume = 0;
    const interval = setInterval(() => {
      volume += 0.05;
      if (volume >= 0.4) {
        volume = 0.4;
        clearInterval(interval);
      }
      audio.volume = volume;
    }, 100);
  };

  // ☀️ Suaviza la pausa (fade out)
  const fadeOut = (audio) => {
    let volume = audio.volume;
    const interval = setInterval(() => {
      volume -= 0.05;
      if (volume <= 0) {
        volume = 0;
        audio.pause();
        clearInterval(interval);
      }
      audio.volume = volume;
    }, 100);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
      <MusicButton />
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);

// 🎵 Botón flotante moderno
function MusicButton() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed bottom-5 right-5 bg-[#db2777] hover:bg-pink-400 text-white rounded-full p-4 shadow-lg z-50 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      title={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 6, ease: "linear" }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6 animate-pulse" />
        )}
      </motion.div>
    </motion.button>
  );
}
