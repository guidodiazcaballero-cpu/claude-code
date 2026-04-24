import React from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { Smartphone, Pencil, Bot, Code2 } from 'lucide-react'

const steps = [
  { icon: Smartphone, label: 'Conecta tu WhatsApp' },
  { icon: Pencil,     label: 'Personaliza respuestas' },
  { icon: Bot,        label: 'Activa el asistente' },
]

function Counter() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => `${Math.round(v)}%`)

  useEffect(() => {
    const controls = animate(count, 100, { duration: 2.5, ease: 'easeInOut', delay: 0.5 })
    return controls.stop
  }, [count])

  return <motion.span>{rounded}</motion.span>
}

export default function Slide6EaseOfUse() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2"
      >
        Listo en 24 horas.
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-5xl font-extrabold text-[#6366F1] mb-10"
      >
        Sin código.
      </motion.h2>

      {/* Progress bar section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md mb-10"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">Configuración</span>
          <span className="text-lg font-bold text-[#6366F1]">
            <Counter />
          </span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#6366F1] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* No-code badge */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-6 py-3 mb-10"
      >
        <div className="relative">
          <Code2 size={28} className="text-red-400" />
          {/* Diagonal slash */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 28 28">
            <line x1="4" y1="4" x2="24" y2="24" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-semibold text-red-600">Sin conocimientos técnicos</span>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {steps.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 + i * 0.2 }}
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EEF2FF]">
              <Icon size={18} className="text-[#6366F1]" />
            </div>
            <span className="text-gray-700 text-sm font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
