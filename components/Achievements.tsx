'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    setCount(0);
    const startTime = performance.now();

    // easeOutExpo — fast start, slow finish — feels snappy
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, target, duration]);

  return count;
}

// ─── Single stat card ─────────────────────────────────────────────────────────
function StatCard({
  label, value, gradient, delay,
}: {
  label: string; value: string; gradient: string; delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Extract numeric part and suffix (e.g. "100+" → 100, "+")
  const numeric = parseInt(value.replace(/\D/g, ''), 10);
  const suffix  = value.replace(/\d/g, ''); // "+", "K+", etc.

  const count = useCountUp(numeric, 1600, visible);

  // IntersectionObserver — start animation when card enters viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className="relative group"
    >
      {/* White shadow layer */}
      <div className="absolute inset-0 bg-white rounded-[32px] translate-x-2 translate-y-2" />

      {/* Card */}
      <div
        className="relative h-74 p-8 rounded-[32px] border-[3px] border-white/20 flex flex-col justify-center items-center text-center gap-4"
        style={{ background: gradient, minHeight: 220 }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[30px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
        />

        {/* Animated number */}
        <span className="text-6xl font-black text-white leading-none relative z-10 tabular-nums"
          style={{ fontVariantNumeric: 'tabular-nums', minWidth: '3ch', display: 'inline-block', textAlign: 'center' }}
        >
          {visible ? count : 0}{suffix}
        </span>

        {/* Label */}
        <span className="text-white font-bold text-sm uppercase tracking-wider opacity-80 relative z-10">
          {label}
        </span>

        {/* Subtle shimmer line at bottom when counting */}
        {visible && (
          <div style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            borderRadius: 999,
            animation: 'shimmerLine 1.6s ease forwards',
          }} />
        )}
      </div>

      <style>{`
        @keyframes shimmerLine {
          0%   { opacity: 0; transform: scaleX(0); }
          20%  { opacity: 1; }
          100% { opacity: 0; transform: scaleX(1); }
        }
      `}</style>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const Achievements = () => {
  const stats = [
    { label: 'Successful Projects', value: '100+' },
    { label: 'Countries Supported', value: '15+' },
    { label: 'Active Clients',      value: '10+'  },
    { label: 'Years Experience',    value: '6+'   },
  ];

  const cardGradients = [
    'linear-gradient(135deg, #4F1079 0%, #2E0D6E 100%)',
    'linear-gradient(135deg, #2E0D6E 0%, #1C0860 100%)',
    'linear-gradient(135deg, #1C0860 0%, #0D0430 100%)',
    'linear-gradient(135deg, #0D0430 0%, #000000 100%)',
  ];

  return (
    <section id="achievements" className="relative bg-white overflow-hidden">
      {/* Zigzag clipped background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #4F1079, #1C0860, #000000)',
          clipPath:
            'polygon(0 0, 10% 5%, 20% 0, 30% 5%, 40% 0, 50% 5%, 60% 0, 70% 5%, 80% 0, 90% 5%, 100% 0, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0 100%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-40">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[100px] font-bold text-center mb-24 text-white tracking-[2px] leading-[1.2] md:leading-[1.1]"
        >
          Upclude's<br />Achievements
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              gradient={cardGradients[index]}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;