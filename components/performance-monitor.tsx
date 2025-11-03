"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      "/images/anukalp-photo.jpeg",
      "/images/nptel-certificate.jpeg",
      "/images/micro-it-certificate.jpeg",
      "/images/edumagma-certificate.png",
      "/images/education-certificate.png",
    ]

    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    // Optimize animations for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty("--animation-duration", "0.1s")
    }

    // Add intersection observer for lazy loading animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return null
}
