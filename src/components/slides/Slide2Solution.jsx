import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const badges = ['Automatización', 'IA', 'Multicanal']

export default function Slide2Solution() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #EEF2FF 0%, #ffffff 65%)' }}
    >
      {/* Logo circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#6366F1] shadow-xl mb-6"
      >
        <span className="text-white font-extrabold text-4xl">VS</span>
        {/* Outer ring glow */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute inset-0 rounded-full bg-[#6366F1]"
        />
      </motion.div>

      {/* Brand name */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-2xl font-bold text-[#6366F1] tracking-widest uppercase mb-2"
      >
        Visual Suite
      </motion.h2>

      {/* Tagline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-3"
      >
        Tu CRM todo en uno
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-gray-500 text-lg mb-10 max-w-md"
      >
        Diseñado exclusivamente para clínicas que quieren crecer sin perder pacientes
      </motion.p>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-3 justify-center">
        {badges.map((badge, i) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.2 }}
            className="flex items-center gap-2 bg-white border border-[#6366F1]/20 rounded-full px-5 py-2 shadow-sm"
          >
            <CheckCircle2 size={18} className="text-[#6366F1]" />
            <span className="text-gray-700 font-medium text-sm">{badge}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
