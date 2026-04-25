import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Slide1Problem from './slides/Slide1Problem'
import Slide2Solution from './slides/Slide2Solution'
import Slide3Features from './slides/Slide3Features'
import Slide4Market from './slides/Slide4Market'
import Slide5Advanced from './slides/Slide5Advanced'
import Slide6EaseOfUse from './slides/Slide6EaseOfUse'
import Slide7CTA from './slides/Slide7CTA'

const SLIDE_COMPONENTS = [
  <Slide1Problem />,
  <Slide2Solution />,
  <Slide3Features />,
  <Slide4Market />,
  <Slide5Advanced />,
  <Slide6EaseOfUse />,
  <Slide7CTA />,
]

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -30, transition: { duration: 0.35, ease: 'easeIn' } },
}

export default function SlideContainer({ currentSlide }) {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {SLIDE_COMPONENTS[currentSlide]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
