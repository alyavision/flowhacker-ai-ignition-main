import React, { useEffect, useRef } from "react";

const COLORS = {
  bg: "#000000",
  lime: "#7CFC00",
  cyan: "#00FFFF",
} as const;

type Node = {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  seed: number;
  blinkUntil: number;
};

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const fitCanvas = () => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fitCanvas();
    const onResize = () => fitCanvas();
    window.addEventListener("resize", onResize, { passive: true });

    const params = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      const area = w * h;
      const count = Math.max(40, Math.min(120, Math.round(area / 14000)));
      const maxDist = Math.max(80, Math.min(160, Math.sqrt(area) / 10));
      return { count, maxDist };
    };

    let nodes: Node[] = [];
    const resetNodes = () => {
      const { count } = params();
      nodes = new Array(count).fill(0).map((_, i) => {
        const speed = 12 + Math.random() * 16;
        const angle = Math.random() * Math.PI * 2;
        return {
          id: i,
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          angle,
          speed,
          size: Math.random() < 0.2 ? 2.2 : 1.6,
          seed: Math.random() * 1000,
          blinkUntil: 0,
        };
      });
    };
    resetNodes();
    window.addEventListener("resize", resetNodes, { passive: true });

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const nowMs = () => performance.now();

    function updateNodes(dt: number) {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      const t = nowMs() / 1000;
      for (const n of nodes) {
        n.angle += 0.35 * Math.sin(t * 0.6 + n.seed) * dt;
        n.x += Math.cos(n.angle) * n.speed * dt;
        n.y += Math.sin(n.angle) * n.speed * dt;

        const margin = 8;
        if (n.x < margin || n.x > w - margin) n.angle = Math.PI - n.angle;
        if (n.y < margin || n.y > h - margin) n.angle = -n.angle;
        n.x = clamp(n.x, margin, w - margin);
        n.y = clamp(n.y, margin, h - margin);
      }
    }

    function drawConnections() {
      const { maxDist } = params();
      const maxDist2 = maxDist * maxDist;
      const T = nowMs();

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const d = Math.sqrt(d2);
            const alpha = 1 - d / maxDist;
            ctx.strokeStyle = `rgba(124,252,0,${alpha * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (Math.random() < 0.002) {
              ctx.strokeStyle = `rgba(0,255,255,${0.55})`;
              ctx.lineWidth = 1.3;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.lineWidth = 1;

              a.blinkUntil = T + 150;
              b.blinkUntil = T + 150;
            }
          }
        }
      }
    }

    function drawNodes() {
      const t = nowMs();
      for (const n of nodes) {
        ctx.fillStyle = "rgba(124,252,0,0.06)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 3.0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.lime;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();

        if (t < n.blinkUntil) {
          const p = (n.blinkUntil - t) / 150;
          ctx.strokeStyle = `rgba(0,255,255,${0.4 * p})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size + 3 + 6 * (1 - p), 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }
    }

    let last = nowMs();
    const tick = () => {
      const t = nowMs();
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.clientWidth; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.clientHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.clientHeight; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.clientWidth, y + 0.5);
        ctx.stroke();
      }

      updateNodes(dt);
      drawConnections();
      drawNodes();

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", resetNodes);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      id="neural-bg"
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    ></canvas>
  );
};

export default NeuralBackground;


