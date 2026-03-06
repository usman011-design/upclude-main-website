'use client'

import React from 'react';
import { ContactForm } from './ContactForm';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative bg-white">
      <style>{`
        #contact-inner {
          background: linear-gradient(to right, #4F1079, #1C0860, #000000);
          min-height: 100vh;
          padding-bottom: 6rem;
          padding-top: 4rem;
          position: relative;
        }
        @media (min-width: 1024px) {
          #contact-inner {
            padding-top: 16rem;
          }
        }
        @media (min-width: 1024px) {
          #contact-inner {
            clip-path: ellipse(100% 90% at 50% 100%);
          }
        }
      `}</style>

      <div id="contact-inner">
        <div className="container mx-auto px-8 max-w-5xl relative z-10">

          {/* Heading */}
          <div className="text-center mb-16 md:mt-16">
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