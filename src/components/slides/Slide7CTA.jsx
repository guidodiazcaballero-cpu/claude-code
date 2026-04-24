import React from 'react'
import { motion } from 'framer-motion'

function VSLogo({ size = 56 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="flex items-center justify-center rounded-2xl bg-[#6366F1]"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.45 }}>VS</span>
    </motion.div>
  )
}

export default function Slide7CTA() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #EEF2FF 0%, #ffffff 70%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center gap-3 mb-8"
      >
        <VSLogo size={64} />
        <span className="text-xl font-bold text-[#6366F1] tracking-wide">Visual Suite</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 max-w-2xl leading-tight mb-4"
      >
        Empieza hoy. Tu próximo paciente no puede esperar.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-gray-500 text-lg mb-10"
      >
        Únete a más de 500 clínicas que ya usan Visual Suite
      </motion.p>

      {/* Pulsing CTA button with sonar ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, type: 'spring', stiffness: 180, damping: 15 }}
        className="relative flex items-center justify-center mb-8"
      >
        {/* Sonar ring */}
        <motion.div
          animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-full h-full rounded-full bg-[#6366F1]"
        />
        <motion.button
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative bg-[#6366F1] text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-[#4F46E5] transition-colors cursor-pointer"
        >
          Solicitar Demo
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
        className="text-gray-400 text-base tracking-wider"
      >
        visual-suite.com
      </motion.p>
    </div>
  )
}
