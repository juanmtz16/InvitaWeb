import { useState } from "react";
import { motion } from "framer-motion";

const gifts = [
  "Pañalera",
  "Mameluco",
  "Bodys",
  "Almohada de lactancia",
  "Biberón",
  "Esterilizador de biberones",
  "Calentador de toallitas",
  "Bañera",
  "Kit de aseo personal",
  "Mantas de muselina",
  "Cepillo para biberón",
  "Toallita de baño",
  "Baberos de muselina",
  "Cambiador Portatil",
  "Pañales",
  "Calentador de biberones",
];

const size = 320;
const radius = size / 2;
const textRadius = radius * 0.95;
const center = radius;

export default function GiftRoulette({ onResult }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const sliceAngle = 360 / gifts.length;

  const splitText = (text, maxChars = 14) => {
    if (text.length <= maxChars) return [text];

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach(word => {
      if ((currentLine + word).length <= maxChars) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines.slice(0, 2);
  };

  const spin = () => {
    if (spinning || result) return;

    const spins = 5 * 360;
    const randomOffset = Math.random() * 360;
    const finalRotation = rotation + spins + randomOffset;

    setSpinning(true);
    setRotation(finalRotation);

    setTimeout(() => {
      const normalized = finalRotation % 360;
      const index =
        Math.floor(((360 - normalized) % 360) / sliceAngle) % gifts.length;

      const gift = gifts[index];
      setResult(gift);
      setSpinning(false);
      if (onResult) onResult(gift);
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
      <svg width="30" height="30" className="-mb-3 z-20">
        <polygon points="0,0 30,0 15,25" fill="#ec4899" />
      </svg>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full shadow-2xl border-[10px] border-[#f472b6] bg-white"
      >
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
                  fill={i % 2 === 0 ? "#fce7f3" : "#fbcfe8"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#9d174d"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textAngle}, ${textPos.x}, ${textPos.y})`}
                >
                  {splitText(gift).map((line, idx) => (
                    <tspan
                      key={idx}
                      x={textPos.x}
                      dy={idx === 0 ? "0" : "1.1em"}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </motion.g>

        <circle cx={center} cy={center} r="42" fill="#db2777" />
        <text
          x={center}
          y={center}
          fill="#fff"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          REGALO
        </text>
      </svg>

      <button
        onClick={spin}
        disabled={spinning || result}
        className={`px-8 py-3 rounded-full shadow-lg transition text-white
          ${
            result
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ec4899] hover:bg-[#db2777]"
          }`}
      >
        {result ? "Girar ruleta" : spinning ? "Girando..." : "Girar ruleta"}
      </button>

      {result && (
        <div className="bg-white px-6 py-3 rounded-xl shadow-md text-[#db2777] font-semibold">
          🎁 Regalo asignado: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
