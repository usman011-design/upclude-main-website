'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface SubmitButtonProps {
  children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 59, 31, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#8000FF] text-white font-bold px-12 py-3 rounded-full transition-all duration-300 shadow-lg"
    >
      {children}
    </motion.button>
  );
};
