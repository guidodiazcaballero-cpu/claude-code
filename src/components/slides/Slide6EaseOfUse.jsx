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
    return () => controls.stop()
  }, [count])

  return <motion.span>{rounded}</motion.span>
}

export default function Slide6EaseOfUse() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-0"
      >
        Listo en 24 horas.
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#6366F1] mb-5 md:mb-10"
      >
        Sin código.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm md:max-w-md mb-5 md:mb-10"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs md:text-sm font-medium text-gray-500">Configuración</span>
          <span className="text-base md:text-lg font-bold text-[#6366F1]">
            <Counter />
          </span>
        </div>
        <div className="w-full h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#6366F1] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="flex items-center gap-2 md:gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-2 md:px-6 md:py-3 mb-5 md:mb-10"
      >
        <div className="relative flex-shrink-0">
          <Code2 size={22} className="text-red-400" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 22 22">
            <line x1="3" y1="3" x2="19" y2="19" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-semibold text-red-600 text-xs md:text-base">Sin conocimientos técnicos</span>
      </motion.div>

      <div className="flex flex-row gap-2 md:gap-4 justify-center">
        {steps.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 + i * 0.2 }}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 md:px-5 md:py-3 shadow-sm"
          >
            <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#EEF2FF]">
              <Icon size={14} className="text-[#6366F1] md:hidden" />
              <Icon size={18} className="text-[#6366F1] hidden md:block" />
            </div>
            <span className="text-gray-700 text-[9px] md:text-sm font-medium text-center md:text-left">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
