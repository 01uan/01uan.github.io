"use client"

import { useEffect, useState, useRef } from "react"
import Navigation from "@/components/navigation"
import AboutMe from "@/components/about-me"
import Projects from "@/components/projects"
import Experiences from "@/components/experiences"
import StarBackground from "@/components/star-background"
import SpaceShooter from "@/components/space-shooter"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const experiencesRef = useRef<HTMLDivElement>(null)

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for the header

      // Get positions of each section
      const aboutPosition = aboutRef.current?.offsetTop || 0
      const projectsPosition = projectsRef.current?.offsetTop || 0
      const experiencesPosition = experiencesRef.current?.offsetTop || 0

      // Determine which section is currently in view
      if (scrollPosition >= experiencesPosition) {
        setActiveSection("experiences")
      } else if (scrollPosition >= projectsPosition) {
        setActiveSection("projects")
      } else {
        setActiveSection("about")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (section: string) => {
    let ref
    switch (section) {
      case "about":
        ref = aboutRef
        break
      case "projects":
        ref = projectsRef
        break
      case "experiences":
        ref = experiencesRef
        break
      default:
        ref = aboutRef
    }

    if (ref.current) {
      const yOffset = -80 // Offset for the sticky header
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <StarBackground>
      <main className="min-h-screen text-white">
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

        <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
          {/* Hero Section with Space Shooter */}
          <div className="h-[500px] md:h-[600px] flex flex-col items-center justify-center relative">
            <SpaceShooter />
            <div className="z-20 relative text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Gia Diep</h1>
              <p className="text-xl md:text-2xl text-white/80 italic font-merriweather">Developer and Designer, with a passion for IT</p>
              <p className="text-s md:text-2s text-white/80 font-merriweather">diep9529@saskpolytech.ca</p>
              <div className="mt-8 h-px w-24 bg-white/30 mx-auto" />
            </div>
          </div>

          <div className="mt-16 space-y-32">
            <section ref={aboutRef} id="about" className="scroll-mt-20">
              <AboutMe />
            </section>

            <section ref={projectsRef} id="projects" className="scroll-mt-20">
              <Projects />
            </section>

            <section ref={experiencesRef} id="experiences" className="scroll-mt-20">
              <Experiences />
            </section>
          </div>
        </div>
      </main>
    </StarBackground>
  )
}
