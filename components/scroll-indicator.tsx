interface ScrollIndicatorProps {
  progress: number
}

export default function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div className="h-full bg-white" style={{ width: `${progress * 100}%`, transition: "width 0.1s ease-out" }} />
    </div>
  )
}
