'use client';

import { Home } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We sample the pixel colour directly underneath the navbar centre
    // using a small sentinel div positioned behind it.
    const check = () => {
      const nav = document.querySelector('[data-navbar]') as HTMLElement;
      if (!nav) return;

      const rect = nav.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Temporarily hide the navbar so we can read what's beneath
      nav.style.visibility = 'hidden';
      const el = document.elementFromPoint(cx, cy) as HTMLElement | null;
      nav.style.visibility = '';

      if (!el) return;

      const bg = window.getComputedStyle(el).backgroundColor;
      // Parse rgb(a)
      const match = bg.match(/\d+/g);
      if (!match) return;

      const [r, g, b] = match.map(Number);
      // Perceived luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      setIsDark(luminance < 0.6); // below 0.6 → dark bg → white text
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const textColor = isDark ? '#ffffff' : '#000000';
  const dividerColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
  const borderColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.2)';
  const pillBg = isDark
    ? 'linear-gradient(135deg, #EFEFEF55 0%, #FFFFFF14 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)';

  return (
    <nav
      data-navbar
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] hidden md:block"
      style={{ transition: 'color 0.3s' }}
    >
      <div
        style={{
          background: pillBg,
          borderRadius: 100,
          padding: '7px 28px 7px 7px',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          whiteSpace: 'nowrap',
          boxShadow: `0 4px 40px rgba(0,0,0,0.15), inset 0 0 0 3px ${borderColor}`,
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Purple circle home icon */}
        <button
          style={{
            background: '#7B00FF',
            borderRadius: '50%',
            width: 46,
            height: 46,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            marginRight: 28,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#6500d4')}
          onMouseLeave={e => (e.currentTarget.style.background = '#7B00FF')}
        >
          <Home size={18} color="#fff" strokeWidth={2} />
        </button>

        {/* Divider */}
        <div style={{
          width: 1,
          height: 24,
          background: dividerColor,
          marginRight: 28,
          flexShrink: 0,
          transition: 'background 0.3s',
        }} />

        {/* Nav links */}
        {['Achievements', 'Portfolio', 'Contact'].map((link, i) => (
          <button
            key={link}
            style={{
              background: 'none',
              border: 'none',
              color: textColor,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              padding: 0,
              marginLeft: i === 0 ? 0 : 40,
              transition: 'opacity 0.2s, color 0.3s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
}