import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useAudioSync } from './hooks/useAudioSync'
import { SLIDES } from './data/slides'
import SlideContainer from './components/SlideContainer'
import ProgressBar from './components/ProgressBar'
import NavArrows from './components/NavArrows'

export default function App() {
  const [started, setStarted] = useState(false)
  const { currentSlide, elapsed, isPlaying, play, pause, goTo } = useAudioSync()

  const handleStart = useCallback(() => {
    setStarted(true)
    play()
  }, [play])

  const handlePrev = useCallback(() => {
    goTo(currentSlide - 1)
  }, [currentSlide, goTo])

  const handleNext = useCallback(() => {
    goTo(currentSlide + 1)
  }, [currentSlide, goTo])

  if (!started) {
    return (
      <div
        className="w-screen h-screen flex flex-col items-center justify-center bg-white cursor-pointer select-none"
        style={{ background: 'radial-gradient(ellipse at center, #EEF2FF 0%, #ffffff 70%)' }}
        onClick={handleStart}
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#6366F1] shadow-xl">
            <span className="text-white font-extrabold text-2xl md:text-3xl">VS</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Visual Suite</h1>
          <p className="text-gray-500 text-sm md:text-base">Tu CRM todo en uno para clínicas</p>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex items-center justify-center mt-4"
          >
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-16 h-16 rounded-full bg-[#6366F1]"
            />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#6366F1] shadow-lg">
              <Play size={26} className="text-white ml-1" />
            </div>
          </motion.div>
          <p className="text-gray-400 text-sm">Haz clic para comenzar</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">
      <ProgressBar slideIndex={currentSlide} elapsed={elapsed} />
      <SlideContainer currentSlide={currentSlide} />
      <NavArrows
        onPrev={handlePrev}
        onNext={handleNext}
        goTo={goTo}
        current={currentSlide}
        total={SLIDES.length}
      />

      {/* Pause/play toggle — top right */}
      <button
        onClick={isPlaying ? pause : play}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors text-gray-600 text-xs font-bold"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  )
}
