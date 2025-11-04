import { useEffect, useRef } from "react";

export default function FloatingDots({ count = 30 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const colors = ["rgba(210, 140, 54, 0.8)", "rgba(255, 199, 120, 0.8)"];

    const dots = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)] // color aleatorio
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;
      });
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
