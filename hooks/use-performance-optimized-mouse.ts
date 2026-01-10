"use client"

import { useEffect, useState } from "react"

export function usePerformanceOptimizedMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrameId: number
    let lastTime = 0
    const throttleDelay = 16 // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now()

      if (currentTime - lastTime >= throttleDelay) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }

        animationFrameId = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        })

        lastTime = currentTime
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return mousePosition
}
