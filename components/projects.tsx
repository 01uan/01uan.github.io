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
      reflection: "This project challenged me to create a user-friendly mobile app with offline capabilities using Flutter and Firebase. I learned how to handle intermittent connectivity by syncing local storage with cloud data once reconnected. Visualizing patient progress with Syncfusion taught me how to convert raw data into insights for health professionals. This experience strengthened my skills in cross-platform development and real-world data handling.",
      image: "/hippotherapy.png?height=300&width=500",
      tags: ["Flutter", "Dart", "Firebase", "C#"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Mars Rover Photo Collection Website",
      description: "Designed and built a photo-collecting website with a custom API, Google OAuth authentication, and a permission-based CRUD interface.",
      reflection: "Through this project, I explored full-stack development by building a Node.js API, integrating Google OAuth for authentication, and enforcing role-based permissions. It was my first time designing a complete CRUD system with access control. This improved my understanding of backend security and user experience design. I now feel confident building scalable, secure web applications.",
      image: "/rover.jpg?height=300&width=500",
      tags: ["Javascript", "Express", "HBS", "Vue.js", "Node.js"],
      github: "https://github.com/01uan/mars-rover-web",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "Home Lab",
      description: "Manage a Proxmox-based home lab with VMs and LXC containers, deploying self-hosted services and custom apps with secure remote access via Tailscale.",
      reflection: "Running a home lab taught me practical infrastructure and networking skills. I deployed various self-hosted services in Proxmox containers and used Tailscale to enable secure remote access. Troubleshooting virtual networks, firewall rules, and Linux containers gave me hands-on experience in systems administration, which I plan to apply in cybersecurity and DevOps roles.",
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
              <p className="mt-2 text-sm text-gray-400 italic">{project.reflection}</p>
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
