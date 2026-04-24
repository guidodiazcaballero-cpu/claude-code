import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NavArrows({ onPrev, onNext, goTo, current, total }) {
  return (
    <>
      {current > 0 && (
        <button
          onClick={onPrev}
          aria-label="Slide anterior"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft size={22} className="text-gray-700" />
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={onNext}
          aria-label="Siguiente slide"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight size={22} className="text-gray-700" />
        </button>
      )}
      {/* Slide dots — mobile */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => goTo ? goTo(i) : (i < current ? onPrev() : i > current ? onNext() : null)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-[#6366F1] w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </>
  )
}
