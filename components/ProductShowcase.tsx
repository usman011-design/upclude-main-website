'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

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
    stats: [{ label: 'Users', value: '10K+' }, { label: 'Uptime', value: '99%' }],
    tech: ['React', 'Next', 'Typescript', 'Node', 'javascript'],
  },
  {
    title: 'Vow Earn',
    description: 'Multi-asset cryptocurrency wallet enabling secure token transfers, swaps, and chat-based transactions. Features biometric auth and real-time notifications.',
    image: './vow-earn.png',
    stats: [{ label: 'Businesses', value: '10K+' }, { label: 'Countries', value: '190+' }],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Javascript'],
  },
  {
    title: 'Quranic Calm',
    description: 'Faith-based anxiety relief app combining Quranic healing, guided meditation, breathing exercises, journaling, and professional therapy support.',
    image: './quranic-calm.png',
    stats: [{ label: 'Transactions', value: '1M+' }, { label: 'Rating', value: '4.9/5' }],
    tech: ['Kotlin', 'Android', 'Firebase', 'Retrofit'],
  },
  {
    title: 'SIPPlytics',
    description: 'Sipplytics is a SaaS platform that visualizes local water quality data with interactive dashboards and maps for easy monitoring and insights.',
    image: './sipplytics.png',
    stats: [{ label: 'Data Points', value: '500M+' }, { label: 'Accuracy', value: '98%' }],
    tech: ['Python', 'TensorFlow', 'React', 'D3.js'],
  },
  {
    title: 'Diggikhata',
    description: 'DigiKhata simplifies business finances—track income, expenses, invoices, cash flow, inventory, and staff efficiently anytime, anywhere.',
    image: './digikhata.png',
    stats: [{ label: 'Downloads', value: '50K+' }, { label: 'Rating', value: '4.8/5' }],
    tech: ['React Native', 'TypeScript', 'GraphQL'],
  },
  {
    title: 'Evermore Memories',
    description: 'Evermore Memories lets you securely store, organize, and share photos, videos, notes, and keepsakes—preserve your life\'s precious moments forever.',
    image: './evermore.png',
    stats: [{ label: 'Downloads', value: '50K+' }, { label: 'Rating', value: '4.8/5' }],
    tech: ['React Native', 'TypeScript', 'GraphQL'],
  },
];

const ACCENT = '#00ff88';
const N = projects.length;

// Responsive card width hook
function useCardWidth() {
  const [cardW, setCardW] = useState(500);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 480) setCardW(w - 48);        // mobile: almost full width
      else if (w < 768) setCardW(340);       // tablet small
      else if (w < 1024) setCardW(400);      // tablet large
      else setCardW(500);                    // desktop
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cardW;
}

// Spring physics
function createSpring(stiffness = 280, damping = 28, mass = 1) {
  let value = 0;
  let velocity = 0;
  let target = 0;

  return {
    get: () => value,
    setTarget: (t: number) => { target = t; },
    setImmediate: (v: number) => { value = v; velocity = 0; target = v; },
    tick: (dt: number) => {
      const force = stiffness * (target - value);
      const dampingForce = damping * velocity;
      const acceleration = (force - dampingForce) / mass;
      velocity += acceleration * dt;
      value += velocity * dt;
      return Math.abs(target - value) > 0.0001 || Math.abs(velocity) > 0.0001;
    },
  };
}

function mod(n: number, m: number) { return ((n % m) + m) % m; }

function getCardStyle(slotAngle: number, cardW: number): React.CSSProperties {
  const theta = (slotAngle / N) * 2 * Math.PI;

  // Scale radii with card width
  const RX = cardW * 1.28;
  const RZ = cardW * 0.52;
  const x = Math.sin(theta) * RX;
  const z = RZ * (1 - Math.cos(theta));

  const rotate2d = slotAngle * 18;

  const dist = Math.abs(slotAngle);
  const y = dist * 80;

  const scale = Math.max(0.65, 1 - dist * 0.13);
  const opacity = Math.max(0.25, 1 - dist * 0.22);
  const zIndex = Math.round(100 - dist * 25);

  return {
    transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotate(${rotate2d}deg) scale(${scale})`,
    opacity,
    zIndex,
    filter: 'none',
  };
}

function FullCard({ project, isCenter, cardW }: { project: Project; isCenter: boolean; cardW: number }) {
  const isSmall = cardW < 400;

  return (
    <div style={{
      width: cardW,
      background: '#0c0c0c',
      borderRadius: isSmall ? 20 : 28,
      overflow: 'hidden',
      border: isCenter
        ? `1px solid ${ACCENT}55`
        : '1px solid rgba(255,255,255,0.09)',
      pointerEvents: 'none',
    }}>
      {/* Square image */}
      <div style={{ padding: isSmall ? '12px 12px 0' : '16px 16px 0' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', borderRadius: isSmall ? 12 : 16 }}>
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            referrerPolicy="no-referrer"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, #0c0c0c)',
          }} />
          {isCenter && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              width: 9, height: 9, borderRadius: '50%',
              background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
            }} />
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: isSmall ? '14px 16px 18px' : '18px 24px 24px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: isSmall ? 10 : 14, flexWrap: 'wrap' }}>
          {project.stats.map((s, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: isSmall ? '4px 10px' : '5px 13px', borderRadius: 100,
              background: `${ACCENT}18`, border: `1px solid ${ACCENT}50`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span style={{ color: ACCENT, fontSize: isSmall ? 11 : 12, fontWeight: 800, fontFamily: 'system-ui,sans-serif' }}>{s.value}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: isSmall ? 11 : 12, fontWeight: 600, fontFamily: 'system-ui,sans-serif' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <h2 style={{
          margin: `0 0 ${isSmall ? 6 : 8}px`, fontSize: isSmall ? 18 : 24, fontWeight: 800, color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.2, fontFamily: 'system-ui,sans-serif',
        }}>{project.title}</h2>
        <p style={{
          margin: `0 0 ${isSmall ? 12 : 16}px`, fontSize: isSmall ? 12 : 13, lineHeight: 1.65,
          color: 'rgba(255, 255, 255, 0.81)', fontFamily: 'system-ui,sans-serif',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isSmall ? 5 : 7 }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontSize: isSmall ? 10 : 11, fontWeight: 700,
              padding: isSmall ? '4px 9px' : '5px 12px', borderRadius: 100,
              background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'system-ui,sans-serif',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom drag cursor — circle with gradient + "Drag" text
function DragCursor({ mousePos, isDragging, isHovering }: {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  isHovering: boolean;
}) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef(mousePos);
  const rafRef = useRef(0);

  useEffect(() => {
    targetRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const loop = () => {
      // Very high lerp = almost instant follow
      const lerpFactor = 0.55;
      posRef.current = {
        x: posRef.current.x + (targetRef.current.x - posRef.current.x) * lerpFactor,
        y: posRef.current.y + (targetRef.current.y - posRef.current.y) * lerpFactor,
      };
      setPos({ ...posRef.current });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const visible = isHovering || isDragging;
  const SIZE = isDragging ? 100 : 88;

  return (
    <>
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes arrowPulse {
          0%,100% { opacity: 1; transform: scaleX(1); }
          50%      { opacity: 0.6; transform: scaleX(0.82); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: SIZE,
          height: SIZE,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          scale: visible ? '1' : '0.4',
          transition: 'opacity 0.18s ease, scale 0.18s ease, width 0.18s ease, height 0.18s ease',
          background: 'linear-gradient(135deg, #4F1079, #1C0860, #000000)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          boxShadow: '0 0 28px rgba(79,16,121,0.55), 0 2px 16px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Spinning highlight ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.18) 100%)',
          animation: 'spinRing 1.6s linear infinite',
        }} />

        {/* Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, animation: 'arrowPulse 1.1s ease-in-out infinite' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Label */}
        <span style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
        }}>
          {isDragging ? 'Drag' : 'Drag'}
        </span>
      </div>
    </>
  );
}

export default function ProductShowcase() {
  const cardW = useCardWidth();
  const rotationRef = useRef(0);
  const springRef = useRef(createSpring(260, 26, 1));
  const rafRef = useRef(0);
  const [renderRotation, setRenderRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    let lastTs = 0;
    const loop = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      if (!isDraggingRef.current) {
        const active = springRef.current.tick(dt);
        if (active) {
          rotationRef.current = springRef.current.get();
          setRenderRotation(rotationRef.current);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    startRotRef.current = rotationRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isDraggingRef.current) return;
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    const dx = e.clientX - lastXRef.current;
    if (dt > 0) velocityRef.current = dx / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    const PX_PER_SLOT = 340;
    const delta = (e.clientX - startXRef.current) / PX_PER_SLOT;
    rotationRef.current = startRotRef.current - delta;
    setRenderRotation(rotationRef.current);
    springRef.current.setImmediate(rotationRef.current);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const PX_PER_SLOT = 340;
    const momentumSlots = -(velocityRef.current * 0.18) / PX_PER_SLOT * 60;
    const target = Math.round(rotationRef.current + momentumSlots);
    springRef.current.setImmediate(rotationRef.current);
    springRef.current.setTarget(target);
  }, []);

  const centerIndex = Math.round(renderRotation);
  const visibleSlots = [-1, 0, 1];

  return (
    <>
      <DragCursor mousePos={mousePos} isDragging={isDragging} isHovering={isHovering} />

      <section id="portfolio" style={{
        background: 'white', overflow: 'hidden',
        padding: '80px 0 70px', userSelect: 'none', position: 'relative',
        cursor: 'none', // hide default cursor over whole section
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500,
          background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`,
          pointerEvents: 'none', filter: 'blur(80px)',
        }} />

        <div style={{ textAlign: 'center', marginBottom: 98, padding: '0 24px' }}>
          <h2
            style={{
              fontSize: 'clamp(44px, 6vw, 96px)',
              fontWeight: 650,
              color: 'black',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            A growing collection of<br />successful products.
          </h2>
        </div>

        {/* 3D Stage */}
        <div
          style={{
            position: 'relative',
            height: cardW + 320,
            perspective: '1100px',
            perspectiveOrigin: '50% 30%',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            touchAction: 'none',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={() => setIsHovering(true)}
          onPointerLeave={() => { setIsHovering(false); setIsDragging(false); isDraggingRef.current = false; }}
        >
          {visibleSlots.map((slot) => {
            const cardIndex = mod(centerIndex + slot, N);
            const slotAngle = (centerIndex + slot) - renderRotation;
            const isCenter = Math.abs(slotAngle) < 0.5;
            const style = getCardStyle(slotAngle, cardW);

            return (
              <div
                key={`${slot}-${cardIndex}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  marginLeft: -cardW / 2,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'none',
                  ...style,
                }}
              >
                {isCenter && (
                  <div style={{
                    position: 'absolute', inset: -4, borderRadius: 32,
                    background: `linear-gradient(135deg, ${ACCENT}22, transparent 60%)`,
                    zIndex: -1, filter: 'blur(10px)',
                    pointerEvents: 'none',
                  }} />
                )}
                <FullCard project={projects[cardIndex]} isCenter={isCenter} cardW={cardW} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}