"use client"

import { useEffect, useRef } from "react"

export default function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    updateCanvasSize()

    // Game entities
    class Spaceship {
      x: number
      y: number
      width: number
      height: number
      speed: number
      direction: number
      bullets: Bullet[]
      lastShot: number
      shootInterval: number

      constructor() {
        this.width = 30
        this.height = 20
        this.x = 50
        this.y = canvas.height / 2 - this.height / 2
        this.speed = 1.5
        this.direction = 1 // 1 for down, -1 for up
        this.bullets = []
        this.lastShot = 0
        this.shootInterval = 800 // ms between shots
      }

      update(time: number) {
        // Move up and down
        this.y += this.speed * this.direction

        // Change direction at edges
        if (this.y <= 20 || this.y >= canvas.height - this.height - 20) {
          this.direction *= -1
        }

        // Auto shoot
        if (time - this.lastShot > this.shootInterval) {
          this.shoot()
          this.lastShot = time
        }

        // Update bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
          this.bullets[i].update()

          // Remove bullets that are off screen
          if (this.bullets[i].x > canvas.width) {
            this.bullets.splice(i, 1)
          }
        }
      }

      shoot() {
        this.bullets.push(new Bullet(this.x + this.width, this.y + this.height / 2))
      }

      draw() {
        if (!ctx) return

        // Draw spaceship
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.width, this.y + this.height / 2)
        ctx.lineTo(this.x, this.y + this.height)
        ctx.closePath()
        ctx.fill()

        // Draw cockpit
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.beginPath()
        ctx.arc(this.x + 10, this.y + this.height / 2, 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw bullets
        this.bullets.forEach((bullet) => bullet.draw())
      }
    }

    class Bullet {
      x: number
      y: number
      radius: number
      speed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = 3
        this.speed = 5
      }

      update() {
        this.x += this.speed
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Alien {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      phase: number
      amplitude: number
      frequency: number
      isExploding: boolean
      explosionSize: number
      explosionAlpha: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = 15 + Math.random() * 10
        this.speedX = -0.5 - Math.random() * 0.5
        this.speedY = 0
        this.phase = Math.random() * Math.PI * 2
        this.amplitude = 30 + Math.random() * 20
        this.frequency = 0.02 + Math.random() * 0.01
        this.isExploding = false
        this.explosionSize = 0
        this.explosionAlpha = 1
      }

      update(time: number) {
        if (this.isExploding) {
          this.explosionSize += 0.5
          this.explosionAlpha -= 0.02
          return this.explosionAlpha > 0
        }

        this.phase += this.frequency
        this.x += this.speedX
        this.y = this.y + Math.sin(this.phase) * this.amplitude * 0.05

        // Wrap around when off screen
        if (this.x < -this.size) {
          this.x = canvas.width + this.size
          this.y = Math.random() * (canvas.height - 100) + 50
        }

        return true
      }

      checkCollision(bullets: Bullet[]) {
        if (this.isExploding) return false

        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i]
          const dx = this.x - bullet.x
          const dy = this.y - bullet.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < this.size + bullet.radius) {
            bullets.splice(i, 1)
            this.isExploding = true
            return true
          }
        }
        return false
      }

      draw() {
        if (!ctx) return

        if (this.isExploding) {
          // Draw explosion
          ctx.fillStyle = `rgba(255, 255, 255, ${this.explosionAlpha})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.explosionSize, 0, Math.PI * 2)
          ctx.fill()
          return
        }

        // Draw alien
        ctx.fillStyle = "white"
        ctx.beginPath()

        // Alien body (circle with tentacles)
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
        ctx.fill()

        // Tentacles
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2 + this.phase
          const length = this.size * 0.7
          const endX = this.x + Math.cos(angle) * length
          const endY = this.y + Math.sin(angle) * length

          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(endX, endY)
          ctx.lineWidth = 2
          ctx.strokeStyle = "white"
          ctx.stroke()
        }
      }
    }

    // Create game objects
    const spaceship = new Spaceship()
    const aliens: Alien[] = []

    // Create initial aliens
    const createAliens = () => {
      for (let i = 0; i < 8; i++) {
        const x = canvas.width - 100 - Math.random() * 200
        const y = Math.random() * (canvas.height - 100) + 50
        aliens.push(new Alien(x, y))
      }
    }
    createAliens()

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw spaceship
      spaceship.update(time)
      spaceship.draw()

      // Update and draw aliens
      for (let i = aliens.length - 1; i >= 0; i--) {
        aliens[i].checkCollision(spaceship.bullets)
        const isAlive = aliens[i].update(time)
        aliens[i].draw()

        if (!isAlive) {
          aliens.splice(i, 1)
        }
      }

      // Add new aliens if needed
      if (aliens.length < 8 && Math.random() < 0.01) {
        const x = canvas.width + 50
        const y = Math.random() * (canvas.height - 100) + 50
        aliens.push(new Alien(x, y))
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Handle resize
    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0 z-10" style={{ pointerEvents: "none" }} />
  )
}
