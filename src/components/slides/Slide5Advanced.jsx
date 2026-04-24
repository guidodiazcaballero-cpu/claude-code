import React from 'react'
import { motion } from 'framer-motion'
import { Search, UserCheck } from 'lucide-react'

function LeakyFunnel() {
  const stages = ['Prospecto', 'Conversación', 'Cotización', 'Paciente']
  const widths  = [260, 200, 140, 90]

  return (
    <div className="flex flex-col items-center gap-0">
      {stages.map((stage, i) => (
        <div key={stage} className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1 - i * 0.12, scaleX: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4, ease: 'easeOut' }}
            className="flex items-center justify-center text-xs font-semibold text-white rounded-sm"
            style={{
              width: widths[i],
              height: 36,
              background: i === 1 ? '#EF4444' : '#6366F1',
              clipPath: i < stages.length - 1
                ? `polygon(0 0, 100% 0, ${100 - (widths[i] - widths[i+1]) / widths[i] * 50}% 100%, ${(widths[i] - widths[i+1]) / widths[i] * 50}% 100%)`
                : 'none',
              borderRadius: i === stages.length - 1 ? 6 : 0,
            }}
          >
            {stage}
          </motion.div>
          {/* Leak indicator at stage 1 */}
          {i === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 15 }}
              className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-1"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <span className="text-white text-[8px] font-bold">!</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-xs text-red-500 font-medium mt-2"
      >
        Punto de fuga detectado
      </motion.p>
    </div>
  )
}

function ChatMagnifier() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 18 }}
          className="w-20 h-16 bg-[#EEF2FF] rounded-2xl rounded-tl-none flex items-center justify-center shadow"
        >
          <span className="text-[#6366F1] text-xs font-medium px-2 text-center">¿Cuánto cuesta el implante?</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ delay: 1.0, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-[#6366F1]/20"
        >
          <Search size={16} className="text-[#6366F1]" />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs text-gray-500 font-medium text-center max-w-[120px]"
      >
        Detección de intención de compra
      </motion.p>
    </div>
  )
}

function HumanEscalation() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 18 }}
        className="w-20 h-20 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center shadow"
      >
        <UserCheck size={36} className="text-green-600" />
      </motion.div>
      {/* Animated dotted arrow */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ transformOrigin: 'top' }}
        className="flex flex-col items-center gap-[3px]"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[2px] h-[4px] rounded-full bg-gray-300" />
        ))}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-xs text-gray-500 font-medium text-center max-w-[120px]"
      >
        Escalamiento a humano
      </motion.p>
    </div>
  )
}

export default function Slide5Advanced() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3"
      >
        Tecnología que trabaja mientras tú duermes
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-500 text-lg mb-12"
      >
        IA avanzada para no dejar pasar ninguna oportunidad
      </motion.p>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start justify-center">
        <LeakyFunnel />
        <ChatMagnifier />
        <HumanEscalation />
      </div>
    </div>
  )
}
