import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SectionTitle from "./section-title"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Hippotherapy Patient Tracking Survey Webapp",
      description: "Developed a web app for tracking hippotherapy progress, leveraging offline storage with Firebase sync and visualizing survey data using Syncfusion.",
      image: "/hippotherapy.png?height=300&width=500",
      tags: ["Flutter", "Dart", "Firebase", "C#"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Mars Rover Photo Collection Website",
      description: "Designed and built a photo-collecting website with a custom API, Google OAuth authentication, and a permission-based CRUD interface.",
      image: "/rover.jpg?height=300&width=500",
      tags: ["Javascript", "Express", "HBS", "Vue.js", "Node.js"],
      github: "https://github.com/01uan/mars-rover-web",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "Home Lab",
      description: "Manage a Proxmox-based home lab with VMs and LXC containers, deploying self-hosted services and custom apps with secure remote access via Tailscale.",
      image: "/proxmox.jpg?height=300&width=500",
      tags: ["Proxmox", "Tailscale", "Linux", "Windows", "Containers"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  return (
    <div className="space-y-8 bg-black/60 p-8 rounded-lg backdrop-blur-sm">
      <SectionTitle title="Projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border-white/10 bg-black/80 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-white text-xl">{project.title}</CardTitle>
              <CardDescription className="text-gray-300">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white text-black text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Link
                href={project.github}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
                target="_blank"
              >
                <Github size={16} /> GitHub
              </Link>
              {/* <Link
                href={project.demo}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
                target="_blank"
              >
                <ExternalLink size={16} /> Live Demo
              </Link> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
