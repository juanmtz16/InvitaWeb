import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f5f5dc]/90 shadow-lg backdrop-blur-md"
        : "bg-[#f5f5dc]/40 backdrop-blur-sm"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <motion.h1
          className="text-gray-700 font-serif text-2xl tracking-wide cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">Mi revelación de género</Link>
        </motion.h1>

        {/* Menú escritorio */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {[
            { to: "/", label: "Inicio" },
            { to: "/detalles", label: "Detalles" },
            { to: "/galeria", label: "Galería" },
            { to: "/ubicacion", label: "Ubicación" },
            { to: "/confirmar", label: "Confirmar" },
          ].map((item) => (
            <motion.li
              key={item.to}
              whileHover={{ scale: 1.1, color: "#8e5500ff" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.to}
                className={`transition ${
                  location.pathname === item.to
                    ? "text-[#8e5500ff]"
                    : "text-gray-700"
                } hover:text-[#C2AE8F]`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white-600 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={30} />
        </motion.button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={drawerRef}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 flex flex-col p-6"
              style={{
                
                backdropFilter: "blur(12px)",
              }}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-red-600 focus:outline-none"
                >
                  <X size={28} />
                </button>
              </div>

              <ul className="flex flex-col flex-1 justify-center gap-4 text-gray-800 font-medium text-lg">
                {[
                  { to: "/", label: "Inicio" },
                  { to: "/detalles", label: "Detalles" },
                  { to: "/galeria", label: "Galería" },
                  { to: "/ubicacion", label: "Ubicación" },
                  { to: "/confirmar", label: "Confirmar" },
                ].map((item, i) => (
                  <motion.li
                    key={item.to}
                    className="flex-1 flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link
                      to={item.to}
                      className={`w-full px-4 py-4 rounded-full bg-[#f5f5dc] text-center hover:bg-white/90 hover:text-[#8e5500ff] transition ${
                        location.pathname === item.to ? "bg-[#f5f5dc]/90 font-semibold" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
