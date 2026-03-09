'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  PanInfo,
} from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  tech: string[];
}

const projects: Project[] = [
  {
    title: 'Grant Match AI',
    description: 'Grantmatch.ai is a SaaS platform that automates grant discovery by scanning live databases and delivering personalized funding matches.',
    image: './grantmatch.png',
    stats: [{ label: 'Downloads', value: '10K+' }, { label: 'Countries', value: '190+' }],
    tech: ['Swift', 'Swift UI', 'Blockchain', 'CoreData', 'Xcode'],
  },
  {
    title: 'Wow Earn',
    description: 'Multi-asset cryptocurrency wallet enabling secure token transfers, swaps, and chat-based transactions. Features biometric auth and real-time notifications.',
    image: './vow-earn.png',
    stats: [{ label: 'Users', value: '250k+' }, { label: 'Uptime', value: '99%' }],
    tech: ['Figma', 'iOS', 'Android', 'Swift', 'Kotli'],
  },
  {
    title: 'Quranic Calm',
    description: 'Faith-based anxiety relief app combining Quranic healing, guided meditation, breathing exercises, journaling, and professional therapy support.',
    image: './quranic-calm.png',
    stats: [{ label: '', value: 'Health' }, { label: 'Design', value: 'UI/UX' }],
    tech: ['Kotlin', 'Android', 'Firebase', 'Retrofit'],
  },
  {
    title: 'SIPPlytics',
    description: 'Sipplytics is a SaaS platform that visualizes local water quality data with interactive dashboards and maps for easy monitoring and insights.',
    image: './sipplytics.png',
    stats: [{ label: 'Users', value: '50k+' }, { label: 'Map', value: 'World' }],
    tech: ['Web', 'React.js', 'iOS', 'Android', 'Kotlin', 'Swift'],
  },
  {
    title: 'Diggikhata',
    description: 'DigiKhata simplifies business finances—track income, expenses, invoices, cash flow, inventory, and staff efficiently anytime, anywhere.',
    image: './digikhata.png',
    stats: [{ label: 'Users', value: '5M+' }, { label: 'Uptime', value: '99%' }],
    tech: ['Web', 'React.js', 'iOS', 'Android', 'Kotlin', 'Swift'],
  },
  {
    title: 'Evermore Memories',
    description: "Evermore Memories lets you securely store, organize, and share photos, videos, notes, and keepsakes—preserve your life's precious moments forever.",
    image: './evermore.png',
    stats: [{ label: '', value: 'Mobile' }, { label: 'Countries', value: '170+' }],
    tech: ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
  },
];

const ACCENT = '#00ff88';
const N = projects.length;
const PX_PER_SLOT = 160;

function mod(n: number, m: number) { return ((n % m) + m) % m; }

function useCardW() {
  const [cardW, setCardW] = useState(420);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) setCardW(w - 32);
      else if (w < 640) setCardW(320);
      else if (w < 1024) setCardW(360);
      else setCardW(420);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cardW;
}

function getCardTransform(slotAngle: number, cardW: number) {
  const theta = (slotAngle / N) * 2 * Math.PI;
  const RX = Math.min(640, cardW * 1.5);
  const RZ = Math.min(260, cardW * 0.6);
  const x = Math.sin(theta) * RX;
  const z = RZ * (1 - Math.cos(theta));
  const rotate = slotAngle * 18;
  const dist = Math.abs(slotAngle);
  const y = dist * 60;
  const scale = Math.max(0.65, 1 - dist * 0.13);
  const opacity = dist > 1.5 ? 0 : Math.max(0.25, 1 - dist * 0.22);
  const zIndex = Math.round(100 - dist * 25);
  return { x, y, z, rotate, scale, opacity, zIndex };
}

// ─── FullCard ──────────────────────────────────────────────────────────────────
function FullCard({ project, isCenter, cardW }: {
  project: Project;
  isCenter: boolean;
  cardW: number;
}) {
  return (
    <div style={{
      width: cardW,
      background: '#0c0c0c',
      borderRadius: 28,
      overflow: 'hidden',
      border: isCenter ? `1px solid ${ACCENT}55` : '1px solid rgba(255,255,255,0.09)',
      pointerEvents: 'none',
    }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', borderRadius: 16 }}>
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, #0c0c0c)',
          }} />
          {isCenter && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              width: 9, height: 9, borderRadius: '50%',
              background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
            }} />
          )}
        </div>
      </div>

      <div style={{ padding: '18px 24px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {project.stats.map((s, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 13px', borderRadius: 100,
              background: `${ACCENT}18`, border: `1px solid ${ACCENT}50`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span style={{ color: ACCENT, fontSize: 12, fontWeight: 800, fontFamily: 'system-ui,sans-serif' }}>{s.value}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, fontFamily: 'system-ui,sans-serif' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <h2 style={{
          margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#fff',
          letterSpacing: '-0.03em', lineHeight: 1.2, fontFamily: 'system-ui,sans-serif',
        }}>{project.title}</h2>
        <p style={{
          margin: '0 0 16px', fontSize: 13, lineHeight: 1.65,
          color: 'rgba(255,255,255,0.81)', fontFamily: 'system-ui,sans-serif',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100,
              background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'system-ui,sans-serif',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CarouselCard — each slot is independently motion-driven ──────────────────
function CarouselCard({
  slot,
  rotation,
  cardW,
}: {
  slot: number;
  rotation: ReturnType<typeof useSpring>;
  cardW: number;
}) {
  // slotAngle changes every frame as rotation changes — drives all transforms
  const slotAngle = useTransform(rotation, (r) => (Math.round(r) + slot) - r);
  const cardIndex = useTransform(rotation, (r) => mod(Math.round(r) + slot, N));

  const x       = useTransform(slotAngle, (a) => getCardTransform(a, cardW).x);
  const y       = useTransform(slotAngle, (a) => getCardTransform(a, cardW).y);
  const scale   = useTransform(slotAngle, (a) => getCardTransform(a, cardW).scale);
  const opacity = useTransform(slotAngle, (a) => getCardTransform(a, cardW).opacity);
  const rotate  = useTransform(slotAngle, (a) => getCardTransform(a, cardW).rotate);
  const zIndex  = useTransform(slotAngle, (a) => getCardTransform(a, cardW).zIndex);

  // React state updated from motion value changes
  const [projectIndex, setProjectIndex] = useState(mod(slot, N));
  const [isCenter, setIsCenter]         = useState(slot === 0);

  useEffect(() => {
    const u1 = cardIndex.on('change',  (v) => setProjectIndex(mod(Math.round(v), N)));
    const u2 = slotAngle.on('change',  (a) => setIsCenter(Math.abs(a) < 0.5));
    return () => { u1(); u2(); };
  }, [cardIndex, slotAngle]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        marginLeft: -cardW / 2,
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {isCenter && (
        <div style={{
          position: 'absolute', inset: -4, borderRadius: 32,
          background: `linear-gradient(135deg, ${ACCENT}22, transparent 60%)`,
          zIndex: -1, filter: 'blur(10px)', pointerEvents: 'none',
        }} />
      )}
      <FullCard project={projects[projectIndex]} isCenter={isCenter} cardW={cardW} />
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProductShowcase() {
  const cardW = useCardW();

  // rotationMV = raw drag value (no smoothing)
  const rotationMV = useMotionValue(0);

  // rotation = spring-smoothed version shown to cards
  const rotation = useSpring(rotationMV, {
    stiffness: 380,
    damping: 36,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const isDraggingRef = useRef(false);
  const startRotRef   = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorRing, setCursorRing] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  // Cursor ring lerp — desktop
  useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => {
      const lerp = () => {
        ringRef.current.x += (e.clientX - ringRef.current.x) * 0.18;
        ringRef.current.y += (e.clientY - ringRef.current.y) * 0.18;
        setCursorRing({ ...ringRef.current });
        raf = requestAnimationFrame(lerp);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(lerp);
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // ── Framer pan handlers ────────────────────────────────────────────────────
  const onPanStart = useCallback(() => {
    isDraggingRef.current = true;
    setIsDragging(true);
    // Freeze the spring — capture current displayed rotation as drag start
    const current = rotation.get();
    rotationMV.set(current);
    startRotRef.current = current;
  }, [rotation, rotationMV]);

  const onPan = useCallback((_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // offset.x is cumulative px from drag start — very smooth
    const delta = -info.offset.x / PX_PER_SLOT;
    rotationMV.set(startRotRef.current + delta);
  }, [rotationMV]);

  const onPanEnd = useCallback((_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    // info.velocity.x = px/ms — convert to slots and add momentum
    const momentumSlots = (-info.velocity.x / PX_PER_SLOT) * 0.1;
    const snapped = Math.round(rotationMV.get() + momentumSlots);

    // Animate raw MV to snapped value — spring will smooth the arrival
    animate(rotationMV, snapped, {
      type: 'spring',
      stiffness: 380,
      damping: 36,
      mass: 0.8,
    });
  }, [rotationMV]);

  // Block page scroll during horizontal drag on touch
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => {
      if (isDraggingRef.current) e.preventDefault();
    };
    el.addEventListener('touchmove', block, { passive: false });
    return () => el.removeEventListener('touchmove', block);
  }, []);

  const visibleSlots = [-2, -1, 0, 1, 2];

  return (
    <section
      id="portfolio"
      style={{
        background: 'white',
        overflowX: 'clip',
        overflowY: 'visible',
        padding: '80px 0 70px',
        userSelect: 'none',
        position: 'relative',
        scrollMarginTop: '100px',
        isolation: 'isolate',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500, pointerEvents: 'none',
        background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }} />

      {/* Heading — fade in on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 98, padding: '0 24px' }}
      >
        <h2 style={{
          fontSize: 'clamp(44px, 6vw, 96px)',
          fontWeight: 650,
          color: 'black',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
        }}>
          A growing collection of<br />successful products.
        </h2>
      </motion.div>

      {/* 3D Stage */}
      <div style={{ overflowX: 'clip', overflowY: 'visible', width: '100%' }}>
        <motion.div
          ref={stageRef}
          style={{
            position: 'relative',
            height: cardW + 320,
            perspective: 1100,
            perspectiveOrigin: '50% 30%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
            overflow: 'visible',
          }}
          onPanStart={onPanStart}
          onPan={onPan}
          onPanEnd={onPanEnd}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setCursorRing({ x: -100, y: -100 }); }}
        >
          {visibleSlots.map((slot) => (
            <CarouselCard
              key={slot}
              slot={slot}
              rotation={rotation}
              cardW={cardW}
            />
          ))}
        </motion.div>
      </div>

      {/* Custom drag cursor — desktop only */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorRing.x + 48,
          top: cursorRing.y - 48,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        transition={{ duration: 0.18 }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
        <motion.div
          animate={{ width: isDragging ? 82 : 70, height: isDragging ? 82 : 70 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          style={{
            borderRadius: '50%',
            background: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{
            color: '#fff', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.04em', fontFamily: 'system-ui, sans-serif',
          }}>
            {isDragging ? '✦' : 'Drag'}
          </span>
        </motion.div>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
      </motion.div>
    </section>
  );
}