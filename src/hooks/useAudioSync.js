import { useState, useEffect, useRef, useCallback } from 'react'
import { SLIDES, TOTAL_DURATION } from '../data/slides'

const TICK_MS = 50

function getSlideIndexFromTime(t) {
  let idx = SLIDES.length - 1
  for (let i = 0; i < SLIDES.length - 1; i++) {
    if (t < SLIDES[i + 1].startAt) { idx = i; break }
  }
  return idx
}

export function useAudioSync() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  const voiceoverRef = useRef(null)
  const bgRef = useRef(null)
  const audioAvailableRef = useRef(false)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const currentSlideRef = useRef(0)
  const isPlayingRef = useRef(false)

  // Initialize audio elements once
  useEffect(() => {
    const vo = new Audio('/audio/voiceover.mp3')
    const bg = new Audio('/audio/background.mp3')
    bg.volume = 0.15
    bg.loop = true

    voiceoverRef.current = vo
    bgRef.current = bg

    const onCanPlay = () => {
      audioAvailableRef.current = true
      setAudioReady(true)
    }
    const onError = () => {
      audioAvailableRef.current = false
      setAudioReady(false)
    }

    vo.addEventListener('canplaythrough', onCanPlay)
    vo.addEventListener('error', onError)

    const onTimeUpdate = () => {
      const t = vo.currentTime
      const idx = getSlideIndexFromTime(t)
      const slideElapsed = t - SLIDES[idx].startAt

      setElapsed(slideElapsed)

      if (idx !== currentSlideRef.current) {
        currentSlideRef.current = idx
        setCurrentSlide(idx)
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      isPlayingRef.current = false
    }

    vo.addEventListener('timeupdate', onTimeUpdate)
    vo.addEventListener('ended', onEnded)

    // Handle Safari tab switch resume
    const onVisibilityChange = () => {
      if (!document.hidden && isPlayingRef.current && audioAvailableRef.current) {
        vo.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      vo.pause()
      bg.pause()
      vo.removeEventListener('canplaythrough', onCanPlay)
      vo.removeEventListener('error', onError)
      vo.removeEventListener('timeupdate', onTimeUpdate)
      vo.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearInterval(timerRef.current)
    }
  }, [])

  const startFallbackTimer = useCallback((fromTime = 0) => {
    clearInterval(timerRef.current)
    startTimeRef.current = performance.now() - fromTime * 1000

    timerRef.current = setInterval(() => {
      const now = performance.now()
      const totalElapsed = (now - startTimeRef.current) / 1000
      const clamped = Math.min(totalElapsed, TOTAL_DURATION)
      const idx = getSlideIndexFromTime(clamped)
      const slideElapsed = clamped - SLIDES[idx].startAt

      setCurrentSlide(idx)
      currentSlideRef.current = idx
      setElapsed(slideElapsed)

      if (clamped >= TOTAL_DURATION) {
        clearInterval(timerRef.current)
        setIsPlaying(false)
        isPlayingRef.current = false
      }
    }, TICK_MS)
  }, [])

  const play = useCallback(() => {
    if (audioAvailableRef.current && voiceoverRef.current) {
      voiceoverRef.current.play()
        .then(() => {
          bgRef.current?.play().catch(() => {})
          setIsPlaying(true)
          isPlayingRef.current = true
        })
        .catch(() => {
          // Audio blocked — use fallback timer
          audioAvailableRef.current = false
          const currentTime = voiceoverRef.current?.currentTime ?? 0
          startFallbackTimer(currentTime)
          setIsPlaying(true)
          isPlayingRef.current = true
        })
    } else {
      // Fallback timer from current position
      const currentTime = voiceoverRef.current?.currentTime ?? 0
      startFallbackTimer(currentTime)
      setIsPlaying(true)
      isPlayingRef.current = true
    }
  }, [startFallbackTimer])

  const pause = useCallback(() => {
    voiceoverRef.current?.pause()
    bgRef.current?.pause()
    clearInterval(timerRef.current)
    setIsPlaying(false)
    isPlayingRef.current = false
  }, [])

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, SLIDES.length - 1))
    const targetTime = SLIDES[clamped].startAt

    currentSlideRef.current = clamped
    setCurrentSlide(clamped)
    setElapsed(0)

    if (audioAvailableRef.current && voiceoverRef.current) {
      voiceoverRef.current.currentTime = targetTime
    } else if (isPlayingRef.current) {
      startFallbackTimer(targetTime)
    } else {
      // Not playing — just update startTimeRef so next play() resumes correctly
      startTimeRef.current = performance.now() - targetTime * 1000
    }
  }, [startFallbackTimer])

  return { currentSlide, elapsed, isPlaying, audioReady, play, pause, goTo }
}
