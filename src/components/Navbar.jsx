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
    // Cierra el menú al cambiar de ruta
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Maneja el efecto de scroll para el navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Maneja el clic fuera del menú para cerrarlo (Mecanismo de cierre)
    const handleClickOutside = (event) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // El menú lateral se desliza desde la derecha
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
          : "bg-[#f5f5dc]/60 backdrop-blur-sm"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <motion.h1
          className="text-gray-800 font-serif text-2xl tracking-wide cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">Mi revelación de género</Link>
        </motion.h1>

        {/* Menú escritorio */}
        <ul className="hidden md:flex gap-8 text-gray-800 font-medium"> 
          {[
            { to: "/", label: "Inicio" },
            { to: "/detalles", label: "Detalles" },
            { to: "/galeria", label: "Galería" },
            { to: "/ubicacion", "label": "Ubicación" },
            { to: "/confirmar", "label": "Confirmar" },
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
                    ? "text-[#8e5500ff] font-bold"
                    : "text-gray-700" 
                } hover:text-[#8e5500ff]`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Botón menú móvil: Color del icono para contraste */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-700 focus:outline-none" 
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={30} />
        </motion.button>
      </div>

      {/* Menú móvil (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              className="fixed top-0 right-0 h-full min-h-full w-3/4 max-w-xs z-50 flex flex-col p-8 bg-[#f5f5dc] shadow-2xl"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-end mb-10">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8e5500ff] hover:text-red-600 focus:outline-none p-2 rounded-full bg-white shadow" 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={32} />
                </motion.button>
              </div>

              <ul className="flex flex-col flex-1 justify-start gap-6 text-gray-700 font-medium text-xl mt-4"> 
                {[
                  { to: "/", label: "Inicio" },
                  { to: "/detalles", label: "Detalles" },
                  { to: "/galeria", label: "Galería" },
                  { to: "/ubicacion", label: "Ubicación" },
                  { to: "/confirmar", label: "Confirmar" },
                ].map((item, i) => (
                  <motion.li
                    key={item.to}
                    className="flex-shrink-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={item.to}
                      // *** CORRECCIÓN CLAVE AQUÍ ***
                      // Usando bg-white (blanco opaco) para eliminar la transparencia y asegurar el color.
                      // Alternativa: Usar bg-[#C2AE8F] si quieres que el color inicial sea el marrón claro.
                      className={`block px-6 py-3 rounded-lg bg-[#C2AE8F] text-center text-lg text-gray-700 hover:bg-[#8e5500ff] hover:text-white transition-all duration-300 shadow-md ${ 
                        location.pathname === item.to 
                          ? "bg-[#8e5500ff] text-white font-bold" // El activo usa el color oscuro de acento
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