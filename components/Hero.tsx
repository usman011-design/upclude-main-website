'use client';

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from 'react';

/* ── AnimatedCard ── */
const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRotate({
      x: (rect.height / 2 - (e.clientY - rect.top)) / 14,
      y: ((e.clientX - rect.left) - rect.width / 2) / 14,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsPressed(false);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{ perspective: 900 }}
    >
      <div
        ref={cardRef}
        style={{
          borderRadius: 16,
          cursor: 'pointer',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isPressed ? 0.96 : 1})`,
          transition: 'transform 0.15s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface Service { title: string; img: string; }

const services: Service[] = [
  { title: 'DevOps', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20162684-fWpETLNlBhoK1s2M0goT3xwPygygOd.png' },
  { title: 'Backend Development', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20509%20%281%29-JGtBxEZHvsn0fXKU54YqWMVO8veAFQ.png' },
  { title: 'AI Development', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20509-MlKa8hTVQL8Knw5xqNXU6FIP8msH5k.png' },
  { title: 'UI/UX Design', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20508%20%282%29-MBJZ9Idd8NDikExOrjcby1R0YOxS5e.png' },
  { title: 'Mobile Apps', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20508%20%281%29-P8bUtxfWV5ILKz3bcFwDn9J7AHby5Z.png' },
  { title: 'Web Development', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20508-Pkv2dH3V6hSroPO19uGK1mWJREsEi5.png' },
];

const CARD_SIZE = 220;
const VISUAL_SCALE = 1.35;
const SPEED = 3;

const CardFace = ({ service }: { service: Service }) => (
  <div style={{ position: 'relative', width: CARD_SIZE, height: CARD_SIZE }}>
    <img
      src={service.img}
      alt={service.title}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 16 }}
    />
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(0,0,0,0.9)', padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
    }}>
      <p style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 16, fontWeight: 700, color: '#fff',
        margin: 0, textAlign: 'center', letterSpacing: '0.01em',
      }}>
        {service.title}
      </p>
    </div>
  </div>
);

/* ── ServiceCards ── */
function ServiceCards() {
  const [vw, setVw] = useState(1440);
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const lastRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const measure = () => setVw(window.innerWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const tick = (ts: number) => {
      if (lastRef.current !== null) {
        const dt = (ts - lastRef.current) / 1000;
        phaseRef.current = (phaseRef.current + SPEED * dt) % 180;
        setPhase(phaseRef.current);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Responsive gap: 100px on small screens, scales up to 200px at 1440px+
  const responsiveGap = Math.min(Math.max(Math.round((vw / 1440) * 200), 100), 200);
  const SPACING = CARD_SIZE + responsiveGap;

  const RX = vw / 2.5 + CARD_SIZE * 0.5;
  const RY = CARD_SIZE * 1.6;
  const ARC_PX = Math.PI * RX;
  const N = Math.ceil(ARC_PX / SPACING) - 1;
  const STEP = 180 / N;
  const BOTTOM_PAD = 60;
  const carouselH = RY + CARD_SIZE + BOTTOM_PAD;

  const slots = Array.from({ length: N }, (_, i) => {
    const deg = ((i * STEP + phase) % 180 + 180) % 180;
    const rad = (deg * Math.PI) / 180;
    const x = Math.cos(rad) * RX;
    const y = Math.sin(rad) * RY;
    const sinVal = Math.sin(rad);
    return {
      x, y,
      scale: (0.75 + sinVal * 0.25) * VISUAL_SCALE,
      zIdx: Math.round(sinVal * 100),
      svcIdx: i % services.length,
      key: i,
    };
  });

  const sorted = [...slots].sort((a, b) => a.zIdx - b.zIdx);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: carouselH,
      overflow: 'hidden',
      background: 'transparent',
      flexShrink: 0,
    }}>
      {sorted.map(({ x, y, scale, zIdx, svcIdx, key }) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -CARD_SIZE / 2 + BOTTOM_PAD / 2,
            transform: `translate(calc(${x}px - 50%), calc(${-y}px)) scale(${scale})`,
            zIndex: zIdx,
            willChange: 'transform',
            transformOrigin: 'bottom center',
          }}
        >
          <AnimatedCard>
            <CardFace service={services[svcIdx]} />
          </AnimatedCard>
        </div>
      ))}
    </div>
  );
}

/* ── HeroWithServices — fills 100vh ── */
export default function HeroWithServices() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="text-center px-4 max-w-6xl z-10"
        style={{
          paddingTop: '22vh',
          paddingBottom: '2vh',
          flexShrink: 0,
        }}
      >
        <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-6 flex flex-wrap items-center justify-center gap-x-8 text-white leading-none">
          <span>Innovate</span>
          <span>Build</span>
          <span className="flex items-center gap-x-8">
            <Image
              src="/logo2.png"
              alt="UP Logo"
              width={70}
              height={50}
              priority
              className="object-contain inline-block"
            />
            <span>Scale Digitally</span>
          </span>
        </h1>

        <p className="text-lg md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed">
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            <span>Specialists in</span>
            <span className="bg-white text-black px-5 py-1 rounded-full font-normal text-base md:text-xl">Mobile</span>
            <span>apps,</span>
            <span className="bg-white text-black px-5 py-1 rounded-full font-normal text-base md:text-xl">UI/UX</span>
            <span>,</span>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mt-2">
            <span className="bg-white text-black px-5 py-1 rounded-full font-normal text-base md:text-xl">Web</span>
            <span>platforms,</span>
            <span className="bg-white text-black px-5 py-1 rounded-full font-normal text-base md:text-xl">AI</span>
            <span>&</span>
            <span className="bg-white text-black px-5 py-1 rounded-full font-normal text-base md:text-xl">Backend</span>
            <span>systems.</span>
          </span>
        </p>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ width: '100vw', flexShrink: 0, zIndex: 5 }}>
        <ServiceCards />
      </div>
    </div>
  );
}