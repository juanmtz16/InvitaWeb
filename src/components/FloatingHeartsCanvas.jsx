import { useEffect, useRef } from "react";

export default function FloatingHeartsCanvas({ count = 30 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const hearts = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(255,105,180,${Math.random() * 0.6 + 0.4})`, // rosa con opacidad
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }));

    const drawHeart = (x, y, size, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(size / 2, -size, size, 0, 0, size);
      ctx.bezierCurveTo(-size, 0, -size / 2, -size, 0, -size / 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    function animate() {
      ctx.clearRect(0, 0, width, height);
      hearts.forEach(heart => {
        heart.x += heart.dx;
        heart.y += heart.dy;
        heart.angle += heart.rotationSpeed;

        if (heart.x < 0 || heart.x > width) heart.dx *= -1;
        if (heart.y < 0 || heart.y > height) heart.dy *= -1;

        drawHeart(heart.x, heart.y, heart.size, heart.angle, heart.color);
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
