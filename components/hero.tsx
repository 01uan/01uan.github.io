"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xffffff)

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, 400)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    // Add a cube
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.5,
      metalness: 0.7,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true
    scene.add(cube)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (cube) {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return

      camera.aspect = containerRef.current.clientWidth / 400
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, 400)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-[400px] relative shadow-2xl" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="text-5xl font-bold text-white mix-blend-difference">Gia Diep</h1>
      </div>
    </div>
  )
}
