"use client";

import * as React from "react";

type Pt = { x: number; y: number };

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 2.8);
const EASE_IN_OUT = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** 在画布上生成「智能升降桌」正视图轮廓采样点（桌面 + 双腿 + 下横梁） */
function buildDeskTargets(pw: number, ph: number): Pt[] {
  const cx = pw * 0.5;
  const cy = ph * 0.44;
  const u = Math.min(pw, ph);
  const sx = u * 0.46;
  const sy = u * 0.52;
  const pts: Pt[] = [];

  const addGrid = (nx: number, ny: number, x0: number, y0: number, x1: number, y1: number) => {
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const fx = nx <= 1 ? (x0 + x1) / 2 : x0 + (i / (nx - 1)) * (x1 - x0);
        const fy = ny <= 1 ? (y0 + y1) / 2 : y0 + (j / (ny - 1)) * (y1 - y0);
        pts.push({ x: cx + fx * sx, y: cy + fy * sy });
      }
    }
  };

  addGrid(30, 5, -0.52, -0.24, 0.52, -0.13);
  addGrid(5, 26, -0.36, -0.11, -0.21, 0.4);
  addGrid(5, 26, 0.21, -0.11, 0.36, 0.4);
  addGrid(18, 3, -0.3, 0.2, 0.3, 0.3);

  return pts;
}

function shuffleIndices(n: number, seed: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  let s = seed;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type IonState = {
  ionN: number;
  ionX: Float32Array;
  ionY: Float32Array;
  ionVx: Float32Array;
  ionVy: Float32Array;
};

type DeskState = {
  desk: Pt[];
  scatter: Pt[];
  center: Pt;
  delays: number[];
  start: number;
  reduce: boolean;
  raf: number;
  driftVx: Float32Array;
  driftVy: Float32Array;
  driftOx: Float32Array;
  driftOy: Float32Array;
  ions: IonState;
  w: number;
  h: number;
};

function initIons(w: number, h: number): IonState {
  const ionN = Math.min(160, Math.max(48, Math.floor((w * h) / 9000)));
  const ionX = new Float32Array(ionN);
  const ionY = new Float32Array(ionN);
  const ionVx = new Float32Array(ionN);
  const ionVy = new Float32Array(ionN);
  let s = 901;
  for (let i = 0; i < ionN; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    ionX[i] = (s / 0x7fffffff) * w;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    ionY[i] = (s / 0x7fffffff) * h;
    ionVx[i] = ((s % 1000) / 1000 - 0.5) * 0.55;
    ionVy[i] = (((s >> 8) % 1000) / 1000 - 0.5) * 0.55;
  }
  return { ionN, ionX, ionY, ionVx, ionVy };
}

function stepIons(ions: IonState, w: number, h: number, cx: number, cy: number) {
  const { ionN, ionX, ionY, ionVx, ionVy } = ions;
  for (let i = 0; i < ionN; i++) {
    ionVx[i] += (Math.random() - 0.5) * 0.12 + (cx - ionX[i]) * 0.000015;
    ionVy[i] += (Math.random() - 0.5) * 0.12 + (cy - ionY[i]) * 0.000012;
    ionVx[i] *= 0.985;
    ionVy[i] *= 0.985;
    ionX[i] += ionVx[i];
    ionY[i] += ionVy[i];
    if (ionX[i] < -20 || ionX[i] > w + 20 || ionY[i] < -20 || ionY[i] > h + 20) {
      ionX[i] = cx + (Math.random() - 0.5) * Math.min(w, h) * 0.15;
      ionY[i] = cy + (Math.random() - 0.5) * Math.min(w, h) * 0.12;
      ionVx[i] = (Math.random() - 0.5) * 0.9;
      ionVy[i] = (Math.random() - 0.5) * 0.9;
    }
  }
}

type HeroParticleDeskProps = {
  className?: string;
};

/**
 * 首屏背景：中心挥散 → 重组为升降桌轮廓；之后持续「离子扩散」式微动（环境微粒 + 轮廓布朗漂移）。
 */
export default function HeroParticleDesk({ className }: HeroParticleDeskProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<DeskState | null>(null);

  const initAndDraw = React.useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w < 8 || h < 8) return;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const deskFull = buildDeskTargets(w, h);
    const maxN = w < 520 ? 300 : w < 900 ? 400 : 520;
    const step = Math.max(1, Math.ceil(deskFull.length / maxN));
    const desk: Pt[] = [];
    for (let i = 0; i < deskFull.length; i += step) desk.push(deskFull[i]);
    const n = desk.length;

    const cx = w * 0.5;
    const cy = h * 0.44;
    const center: Pt = { x: cx, y: cy };
    const u = Math.min(w, h);

    const scatter: Pt[] = new Array(n);
    let seed = 42;
    for (let i = 0; i < n; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const ang = (seed / 0x7fffffff) * Math.PI * 2;
      const rr = u * (0.28 + (seed % 1000) / 1000 * 0.38);
      scatter[i] = {
        x: cx + Math.cos(ang) * rr,
        y: cy + Math.sin(ang) * rr,
      };
    }

    const order = shuffleIndices(n, 7);
    const delays = new Array(n);
    const maxD = 0.42;
    for (let k = 0; k < n; k++) {
      const ti = order[k];
      const tx = desk[ti].x / w;
      delays[ti] = (tx * 0.35 + (k / n) * 0.2) * maxD;
    }

    const driftVx = new Float32Array(n);
    const driftVy = new Float32Array(n);
    const driftOx = new Float32Array(n);
    const driftOy = new Float32Array(n);

    const ions = initIons(w, h);

    stateRef.current = {
      desk,
      scatter,
      center,
      delays,
      start: performance.now(),
      reduce:
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      raf: 0,
      driftVx,
      driftVy,
      driftOx,
      driftOy,
      ions,
      w,
      h,
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const T_BURST = 1100;
    const T_ASSEMBLE = 3400;

    const tick = (now: number) => {
      const st = stateRef.current;
      if (!st) return;
      const { desk: D, scatter: S, center: C, delays: del, start: t0, reduce } = st;

      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, w, h);

      const t = now - t0;

      if (!reduce) {
        stepIons(st.ions, w, h, C.x, C.y);
        const { ionN, ionX, ionY } = st.ions;
        for (let i = 0; i < ionN; i++) {
          const flicker = 0.04 + (Math.sin(now * 0.002 + i * 0.7) * 0.5 + 0.5) * 0.055;
          ctx.fillStyle = `rgba(186,210,235,${flicker})`;
          ctx.fillRect(ionX[i] - 0.4, ionY[i] - 0.4, 0.9, 0.9);
        }
      }

      const introDone = reduce || t >= T_BURST + T_ASSEMBLE;
      const idleT = introDone ? Math.max(0, t - T_BURST - T_ASSEMBLE) : 0;

      for (let i = 0; i < n; i++) {
        let x: number;
        let y: number;
        if (reduce) {
          x = D[i].x;
          y = D[i].y;
        } else if (t < T_BURST) {
          const p = EASE_OUT(t / T_BURST);
          x = C.x + (S[i].x - C.x) * p;
          y = C.y + (S[i].y - C.y) * p;
        } else if (t < T_BURST + T_ASSEMBLE) {
          const t2 = t - T_BURST;
          const raw = Math.min(1, t2 / T_ASSEMBLE);
          const di = del[i] ?? 0;
          const span = 1 - maxD;
          const uu = Math.max(0, Math.min(1, (raw - di) / span));
          const p = EASE_IN_OUT(uu);
          x = S[i].x + (D[i].x - S[i].x) * p;
          y = S[i].y + (D[i].y - S[i].y) * p;
        } else {
          st.driftVx[i] += (Math.random() - 0.5) * 0.22;
          st.driftVy[i] += (Math.random() - 0.5) * 0.22;
          st.driftVx[i] *= 0.9;
          st.driftVy[i] *= 0.9;
          st.driftOx[i] += st.driftVx[i];
          st.driftOy[i] += st.driftVy[i];
          st.driftOx[i] -= st.driftOx[i] * 0.035;
          st.driftOy[i] -= st.driftOy[i] * 0.035;
          const wave =
            Math.sin(idleT * 0.001 + i * 0.13) * 2.2 + Math.cos(idleT * 0.00075 + i * 0.09) * 1.6;
          const waveY =
            Math.cos(idleT * 0.0009 + i * 0.11) * 2 + Math.sin(idleT * 0.0011 + i * 0.07) * 1.4;
          x = D[i].x + st.driftOx[i] + wave * 0.35;
          y = D[i].y + st.driftOy[i] + waveY * 0.35;
        }

        let alpha: number;
        if (reduce) alpha = 0.55;
        else if (t < 180) alpha = (t / 180) * 0.72;
        else if (introDone) alpha = 0.58 + Math.sin(idleT * 0.0006 + i * 0.08) * 0.1;
        else alpha = 0.72;

        ctx.fillStyle = `rgba(232,236,242,${alpha})`;
        ctx.fillRect(x - 0.65, y - 0.65, 1.35, 1.35);
      }

      if (!reduce) {
        st.raf = requestAnimationFrame(tick);
      }
    };

    if (stateRef.current.reduce) {
      tick(performance.now());
    } else {
      stateRef.current.raf = requestAnimationFrame(tick);
    }
  }, []);

  React.useEffect(() => {
    initAndDraw();
    const ro = new ResizeObserver(() => {
      if (stateRef.current?.raf) cancelAnimationFrame(stateRef.current.raf);
      stateRef.current = null;
      initAndDraw();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      ro.disconnect();
      if (stateRef.current?.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, [initAndDraw]);

  return (
    <div ref={wrapRef} className={className ?? "absolute inset-0"} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
