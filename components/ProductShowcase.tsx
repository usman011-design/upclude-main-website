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
    description: 'Evermore Memories lets you securely store, organize, and share photos, videos, notes, and keepsakes—preserve your life’s precious moments forever.',
    image: './evermore.png',
    stats: [{ label: 'Downloads', value: '50K+' }, { label: 'Rating', value: '4.8/5' }],
    tech: ['React Native', 'TypeScript', 'GraphQL'],
  },
];

const ACCENT = '#00ff88';
const CARD_W = 500;
const N = projects.length;

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

function getCardStyle(slotAngle: number): React.CSSProperties {
  const theta = (slotAngle / N) * 2 * Math.PI;

  const RX = 640;
  const RZ = 260;
  const x = Math.sin(theta) * RX;
  const z = RZ * (1 - Math.cos(theta));

  const rotate2d = slotAngle * 18;

  // Side cards thori neeche — dist ke hisaab se Y neeche jaega
  const dist = Math.abs(slotAngle);
  const y = dist * 80; // 80px per slot neeche

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

function FullCard({ project, isCenter }: { project: Project; isCenter: boolean }) {
  return (
    <div style={{
      width: CARD_W,
      background: '#0c0c0c',
      borderRadius: 28,
      overflow: 'hidden',
      border: isCenter
        ? `1px solid ${ACCENT}55`
        : '1px solid rgba(255,255,255,0.09)',
      pointerEvents: 'none',
    }}>
      {/* Square image */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', borderRadius: 16 }}>
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
              position: 'absolute', top: 16, right: 16,
              width: 9, height: 9, borderRadius: '50%',
              background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
            }} />
          )}
        </div>
      </div>

      {/* Content */}
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
          margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.2, fontFamily: 'system-ui,sans-serif',
        }}>{project.title}</h2>
        <p style={{
          margin: '0 0 16px', fontSize: 13, lineHeight: 1.65,
          color: 'rgba(255, 255, 255, 0.81)', fontFamily: 'system-ui,sans-serif',
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

export default function ProductShowcase() {
  const rotationRef = useRef(0);
  const springRef = useRef(createSpring(260, 26, 1));
  const rafRef = useRef(0);
  const [renderRotation, setRenderRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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
    <section style={{
      background: 'white', overflow: 'hidden',
      padding: '80px 0 70px', userSelect: 'none', position: 'relative',
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
          height: CARD_W + 320,
          perspective: '1100px',
          perspectiveOrigin: '50% 30%',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {visibleSlots.map((slot) => {
          const cardIndex = mod(centerIndex + slot, N);
          const slotAngle = (centerIndex + slot) - renderRotation;
          const isCenter = Math.abs(slotAngle) < 0.5;
          const style = getCardStyle(slotAngle);

          return (
            <div
              key={`${slot}-${cardIndex}`}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                marginLeft: -CARD_W / 2,
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
              <FullCard project={projects[cardIndex]} isCenter={isCenter} />
            </div>
          );
        })}
      </div>
    </section>
  );
}