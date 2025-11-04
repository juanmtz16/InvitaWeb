import { useState } from "react";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Sí");
  const [guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxOXN7UEzIzZz1LLKw3EfdDTULcXoHjsgw_gs_PRjRzdMfS4mTmSJalb3V54Td73Yc1Rw/exec",
        {
          method: "POST",
          body: JSON.stringify({ name, attending, guests }),
        }
      );
      const result = await response.json();
      if (result.result === "success") {
        setSubmitted(true);
      } else {
        setError("Ocurrió un error, inténtalo más tarde.");
      }
    } catch (err) {
      setError("Ocurrió un error, inténtalo más tarde.");
      console.error(err);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col justify-center items-center text-center py-20 overflow-hidden">
      
      {/* Fondo flotante */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="animate-float absolute w-20 h-20 bg-pink-300 rounded-full opacity-50 top-10 left-5"></div>
        <div className="animate-float-slow absolute w-32 h-32 bg-pink-400 rounded-full opacity-40 top-1/2 left-3/4"></div>
        <div className="animate-float absolute w-16 h-16 bg-pink-200 rounded-full opacity-60 top-3/4 left-1/4"></div>
      </div>

      <h2 className="text-5xl md:text-6xl font-bold text-pink-600 mb-10 z-10 drop-shadow-lg">
        Confirma tu asistencia 💌
      </h2>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="z-10 relative bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full flex flex-col gap-4 transform transition-transform hover:scale-105"
        >
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-pink-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            className="w-full border border-pink-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="Sí">Sí asistiré</option>
            <option value="No">No podré asistir</option>
          </select>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Número de invitados"
            value={guests || ""} 
            onChange={(e) => setGuests(e.target.value)}
            required
            className="w-full border border-pink-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Enviar
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      ) : (
        <p className="z-10 relative text-pink-700 text-xl md:text-2xl mt-6 animate-pulse">
          ¡Gracias por confirmar, {name}! 💖
        </p>
      )}

      {/* Animaciones flotantes con tailwind */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
