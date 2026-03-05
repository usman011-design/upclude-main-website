'use client';

import { Home } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ─── Unique Scroll Experience ─────────────────────────────────────────────────
// Jab click hota hai:
// 1. Screen pe ek full-width progress bar top par slide karta hai (purple)
// 2. Floating pill bottom center mein "Going to X..." animated text ke saath
// 3. Pill mein orbit karta hua dot animation
// 4. Destination reach hone par pill "Arrived ✓" mein badal jaata hai

function ScrollProgressBar({ active }: { active: boolean }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, zIndex: 9998,
      background: 'rgba(123,0,255,0.15)',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        background: 'linear-gradient(90deg, #7B00FF, #bf7fff, #7B00FF)',
        backgroundSize: '200% 100%',
        width: active ? '100%' : '0%',
        transition: active ? 'width 0.85s cubic-bezier(0.4,0,0.2,1)' : 'width 0.3s ease',
        animation: active ? 'shimmer 1.2s linear infinite' : 'none',
        boxShadow: '0 0 12px #7B00FF, 0 0 4px #bf7fff',
      }} />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes orbitDot {
          0%   { transform: rotate(0deg)   translateX(10px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.92); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0px)  scale(1); }
        }
        @keyframes arrived {
          0%   { transform: translateX(-50%) scale(1); }
          40%  { transform: translateX(-50%) scale(1.08); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes textCycle {
          0%,100% { opacity: 1; }
          45%     { opacity: 1; }
          50%     { opacity: 0; }
          95%     { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

type ToastState = 'hidden' | 'going' | 'arrived';

function ScrollToast({
  state, label,
}: { state: ToastState; label: string }) {
  const visible = state !== 'hidden';
  const arrived = state === 'arrived';

  return (
    <div style={{
      position: 'fixed',
      bottom: 36,
      left: '50%',
      zIndex: 9999,
      pointerEvents: 'none',
      // animation handled by state
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(18px) scale(0.94)',
      transition: 'opacity 0.32s ease, transform 0.32s ease',
      animation: arrived ? 'arrived 0.4s ease' : (visible ? 'fadeSlideUp 0.32s ease' : 'none'),
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: arrived ? '10px 20px' : '9px 18px 9px 12px',
        borderRadius: 999,
        background: arrived
          ? 'linear-gradient(135deg, rgba(0,200,100,0.18), rgba(0,200,100,0.08))'
          : 'rgba(8,8,8,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: arrived
          ? '1px solid rgba(0,220,110,0.35)'
          : '1px solid rgba(255,255,255,0.1)',
        boxShadow: arrived
          ? '0 6px 28px rgba(0,200,100,0.18)'
          : '0 8px 32px rgba(0,0,0,0.38), 0 0 0 1px rgba(123,0,255,0.12)',
        transition: 'all 0.35s ease',
        whiteSpace: 'nowrap',
      }}>

        {arrived ? (
          // ── Arrived state ──
          <>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(0,220,110,0.2)',
              border: '1.5px solid rgba(0,220,110,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: '#00dc6e',
            }}>✓</span>
            <span style={{
              color: '#00dc6e', fontSize: 13, fontWeight: 700,
              fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em',
            }}>
              {label}
            </span>
          </>
        ) : (
          // ── Going state ──
          <>
            {/* Orbit dot ring */}
            <span style={{
              position: 'relative', width: 20, height: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {/* ring */}
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '1.5px solid rgba(123,0,255,0.3)',
              }} />
              {/* orbiting dot */}
              <span style={{
                position: 'absolute',
                width: 5, height: 5, borderRadius: '50%',
                background: '#7B00FF',
                boxShadow: '0 0 6px #7B00FF',
                animation: 'orbitDot 0.9s linear infinite',
                transformOrigin: 'center',
              }} />
            </span>

            {/* "Going to X" with animated dots suffix */}
            <span style={{
              color: '#fff', fontSize: 13, fontWeight: 600,
              fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', gap: 1,
            }}>
              <span>Going to </span>
              <span style={{ color: '#bf7fff', fontWeight: 700, marginLeft: 4 }}>{label}</span>
              {/* trailing animated dots */}
              {[0.0, 0.2, 0.4].map((delay, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  width: 3, height: 3, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.5)',
                  marginLeft: i === 0 ? 5 : 2,
                  animation: `textCycle 1.2s ${delay}s ease-in-out infinite`,
                }} />
              ))}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [toastState, setToastState] = useState<ToastState>('hidden');
  const [toastLabel, setToastLabel] = useState('');
  const [progressActive, setProgressActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { name: 'Achievements', id: 'achievements' },
    { name: 'Portfolio',    id: 'portfolio'    },
    { name: 'Contact',      id: 'contact'      },
  ];

  // ─── Color detection (original logic) ────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const nav = document.querySelector('[data-navbar]') as HTMLElement;
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      nav.style.visibility = 'hidden';
      const el = document.elementFromPoint(cx, cy) as HTMLElement | null;
      nav.style.visibility = '';
      if (!el) return;
      const bg = window.getComputedStyle(el).backgroundColor;
      const match = bg.match(/\d+/g);
      if (!match) return;
      const [r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      setIsDark(luminance < 0.6);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // ─── Original color variables (unchanged) ────────────────────────────────
  const textColor    = isDark ? '#ffffff' : '#000000';
  const dividerColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
  const borderColor  = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.2)';
  const pillBg = isDark
    ? 'linear-gradient(135deg, #EFEFEF55 0%, #FFFFFF14 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)';

  // ─── Smooth scroll easeInOutCubic ────────────────────────────────────────
  const smoothScrollTo = (targetY: number, duration = 900) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) return;
    const startTime = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ─── Trigger full scroll experience ──────────────────────────────────────
  const triggerScroll = (label: string, scrollFn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // 1. Show "Going to X" toast + progress bar
    setToastLabel(label);
    setToastState('going');
    setProgressActive(true);

    // 2. Start scrolling after short delay
    setTimeout(scrollFn, 280);

    // 3. Switch to "Arrived" state when scroll completes (~900ms)
    timerRef.current = setTimeout(() => {
      setProgressActive(false);
      setToastState('arrived');
      setToastLabel(label);

      // 4. Hide toast after showing "arrived"
      timerRef.current = setTimeout(() => {
        setToastState('hidden');
      }, 1200);
    }, 1050);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    name: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) { console.warn(`[Navbar] #${id} not found`); return; }
    const nav = document.querySelector('[data-navbar]') as HTMLElement;
    const navH = nav ? nav.getBoundingClientRect().height : 80;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 24;
    triggerScroll(name, () => smoothScrollTo(targetY, 900));
  };

  return (
    <>
      <ScrollProgressBar active={progressActive} />
      <ScrollToast state={toastState} label={toastLabel} />

      <nav
        data-navbar
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] hidden md:block"
        style={{ transition: 'color 0.3s' }}
      >
        <div style={{
          background: pillBg,
          borderRadius: 100,
          padding: '7px 28px 7px 7px',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          boxShadow: `0 4px 40px rgba(0,0,0,0.15), inset 0 0 0 3px ${borderColor}`,
          transition: 'background 0.3s, box-shadow 0.3s',
        }}>
          {/* Home */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              triggerScroll('Home', () => smoothScrollTo(0, 900));
            }}
            style={{
              background: '#7B00FF', borderRadius: '50%',
              width: 46, height: 46,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: 28,
            }}
          >
            <Home size={18} color="#fff" strokeWidth={2} />
          </a>

          {/* Divider */}
          <div style={{
            width: 1, height: 24, background: dividerColor,
            marginRight: 28, transition: 'background 0.3s',
          }} />

          {/* Links */}
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id, link.name)}
              style={{
                textDecoration: 'none', color: textColor,
                fontSize: 15, fontWeight: 600, letterSpacing: '0.02em',
                marginLeft: i === 0 ? 0 : 40,
                transition: 'opacity 0.2s, color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}