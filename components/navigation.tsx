"use client"

interface NavigationProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  return (
    <div className="w-full sticky top-0 z-50 bg-black/80 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="w-full">
          <ul className="grid w-full grid-cols-3 bg-white/10 shadow-lg rounded-md overflow-hidden">
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className={`w-full py-2 md:py-3 px-2 sm:px-4 md:px-6 text-center transition-all duration-300 text-sm sm:text-base ${
                  activeSection === "about" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                About Me
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className={`w-full py-2 md:py-3 px-2 sm:px-4 md:px-6 text-center transition-all duration-300 text-sm sm:text-base ${
                  activeSection === "projects" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("experiences")}
                className={`w-full py-2 md:py-3 px-2 sm:px-4 md:px-6 text-center transition-all duration-300 text-sm sm:text-base ${
                  activeSection === "experiences" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                Experiences
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
