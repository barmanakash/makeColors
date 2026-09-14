import { useEffect, useRef } from 'react';

// A small tumbling wireframe cube used as the animated brand mark in the
// navbar. Deliberately tiny and subtle — a logomark, not a hero visual.
const SIZE = 9.5;
const VERTICES = [
  [-SIZE, -SIZE, -SIZE],
  [SIZE, -SIZE, -SIZE],
  [SIZE, SIZE, -SIZE],
  [-SIZE, SIZE, -SIZE],
  [-SIZE, -SIZE, SIZE],
  [SIZE, -SIZE, SIZE],
  [SIZE, SIZE, SIZE],
  [-SIZE, SIZE, SIZE],
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

function rotate([x, y, z], angleX, angleY) {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return [x1, y1, z2];
}

function NavMark3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 30;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let frameId;

    function project([x, y, z]) {
      const focal = 70;
      const scale = focal / (focal + z + 34);
      return {
        x: size / 2 + x * scale,
        y: size / 2 + y * scale,
        scale,
        depth: z,
      };
    }

    function render(angleX, angleY) {
      ctx.clearRect(0, 0, size, size);

      const projected = VERTICES.map((v) => project(rotate(v, angleX, angleY)));

      EDGES.forEach(([a, b]) => {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.depth + pb.depth) / 2;
        const alpha = Math.max(0.28, Math.min(0.85, 0.65 - depth / 40));

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(76, 126, 255, ${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });

      projected.forEach((p) => {
        const alpha = Math.max(0.4, Math.min(1, 0.75 - p.depth / 30));
        ctx.save();
        ctx.shadowColor = '#4c7eff';
        ctx.shadowBlur = 4 * p.scale;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 170, 255, ${alpha})`;
        ctx.fill();
        ctx.restore();
      });
    }

    if (reduceMotion) {
      render(0.5, 0.7);
      return undefined;
    }

    let last = performance.now();
    let angleX = 0.5;
    let angleY = 0.7;

    function tick(now) {
      const dt = (now - last) / 1000;
      last = now;
      angleX += dt * 0.5;
      angleY += dt * 0.7;
      render(angleX, angleY);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="nav-mark" aria-hidden="true" />;
}

export default NavMark3D;
