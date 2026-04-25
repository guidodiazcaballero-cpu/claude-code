import React from 'react'
import { motion } from 'framer-motion'
import { Search, UserCheck } from 'lucide-react'

// Funnel with % widths so it scales on any screen
const STAGES = [
  { label: 'Prospecto',    pct: 100 },
  { label: 'Conversación', pct: 75, leak: true },
  { label: 'Cotización',   pct: 52 },
  { label: 'Paciente',     pct: 32 },
]

function LeakyFunnel() {
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-[180px] md:max-w-[260px]">
      {STAGES.map((stage, i) => {
        const next = STAGES[i + 1]
        const leftClip = next ? ((1 - next.pct / stage.pct) / 2) * 50 : 0
        const rightClip = next ? (100 - ((1 - next.pct / stage.pct) / 2) * 50) : 100
        return (
          <div key={stage.label} className="relative w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1 - i * 0.1, scaleX: 1 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.4, ease: 'easeOut' }}
              className="w-full flex items-center justify-center text-[10px] md:text-xs font-semibold text-white"
              style={{
                height: 30,
                background: stage.leak ? '#EF4444' : '#6366F1',
                clipPath: next
                  ? `polygon(${leftClip}% 0%, ${rightClip}% 0%, ${rightClip + leftClip}% 100%, ${leftClip - leftClip}% 100%)`
                  : 'none',
                borderRadius: i === STAGES.length - 1 ? 6 : 0,
              }}
            >
              {stage.label}
            </motion.div>
            {stage.leak && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 15 }}
                className="absolute -right-6 top-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
                >
                  <span className="text-white text-[7px] font-bold">!</span>
                </motion.div>
              </motion.div>
            )}
          </div>
        )
      })}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-[10px] md:text-xs text-red-500 font-medium mt-1"
      >
        Punto de fuga detectado
      </motion.p>
    </div>
  )
}

function ChatMagnifier() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 18 }}
          className="w-16 h-12 md:w-20 md:h-16 bg-[#EEF2FF] rounded-2xl rounded-tl-none flex items-center justify-center shadow"
        >
          <span className="text-[#6366F1] text-[9px] md:text-xs font-medium px-2 text-center">¿Cuánto cuesta el implante?</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ delay: 1.0, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-[#6366F1]/20"
        >
          <Search size={13} className="text-[#6366F1]" />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-[9px] md:text-xs text-gray-500 font-medium text-center max-w-[90px] md:max-w-[120px]"
      >
        Detección de intención de compra
      </motion.p>
    </div>
  )
}

function HumanEscalation() {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 18 }}
        className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center shadow"
      >
        <UserCheck size={24} className="text-green-600 md:hidden" />
        <UserCheck size={36} className="text-green-600 hidden md:block" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ transformOrigin: 'top' }}
        className="flex flex-col items-center gap-[3px]"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-[2px] h-[3px] rounded-full bg-gray-300" />
        ))}
        <svg width="8" height="5" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-[9px] md:text-xs text-gray-500 font-medium text-center max-w-[80px] md:max-w-[120px]"
      >
        Escalamiento a humano
      </motion.p>
    </div>
  )
}

export default function Slide5Advanced() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-1 md:mb-3"
      >
        Tecnología que trabaja mientras tú duermes
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-500 text-sm md:text-lg mb-5 md:mb-12"
      >
        IA avanzada para no dejar pasar ninguna oportunidad
      </motion.p>

      <div className="flex flex-row md:flex-col lg:flex-row gap-4 md:gap-10 lg:gap-16 items-center justify-center">
        <LeakyFunnel />
        <ChatMagnifier />
        <HumanEscalation />
      </div>
    </div>
  )
}
