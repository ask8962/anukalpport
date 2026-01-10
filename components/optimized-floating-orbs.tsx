"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

export function OptimizedFloatingOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 25,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 6 + i * 0.3,
        delay: i * 0.15,
      })),
    [],
  )

  return (
    <>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/6 to-blue-400/6 blur-md will-change-transform"
          animate={{
            x: [0, 25, -12, 0],
            y: [0, -25, 12, 0],
            scale: [1, 1.03, 0.97, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: orb.delay,
            ease: "easeInOut",
          }}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
        />
      ))}
    </>
  )
}
