import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Gallery from "./pages/Gallery";
import Location from "./pages/Location";
import RSVP from "./pages/RSVP";
import { AudioProvider } from "./components/AudioPlayer";
import Footer from "./components/Footer"; // 💬 importamos el nuevo footer

// Variantes para animaciones entre páginas
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.6,
};

// Componente para manejar transiciones entre páginas
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/detalles"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Details />
            </motion.div>
          }
        />
        <Route
          path="/galeria"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Gallery />
            </motion.div>
          }
        />
        <Route
          path="/ubicacion"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Location />
            </motion.div>
          }
        />
        <Route
          path="/confirmar"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <RSVP />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AudioProvider>
        <Navbar />
        <AnimatedRoutes />
        <Footer /> {/* 💬 Footer global en todas las páginas */}
      </AudioProvider>
    </Router>
  );
}
