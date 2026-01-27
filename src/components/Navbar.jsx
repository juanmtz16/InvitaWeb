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
          ? "bg-[#fce7f3]/90 shadow-lg backdrop-blur-md"
          : "bg-[#fce7f3]/70 backdrop-blur-sm"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <motion.h1
          className="text-pink-700 font-serif text-2xl tracking-wide cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">Mi Baby Shower Victoria Colette</Link>
        </motion.h1>

        {/* Menú escritorio */}
        <ul className="hidden md:flex gap-8 text-pink-700 font-medium">
          {[
            { to: "/", label: "Inicio" },
            { to: "/detalles", label: "Detalles" },
            { to: "/galeria", label: "Galería" },
            { to: "/ubicacion", label: "Ubicación" },
            { to: "/confirmar", label: "Confirmar" },
          ].map((item) => (
            <motion.li
              key={item.to}
              whileHover={{ scale: 1.1, color: "#db2777" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.to}
                className={`transition ${
                  location.pathname === item.to
                    ? "text-[#db2777] font-bold"
                    : "text-pink-600"
                } hover:text-[#db2777]`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-pink-600 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={30} />
        </motion.button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 flex flex-col p-8 bg-[#fce7f3] shadow-2xl"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-end mb-10">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-[#db2777] hover:text-pink-800 focus:outline-none p-2 rounded-full bg-white shadow"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={32} />
                </motion.button>
              </div>

              <ul className="flex flex-col gap-6 text-pink-700 font-medium text-xl">
                {[
                  { to: "/", label: "Inicio" },
                  { to: "/detalles", label: "Detalles" },
                  { to: "/galeria", label: "Galería" },
                  { to: "/ubicacion", label: "Ubicación" },
                  { to: "/confirmar", label: "Confirmar" },
                ].map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i }}
                  >
                    <Link
                      to={item.to}
                      className={`block px-6 py-3 rounded-lg bg-[#f9a8d4] text-center text-lg text-pink-900 hover:bg-[#db2777] hover:text-white transition-all shadow-md ${
                        location.pathname === item.to
                          ? "bg-[#db2777] text-white font-bold"
                          : ""
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
