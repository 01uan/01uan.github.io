interface SectionTitleProps {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      <div className="mt-3 flex items-center">
        <div className="h-px bg-white/30 flex-grow"></div>
        <div className="mx-2 w-2 h-2 rounded-full bg-white"></div>
        <div className="h-px bg-white/30 flex-grow"></div>
      </div>
    </div>
  )
}
