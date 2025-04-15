"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export default function StarBackground({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false })
  const scrollRef = useRef({ lastY: 0, direction: 0 })
  const starsRef = useRef<any[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight)

      // Recreate stars when canvas is resized
      createStars()
    }

    // Star class
    class Star {
      x: number
      y: number
      size: number
      originalX: number
      originalY: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        // Basic movement
        this.x += this.speedX
        this.y += this.speedY

        // Scroll effect
        this.y += scrollRef.current.direction * 0.5

        // Mouse repel effect
        if (mouseRef.current.isHovering) {
          const dx = this.x - mouseRef.current.x
          const dy = this.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            this.x += dx * force * 0.05
            this.y += dy * force * 0.05
          }
        }

        // Return to original position
        const returnSpeed = 0.01
        this.x += (this.originalX - this.x) * returnSpeed
        this.y += (this.originalY - this.y) * returnSpeed

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create stars
    const createStars = () => {
      const stars = []
      const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000))

      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }

      starsRef.current = stars
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between nearby stars
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 0.5

      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + window.scrollY,
        isHovering: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollRef.current = {
        direction: currentScrollY - scrollRef.current.lastY,
        lastY: currentScrollY,
      }
    }

    // Initialize
    setCanvasSize()
    createStars()
    animationRef.current = requestAnimationFrame(animate)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", setCanvasSize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 bg-black"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
