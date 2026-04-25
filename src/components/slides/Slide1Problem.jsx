import React from 'react'
import { motion } from 'framer-motion'
import { XCircle, MessageCircle } from 'lucide-react'

const BAR_DATA = [
  { day: 'Lun', h: 80, color: '#6366F1' },
  { day: 'Mar', h: 56, color: '#818CF8' },
  { day: 'Mié', h: 32, color: '#F87171' },
  { day: 'Jue', h: 14, color: '#EF4444' },
]

function BarChart() {
  return (
    <div className="flex items-end gap-2 h-20 mt-3">
      {BAR_DATA.map(({ day, h, color }, i) => (
        <div key={day} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.8 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
            style={{
              height: h * 0.7,
              backgroundColor: color,
              width: 24,
              borderRadius: '4px 4px 0 0',
            }}
            originY={1}
          />
          <span className="text-[10px] text-gray-400">{day}</span>
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="self-center ml-1"
      >
        <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
          <path d="M8 2 L8 22 M2 17 L8 24 L14 17" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )
}

function ChatBubble() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-gray-400"
      >
        3:00 AM
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
        className="flex items-start gap-2"
      >
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
          <MessageCircle size={12} className="text-gray-500" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-3 py-2">
          <p className="text-xs text-gray-700">¿Tienen cita disponible mañana?</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex items-center gap-2 ml-9"
      >
        <XCircle size={14} className="text-red-500" />
        <span className="text-xs text-red-500 font-medium">Sin respuesta</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 1.0, duration: 1.0, times: [0, 0.2, 0.8, 1] }}
        className="flex gap-1 ml-9"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ delay: 1.0 + i * 0.15, duration: 0.6, repeat: 2 }}
            className="w-2 h-2 rounded-full bg-gray-400"
          />
        ))}
      </motion.div>
    </div>
  )
}

export default function Slide1Problem() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-16 gap-4 md:gap-10 py-8">
      {/* Left — Headline */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2"
        >
          El problema
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3"
        >
          ¿Tu clínica pierde pacientes por no responder a tiempo?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm md:text-base text-gray-500"
        >
          Cada hora sin respuesta es un paciente que elige a tu competencia.
        </motion.p>
      </div>

      {/* Right — Chat + Chart */}
      <div className="flex-1 flex flex-row md:flex-col items-stretch gap-3 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
        >
          <div className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            WhatsApp Business
          </div>
          <ChatBubble />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex-1 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
        >
          <div className="text-xs font-semibold text-gray-500 mb-1">Pacientes perdidos</div>
          <BarChart />
        </motion.div>
      </div>
    </div>
  )
}
