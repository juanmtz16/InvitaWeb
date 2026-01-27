import { useState } from "react";
import { motion } from "framer-motion";

const gifts = [
  "Pañales",
  "Ropita",
  "Juguete",
  "Biberón",
  "Cobijita",
  "Toallitas",
  "Babero",
  "Sorpresa",
];

const size = 320;
const radius = size / 2;
const textRadius = radius * 0.6;
const center = radius;

export default function GiftRoulette() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const sliceAngle = 360 / gifts.length;

  const spin = () => {
    if (spinning) return;

    const spins = 5 * 360;
    const randomOffset = Math.random() * 360;
    const finalRotation = rotation + spins + randomOffset;

    setSpinning(true);
    setRotation(finalRotation);

    setTimeout(() => {
      const normalized = finalRotation % 360;

      // Flecha fija arriba (0°)
      const index =
        Math.floor(((360 - normalized) % 360) / sliceAngle) % gifts.length;

      setResult(gifts[index]);
      setSpinning(false);
    }, 3500);
  };

  const polarToCartesian = (angle, r = radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const describeArc = (startAngle, endAngle) => {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Flecha (apunta correctamente al centro superior) */}
        <svg width="30" height="30" className="-mb-3 z-20">
        <polygon points="0,0 30,0 15,25" fill="#C2AE8F" />
        </svg>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full shadow-2xl border-[10px] border-[#C2AE8F] bg-white"
      >
        {/* 🔁 SOLO ESTO GIRA */}
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          transformOrigin="50% 50%"
        >
          {gifts.map((gift, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            const textAngle = startAngle + sliceAngle / 2;
            const textPos = polarToCartesian(textAngle, textRadius);

            return (
              <g key={i}>
                <path
                  d={describeArc(startAngle, endAngle)}
                  fill={i % 2 === 0 ? "#FFF1D6" : "#FDF6E3"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#555"
                  fontSize="13"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textAngle}, ${textPos.x}, ${textPos.y})`}
                >
                  {gift}
                </text>
              </g>
            );
          })}
        </motion.g>

        {/* Centro fijo */}
        <circle cx={center} cy={center} r="42" fill="#C2AE8F" />
        <text
          x={center}
          y={center}
          fill="#fff"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          REGALOS
        </text>
      </svg>

      <button
        onClick={spin}
        disabled={spinning}
        className="bg-[#C2AE8F] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#D9BC8D] transition disabled:opacity-50"
      >
        {spinning ? "Girando..." : "Girar ruleta"}
      </button>

      {result && !spinning && (
        <div className="bg-white px-6 py-3 rounded-xl shadow-md text-[#C2AE8F] font-semibold">
          🎁 Regalo sugerido: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
