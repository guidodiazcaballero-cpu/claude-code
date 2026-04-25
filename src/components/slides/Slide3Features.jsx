import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, Clock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Respuesta Rápida',
    detail: 'En menos de 1 minuto',
  },
  {
    icon: Globe,
    color: '#6366F1',
    bg: '#EEF2FF',
    title: 'Multiidioma',
    detail: 'Español, Inglés, Portugués',
    extra: '🇪🇸 🇺🇸 🇧🇷',
  },
  {
    icon: Clock,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Disponible 24/7',
    detail: 'Nunca pierdas un lead',
  },
]

const containerVariants = {
  animate: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } },
}

export default function Slide3Features() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-1 md:mb-3"
      >
        Responde antes que la competencia
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-500 text-sm md:text-lg mb-5 md:mb-12"
      >
        Tres superpoderes en una sola plataforma
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-row md:flex-col lg:flex-row gap-3 md:gap-6 w-full max-w-3xl"
      >
        {features.map(({ icon: Icon, color, bg, title, detail, extra }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            className="flex-1 flex flex-col items-center gap-2 md:gap-3 rounded-2xl p-4 md:p-8 shadow-md border border-gray-100 bg-white"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
              className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-2xl"
              style={{ background: bg }}
            >
              <Icon size={20} color={color} strokeWidth={2} className="md:hidden" />
              <Icon size={32} color={color} strokeWidth={2} className="hidden md:block" />
            </motion.div>
            <h3 className="text-sm md:text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-500 text-xs md:text-sm">{detail}</p>
            {extra && <p className="text-base md:text-xl">{extra}</p>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
