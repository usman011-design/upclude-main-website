'use client'

import React from 'react';
import { motion } from 'framer-motion';

const Achievements = () => {
  const stats = [
    { label: 'Successful Projects', value: '100+' },
    { label: 'Countries Supported', value: '15+' },
    { label: 'Active Clients', value: '10+' },
    { label: 'Years Experience', value: '6+' },
  ];

  // Background goes left→right: #4F1079 → #1C0860 → #000000
  // Each card gets the gradient slice that matches its horizontal position.
  // Card 0 (leftmost)  → starts at ~#4F1079, ends at ~#2E0D6E
  // Card 1             → starts at ~#2E0D6E, ends at ~#1C0860
  // Card 2             → starts at ~#1C0860, ends at ~#0D0430
  // Card 3 (rightmost) → starts at ~#0D0430, ends at ~#000000
  const cardGradients = [
    'linear-gradient(135deg, #4F1079 0%, #2E0D6E 100%)',
    'linear-gradient(135deg, #2E0D6E 0%, #1C0860 100%)',
    'linear-gradient(135deg, #1C0860 0%, #0D0430 100%)',
    'linear-gradient(135deg, #0D0430 0%, #000000 100%)',
  ];

  return (
    <section id="achievements" className="relative bg-white overflow-hidden">
      {/* Zigzag clipped background — same as before */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #4F1079, #1C0860, #000000)',
          clipPath:
            'polygon(0 0, 10% 5%, 20% 0, 30% 5%, 40% 0, 50% 5%, 60% 0, 70% 5%, 80% 0, 90% 5%, 100% 0, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0 100%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-40">
        <h2 className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[100px] font-bold text-center mb-24 text-white tracking-[2px] leading-[1.2] md:leading-[1.1]">
  Upclude's<br />Achievements
</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* White shadow layer — gives the lifted card illusion */}
              <div className="absolute inset-0 bg-white rounded-[32px] translate-x-2 translate-y-2" />

              {/* Card — gradient matched to its position in the background */}
              <div
                className="relative h-74 p-8 rounded-[32px] border-[3px] border-white border-opacity-20 flex flex-col justify-center items-center text-center gap-4 transition-transform"
                style={{ background: cardGradients[index] }}
              >
                {/* Subtle inner glow so card doesn't look flat against bg */}
                <div
                  className="absolute inset-0 rounded-[30px] pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)',
                  }}
                />

                <span className="text-6xl font-black text-white leading-none relative z-10">
                  {stat.value}
                </span>
                <span className="text-white font-bold text-sm uppercase tracking-wider opacity-80 relative z-10">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;