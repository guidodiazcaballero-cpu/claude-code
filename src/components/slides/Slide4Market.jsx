import React from 'react'
import { motion } from 'framer-motion'
import { Smile, Sparkles, HeartPulse } from 'lucide-react'

const markets = [
  { icon: Smile,      color: '#10B981', bg: '#ECFDF5', label: 'Clínicas Dentales' },
  { icon: Sparkles,   color: '#EC4899', bg: '#FDF2F8', label: 'Centros Estéticos' },
  { icon: HeartPulse, color: '#6366F1', bg: '#EEF2FF', label: 'Longevidad' },
]

export default function Slide4Market() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-1 md:mb-3"
      >
        Diseñado para clínicas que crecen
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-500 text-sm md:text-lg mb-5 md:mb-12"
      >
        Especializado en tu sector
      </motion.p>

      <div className="flex flex-row md:flex-col lg:flex-row gap-3 md:gap-6 w-full max-w-3xl mb-4 md:mb-8">
        {markets.map(({ icon: Icon, color, bg, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.5, type: 'spring', stiffness: 180, damping: 16 }}
            className="flex-1 flex flex-col items-center gap-2 md:gap-4 rounded-2xl p-4 md:p-8 shadow-md border border-gray-100 bg-white"
          >
            <div
              className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-2xl"
              style={{ background: bg }}
            >
              <Icon size={24} color={color} strokeWidth={1.8} className="md:hidden" />
              <Icon size={40} color={color} strokeWidth={1.8} className="hidden md:block" />
            </div>
            <h3 className="text-xs md:text-lg font-bold text-gray-900 leading-tight">{label}</h3>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
        className="text-gray-400 font-medium text-xs md:text-base"
      >
        🏆 500+ clínicas ya confían en nosotros
      </motion.p>
    </div>
  )
}
