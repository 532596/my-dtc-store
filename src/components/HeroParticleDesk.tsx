"use client";

import * as React from "react";

type Vec3 = { x: number; y: number; z: number };
type Vec2 = { x: number; y: number };

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 2.7);
const EASE_IN_OUT = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rotate3D(p: Vec3, rx: number, ry: number): Vec3 {
  const cY = Math.cos(ry);
  const sY = Math.sin(ry);
  const x1 = p.x * cY + p.z * sY;
  const z1 = -p.x * sY + p.z * cY;

  const cX = Math.cos(rx);
  const sX = Math.sin(rx);
  const y2 = p.y * cX - z1 * sX;
  const z2 = p.y * sX + z1 * cX;
  return { x: x1, y: y2, z: z2 };
}

function project(p: Vec3, w: number, h: number): Vec2 {
  const fov = Math.min(w, h) * 1.03;
  const z = p.z + 560;
  const k = fov / Math.max(140, z);
  return { x: w * 0.5 + p.x * k, y: h * 0.49 + p.y * k };
}

function addCuboidShell(
  out: Vec3[],
  cx: number,
  cy: number,
  cz: number,
  sx: number,
  sy: number,
  sz: number,
  density: number
) {
  const nx = Math.max(3, Math.floor(sx * density));
  const ny = Math.max(3, Math.floor(sy * density));
  const nz = Math.max(3, Math.floor(sz * density));
  const push = (x: number, y: number, z: number) => out.push({ x: cx + x, y: cy + y, z: cz + z });

  for (let ix = 0; ix < nx; ix++) {
    const x = -sx * 0.5 + (ix / (nx - 1)) * sx;
    for (let iz = 0; iz < nz; iz++) {
      const z = -sz * 0.5 + (iz / (nz - 1)) * sz;
      push(x, -sy * 0.5, z);
      push(x, sy * 0.5, z);
    }
  }
  for (let iy = 0; iy < ny; iy++) {
    const y = -sy * 0.5 + (iy / (ny - 1)) * sy;
    for (let iz = 0; iz < nz; iz++) {
      const z = -sz * 0.5 + (iz / (nz - 1)) * sz;
      push(-sx * 0.5, y, z);
      push(sx * 0.5, y, z);
    }
  }
  for (let ix = 0; ix < nx; ix++) {
    const x = -sx * 0.5 + (ix / (nx - 1)) * sx;
    for (let iy = 0; iy < ny; iy++) {
      const y = -sy * 0.5 + (iy / (ny - 1)) * sy;
      push(x, y, -sz * 0.5);
      push(x, y, sz * 0.5);
    }
  }
}

/**
 * 预置「升降桌」3D 点云占位模型。
 * 后续你上传真实模型文件时，可直接替换为模型采样点云。
 */
function buildDeskModelPoints(w: number, h: number): Vec3[] {
  const u = Math.min(w, h);
  const scale = u * 0.42;
  const points: Vec3[] = [];
  const d = 0.065;

  // 桌板
  addCuboidShell(points, 0, -0.24 * scale, 0, 1.65 * scale, 0.12 * scale, 0.58 * scale, d);
  // 左右立柱
  addCuboidShell(points, -0.53 * scale, 0.14 * scale, 0, 0.12 * scale, 0.78 * scale, 0.12 * scale, d);
  addCuboidShell(points, 0.53 * scale, 0.14 * scale, 0, 0.12 * scale, 0.78 * scale, 0.12 * scale, d);
  // 左右底脚
  addCuboidShell(points, -0.53 * scale, 0.56 * scale, 0, 0.62 * scale, 0.055 * scale, 0.18 * scale, d);
  addCuboidShell(points, 0.53 * scale, 0.56 * scale, 0, 0.62 * scale, 0.055 * scale, 0.18 * scale, d);
  // 横梁
  addCuboidShell(points, 0, 0.24 * scale, 0, 0.86 * scale, 0.06 * scale, 0.1 * scale, d);

  const maxN = w < 520 ? 900 : w < 900 ? 1200 : 1600;
  if (points.length <= maxN) return points;
  const step = Math.ceil(points.length / maxN);
  return points.filter((_, i) => i % step === 0);
}

type ParticleState = {
  target: Vec3[];
  scatter: Vec3[];
  delays: Float32Array;
  driftX: Float32Array;
  driftY: Float32Array;
  driftZ: Float32Array;
  startAt: number;
  reduceMotion: boolean;
  raf: number;
  w: number;
  h: number;
  targetRotX: number;
  targetRotY: number;
  rotX: number;
  rotY: number;
  pointerOn: boolean;
};

type HeroParticleDeskProps = {
  className?: string;
};

/**
 * 首屏粒子：扩散 -> 汇聚成升降桌 -> 鼠标 3D 旋转 + 轻微能量漂移。
 */
export default function HeroParticleDesk({ className }: HeroParticleDeskProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<ParticleState | null>(null);

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

    const target = buildDeskModelPoints(w, h);
    const n = target.length;
    const scatter: Vec3[] = new Array(n);
    const delays = new Float32Array(n);
    const driftX = new Float32Array(n);
    const driftY = new Float32Array(n);
    const driftZ = new Float32Array(n);
    const spread = Math.min(w, h) * 0.52;
    let seed = 73;
    for (let i = 0; i < n; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const theta = (seed / 0x7fffffff) * Math.PI * 2;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const phi = ((seed / 0x7fffffff) - 0.5) * Math.PI;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const rr = spread * (0.25 + (seed / 0x7fffffff) * 0.85);
      scatter[i] = {
        x: Math.cos(theta) * Math.cos(phi) * rr,
        y: Math.sin(phi) * rr * 0.78,
        z: Math.sin(theta) * Math.cos(phi) * rr,
      };
      delays[i] = (Math.abs(target[i].x) / spread) * 0.22 + (i / n) * 0.28;
    }

    stateRef.current = {
      target,
      scatter,
      delays,
      driftX,
      driftY,
      driftZ,
      startAt: performance.now(),
      reduceMotion:
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      raf: 0,
      w,
      h,
      targetRotX: -0.12,
      targetRotY: 0.22,
      rotX: -0.12,
      rotY: 0.22,
      pointerOn: false,
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const T_BURST = 1300;
    const T_ASSEMBLE = 3000;
    const MAX_DELAY = 0.5;

    const tick = (now: number) => {
      const st = stateRef.current;
      if (!st) return;
      const { target: model, scatter, startAt, reduceMotion } = st;
      const t = now - startAt;
      const introDone = reduceMotion || t >= T_BURST + T_ASSEMBLE;
      const idleT = introDone ? Math.max(0, t - T_BURST - T_ASSEMBLE) : 0;

      // 鼠标旋转缓动（无鼠标时缓慢自动旋转）
      if (!st.pointerOn) {
        st.targetRotY += 0.00055;
      }
      st.rotX = mix(st.rotX, st.targetRotX, 0.065);
      st.rotY = mix(st.rotY, st.targetRotY, 0.065);

      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, w, h);

      // 背景离子薄层
      const ionCount = Math.min(220, Math.max(90, Math.floor((w * h) / 7800)));
      for (let i = 0; i < ionCount; i++) {
        const ang = i * 0.618 + now * 0.00028;
        const rr = Math.sin(i * 7.11 + now * 0.00023) * 0.5 + 0.5;
        const ix = w * 0.5 + Math.cos(ang) * (w * 0.52 * rr);
        const iy = h * 0.5 + Math.sin(ang * 1.37) * (h * 0.42 * rr);
        const alpha = 0.018 + (Math.sin(i * 0.72 + now * 0.0022) * 0.5 + 0.5) * 0.03;
        ctx.fillStyle = `rgba(154,188,224,${alpha})`;
        ctx.fillRect(ix, iy, 1, 1);
      }

      for (let i = 0; i < n; i++) {
        let p: Vec3;
        if (reduceMotion) {
          p = model[i];
        } else if (t <= T_BURST) {
          const burstP = EASE_OUT(t / T_BURST);
          p = {
            x: scatter[i].x * burstP,
            y: scatter[i].y * burstP,
            z: scatter[i].z * burstP,
          };
        } else if (t < T_BURST + T_ASSEMBLE) {
          const t2 = t - T_BURST;
          const raw = Math.min(1, t2 / T_ASSEMBLE);
          const shifted = Math.max(0, Math.min(1, (raw - st.delays[i]) / (1 - MAX_DELAY)));
          const k = EASE_IN_OUT(shifted);
          p = {
            x: mix(scatter[i].x, model[i].x, k),
            y: mix(scatter[i].y, model[i].y, k),
            z: mix(scatter[i].z, model[i].z, k),
          };
        } else {
          st.driftX[i] = st.driftX[i] * 0.92 + (Math.random() - 0.5) * 0.45;
          st.driftY[i] = st.driftY[i] * 0.92 + (Math.random() - 0.5) * 0.45;
          st.driftZ[i] = st.driftZ[i] * 0.92 + (Math.random() - 0.5) * 0.45;
          const breathe = Math.sin(idleT * 0.001 + i * 0.031) * 1.1;
          p = {
            x: model[i].x + st.driftX[i] * 0.6,
            y: model[i].y + st.driftY[i] * 0.6 + breathe,
            z: model[i].z + st.driftZ[i] * 0.8,
          };
        }

        const rp = rotate3D(p, st.rotX, st.rotY);
        const sp = project(rp, w, h);
        const depth = Math.max(0, Math.min(1, (rp.z + 240) / 520));
        const size = 0.75 + depth * 1.65;
        const glow = introDone ? 0.54 + Math.sin(idleT * 0.001 + i * 0.04) * 0.08 : 0.66;
        const alpha = reduceMotion ? 0.56 : glow;
        const r = 212 + Math.floor(depth * 24);
        const g = 226 + Math.floor(depth * 18);
        const b = 248 + Math.floor(depth * 8);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(sp.x - size * 0.5, sp.y - size * 0.5, size, size);
      }

      st.raf = requestAnimationFrame(tick);
    };

    stateRef.current.raf = requestAnimationFrame(tick);
  }, []);

  React.useEffect(() => {
    initAndDraw();
    const ro = new ResizeObserver(() => {
      if (stateRef.current?.raf) cancelAnimationFrame(stateRef.current.raf);
      stateRef.current = null;
      initAndDraw();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    const onMove = (ev: PointerEvent) => {
      const wrapEl = wrapRef.current;
      const st = stateRef.current;
      if (!wrapEl || !st) return;
      const rect = wrapEl.getBoundingClientRect();
      const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((ev.clientY - rect.top) / rect.height) * 2 - 1;
      st.pointerOn = true;
      st.targetRotY = 0.22 + nx * 0.42;
      st.targetRotX = -0.12 + ny * 0.24;
    };

    const onLeave = () => {
      const st = stateRef.current;
      if (!st) return;
      st.pointerOn = false;
      st.targetRotX = -0.12;
    };

    const wrapEl = wrapRef.current;
    wrapEl?.addEventListener("pointermove", onMove, { passive: true });
    wrapEl?.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      ro.disconnect();
      wrapEl?.removeEventListener("pointermove", onMove);
      wrapEl?.removeEventListener("pointerleave", onLeave);
      if (stateRef.current?.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, [initAndDraw]);

  return (
    <div ref={wrapRef} className={className ?? "absolute inset-0"} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
