import { type ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ImageBanner from "./img-banner"
import Shuffle from './shuffle'
import { useLoadingState } from "@/hooks/loading-state"
import { useIsMobile } from "@/hooks/use-mobile"

const KlioBanner = () => {
  const isMobile = useIsMobile()
  const isLoading = useLoadingState(200)

  const handleClose = () => {
    console.log('Banner closed')
  }

  const handleInteraction = () => {
    console.log('Banner clicked')
  }

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className={`relative overflow-hidden rounded-lg shadow-lg ${isMobile ? 'h-[300px]' : 'h-[550px]'}`}>
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 bg-black/20" />
          <div className={`relative z-10 h-full flex flex-col justify-between ${isMobile ? 'p-4' : 'p-6'}`}>
            <Skeleton className={`bg-white/20 ${isMobile ? 'h-8 w-48' : 'h-12 w-64'}`} />
            <div className="flex justify-end">
              <Skeleton className={`bg-white/20 ${isMobile ? 'h-8 w-24' : 'h-12 w-32'}`} />
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
            size={isMobile ? "default" : "lg"}
            variant="secondary"
            className="bg-white/90 hover:bg-white text-black font-semibold pointer-events-none"
          >
            <ExternalLink className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
            {isMobile ? 'Learn' : 'Learn More'}
          </Button>
        }
        title={
          <h2 className={`font-extrabold uppercase leading-tight text-white font-press-start ${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>
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
        isMobile={ isMobile}
      />
    </div>
  )
}

export default KlioBanner