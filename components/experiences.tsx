import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon } from "lucide-react"
import SectionTitle from "./section-title"

export default function Experiences() {
  const experiences = [
    {
      id: 1,
      role: "Student Street Maintenance Ambassador",
      company: "Riversdale BID",
      period: "Septermber 2023 - June 2025",
      location: "Saskatoon, SK",
      description:
        "Performed beautification and maintenance tasks including pruning, equipment upkeep, graffiti removal, street sweeping, and garbage collection to enhance the district’s appearance.",
    },
    {
      id: 2,
      role: "Fill Crew Assoicate",
      company: "Canadian Tire Corporation Ltd",
      period: "June 2022 - September 2023",
      location: "Saskatoon, SK",
      description:
        "Transported products to the sales floor, maintained inventory accuracy, reported low stock levels, and assisted customers to support effective operations and service.",
    },
    {
      id: 3,
      role: "Sales Associate",
      company: "Spirit Halloween",
      period: "August 2022 - October 2022",
      location: "Saskatoon, SK",
      description:
        "Organized and stocked shelves, verified pricing labels, managed inventory, and ensured efficient product flow from warehouse to sales floor.",
    },
  ]

  return (
    <div className="space-y-8 bg-black/60 p-8 rounded-lg backdrop-blur-sm">
      <SectionTitle title="Experiences" />

      <div className="space-y-6">
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            className="border-white/10 bg-black/80 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <CardTitle className="text-xl text-white">{exp.role}</CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-300">{exp.company}</CardDescription>
                </div>
                <div className="bg-white text-black px-3 py-1 rounded-full text-sm shadow-md self-start">
                  {exp.period}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPinIcon size={16} />
                <span>{exp.location}</span>
              </div>
              <p className="text-gray-300">{exp.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
