import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const badges = ['Automatización', 'IA', 'Multicanal']

export default function Slide2Solution() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #EEF2FF 0%, #ffffff 65%)' }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#6366F1] shadow-xl mb-4 md:mb-6"
      >
        <span className="text-white font-extrabold text-3xl md:text-4xl">VS</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-lg md:text-2xl font-bold text-[#6366F1] tracking-widest uppercase mb-2"
      >
        Visual Suite
      </motion.h2>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-2 md:mb-3"
      >
        Tu CRM todo en uno
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-gray-500 text-sm md:text-lg mb-6 md:mb-10 max-w-md px-2"
      >
        Diseñado exclusivamente para clínicas que quieren crecer sin perder pacientes
      </motion.p>

      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        {badges.map((badge, i) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.2 }}
            className="flex items-center gap-2 bg-white border border-[#6366F1]/20 rounded-full px-4 py-1.5 md:px-5 md:py-2 shadow-sm"
          >
            <CheckCircle2 size={15} className="text-[#6366F1]" />
            <span className="text-gray-700 font-medium text-xs md:text-sm">{badge}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
