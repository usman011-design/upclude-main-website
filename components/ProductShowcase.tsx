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
    description: "Evermore Memories lets you securely store, organize, and share photos, videos, notes, and keepsakes—preserve your life's precious moments forever.",
    image: './evermore.png',
    stats: [{ label: 'Downloads', value: '50K+' }, { label: 'Rating', value: '4.8/5' }],
    tech: ['React Native', 'TypeScript', 'GraphQL'],
  },
];


const ACCENT = '#00ff88';
const N = projects.length;

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
  const RX = Math.min(640, cardW * 1.5);
  const RZ = Math.min(260, cardW * 0.6);
  const x = Math.sin(theta) * RX;
  const z = RZ * (1 - Math.cos(theta));
  const rotate2d = slotAngle * 18;
  const dist = Math.abs(slotAngle);
  const y = dist * 60;
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
  const cardW = useCardW();
  const rotationRef = useRef(0);
  const springRef = useRef(createSpring(260, 26, 1));
  const rafRef = useRef(0);
  const [renderRotation, setRenderRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorRing, setCursorRing] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startRotRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);

  // ── Touch state ──────────────────────────────────────────────────────────
  const touchLockedRef = useRef<'none' | 'h' | 'v'>('none');
  const isTouchDraggingRef = useRef(false);

  // ── Ref for the 3D stage div (needed for passive:false listener) ─────────
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Animation loop
  useEffect(() => {
    let lastTs = 0;
    const loop = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      if (!isDraggingRef.current && !isTouchDraggingRef.current) {
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

  // Custom cursor tracking (desktop only)
  useEffect(() => {
    let ringRaf: number;
    const moveCursor = (e: MouseEvent) => {
      const lerp = () => {
        ringRef.current.x += (e.clientX - ringRef.current.x) * 0.18;
        ringRef.current.y += (e.clientY - ringRef.current.y) * 0.18;
        setCursorRing({ x: ringRef.current.x, y: ringRef.current.y });
        ringRaf = requestAnimationFrame(lerp);
      };
      cancelAnimationFrame(ringRaf);
      ringRaf = requestAnimationFrame(lerp);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => { window.removeEventListener('mousemove', moveCursor); cancelAnimationFrame(ringRaf); };
  }, []);

  // ── KEY FIX: Register touchmove with passive:false so preventDefault works ──
  // React JSX handlers are always passive:true — preventDefault() silently fails in them.
  // We must use addEventListener directly with { passive: false }.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startXRef.current = t.clientX;
      startYRef.current = t.clientY;
      lastXRef.current = t.clientX;
      lastTimeRef.current = Date.now();
      velocityRef.current = 0;
      startRotRef.current = rotationRef.current;
      isTouchDraggingRef.current = false;
      touchLockedRef.current = 'none';
      springRef.current.setImmediate(rotationRef.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - startXRef.current;
      const dy = t.clientY - startYRef.current;

      // Lock direction once we have 8px movement
      if (touchLockedRef.current === 'none') {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          touchLockedRef.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
        }
        return;
      }

      // Vertical — let browser scroll the page, do nothing
      if (touchLockedRef.current === 'v') return;

      // Horizontal — PREVENT page scroll and drive carousel
      // This only works because passive: false is set below
      e.preventDefault();

      isTouchDraggingRef.current = true;

      const now = Date.now();
      const dtMs = now - lastTimeRef.current;
      const ddx = t.clientX - lastXRef.current;
      if (dtMs > 0) velocityRef.current = ddx / dtMs;
      lastXRef.current = t.clientX;
      lastTimeRef.current = now;

      const PX_PER_SLOT = 240;
      rotationRef.current = startRotRef.current - (dx / PX_PER_SLOT);
      setRenderRotation(rotationRef.current);
      springRef.current.setImmediate(rotationRef.current);
    };

    const handleTouchEnd = () => {
      touchLockedRef.current = 'none';
      if (!isTouchDraggingRef.current) return;
      isTouchDraggingRef.current = false;
      const PX_PER_SLOT = 240;
      const momentumSlots = -(velocityRef.current * 0.2) / PX_PER_SLOT * 60;
      const target = Math.round(rotationRef.current + momentumSlots);
      springRef.current.setImmediate(rotationRef.current);
      springRef.current.setTarget(target);
    };

    // passive: true  → touchstart (no preventDefault needed, better perf)
    // passive: false → touchmove  (MUST call preventDefault for horizontal drag)
    // passive: true  → touchend   (no preventDefault needed)
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false }); // ← THE FIX
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []); // runs once after mount

  // ── Mouse / Pointer handlers (desktop) ──────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return; // touch handled by useEffect above
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
    const dtMs = now - lastTimeRef.current;
    const dx = e.clientX - lastXRef.current;
    if (dtMs > 0) velocityRef.current = dx / dtMs;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    const PX_PER_SLOT = 340;
    const delta = (e.clientX - startXRef.current) / PX_PER_SLOT;
    rotationRef.current = startRotRef.current - delta;
    setRenderRotation(rotationRef.current);
    springRef.current.setImmediate(rotationRef.current);
  }, []);

  const onPointerUp = useCallback((_e: React.PointerEvent) => {
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
  // Only 3 slots visible as requested
  const visibleSlots = [-1, 0, 1];

  return (
    <section
      ref={sectionRef}
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
      <div style={{ textAlign: 'center', marginBottom: 98, padding: '0 24px' }}>
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
      </div>

      {/* 3D Stage wrapper */}
      <div style={{ overflowX: 'clip', overflowY: 'visible', width: '100%' }}>
        {/* 3D Stage — ref attached here for passive:false touch listeners */}
        <div
          ref={stageRef}
          style={{
            position: 'relative',
            height: cardW + 320,
            perspective: '1100px',
            perspectiveOrigin: '50% 30%',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            cursor: 'pointer',
            // FIX: 'pan-y' — browser handles vertical page scroll, JS handles horizontal drag
            // This prevents the browser from taking over the horizontal gesture on mobile.
            touchAction: 'pan-y',
            overflow: 'visible',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCursorRing({ x: -100, y: -100 });
          }}
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
      </div>

      {/* Custom Cursor — desktop only */}
      <style>{`
        @keyframes cursorPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(0,0,0,0.55), 0 0 0 0 rgba(255,255,255,0.15); }
          50%       { box-shadow: 0 4px 24px rgba(0,0,0,0.55), 0 0 0 6px rgba(255,255,255,0); }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        left: cursorRing.x + 48,
        top: cursorRing.y - 48,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        display: isHovering ? 'flex' : 'none',
        alignItems: 'center',
        gap: 8,
        opacity: isHovering ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
        <div style={{
          width: isDragging ? 82 : 70,
          height: isDragging ? 82 : 70,
          borderRadius: '50%',
          background: '#111111',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'width 0.15s ease, height 0.15s ease',
          flexShrink: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <span style={{
            color: '#ffffff', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.04em', fontFamily: 'system-ui, sans-serif',
          }}>Drag</span>
        </div>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
      </div>
    </section>
  );
}
