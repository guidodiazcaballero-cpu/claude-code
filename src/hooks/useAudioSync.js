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
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const currentSlideRef = useRef(0)
  const isPlayingRef = useRef(false)
  const usingAudioRef = useRef(false)

  useEffect(() => {
    const vo = new Audio(import.meta.env.BASE_URL + 'voiceover.mp3')
    vo.preload = 'auto'
    voiceoverRef.current = vo

    const onCanPlay = () => setAudioReady(true)
    vo.addEventListener('canplaythrough', onCanPlay)

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
      usingAudioRef.current = false
    }

    vo.addEventListener('timeupdate', onTimeUpdate)
    vo.addEventListener('ended', onEnded)

    const onVisibilityChange = () => {
      if (!document.hidden && isPlayingRef.current && usingAudioRef.current) {
        vo.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      vo.pause()
      vo.removeEventListener('canplaythrough', onCanPlay)
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
    setIsPlaying(true)
    isPlayingRef.current = true

    // Always try audio first — don't wait for canplaythrough
    if (voiceoverRef.current) {
      voiceoverRef.current.play()
        .then(() => {
          usingAudioRef.current = true
          clearInterval(timerRef.current) // stop timer if audio works
        })
        .catch(() => {
          // Audio blocked or failed — fall back to timer
          usingAudioRef.current = false
          startFallbackTimer(voiceoverRef.current?.currentTime ?? 0)
        })
    } else {
      startFallbackTimer(0)
    }
  }, [startFallbackTimer])

  const pause = useCallback(() => {
    voiceoverRef.current?.pause()
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

    if (usingAudioRef.current && voiceoverRef.current) {
      voiceoverRef.current.currentTime = targetTime
    } else if (isPlayingRef.current) {
      startFallbackTimer(targetTime)
    } else {
      startTimeRef.current = performance.now() - targetTime * 1000
    }
  }, [startFallbackTimer])

  return { currentSlide, elapsed, isPlaying, audioReady, play, pause, goTo }
}
