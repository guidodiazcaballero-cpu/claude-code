import React from 'react'
import { SLIDES } from '../data/slides'

export default function ProgressBar({ slideIndex, elapsed }) {
  const duration = SLIDES[slideIndex]?.duration ?? 1
  const pct = Math.min((elapsed / duration) * 100, 100)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-200">
      <div
        className="h-full bg-[#6366F1]"
        style={{ width: `${pct}%`, transition: 'width 100ms linear' }}
      />
    </div>
  )
}
