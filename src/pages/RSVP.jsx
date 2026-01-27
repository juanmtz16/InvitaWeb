import { useState, useEffect } from "react";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Sí");
  const [guests, setGuests] = useState("");
  const [children, setChildren] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attending === "No") {
      setGuests("");
      setChildren("");
    }
  }, [attending]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (attending === "Sí" && (!guests || guests < 1)) {
      setError("Por favor indica cuántos adultos asistirán.");
      setLoading(false);
      return;
    }

    if (attending === "Sí" && (children < 0 || children === "")) {
      setError("Por favor indica el número de niños (puede ser 0).");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxOXN7UEzIzZz1LLKw3EfdDTULcXoHjsgw_gs_PRjRzdMfS4mTmSJalb3V54Td73Yc1Rw/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            attending,
            guests: attending === "Sí" ? guests : "",
            children: attending === "Sí" ? children : "",
          }),
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setSubmitted(true);
      } else {
        setError("Ocurrió un error, inténtalo más tarde.");
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error, inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#fce7f3] to-[#fbcfe8] flex flex-col justify-center items-center text-center py-20 overflow-hidden">
      {/* 🎈 Bolas flotantes de fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.floor(Math.random() * 40) + 20;
          const left = Math.floor(Math.random() * 90);
          const top = Math.floor(Math.random() * 90);
          const colors = ["#f9a8d4", "#f472b6", "#fbcfe8", "#fda4af"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const duration = Math.random() * 10 + 8;

          return (
            <div
              key={i}
              className="rounded-full opacity-50 absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                top: `${top}%`,
                left: `${left}%`,
                animation: `float ${duration}s ease-in-out infinite alternate`,
              }}
            ></div>
          );
        })}
      </div>

      <h2 className="text-5xl md:text-6xl font-bold text-[#db2777] mb-10 z-10 drop-shadow-lg">
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
            className="w-full border border-[#f9a8d4] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6] transition"
          />

          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            className="w-full border border-[#f9a8d4] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6] transition"
          >
            <option value="Sí">Sí asistiré</option>
            <option value="No">No podré asistir</option>
          </select>

          {attending === "Sí" && (
            <>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="Número de adultos"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
                className="w-full border border-[#f9a8d4] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6] transition"
              />

              <input
                type="number"
                min="0"
                max="10"
                placeholder="Número de niños"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                required
                className="w-full border border-[#f9a8d4] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6] transition"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#db2777] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#f472b6] hover:scale-105"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Enviando...
              </div>
            ) : (
              "Enviar"
            )}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      ) : (
        <p className="z-10 relative text-[#db2777] text-xl md:text-2xl mt-6 animate-pulse">
          {attending === "Sí"
            ? `¡Gracias por confirmar, ${name}! 💖`
            : `Gracias por avisarnos, ${name}. ¡Te extrañaremos! 💐`}
        </p>
      )}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -20px);
          }
          100% {
            transform: translate(-10px, 0);
          }
        }
      `}</style>
    </section>
  );
}
