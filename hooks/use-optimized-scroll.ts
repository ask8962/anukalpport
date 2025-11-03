"use client"

import { useEffect, useState } from "react"

export function useOptimizedScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      setScrollY(window.scrollY)
      setShowBackToTop(window.scrollY > 300)
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY)
        ticking = true
      }
    }

    const handleScroll = () => requestTick()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { scrollY, showBackToTop }
}
