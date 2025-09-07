import { type ReactNode, useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ImageBanner from "./img-banner"
import Shuffle from './shuffle'

const KlioBanner = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsLoading(false)
    img.src = '/klio-banner.svg'
  }, [])

  const handleClose = () => {
    console.log('Banner closed')
  }

  const handleInteraction = () => {
    console.log('Banner clicked')
  }

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="relative h-[550px] overflow-hidden rounded-lg shadow-lg">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <Skeleton className="h-12 w-64 bg-white/20" />
            <div className="flex justify-end">
              <Skeleton className="h-12 w-32 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <ImageBanner
        onClose={handleClose}
        renderInteractiveArea={({ children }: { children: ReactNode }) => (
          <a 
            href="https://klio.solutions" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleInteraction}
            className="block"
          >
            {children}
          </a>
        )}
        action={
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white/90 hover:bg-white text-black font-semibold pointer-events-none"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        }
        title={
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight text-white font-press-start">
            <Shuffle
              tag="span"
              text="Klio Solutions"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              className="text-white font-press-start"
            />
          </h2>
        }
        image={
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/klio-banner.svg')"
            }}
          />
        }
      />
    </div>
  )
}

export default KlioBanner