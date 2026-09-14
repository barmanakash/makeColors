import { useEffect, useRef } from 'react';

// A dependency-free 3D scene: nodes drift slowly in 3D space, connections
// glow, and small signal particles travel along the edges to suggest data
// moving through the system.
const NODES = [
  { id: 'react', label: 'REACT', pos: [-150, -65, -40], color: '#4c7eff' },
  { id: 'node', label: 'NODE.JS', pos: [-150, 65, 40], color: '#4c7eff' },
  { id: 'api', label: 'API LAYER', pos: [0, 0, 0], color: '#eceef3', r: 10, core: true },
  { id: 'db', label: 'MONGODB', pos: [0, 150, -30], color: '#4c7eff' },
  { id: 'llm', label: 'LLM', pos: [150, -75, 30], color: '#38b6a6' },
  { id: 'rag', label: 'RAG PIPELINE', pos: [150, 85, -20], color: '#38b6a6' },
  { id: 'agent', label: 'AI AGENT', pos: [235, 5, 50], color: '#38b6a6' },
];

const EDGES = [
  ['react', 'api'],
  ['node', 'api'],
  ['api', 'db'],
  ['api', 'llm'],
  ['llm', 'agent'],
  ['rag', 'agent'],
  ['llm', 'rag'],
];

// two staggered particles per edge, each with its own speed
const PARTICLES = EDGES.flatMap(([a, b], i) => [
  { a, b, phase: (i * 0.37) % 1, speed: 0.16 + (i % 3) * 0.03 },
  { a, b, phase: (i * 0.37 + 0.5) % 1, speed: 0.13 + (i % 2) * 0.04 },
]);

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  const num = parseInt(v, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rotate(pos, angleY, tiltX) {
  const [x, y, z] = pos;
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return [x1, y1, z2];
}

function projectPoint([x, y, z], width, height) {
  const focal = 620;
  const scale = focal / (focal + z + 260);
  return {
    x: width / 2 + x * scale,
    y: height / 2 + y * scale,
    scale,
    depth: z,
  };
}

function HeroGraphic3D() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let frameId;
    let last = performance.now();
    let elapsed = 0;

    function resize() {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function render(t) {
      const angleY = 0.6 + t * 0.00016;
      const tiltX = Math.sin(t * 0.00035) * 0.09;

      ctx.clearRect(0, 0, width, height);

      const world = {};
      const screen = {};
      NODES.forEach((node) => {
        const w = rotate(node.pos, angleY, tiltX);
        world[node.id] = w;
        screen[node.id] = projectPoint(w, width, height);
      });

      // glowing edges
      EDGES.forEach(([a, b]) => {
        const pa = screen[a];
        const pb = screen[b];
        const depth = (pa.depth + pb.depth) / 2;
        const baseAlpha = Math.max(0.16, Math.min(0.5, 0.38 - depth / 900));

        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        const [ar, ag, ab] = hexToRgb(
          NODES.find((n) => n.id === a).color
        );
        const [br, bg, bb] = hexToRgb(
          NODES.find((n) => n.id === b).color
        );
        grad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, ${baseAlpha})`);
        grad.addColorStop(1, `rgba(${br}, ${bg}, ${bb}, ${baseAlpha})`);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // signal particles travelling along the edges
      if (!reduceMotion) {
        PARTICLES.forEach((particle) => {
          const nodeA = NODES.find((n) => n.id === particle.a);
          const nodeB = NODES.find((n) => n.id === particle.b);
          const t01 = (elapsed * particle.speed + particle.phase) % 1;

          const worldPos = [
            lerp(nodeA.pos[0], nodeB.pos[0], t01),
            lerp(nodeA.pos[1], nodeB.pos[1], t01),
            lerp(nodeA.pos[2], nodeB.pos[2], t01),
          ];
          const rotated = rotate(worldPos, angleY, tiltX);
          const p = projectPoint(rotated, width, height);

          // fade in/out near the ends of the trip
          const edgeFade = Math.sin(Math.PI * t01);
          const color = t01 < 0.5 ? nodeA.color : nodeB.color;
          const [r, g, b] = hexToRgb(color);
          const alpha = 0.25 + 0.55 * edgeFade;

          ctx.save();
          ctx.shadowColor = color;
          ctx.shadowBlur = 8 * p.scale;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.1 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
          ctx.restore();
        });
      }

      // nodes, farthest first so nearer ones sit on top
      const order = [...NODES].sort(
        (n1, n2) => screen[n1.id].depth - screen[n2.id].depth
      );

      order.forEach((node) => {
        const p = screen[node.id];
        const pulse = reduceMotion
          ? 1
          : 0.85 + 0.15 * Math.sin(t * 0.0022 + node.pos[0]);
        const radius = (node.r || 7) * Math.max(0.65, p.scale) * pulse;

        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = (node.core ? 26 : 16) * pulse * Math.max(0.5, p.scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = Math.max(0.6, Math.min(1, p.scale));
        ctx.fill();
        ctx.restore();

        ctx.font = '11px "IBM Plex Mono", monospace';
        ctx.fillStyle = `rgba(139, 147, 165, ${Math.max(
          0.5,
          Math.min(1, p.scale)
        )})`;
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, p.x + radius + 8, p.y);
      });
    }

    function tick(now) {
      const dt = now - last;
      last = now;
      elapsed += dt / 1000;
      render(now);
      frameId = requestAnimationFrame(tick);
    }

    resize();
    render(0);

    if (!reduceMotion) {
      frameId = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(() => {
      resize();
      render(performance.now());
    });
    observer.observe(wrap);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-graphic-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default HeroGraphic3D;
