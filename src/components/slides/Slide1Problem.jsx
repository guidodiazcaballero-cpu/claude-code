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
    <div className="flex items-end gap-3 h-24 mt-4">
      {BAR_DATA.map(({ day, h, color }, i) => (
        <div key={day} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.8 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
            style={{
              height: h,
              backgroundColor: color,
              width: 32,
              borderRadius: '6px 6px 0 0',
            }}
            originY={1}
          />
          <span className="text-xs text-gray-400">{day}</span>
        </div>
      ))}
      {/* Downward arrow overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="self-center ml-1"
      >
        <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
          <path d="M10 2 L10 28 M3 22 L10 30 L17 22" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )
}

function ChatBubble() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {/* Timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-gray-400"
      >
        3:00 AM
      </motion.div>

      {/* Incoming patient message */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
        className="flex items-start gap-2"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <MessageCircle size={14} className="text-gray-500" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[200px]">
          <p className="text-sm text-gray-700">¿Tienen cita disponible mañana?</p>
        </div>
      </motion.div>

      {/* No response indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex items-center gap-2 ml-10"
      >
        <XCircle size={16} className="text-red-500" />
        <span className="text-xs text-red-500 font-medium">Sin respuesta</span>
      </motion.div>

      {/* Typing dots that appear then become "no response" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 1.0, duration: 1.0, times: [0, 0.2, 0.8, 1] }}
        className="flex gap-1 ml-10"
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
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-10">
      {/* Left — Headline */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3"
        >
          El problema
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
        >
          ¿Tu clínica pierde pacientes por no responder a tiempo?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-lg"
        >
          Cada hora sin respuesta es un paciente que elige a tu competencia.
        </motion.p>
      </div>

      {/* Right — Chat + Chart */}
      <div className="flex-1 flex flex-col items-center gap-6 max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
        >
          <div className="text-xs font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            WhatsApp Business
          </div>
          <ChatBubble />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="w-full bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
        >
          <div className="text-xs font-semibold text-gray-500 mb-1">Pacientes perdidos esta semana</div>
          <BarChart />
        </motion.div>
      </div>
    </div>
  )
}
