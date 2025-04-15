import Image from "next/image"
import SectionTitle from "./section-title"

export default function AboutMe() {
  return (
    <div className="space-y-8 bg-black/60 p-8 rounded-lg backdrop-blur-sm">
      <SectionTitle title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="space-y-6">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Hi, I'm Gia, a passionate developer with expertise in software development and IT management. I specialize in
            creating immersive digital experiences that combine aesthetic design with functional implementation.
          </p>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            With a Dipolma in Computer Systems Technology, I bring a unique perspective to every project with diverse toolset. I'm
            constantly exploring new technologies and techniques to push the boundaries of what's possible.
          </p>

          <div className="pt-4">
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-white after:content-[''] after:block after:w-16 after:h-0.5 after:bg-white/50 after:mt-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Java", "C#", "Dart", "Javascript/Typescript", "HTML/CSS", "SQL", "Python"].map(
                (skill) => (
                  <span key={skill} className="px-3 py-1 bg-white text-black rounded-full text-sm shadow-md">
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
