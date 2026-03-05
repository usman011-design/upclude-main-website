'use client'

import React from 'react';
import { ContactForm } from './ContactForm';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative bg-white">
      <div
        className="relative bg-gradient-to-r from-[#4F1079] via-[#1C0860] to-[#000000] min-h-screen pb-24"
        style={{
          clipPath: 'ellipse(100% 90% at 50% 100%)', // much subtler curve
          paddingTop: '16rem',
        }}
      >
        <div className="container mx-auto px-8 max-w-5xl relative z-10">

          {/* Heading */}
          <div className="text-center mb-16 mt-16">
            <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tight leading-tight">
              Have Questions?<br />
              Let's <span className="text-[#9333ea]">Talk.</span>
            </h2>
         </div>

          {/* Subtitle */}
          <p className="text-white text-lg mb-10">
            We have got the answers to your questions.
          </p>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};