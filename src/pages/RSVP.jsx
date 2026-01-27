import { useState, useEffect } from "react";
import GiftRoulette from "../components/GiftRoulette";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Sí");
  const [guests, setGuests] = useState("");
  const [children, setChildren] = useState("0");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [giftOption, setGiftOption] = useState("");
  const [assignedGift, setAssignedGift] = useState("");

  useEffect(() => {
    if (attending === "No") {
      setGuests("");
      setChildren("");
      setGiftOption("");
      setAssignedGift("");
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

    if (attending === "Sí" && !giftOption) {
      setError("Por favor selecciona una opción de regalo.");
      setLoading(false);
      return;
    }

    if (giftOption === "ruleta" && !assignedGift) {
      setError("Por favor gira la ruleta.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx4G0vzPGjAwdLLG6stLGVoXxUOg43dSp4iQqHtIqOT4_TdwCd0k0niupBZ1XZ4tmGwEA/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            attending,
            guests: attending === "Sí" ? guests : "",
            giftOption,
            assignedGift,
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

      <h2 className="text-5xl md:text-6xl font-bold text-[#db2777] mb-10">
        Confirma tu asistencia 💌
      </h2>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-xl p-3"
          />

          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="Sí">Sí asistiré</option>
            <option value="No">No podré asistir</option>
          </select>

          {attending === "Sí" && (
            <>
              <input
                type="number"
                min="1"
                placeholder="Número de adultos"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
                className="w-full border rounded-xl p-3"
              />

              <input
                type="number"
                value=""
                disabled
                placeholder="Sin niños"
                className="w-full border bg-gray-100 rounded-xl p-3 text-gray-500"
              />

              <div className="text-left mt-4">
                <p className="font-semibold text-[#db2777] mb-2">🎁 Regalo</p>

                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="gift"
                    checked={giftOption === "libre"}
                    onChange={() => {
                      setGiftOption("libre");
                      setAssignedGift("Regalo libre / sobre");
                    }}
                  />
                  Regalo libre
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gift"
                    checked={giftOption === "ruleta"}
                    onChange={() => {
                      setGiftOption("ruleta");
                      setAssignedGift("");
                    }}
                  />
                  Participar en la ruleta
                </label>

                {giftOption === "ruleta" && (
                  <div className="mt-4">
                    <GiftRoulette onResult={setAssignedGift} />

                    {assignedGift && (
                      <p className="mt-4 text-sm text-center text-[#db2777]">
                        🎉 Te tocó: <strong>{assignedGift}</strong>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#db2777] text-white py-3 rounded-xl"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      ) : (
        <p className="text-[#db2777] text-xl">
          ¡Gracias por confirmar, {name}! 💖
        </p>
      )}
    </section>
  );
}
