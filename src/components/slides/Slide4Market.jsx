import React from 'react'
import { motion } from 'framer-motion'
import { Smile, Sparkles, HeartPulse } from 'lucide-react'

const markets = [
  { icon: Smile,     color: '#10B981', bg: '#ECFDF5', label: 'Clínicas Dentales' },
  { icon: Sparkles,  color: '#EC4899', bg: '#FDF2F8', label: 'Centros Estéticos' },
  { icon: HeartPulse, color: '#6366F1', bg: '#EEF2FF', label: 'Medicina de Longevidad' },
]

export default function Slide4Market() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3"
      >
        Diseñado para clínicas que crecen
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-500 text-lg mb-12"
      >
        Especializado en tu sector
      </motion.p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mb-8">
        {markets.map(({ icon: Icon, color, bg, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.5, type: 'spring', stiffness: 180, damping: 16 }}
            className="flex-1 flex flex-col items-center gap-4 rounded-2xl p-8 shadow-md border border-gray-100 bg-white"
          >
            <div
              className="flex items-center justify-center w-20 h-20 rounded-2xl"
              style={{ background: bg }}
            >
              <Icon size={40} color={color} strokeWidth={1.8} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{label}</h3>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
        className="text-gray-400 font-medium text-base"
      >
        🏆 500+ clínicas ya confían en nosotros
      </motion.p>
    </div>
  )
}
